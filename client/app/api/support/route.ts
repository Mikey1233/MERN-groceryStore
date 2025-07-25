// app/api/support/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    const response = await axios.post(`${process.env.AI_CHATBOT_WEBHOOK}`, {
      message,
    })
 
const cleaned = `${response.data
  .replace(/\*\*(.*?)\*\*/g, '"$1"')  // Bold to quotes
  .replace(/\*(.*?)\*/g, '"$1"')      // Italics to quotes
}`;


    return NextResponse.json({ reply: cleaned })
  } catch (error) {
    console.error('n8n error:', error)
    return NextResponse.json(
      { reply: 'Sorry, I couldn’t get a response. Please try again later.' },
      { status: 500 }
    )
  }
}
