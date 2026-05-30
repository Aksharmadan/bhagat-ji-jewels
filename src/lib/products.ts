import productsData from "../../data/products.json";
import { CATEGORIES } from "@/lib/constants";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  metal: string;
  collection: string;
  image: string;
  gallery?: string[];
  trending: boolean;
  featured: boolean;
  description: string;
  subcategory: string;
  occasion: string;
  purity: string;
  weight: string;
  tags: string[];
  isNew?: boolean;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  icon?: string;
  image?: string;
  description?: string;
  productCount?: number;
};

function withGeneratedGallery(product: Product): Product {
  const gallery = [...new Set([product.image, ...(product.gallery ?? [])])];
  return { ...product, gallery };
}

export function allProducts(): Product[] {
  return (productsData.products as Product[]).map(withGeneratedGallery);
}

export function getProducts(filters?: {
  trending?: boolean;
  featured?: boolean;
  category?: string;
  collection?: string;
  metal?: string;
  occasion?: string;
  isNew?: boolean;
}): Product[] {
  let list = allProducts();
  if (filters?.trending) list = list.filter((p) => p.trending);
  if (filters?.featured) list = list.filter((p) => p.featured);
  if (filters?.isNew) list = list.filter((p) => p.isNew);
  if (filters?.category) list = list.filter((p) => p.category.toLowerCase() === filters.category!.toLowerCase());
  if (filters?.metal) list = list.filter((p) => p.metal.toLowerCase() === filters.metal!.toLowerCase());
  if (filters?.occasion) list = list.filter((p) => p.occasion.toLowerCase() === filters.occasion!.toLowerCase());
  if (filters?.collection) {
    const key = filters.collection.toLowerCase();
    list = list.filter(
      (p) =>
        p.collection.toLowerCase().replace(/\s+/g, "-") === key ||
        p.collection.toLowerCase() === key
    );
  }
  return list;
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts().find((p) => p.slug === slug);
}

// Map collection slugs to curated thumbnails.
const COLLECTION_IMAGES: Record<string, string> = {
  "cuban": "/jewelry/gold-bangles/cuban-01.png",
  "kada": "/jewelry/gold-bangles/kada-usq005.png",
  "matrix": "/jewelry/gold-bangles/matrix-tk264.png",
  "cuff": "/jewelry/gold-bangles/cuff-01.png",
  "origin": "/jewelry/gold-bangles/origin-uw233.png",
  "royal": "/jewelry/gold-bangles/royal-20v0616-a.png",
  "spiral": "/jewelry/gold-bangles/spiral-01.png",
  "couture-ring": "/jewelry/gold-bangles/couture-ring-01.png",
  "curl": "/jewelry/gold-bangles/curl-01.png",
  "bolt": "/jewelry/gold-bangles/bolt-01.png",
  "classic-cable": "/jewelry/gold-chains/classic-cable-01.png",
  "figaro": "/jewelry/gold-chains/figaro-01.png",
  "rope": "/jewelry/gold-chains/rope-01.png",
  "box": "/jewelry/gold-chains/box-01.png",
  "venetian": "/jewelry/gold-chains/venetian-01.png",
  "mariner": "/jewelry/gold-chains/mariner-01.png",
  "byzantine": "/jewelry/gold-chains/byzantine-01.png",
  "wheat": "/jewelry/gold-chains/wheat-01.png",
  "snake": "/jewelry/gold-chains/snake-01.png",
  "gold-chains": "/jewelry/gold-chains/gold-chains-collection.png",
  "rolo": "/jewelry/gold-chains/rolo-01.png",
  "curb": "/jewelry/gold-chains/curb-01.png",
  "miami-cuban": "/jewelry/gold-chains/miami-cuban-01.png",
  "herringbone": "/jewelry/gold-chains/herringbone-01.png",
  "singapore": "/jewelry/gold-chains/singapore-01.png",
  "interlock-link-chain": "/jewelry/gold-chains/interlock-link-chain-01.png",
  "box-link-chain": "/jewelry/gold-chains/box-link-chain-01.png",
  "butterfly-drop-chain": "/jewelry/gold-chains/butterfly-drop-chain-01.png",
  "disc-station-waist-chain": "/jewelry/gold-chains/disc-station-waist-chain-01.png",
  "shoreline-treasure-charm-waist-chain": "/jewelry/gold-chains/shoreline-treasure-charm-waist-chain-01.png",
  "star-heart-dangle-waist-chain": "/jewelry/gold-chains/star-heart-dangle-waist-chain-01.png",
  "mini-crown-charm-waist-chain": "/jewelry/gold-chains/mini-crown-charm-waist-chain-01.png",
  "initial-j-pendant-chain": "/jewelry/gold-chains/initial-j-pendant-chain-01.png",
  "figaro-bracelet": "/jewelry/gold-chains/figaro-bracelet-01.png",
  "infinity-pendant-chain": "/jewelry/gold-chains/infinity-pendant-chain-01.png",
  "bead-chain-bracelet": "/jewelry/gold-chains/bead-chain-bracelet-01.png",
  "heritage-classics": "/jewelry/collection-cards/heritage-classics.png",
  "brilliance": "/jewelry/collection-cards/brilliance.png",
  "silver-stories": "/jewelry/collection-cards/silver-stories.png",
  "platinum-signature": "https://images.pexels.com/photos/12081609/pexels-photo-12081609.jpeg?auto=compress&cs=tinysrgb&w=1200"
};

export function getCollections(): Collection[] {
  const products = allProducts();
  return (productsData.collections as Collection[]).map((c) => {
    const count = products.filter(
      (p) => p.collection.toLowerCase().replace(/\s+/g, "-") === c.slug
    ).length;
    return {
      ...c,
      image: COLLECTION_IMAGES[c.slug] ?? `/jewelry/collection-cards/${c.slug}.png`,
      description: c.tagline,
      productCount: count
    };
  });
}

export function getCategories(): string[] {
  const categories = [...new Set((productsData.products as Product[]).map((p) => p.category))];
  return categories.length > 0 ? categories : [...CATEGORIES];
}

export function getMetals(): string[] {
  return (productsData.metals as string[]) ?? ["Gold", "Silver", "Diamond", "Platinum"];
}

export function getProductsByCategory(category: string): Product[] {
  return getProducts({ category });
}

export function getProductsByCollection(collection: string): Product[] {
  return getProducts({ collection });
}

export function getProductsByMetal(metal: string): Product[] {
  return getProducts({ metal });
}

export function getProductsByOccasion(occasion: string): Product[] {
  return getProducts({ occasion });
}
