import type { MetadataRoute } from "next";
import productsData from "../../data/products.json";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bhagatjijewels.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = productsData.products.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/collections`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...products,
  ];
}
