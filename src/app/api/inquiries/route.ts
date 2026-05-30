import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/lib/db";
import { getProductBySlug } from "@/lib/products";
import { inquirySchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { name, phone, email, message, productSlug, type } = parsed.data;
    const product = productSlug ? getProductBySlug(productSlug) : undefined;

    const record = await saveInquiry({
      type,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || undefined,
      message: message?.trim(),
      productSlug: product?.slug,
      productName: product?.name,
    });

    return NextResponse.json({ success: true, inquiry: record });
  } catch {
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const key = request.headers.get("x-admin-key");
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { getInquiries } = await import("@/lib/db");
  const inquiries = await getInquiries();
  return NextResponse.json({ inquiries });
}
