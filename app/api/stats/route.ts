import { NextResponse } from "next/server";
import stats from "@/lib/data/stats.json";

export async function GET() {
  return NextResponse.json({ success: true, visits: stats.visits });
}
