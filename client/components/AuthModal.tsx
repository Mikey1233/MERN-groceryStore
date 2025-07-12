"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, User, Upload, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    adminToken: z.string().optional(),
    profileImage: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /////register
  const { register, login } = useAuth();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      adminToken: "",
      profileImage: null,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    signupForm.setValue("profileImage", file); // react-hook-form
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    signupForm.setValue("profileImage", null);
    const fileInput = document.getElementById(
      "profile-image"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  //hande login
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      const res = await login({
        email: values.email,
        password: values.password,
      });
      if (!res) throw new Error("login error");

      console.log("✅ login successful:", res);
      onOpenChange(false);
      setIsLoading(false);
      return router.push(res?.role === "admin" ? "/adminDashboard" : "cart");
    } catch (err) {
      console.log("sigin in error", err);
    } finally {
      setIsLoading(false);
      setImagePreview("");
      signupForm.reset();
    }
  };

  ////hande submit

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      console.log("🚀 Starting signup");
      setIsLoading(true);
      console.log(values.profileImage);

      const res = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        adminToken: values.adminToken,
        profileImage: values.profileImage,
      });

      console.log("✅ Registration successful:", res);
      onOpenChange(false);
      return router.push(res?.role === "admin" ? "/adminDashboard" : "cart");

      // Optional: close modal or redirect
    } catch (err) {
      console.error("❌ Signup error:", err);
      // toast.error("Signup failed"); // Optional UI feedback
    } finally {
      setIsLoading(false);
      setImagePreview("");
      signupForm.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-800">
            Welcome to BigCart
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Sign in to your account or create a new one to get started
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Enter your email"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* signUp */}

          <TabsContent value="signup" className="space-y-2">
            <Form {...signupForm}>
              <form
                onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={signupForm.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-1">
                          <div className="flex items-center justify-center">
                            <label
                              htmlFor="profile-image"
                              className="flex flex-col items-center justify-center w-20 h-20 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden"
                            >
                              {imagePreview ? (
                                <div className="relative w-full h-full">
                                  <img
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="Profile preview"
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                  <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-1 right-2 z-[1000px] bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center text-center px-2">
                                  <Upload className="w-5 h-5 mb-1 text-gray-500" />
                                  <p className="text-xs text-gray-500 font-medium">
                                    Upload
                                  </p>
                                </div>
                              )}
                              <input
                                id="profile-image"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Full Name</FormLabel> */}
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Jane Doe"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Email</FormLabel> */}
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="myemail@gmail.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="adminToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Token (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Enter admin token for special privileges"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty for regular user account. Admin token grants
                        additional privileges.
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" required />
                  <label className="text-sm text-gray-600">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-green-600 hover:text-green-700"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-green-600 hover:text-green-700"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
