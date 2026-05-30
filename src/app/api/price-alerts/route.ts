import { NextRequest, NextResponse } from "next/server";
import { getPriceAlerts, savePriceAlert, type PriceAlert, type RateSnapshot } from "@/lib/rateStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const validMetals = new Set<keyof RateSnapshot["rates"]>([
  "gold24K",
  "gold22K",
  "gold18K",
  "silver",
  "platinum",
  "diamond",
]);

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone")?.trim();
  const alerts = await getPriceAlerts();
  const filtered = phone ? alerts.filter((alert) => alert.phone === phone) : alerts;
  return NextResponse.json({ success: true, alerts: filtered.slice(-50) });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as Partial<PriceAlert> | null;
  if (!body) {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const metal = body.metal;
  const target = Number(body.target);
  const direction = body.direction === "above" ? "above" : "below";

  if (!name || !phone || !metal || !validMetals.has(metal) || !Number.isFinite(target) || target <= 0) {
    return NextResponse.json({ success: false, error: "Please provide name, phone, metal, and a valid target rate." }, { status: 400 });
  }

  const alert = await savePriceAlert({ name, phone, metal, target, direction });
  return NextResponse.json({ success: true, alert });
}
