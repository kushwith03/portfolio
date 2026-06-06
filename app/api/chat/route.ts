import { NextRequest, NextResponse } from "next/server";
import { getChatReply } from "@/lib/ai/chat";

export async function POST(req: NextRequest) {
  try {
    const { message, history, persona } = await req.json();
    const reply = await getChatReply(message, history, persona);
    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { success: false, reply: "I encountered a temporary error. Please try again." },
      { status: 500 }
    );
  }
}
