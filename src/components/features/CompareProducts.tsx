"use client";

import { useWishlist } from "@/components/providers/WishlistProvider";
import { getProductBySlug, type Product } from "@/lib/products";
import { Sparkles, Scale, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { inquireProduct } from "@/lib/actions";

export function CompareProducts() {
  const { wishlist } = useWishlist();

  // Load first 3 wishlist items for comparison
  const products = wishlist
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => !!p)
    .slice(0, 3);

  if (products.length < 2) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-6 shadow-md max-w-md mx-auto text-center space-y-4">
        <Scale size={32} className="mx-auto text-neutral-300 dark:text-neutral-700 animate-pulse" />
        <h4 className="font-display text-lg font-bold text-text uppercase">Compare Jewelry</h4>
        <p className="text-xs text-text-muted leading-relaxed">
          Please add at least 2 items to your wishlist to view a side-by-side comparison of specifications.
        </p>
        <Link href="/collections" className="inline-block text-xs text-accent font-semibold hover:underline">
          Browse collections &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-6 shadow-xl w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex items-center gap-2 pb-4 border-b border-border/60 mb-6">
        <Scale className="text-accent h-5 w-5" />
        <h3 className="font-display text-xl font-bold text-text uppercase tracking-wide">Spec Comparison</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border/60">
              <th className="py-3 pr-4 font-bold text-text-muted uppercase tracking-wider w-[150px]">Features</th>
              {products.map((p) => (
                <th key={p.id} className="py-3 px-4 font-bold text-text uppercase tracking-wider text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative h-16 w-12 rounded overflow-hidden border border-border">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="block truncate max-w-[120px] font-display text-sm">{p.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {/* Row: Metal */}
            <tr>
              <td className="py-3.5 pr-4 font-semibold text-text-muted">Metal</td>
              {products.map((p) => (
                <td key={p.id} className="py-3.5 px-4 text-center text-text font-medium">{p.metal}</td>
              ))}
            </tr>
            {/* Row: Purity */}
            <tr>
              <td className="py-3.5 pr-4 font-semibold text-text-muted">Purity</td>
              {products.map((p) => (
                <td key={p.id} className="py-3.5 px-4 text-center text-text font-medium">{p.purity.split(" (")[0]}</td>
              ))}
            </tr>
            {/* Row: Weight */}
            <tr>
              <td className="py-3.5 pr-4 font-semibold text-text-muted">Weight</td>
              {products.map((p) => (
                <td key={p.id} className="py-3.5 px-4 text-center text-text font-mono font-medium">{p.weight}</td>
              ))}
            </tr>
            {/* Row: Collection */}
            <tr>
              <td className="py-3.5 pr-4 font-semibold text-text-muted">Collection</td>
              {products.map((p) => (
                <td key={p.id} className="py-3.5 px-4 text-center text-text font-medium">{p.collection}</td>
              ))}
            </tr>
            {/* Row: Category */}
            <tr>
              <td className="py-3.5 pr-4 font-semibold text-text-muted">Category</td>
              {products.map((p) => (
                <td key={p.id} className="py-3.5 px-4 text-center text-text font-medium">{p.category}</td>
              ))}
            </tr>
            {/* Row: Inquiry */}
            <tr>
              <td className="py-3.5 pr-4 font-semibold text-text-muted">Consultation</td>
              {products.map((p) => (
                <td key={p.id} className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => inquireProduct(p.name, p.slug)}
                    className="inline-block bg-accent hover:bg-accent-hover text-white px-4 py-1.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Inquire
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
