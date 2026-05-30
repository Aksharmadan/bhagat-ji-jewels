"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/components/providers/WishlistProvider";

export function CollectionFavoriteButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { isCollectionInWishlist, addCollectionToWishlist, removeCollectionFromWishlist } = useWishlist();
  const saved = isCollectionInWishlist(slug);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (saved) {
          removeCollectionFromWishlist(slug);
        } else {
          addCollectionToWishlist(slug);
        }
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/25 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur transition-all hover:bg-white/15",
        saved && "border-rose-400/70 text-rose-200",
        className
      )}
      aria-label={saved ? "Remove collection from favorites" : "Add collection to favorites"}
    >
      <Heart className={cn("h-4 w-4", saved && "fill-rose-400 text-rose-400")} />
      {saved ? "Saved Collection" : "Save Collection"}
    </button>
  );
}
