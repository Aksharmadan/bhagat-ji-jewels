"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function TrendingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const trending = getProducts({ trending: true });
  const visible = trending.slice(0, visibleCount);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="trending" className="section-padding border-t border-border">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-end justify-between gap-6" data-reveal>
          <div>
            <p className="text-[10px] tracking-[0.4em] text-text-muted uppercase">Portfolio Edit</p>
            <h2 className="font-display mt-3 text-4xl text-text md:text-5xl lg:text-6xl">
              Pieces Worth Pausing For
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll(-1)}
              className="flex h-12 w-12 items-center justify-center border border-border text-text transition-colors hover:border-gold hover:text-gold"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="flex h-12 w-12 items-center justify-center border border-border text-text transition-colors hover:border-gold hover:text-gold"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="horizontal-scroll -mx-2 px-2">
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {visibleCount < trending.length && (
          <div className="mt-12 text-center" data-reveal>
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="btn-outline"
            >
              <span>Load More</span>
            </button>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/collections" className="text-[11px] tracking-[0.3em] text-gold uppercase">
            View All Collections →
          </Link>
        </div>
      </div>
    </section>
  );
}
