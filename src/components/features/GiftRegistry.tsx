"use client";

import { useEffect, useState } from "react";
import { Gift, Sparkles, Copy, Trash2, ArrowRight } from "lucide-react";
import { getProductBySlug, type Product } from "@/lib/products";
import { ProductCard } from "@/components/bhagat/ProductCard";
import { useWishlist } from "@/components/providers/WishlistProvider";

export function GiftRegistry() {
  const [registryName, setRegistryName] = useState("");
  const [occasion, setOccasion] = useState("Wedding");
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const { wishlist } = useWishlist();

  // Load products in the registry (based on current wishlist items for simplicity)
  const products = wishlist
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => !!p)
    .slice(0, 3); // limit to 3 items for preview

  useEffect(() => {
    const savedName = localStorage.getItem("registryName");
    const savedOccasion = localStorage.getItem("registryOccasion");
    if (savedName) {
      setRegistryName(savedName);
      setOccasion(savedOccasion || "Wedding");
      setCreated(true);
    }
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registryName) return;
    localStorage.setItem("registryName", registryName);
    localStorage.setItem("registryOccasion", occasion);
    setCreated(true);
  };

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/wishlist`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    localStorage.removeItem("registryName");
    localStorage.removeItem("registryOccasion");
    setRegistryName("");
    setCreated(false);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-6 shadow-lg max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-border/60">
        <Gift className="text-accent h-5 w-5" />
        <h3 className="font-display text-xl font-bold text-text uppercase tracking-wide">Gift Registry</h3>
      </div>

      {!created ? (
        <form onSubmit={handleCreate} className="space-y-4">
          <p className="text-xs text-text-muted leading-relaxed">
            Create a registry list for your upcoming wedding or anniversary so friends and family can gift you heirlooms.
          </p>

          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1 block">Registry Title</label>
            <input
              type="text"
              required
              placeholder="E.g. Priya & Rohan's Wedding"
              value={registryName}
              onChange={(e) => setRegistryName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded text-xs text-text bg-transparent outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1 block">Occasion</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded text-xs text-text bg-transparent outline-none focus:border-accent"
            >
              <option>Wedding</option>
              <option>Anniversary</option>
              <option>Birthday</option>
              <option>House Warming</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-white py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow"
          >
            Create Gift Registry
          </button>
        </form>
      ) : (
        <div className="space-y-5">
          <div className="bg-neutral-50 dark:bg-neutral-800/40 p-4 rounded border border-border/60 flex justify-between items-start">
            <div>
              <span className="text-[9px] font-bold text-accent uppercase tracking-widest block">{occasion} Registry</span>
              <h4 className="font-display text-base font-bold text-text mt-1">{registryName}</h4>
            </div>
            <button onClick={handleDelete} className="text-neutral-400 hover:text-red-500 transition-colors" title="Delete Registry">
              <Trash2 size={15} />
            </button>
          </div>

          {products.length > 0 ? (
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block">Registry items preview:</span>
              <div className="grid grid-cols-3 gap-2">
                {products.map((p) => (
                  <div key={p.id} className="relative aspect-[3/4] rounded overflow-hidden border border-border">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-text-muted leading-relaxed">
              No items in your registry. To add items, simply save them to your wishlist.
            </p>
          )}

          <div className="flex gap-2.5 pt-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 inline-flex justify-center items-center gap-1.5 bg-accent hover:bg-accent-hover text-white py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow"
            >
              <Copy size={13} /> {copied ? "Copied!" : "Share Registry"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
