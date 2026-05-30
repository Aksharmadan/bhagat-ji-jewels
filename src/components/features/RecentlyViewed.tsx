"use client";

import { useEffect, useState } from "react";
import { getProductBySlug, type Product } from "@/lib/products";
import { ProductCard } from "@/components/bhagat/ProductCard";
import { Sparkles, History } from "lucide-react";

interface RecentlyViewedProps {
  currentSlug?: string;
}

export function RecentlyViewed({ currentSlug }: RecentlyViewedProps) {
  const [list, setList] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    let slugs: string[] = [];
    if (saved) {
      try {
        slugs = JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    if (currentSlug) {
      // Add current slug to the top of the history list
      slugs = [currentSlug, ...slugs.filter((s) => s !== currentSlug)].slice(0, 6);
      localStorage.setItem("recentlyViewed", JSON.stringify(slugs));
    }

    // Load products
    const loaded = slugs
      .map((slug) => getProductBySlug(slug))
      .filter((p): p is Product => !!p);
    
    // Filter out current product from display list
    setList(loaded.filter((p) => p.slug !== currentSlug));
  }, [currentSlug]);

  if (list.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <History size={16} className="text-accent" />
        <h3 className="text-xs font-bold tracking-widest text-text uppercase">Recently Viewed</h3>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar">
        {list.map((product, idx) => (
          <div key={product.id} className="snap-start shrink-0 w-[240px]">
            <ProductCard product={product} size="sm" index={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}
