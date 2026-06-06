import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // In a consolidated architecture, we log the message.
    // Persistence would ideally be handled by a real database or email service.
    const timestamp = new Date().toISOString();
    console.log(`[CONTACT_FORM] ${timestamp} | From: ${name} <${email}>`);
    console.log(`[MESSAGE_CONTENT]: ${message}`);

    return NextResponse.json({
      success: true,
      message: "Message received successfully. Khushwith will get back to you soon!"
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
