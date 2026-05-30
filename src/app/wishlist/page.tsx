"use client";

import { useWishlist } from "@/components/providers/WishlistProvider";
import { getCollections, getProductBySlug } from "@/lib/products";
import { ProductCard } from "@/components/bhagat/ProductCard";
import { inquireProduct } from "@/lib/actions";
import { Heart, Trash2, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, collectionWishlist, clearWishlist } = useWishlist();

  // Load all products in the wishlist
  const products = wishlist
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const savedCollections = getCollections().filter((collection) => collectionWishlist.includes(collection.slug));

  const handleInquireAll = () => {
    if (products.length === 0) return;
    const names = products.map((p) => `"${p.name}" (${p.slug})`).join(", ");
    const msg = `Hi Bhagat Ji Jewels, I would like to inquire about the following items from my wishlist: ${names}. Please share availability and details.`;
    inquireProduct(msg);
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark pt-[7.5rem] pb-24 lg:pt-[10.5rem]">
      {/* Title */}
      <section className="bg-white dark:bg-neutral-900 border-b border-border py-12 mb-12 text-center px-6">
        <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold flex justify-center items-center gap-1">
          <Sparkles size={10} className="text-gold" /> My saved favorites
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text mt-3 uppercase tracking-wide">
          My Wishlist
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-xs text-text-muted leading-relaxed font-sans">
          Review your favorite designs, compare details, and consult with our concierge.
        </p>
      </section>

      {/* Grid Content */}
      <section className="max-w-[1200px] mx-auto px-6">
        {products.length === 0 && savedCollections.length === 0 ? (
          <div className="rounded-xl border border-border bg-white dark:bg-neutral-900 py-20 px-6 text-center space-y-6 max-w-md mx-auto">
            <Heart size={44} className="mx-auto text-neutral-300 dark:text-neutral-700 animate-pulse" />
            <h3 className="font-display text-xl font-bold text-text">Your Wishlist is Empty</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Explore our masterfully crafted collections to save your favorite gold, diamond, or platinum items.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 rounded bg-gradient-to-r from-[#a8874c] via-[#c9a96e] to-[#e8d5a8] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 shadow transition-transform hover:-translate-y-0.5"
            >
              Browse Collections <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Bulk Actions Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-neutral-900 border border-border/80 p-5 rounded-lg gap-4 shadow-sm">
              <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">
                {products.length} Items · {savedCollections.length} Collections Saved
              </span>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={clearWishlist}
                  className="flex-1 sm:flex-none inline-flex justify-center items-center gap-1.5 border border-border hover:border-red-500 hover:text-red-500 text-text-muted px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Trash2 size={13} /> Clear
                </button>
                <button
                  onClick={handleInquireAll}
                  className="flex-1 sm:flex-none inline-flex justify-center items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba56] text-white px-5 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow"
                >
                  <MessageSquare size={13} /> Inquire About All
                </button>
              </div>
            </div>

            {savedCollections.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3">
                {savedCollections.map((collection) => (
                  <Link
                    key={collection.slug}
                    href={`/collections/${collection.slug}`}
                    className="rounded-lg border border-border bg-white p-5 shadow-sm transition-colors hover:border-gold dark:bg-neutral-900"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Saved Collection</span>
                    <h3 className="mt-2 font-display text-2xl font-bold text-text">{collection.name}</h3>
                    <p className="mt-2 line-clamp-2 text-xs text-text-muted">{collection.tagline}</p>
                  </Link>
                ))}
              </div>
            )}

            {/* Product Card Grid */}
            {products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p, idx) => (
                  <ProductCard key={p.id} product={p} index={idx} size="w-full" />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
