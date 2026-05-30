import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Piece Not Found" };
  return {
    title: `${product.name} | BHAGAT JI JEWELS`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
