"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, RotateCcw, ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { BESTSELLERS } from "@/lib/constants";

export function Bestsellers() {
  const [quickView, setQuickView] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  return (
    <section id="bestsellers" className="relative py-32 md:py-48">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Most Coveted"
          title="Bestsellers"
          subtitle="Pieces that have defined elegance for generations of discerning patrons."
        />

        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BESTSELLERS.map((product) => (
            <StaggerItem key={product.id}>
              <motion.div
                className="group gold-border-glow relative overflow-hidden bg-black-luxury/50"
                whileHover={{ y: -4 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 bg-royal-gold/90 px-3 py-1 text-[10px] tracking-[0.2em] text-black-luxury uppercase">
                    {product.badge}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black-luxury/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <button
                      onClick={() => setQuickView(product.id)}
                      className="flex h-12 w-12 items-center justify-center border border-royal-gold/50 bg-black-luxury/80 text-royal-gold backdrop-blur-sm transition-colors hover:bg-royal-gold hover:text-black-luxury"
                      aria-label="Quick view"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setWishlist((w) => {
                          const next = new Set(w);
                          if (next.has(product.id)) {
                            next.delete(product.id);
                          } else {
                            next.add(product.id);
                          }
                          return next;
                        })
                      }
                      className="flex h-12 w-12 items-center justify-center border border-royal-gold/50 bg-black-luxury/80 text-royal-gold backdrop-blur-sm transition-colors hover:bg-royal-gold hover:text-black-luxury"
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`h-5 w-5 ${wishlist.has(product.id) ? "fill-royal-gold" : ""}`} />
                    </button>
                    <button
                      className="flex h-12 w-12 items-center justify-center border border-royal-gold/50 bg-black-luxury/80 text-royal-gold backdrop-blur-sm transition-colors hover:bg-royal-gold hover:text-black-luxury"
                      aria-label="360 preview"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.3em] text-royal-gold/80 uppercase">{product.category}</p>
                  <h3 className="font-display mt-2 text-xl text-ivory">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg text-champagne">{product.badge}</p>
                    <button className="flex items-center gap-2 text-xs tracking-[0.2em] text-royal-gold uppercase hover:underline">
                      <ShoppingBag className="h-4 w-4" />
                      Inquire
                    </button>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black-luxury/90 p-6 backdrop-blur-xl"
            onClick={() => setQuickView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-luxury gold-border-glow max-w-lg p-8"
            >
              {(() => {
                const p = BESTSELLERS.find((x) => x.id === quickView);
                if (!p) return null;
                return (
                  <>
                    <div className="relative mb-6 aspect-square">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <h3 className="font-display text-2xl text-ivory">{p.name}</h3>
                    <p className="mt-2 text-champagne">{p.badge}</p>
                    <p className="mt-4 text-sm text-ivory/60">
                      Experience this piece in 360° at our Chandausi flagship. Book a private viewing.
                    </p>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
