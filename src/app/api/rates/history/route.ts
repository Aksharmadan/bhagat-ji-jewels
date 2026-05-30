import { NextResponse } from "next/server";
import { getRateHistory } from "@/lib/rateStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const history = await getRateHistory();
  return NextResponse.json({ success: true, history });
}
