import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getCollections, getProductsByCollection } from "@/lib/products";
import { ProductCard } from "@/components/bhagat/ProductCard";
import { CollectionFavoriteButton } from "@/components/bhagat/CollectionFavoriteButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = getCollections();
  return collections.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collections = getCollections();
  const found = collections.find((c) => c.slug === slug);
  if (!found) return { title: "Collection Not Found" };
  
  return {
    title: `${found.name} Collection`,
    description: found.tagline,
  };
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const collections = getCollections();
  const collection = collections.find((c) => c.slug === slug);
  
  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(collection.name);
  const otherCollections = collections.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark pt-[7.5rem] pb-24 lg:pt-[10.5rem]">
      {/* Hero Banner */}
      <section className="relative h-[45vh] w-full overflow-hidden border-b border-border">
        <Image
          src={collection.image ?? `/jewelry/collection-cards/${collection.slug}.png`}
          alt={collection.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
          <Link
            href="/collections"
            className="absolute top-6 left-6 text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 font-semibold tracking-wider uppercase transition-colors"
          >
            <ArrowLeft size={14} /> Back to collections
          </Link>
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-white/10 p-1.5 shadow-[0_16px_45px_rgba(0,0,0,0.25)] backdrop-blur-md">
            <Image
              src="/logo.png"
              alt="Bhagat Ji Jewels"
              width={56}
              height={56}
              className="h-full w-full rounded-full object-contain"
            />
          </div>
          <span className="text-[10px] tracking-[0.35em] text-gold uppercase font-bold mb-3 flex items-center gap-1">
            <Sparkles size={10} /> Bhagat Signature Vault
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wide">
            {collection.name}
          </h1>
          <p className="mt-4 max-w-xl text-sm text-neutral-200 leading-relaxed font-sans">
            {collection.tagline}
          </p>
          <CollectionFavoriteButton slug={collection.slug} className="mt-6" />
        </div>
      </section>

      {/* Grid Content */}
      <section className="max-w-[1500px] mx-auto px-6 lg:px-10 py-16">
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-border">
          <h2 className="text-xs font-bold tracking-widest text-text uppercase">
            Showing {products.length} masterpieces
          </h2>
          <span className="text-xs text-text-muted">BIS Hallmarked Certification</span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-neutral-900 border border-border/80 rounded-lg">
            <p className="text-text-muted">No products found in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} size="w-full" />
            ))}
          </div>
        )}
      </section>

      {/* Explore Other Collections */}
      <section className="max-w-[1500px] mx-auto px-6 lg:px-10 mt-12 border-t border-border pt-16">
        <h3 className="font-display text-2xl font-bold text-text mb-8 text-center uppercase tracking-wide">
          Explore Other Signature Collections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherCollections.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative aspect-[16/9] overflow-hidden rounded-lg border border-border/80 shadow hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={c.image ?? `/jewelry/collection-cards/${c.slug}.png`}
                alt={c.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <CollectionFavoriteButton slug={c.slug} className="absolute right-4 top-4 px-3 py-2" />
                <span className="text-[9px] tracking-widest text-gold uppercase block mb-1">Explore</span>
                <h4 className="font-display text-xl font-bold">{c.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
