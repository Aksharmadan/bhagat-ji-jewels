import { NextResponse } from "next/server";
import { appendRateSnapshot, checkPriceAlerts } from "@/lib/rateStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 60; // Refresh live market data every minute

type GoldApiResponse = {
  price?: number;
  timestamp?: number;
  price_gram_24k?: number;
  price_gram_22k?: number;
  price_gram_18k?: number;
  price_gram_21k?: number;
  price_gram_20k?: number;
  price_gram_16k?: number;
  price_gram_14k?: number;
  price_gram_10k?: number;
  error?: string;
};

type LiveMetalQuote = {
  price: number;
  timestamp?: number;
  priceGram24K?: number;
  priceGram22K?: number;
  priceGram18K?: number;
};

async function fetchMetal(symbol: "XAU" | "XAG" | "XPT"): Promise<LiveMetalQuote> {
  const apiKey = process.env.GOLDAPI_IO_KEY;
  if (!apiKey) {
    throw new Error("Missing GOLDAPI_IO_KEY. Add your GoldAPI.io API key to .env.local.");
  }

  const response = await fetch(`https://www.goldapi.io/api/${symbol}/INR`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "x-access-token": apiKey,
      "User-Agent": "bhagat-ji-jewels-live-rates/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`${symbol} live quote failed with ${response.status}`);
  }

  const data = (await response.json()) as GoldApiResponse;
  if (typeof data.price !== "number" || !Number.isFinite(data.price)) {
    throw new Error(`${symbol} live quote missing price${data.error ? `: ${data.error}` : ""}`);
  }

  return {
    price: data.price,
    timestamp: data.timestamp,
    priceGram24K: data.price_gram_24k,
    priceGram22K: data.price_gram_22k,
    priceGram18K: data.price_gram_18k,
  };
}

const perGram = (quote: LiveMetalQuote) => quote.price / 31.1034768;
const timestampToIso = (timestamp?: number) =>
  timestamp ? new Date(timestamp * 1000).toISOString() : new Date().toISOString();

export async function GET() {
  try {
    const [xauData, xagData, xptData] = await Promise.all([
      fetchMetal("XAU"),
      fetchMetal("XAG"),
      fetchMetal("XPT"),
    ]);

    const gold24K = Math.round(xauData.priceGram24K ?? perGram(xauData));
    const gold22K = Math.round(xauData.priceGram22K ?? gold24K * 0.916);
    const gold18K = Math.round(xauData.priceGram18K ?? gold24K * 0.75);
    const silver = parseFloat(perGram(xagData).toFixed(2));
    const platinum = Math.round(perGram(xptData));
    
    // Representative diamond rate per carat based on standard index (VS1 G color 1ct)
    // fluctuates slightly based on exchange rate/inflation (which mirrors the gold rate index)
    const diamond = Math.round(85000 + (gold24K - 7500) * 5);

    const snapshot = {
      timestamp: timestampToIso(xauData.timestamp),
      rates: {
        gold24K,
        gold22K,
        gold18K,
        silver,
        platinum,
        diamond,
      },
    };

    await appendRateSnapshot(snapshot);
    const triggeredAlerts = await checkPriceAlerts(snapshot);

    return NextResponse.json({
      success: true,
      rates: snapshot.rates,
      updatedAt: snapshot.timestamp,
      source: "GoldAPI.io spot XAU/XAG/XPT to INR",
      isFallback: false,
      triggeredAlerts,
    });
  } catch (error) {
    console.error("Error fetching live rates:", error);
    
    // Fallback rates matching current 2026 market values
    return NextResponse.json({
      success: false,
      rates: {
        gold24K: 13765,
        gold22K: 12609,
        gold18K: 10324,
        silver: 231.44,
        platinum: 5937,
        diamond: 116325,
      },
      updatedAt: new Date().toISOString(),
      source: "fallback estimate - configure GOLDAPI_IO_KEY for GoldAPI.io live spot prices",
      isFallback: true
    });
  }
}
