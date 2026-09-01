import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MESSAGES_PATH = path.join(process.cwd(), "lib", "data", "messages.json");

function readMessages() {
  try {
    if (!fs.existsSync(MESSAGES_PATH)) return [];
    return JSON.parse(fs.readFileSync(MESSAGES_PATH, "utf8"));
  } catch {
    return [];
  }
}

function writeMessages(data: unknown) {
  try {
    const dir = path.dirname(MESSAGES_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(MESSAGES_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing messages:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const now = new Date();
    const entry = {
      id: Date.now(),
      name,
      email,
      message,
      createdAt: now.toISOString(),
      createdAtReadable: now.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    const messages = readMessages();
    messages.push(entry);
    writeMessages(messages);

    const preview = message.length > 80 ? message.slice(0, 80) + "…" : message;
    console.log(`[CONTACT] ${entry.createdAtReadable} | ${name} <${email}> | "${preview}"`);

    return NextResponse.json({
      success: true,
      message: "Message received successfully. Khushwith will get back to you soon!"
    }, { status: 201 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
