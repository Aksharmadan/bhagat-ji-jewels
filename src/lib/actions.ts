"use client";

import { formatWhatsAppLink } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

export async function submitInquiry(data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  productSlug?: string;
  type?: "inquiry" | "appointment" | "newsletter";
}) {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Request failed");
  return json;
}

export function openWhatsApp(message: string, number = BRAND.whatsapp[0]) {
  window.open(formatWhatsAppLink(number, message), "_blank", "noopener,noreferrer");
}

export function inquireProduct(productName: string, slug?: string) {
  const msg = `Namaste. I would like to inquire about "${productName}"${slug ? ` (${slug})` : ""} at BHAGAT JI JEWELS. Please share availability and details.`;
  openWhatsApp(msg);
}

export function bookVisit() {
  openWhatsApp(
    "Namaste. I would like to book a private visit to BHAGAT JI JEWELS showroom in Chandausi."
  );
}
