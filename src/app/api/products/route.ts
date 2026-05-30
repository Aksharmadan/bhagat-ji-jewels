import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const trending = searchParams.get("trending") === "true";
  const featured = searchParams.get("featured") === "true";
  const category = searchParams.get("category") ?? undefined;
  const collection = searchParams.get("collection") ?? undefined;

  const products = getProducts({
    trending: trending || undefined,
    featured: featured || undefined,
    category,
    collection,
  });

  return NextResponse.json({ products });
}
