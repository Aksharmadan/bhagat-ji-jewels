"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { getCategories, getCollections, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/bhagat/ProductCard";
import { METALS, OCCASIONS } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";
import { translations } from "@/lib/translations";

type CollectionsClientProps = {
  filter?: string | null;
  metalParam?: string | null;
  collectionParam?: string | null;
  categoryParam?: string | null;
  occasionParam?: string | null;
  queryParam?: string | null;
};

export function CollectionsClient({
  metalParam = null,
  collectionParam = null,
  categoryParam = null,
  occasionParam = null,
  queryParam = null,
}: CollectionsClientProps) {
  const { t } = useTranslation();
  const [category, setCategory] = useState<string | null>(categoryParam);
  const [metal, setMetal] = useState<string | null>(metalParam);
  const [collection, setCollection] = useState<string | null>(collectionParam);
  const [occasion, setOccasion] = useState<string | null>(occasionParam);
  const [query, setQuery] = useState(queryParam ?? "");
  const [sort, setSort] = useState("Best Matches");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);
  const collections = useMemo(() => getCollections(), []);
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
    Wedding: "wedding",
    Festive: "festive",
    "Daily Wear": "dailyWear",
    Office: "office",
    Party: "party",
    Gifting: "gifting",
  };
  const translateLabel = (label: string) => {
    const key = labelMap[label];
    return key ? t(key) : label;
  };
  const sortLabels: Record<string, string> = {
    "Best Matches": t("bestMatches"),
    Trending: t("trendingNow"),
    Newest: t("newest"),
    "Name A-Z": t("nameAZ"),
    "Name Z-A": t("nameZA"),
  };

  const filteredProducts = useMemo(() => {
    let list = allProducts;
    
    if (category) {
      list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (metal) {
      list = list.filter((p) => p.metal.toLowerCase() === metal.toLowerCase());
    }
    if (collection) {
      list = list.filter(
        (p) =>
          p.collection.toLowerCase() === collection.toLowerCase() ||
          p.collection.toLowerCase().replace(/\s+/g, "-") === collection.toLowerCase()
      );
    }
    if (occasion) {
      list = list.filter((p) => p.occasion.toLowerCase() === occasion.toLowerCase());
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.metal.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sort === "Newest") {
      list = list.filter(p => p.isNew); // filter or put first
      const other = list.filter(p => !p.isNew);
      list = [...list, ...other];
    } else if (sort === "Name A-Z") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Name Z-A") {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "Trending") {
      list = [...list].sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    }
    
    return list;
  }, [allProducts, category, metal, collection, occasion, query, sort]);

  const activeTitle = useMemo(() => {
    if (category) return translateLabel(category);
    if (metal) return `${translateLabel(metal)} ${t("allJewellery")}`;
    if (collection) {
      const found = collections.find(c => c.slug === collection || c.name === collection);
      return found ? found.name : `${collection} Collection`;
    }
    if (query.trim()) return `${t("search")}: "${query}"`;
    return t("allJewellery");
  }, [category, metal, collection, collections, query, t]);

  const clearFilters = () => {
    setCategory(null);
    setMetal(null);
    setCollection(null);
    setOccasion(null);
    setQuery("");
  };

  const activeFilterCount = (category ? 1 : 0) + (metal ? 1 : 0) + (collection ? 1 : 0) + (occasion ? 1 : 0) + (query ? 1 : 0);

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark pt-[8.5rem] pb-24 lg:pt-[11rem]">
      {/* Header Info */}
      <section className="bg-white dark:bg-neutral-900 border-b border-border py-8 mb-8">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-text-muted uppercase">
              <Link href="/" className="hover:text-accent">{t("home")}</Link>
              <span>/</span>
              <span className="text-accent dark:text-gold">{t("collections")}</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-text mt-3">
              {activeTitle}
              <span className="font-sans text-xs md:text-sm text-text-muted font-normal block mt-1.5">
                {t("discoverPrefix")} {filteredProducts.length} {t("discoverSuffix")}
              </span>
            </h1>
          </div>
          
          {/* Sorting and Filter Stats */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 border border-border px-4 py-2 rounded text-xs font-semibold text-text uppercase"
            >
              <SlidersHorizontal size={14} className="text-accent" /> {t("filters")} ({activeFilterCount})
            </button>

            <div className="flex items-center gap-2 border border-border bg-white dark:bg-neutral-800 px-3 py-2 rounded text-xs font-semibold text-text ml-auto md:ml-0">
              <ArrowUpDown size={13} className="text-accent" />
              <span className="text-text-muted">{t("sort")}:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent outline-none font-bold text-text"
              >
                <option value="Best Matches">{sortLabels["Best Matches"]}</option>
                <option value="Trending">{sortLabels.Trending}</option>
                <option value="Newest">{sortLabels.Newest}</option>
                <option value="Name A-Z">{sortLabels["Name A-Z"]}</option>
                <option value="Name Z-A">{sortLabels["Name Z-A"]}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid & Filters */}
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside
            data-lenis-prevent
            className="custom-scroll hidden max-h-[calc(100dvh-12rem)] overscroll-contain overflow-y-auto pr-3 lg:sticky lg:top-[11rem] lg:flex lg:flex-col lg:gap-6"
          >
            {/* Header / Clear */}
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <h2 className="text-xs font-bold tracking-widest uppercase text-text flex items-center gap-2">
                <SlidersHorizontal size={13} className="text-accent" /> {t("filterVault")}
              </h2>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-[10px] text-accent font-semibold hover:underline">
                  {t("clearAll")}
                </button>
              )}
            </div>

            {/* Filter Section: Metals */}
            <div className="border-b border-border/60 pb-5">
              <h3 className="text-[11px] font-bold tracking-wider text-text uppercase mb-3">{t("metalType")}</h3>
              <div className="space-y-2">
                {METALS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetal(metal === m ? null : m)}
                    className={`flex w-full items-center justify-between text-xs py-1.5 transition-colors ${
                      metal === m ? "text-accent font-bold" : "text-text-muted hover:text-text"
                    }`}
                  >
                    <span>{translateLabel(m)}</span>
                    {metal === m && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Section: Categories */}
            <div className="border-b border-border/60 pb-5">
              <h3 className="text-[11px] font-bold tracking-wider text-text uppercase mb-3">{t("categories")}</h3>
              <div className="space-y-1.5 pr-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(category === c ? null : c)}
                    className={`flex w-full items-center justify-between text-xs py-1 transition-colors ${
                      category === c ? "text-accent font-bold" : "text-text-muted hover:text-text"
                    }`}
                  >
                    <span>{translateLabel(c)}</span>
                    {category === c && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Section: Occasions */}
            <div className="border-b border-border/60 pb-5">
              <h3 className="text-[11px] font-bold tracking-wider text-text uppercase mb-3">{t("occasion")}</h3>
              <div className="space-y-2">
                {OCCASIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOccasion(occasion === o ? null : o)}
                    className={`flex w-full items-center justify-between text-xs py-1.5 transition-colors ${
                      occasion === o ? "text-accent font-bold" : "text-text-muted hover:text-text"
                    }`}
                  >
                    <span>{translateLabel(o)}</span>
                    {occasion === o && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid and Active Filter Chips */}
          <main className="space-y-6">
            {/* Active Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border/60 lg:border-none lg:pb-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted mr-2">{t("activeFilters")}</span>
                {metal && (
                  <span className="inline-flex items-center gap-1.5 bg-accent/5 text-accent border border-accent/15 rounded-full px-3 py-1 text-xs font-semibold">
                    {translateLabel(metal)} <X size={12} className="cursor-pointer hover:text-accent-hover" onClick={() => setMetal(null)} />
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1.5 bg-accent/5 text-accent border border-accent/15 rounded-full px-3 py-1 text-xs font-semibold">
                    {translateLabel(category)} <X size={12} className="cursor-pointer hover:text-accent-hover" onClick={() => setCategory(null)} />
                  </span>
                )}
                {occasion && (
                  <span className="inline-flex items-center gap-1.5 bg-accent/5 text-accent border border-accent/15 rounded-full px-3 py-1 text-xs font-semibold">
                    {translateLabel(occasion)} <X size={12} className="cursor-pointer hover:text-accent-hover" onClick={() => setOccasion(null)} />
                  </span>
                )}
                {collection && (
                  <span className="inline-flex items-center gap-1.5 bg-accent/5 text-accent border border-accent/15 rounded-full px-3 py-1 text-xs font-semibold">
                    {collections.find(c => c.slug === collection)?.name || collection} 
                    <X size={12} className="cursor-pointer hover:text-accent-hover" onClick={() => setCollection(null)} />
                  </span>
                )}
                {query && (
                  <span className="inline-flex items-center gap-1.5 bg-accent/5 text-accent border border-accent/15 rounded-full px-3 py-1 text-xs font-semibold">
                    {t("search")}: &quot;{query}&quot; <X size={12} className="cursor-pointer hover:text-accent-hover" onClick={() => setQuery("")} />
                  </span>
                )}
              </div>
            )}

            {/* Grid display */}
            {filteredProducts.length === 0 ? (
              <div className="rounded-lg border border-border/80 bg-white dark:bg-neutral-900 py-24 text-center px-6">
                <SlidersHorizontal className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
                <h3 className="font-display text-xl font-bold text-text">{t("noJewelryFound")}</h3>
                <p className="mt-2 text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
                  {t("noJewelryDesc")}
                </p>
                <button onClick={clearFilters} className="mt-6 inline-flex items-center bg-accent text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow">
                  {t("clearFilters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} size="w-full" index={idx} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Slide-out Filter Menu */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] flex lg:hidden bg-black/50 backdrop-blur-sm">
          <div className="w-[300px] h-full bg-bg flex flex-col shadow-2xl relative animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4 bg-neutral-50 dark:bg-neutral-900/60">
              <h3 className="text-xs font-bold tracking-widest uppercase text-text flex items-center gap-1.5">
                <SlidersHorizontal size={13} className="text-accent" /> {t("filters")} ({activeFilterCount})
              </h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 text-text" aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Filters */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6">
              {/* Metal */}
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2">{t("metalType")}</h4>
                <div className="flex flex-wrap gap-2">
                  {METALS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMetal(metal === m ? null : m)}
                      className={`text-xs px-3 py-1.5 border rounded transition-colors ${
                        metal === m ? "bg-accent/10 border-accent text-accent font-bold" : "border-border text-text-muted hover:border-text"
                      }`}
                    >
                      {translateLabel(m)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2">{t("categories")}</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(category === c ? null : c)}
                      className={`text-xs px-3 py-1.5 border rounded transition-colors ${
                        category === c ? "bg-accent/10 border-accent text-accent font-bold" : "border-border text-text-muted hover:border-text"
                      }`}
                    >
                      {translateLabel(c)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasions */}
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2">{t("occasion")}</h4>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((o) => (
                    <button
                      key={o}
                      onClick={() => setOccasion(occasion === o ? null : o)}
                      className={`text-xs px-3 py-1.5 border rounded transition-colors ${
                        occasion === o ? "bg-accent/10 border-accent text-accent font-bold" : "border-border text-text-muted hover:border-text"
                      }`}
                    >
                      {translateLabel(o)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Apply */}
            <div className="border-t border-border p-4 bg-neutral-50 dark:bg-neutral-900/60 flex gap-2">
              <button
                onClick={clearFilters}
                className="flex-1 bg-white hover:bg-neutral-100 border border-border text-text py-2 rounded text-xs font-semibold uppercase tracking-wider"
              >
                {t("clearAll")}
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 bg-accent hover:bg-accent-hover text-white py-2 rounded text-xs font-semibold uppercase tracking-wider"
              >
                {t("apply")}
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowMobileFilters(false)} />
        </div>
      )}
    </div>
  );
}
