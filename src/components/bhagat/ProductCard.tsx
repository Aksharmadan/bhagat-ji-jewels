"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { inquireProduct } from "@/lib/actions";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { translations } from "@/lib/translations";

interface ProductCardProps {
  product: Product;
  size?: "md" | "lg" | "sm" | "w-full";
  index?: number;
}

export function ProductCard({ product, size = "md", index = 0 }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { t } = useTranslation();
  const isWishlisted = isInWishlist(product.slug);
  const labelMap: Record<string, keyof typeof translations.EN> = {
    Gold: "gold",
    Diamond: "diamond",
    Platinum: "platinum",
    Silver: "silver",
    Necklaces: "categoryNecklaces",
    Earrings: "earrings",
    Bangles: "categoryBangles",
    Rings: "rings",
    Pendants: "pendants",
    Chains: "categoryChains",
    Bracelets: "bracelets",
    Mangalsutra: "mangalsutra",
    "Nose Pins": "nosePins",
    Anklets: "anklets",
    "Bridal Sets": "bridalSets",
    "Coins & Bars": "coinsBars",
  };
  const translateLabel = (label: string) => {
    const key = labelMap[label];
    return key ? t(key) : label;
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product.slug);
    }
  };

  const handleInquire = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inquireProduct(product.name, product.slug);
  };

  let widthClass = "w-full";
  if (size === "lg") {
    widthClass = "w-[min(85vw,420px)]";
  } else if (size === "md") {
    widthClass = "w-[min(72vw,320px)]";
  } else if (size === "sm") {
    widthClass = "w-[min(50vw,240px)]";
  } else if (size === "w-full") {
    widthClass = "w-full";
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.015, 0.12), ease: [0.22, 1, 0.36, 1] }}
      className={`group ${widthClass} flex-shrink-0`}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="product-card overflow-hidden bg-white dark:bg-card-dark relative aspect-[3/4]">
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-black/50 text-neutral-800 dark:text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-neutral-800 shadow-sm"
            aria-label={t("addToWishlist")}
          >
            <Heart
              size={18}
              className={`transition-colors duration-300 ${
                isWishlisted
                  ? "fill-rose-500 text-rose-500"
                  : "text-neutral-600 dark:text-neutral-300 hover:text-rose-500"
              }`}
            />
          </button>

          {/* Main Image */}
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain bg-white transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
              sizes="(max-width: 768px) 240px, 320px"
              unoptimized
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500" />
            
            {/* Quick try on CTA overlay */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.25em] text-accent/90 uppercase font-medium mb-1">
                {product.collection}
              </span>
              <h3 className="font-display text-lg text-white md:text-xl line-clamp-1 group-hover:text-gold transition-colors duration-300">
                {product.name}
              </h3>
              
              <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-300 font-sans tracking-wide">
                <span>{product.purity.split(" (")[0]}</span>
                <span>{product.weight}</span>
              </div>

              {/* View details quick overlay */}
              <div className="mt-3 sm:mt-4 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handleInquire}
                  className="flex-1 rounded-sm bg-accent text-white py-1.5 text-center text-[10px] font-sans tracking-wider uppercase font-semibold hover:bg-accent-hover transition-colors shadow-lg"
                >
                  {t("inquireNow")}
                </button>
                <div className="h-8 w-8 rounded-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Footer Meta beneath card */}
      <div className="mt-3 flex items-center justify-between px-1">
        <div>
          <span className="text-[10px] tracking-wider text-accent dark:text-gold uppercase font-semibold">
            {translateLabel(product.metal)}
          </span>
          <span className="mx-1.5 text-neutral-300 dark:text-neutral-700">|</span>
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
            {translateLabel(product.category)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
