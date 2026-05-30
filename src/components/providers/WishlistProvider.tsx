"use client";

import { createContext, useContext, useEffect, useState } from "react";

type WishlistContextType = {
  wishlist: string[];
  collectionWishlist: string[];
  addToWishlist: (slug: string) => void;
  removeFromWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
  addCollectionToWishlist: (slug: string) => void;
  removeCollectionFromWishlist: (slug: string) => void;
  isCollectionInWishlist: (slug: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [collectionWishlist, setCollectionWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
      }
    }
    const savedCollections = localStorage.getItem("collectionWishlist");
    if (savedCollections) {
      try {
        setCollectionWishlist(JSON.parse(savedCollections));
      } catch (e) {
        console.error("Failed to parse collection wishlist from localStorage", e);
      }
    }
    setMounted(true);
  }, []);

  const addToWishlist = (slug: string) => {
    const next = Array.from(new Set([...wishlist, slug]));
    setWishlist(next);
    localStorage.setItem("wishlist", JSON.stringify(next));
  };

  const removeFromWishlist = (slug: string) => {
    const next = wishlist.filter((s) => s !== slug);
    setWishlist(next);
    localStorage.setItem("wishlist", JSON.stringify(next));
  };

  const isInWishlist = (slug: string) => {
    return wishlist.includes(slug);
  };

  const addCollectionToWishlist = (slug: string) => {
    const next = Array.from(new Set([...collectionWishlist, slug]));
    setCollectionWishlist(next);
    localStorage.setItem("collectionWishlist", JSON.stringify(next));
  };

  const removeCollectionFromWishlist = (slug: string) => {
    const next = collectionWishlist.filter((s) => s !== slug);
    setCollectionWishlist(next);
    localStorage.setItem("collectionWishlist", JSON.stringify(next));
  };

  const isCollectionInWishlist = (slug: string) => {
    return collectionWishlist.includes(slug);
  };

  const clearWishlist = () => {
    setWishlist([]);
    setCollectionWishlist([]);
    localStorage.removeItem("wishlist");
    localStorage.removeItem("collectionWishlist");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: mounted ? wishlist : [],
        collectionWishlist: mounted ? collectionWishlist : [],
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addCollectionToWishlist,
        removeCollectionFromWishlist,
        isCollectionInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
