"use client";

import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";

export function Gallery() {
  const products = getProducts();
  const layout = [
    "md:col-span-2 md:row-span-2",
    "",
    "",
    "md:row-span-2",
    "",
    "md:col-span-2",
    "",
    "",
  ];

  return (
    <section className="section-padding border-t border-border">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <p className="text-[10px] tracking-[0.4em] text-text-muted uppercase">The Atelier</p>
            <h2 className="font-display mt-3 text-4xl text-text md:text-5xl">Every Facet, Considered</h2>
          </div>
          <Link href="/collections" className="text-[11px] tracking-[0.3em] text-gold uppercase hover:opacity-70">
            View All →
          </Link>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[240px] md:gap-4">
          {products.slice(0, 8).map((product, i) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className={`group relative overflow-hidden bg-bg-elevated ${layout[i] ?? ""}`}
              data-scale-reveal
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.08]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-bg/0 transition-colors duration-500 group-hover:bg-bg/30" />
              <div className="absolute right-0 bottom-0 left-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                <p className="text-[10px] tracking-[0.25em] text-gold uppercase">{product.category}</p>
                <p className="font-display text-lg text-text">{product.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
