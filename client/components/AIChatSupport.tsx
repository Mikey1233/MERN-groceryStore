"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Bot, User } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Typewriter } from "react-simple-typewriter";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AIChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const text = await res.text();
      let data: any = {};

      try {
        data = JSON.parse(text);
        //   console.log(data)
      } catch (err) {
        console.warn("Failed to parse JSON. Response was:", text);
      }

      const botMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.reply || "Sorry, I couldn't get a response from the AI.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to contact n8n", error);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: "Sorry, I had trouble reaching the support server.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96">
          <Card className="shadow-2xl border-0 bg-white py-0">
            <CardHeader className="bg-gradient-to-b from-green-400 to-green-600 text-white rounded-t-lg py-3 pl-3 pr-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-0.5">
                  <Bot className="w-5 h-5" />
                  <CardTitle className="text-lg">AI Support</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-white hover:bg-green-700 p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-indigo-100 text-sm mt-1">
                How can I help you today?
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80 p-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <Bot className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">
                      Hello! I'm your AI assistant. Ask me anything about our
                      services.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-2 ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600" />
                          </div>
                        )}
                        <div
                          className={`whitespace-pre-wrap max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {/* {message.content} */}
                          <Typewriter
                            words={[message.content]}
                            loop={1}
                            cursor
                            cursorStyle={false}
                            typeSpeed={30}
                            deleteSpeed={50}
                            delaySpeed={1000}
                          />
                        </div>
                        {message.role === "user" && (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <form onSubmit={sendMessage} className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isLoading || !input.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Chat Icon */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 cursor-pointer hover:bg-green-700 shadow-lg transition-all duration-200 hover:scale-110"
        size="sm"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-white" />
        )}
      </Button>
    </>
  );
}
