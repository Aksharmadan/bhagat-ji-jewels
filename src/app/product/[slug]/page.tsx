"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Heart, RotateCw, ShieldCheck, Sparkles } from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/products";
import { inquireProduct, bookVisit } from "@/lib/actions";
import { ProductCard } from "@/components/bhagat/ProductCard";
import { VirtualTryOn } from "@/components/features/VirtualTryOn";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const [zoomed, setZoomed] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 pt-28">
        <p className="font-display text-2xl text-text">Piece not found</p>
        <Link href="/collections" className="btn-outline">
          <span>Back to Collections</span>
        </Link>
      </div>
    );
  }

  const related = getProducts({ category: product.category })
    .filter((p) => p.slug !== slug)
    .slice(0, 6);
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const specs = [
    ["Hallmark", product.metal === "Gold" ? "BIS Hallmarked" : "Certified Selection"],
    ["Purity", product.metal === "Gold" ? "22K / custom as requested" : "Curated by design"],
    ["Stone", product.metal === "Diamond" ? "Diamond details on request" : "Occasion-specific accents"],
    ["Finish", "Hand finished"],
    ["Weight", "Shared by concierge"],
    ["Customization", "Available"],
  ];
  const faqs = [
    ["Can this piece be customised?", "Yes. Size, finish, stone selection, and styling can be customised after a private consultation."],
    ["Is hallmark information available?", "Yes. Hallmark, purity, and certification details are shared by the Bhagat Ji concierge before purchase."],
    ["Can I book a private viewing?", "Yes. You can book a store visit or start on WhatsApp for guided selection."],
  ];

  return (
    <>
      <div className="min-h-screen bg-bg pt-32 pb-28 md:pb-20 lg:pt-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Link
            href="/collections"
            className="text-[10px] tracking-[0.3em] text-text-muted uppercase transition-colors hover:text-gold"
          >
            ← Collections
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <button
                type="button"
                onClick={() => setZoomed(true)}
                className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden border border-border bg-white text-left shadow-[0_30px_100px_rgba(0,0,0,0.18)]"
              >
                <Image
                  src={gallery[activeImage] ?? product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-3 transition-transform duration-700 hover:scale-[1.02]"
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/10 via-transparent to-transparent" />
                <span className="absolute right-4 bottom-4 border border-border bg-bg/80 px-3 py-1 text-[9px] tracking-[0.2em] text-text-muted uppercase backdrop-blur-sm">
                  Tap to enlarge
                </span>
              </button>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {gallery.slice(0, 4).map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square overflow-hidden border bg-bg-elevated transition-colors ${
                      activeImage === i ? "border-gold" : "border-border hover:border-gold/50"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={src} alt="" fill className="object-contain p-1" sizes="120px" unoptimized />
                  </button>
                ))}
              </div>
              <div className="mt-8">
                <VirtualTryOn productName={product.name} imageSrc={product.image} category={product.category} />
              </div>
            </div>

            <div className="flex flex-col justify-center lg:sticky lg:top-32 lg:self-start">
              <p className="text-[10px] tracking-[0.4em] text-gold uppercase">{product.collection}</p>
              <h1 className="font-display mt-4 text-4xl text-text md:text-6xl">{product.name}</h1>
              <p className="mt-2 text-sm text-text-muted">{product.category}</p>
              <p className="mt-8 text-lg leading-relaxed text-text-muted">{product.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ["Category", product.category],
                  ["Metal", product.metal],
                  ["Collection", product.collection],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-sm border border-border bg-bg-elevated p-4">
                    <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase">{label}</p>
                    <p className="font-display mt-2 text-xl text-text">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-l-2 border-gold/40 pl-6">
                <p className="text-sm text-text-muted">
                  A portfolio piece can be customised for size, finish, stone selection, and
                  occasion styling through our concierge.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <button onClick={() => inquireProduct(product.name, product.slug)} className="btn-gold">
                  Inquire on WhatsApp
                </button>
                <button onClick={bookVisit} className="btn-outline">
                  <span>Book Store Visit</span>
                </button>
                <button className="btn-outline">
                  <span className="flex items-center gap-2"><Heart className="h-4 w-4" /> Wishlist</span>
                </button>
              </div>
              <Link
                href="/#contact"
                className="mt-6 inline-block text-[10px] tracking-[0.25em] text-text-muted uppercase hover:text-gold"
              >
                Request a callback →
              </Link>
            </div>
          </div>

          <div className="mt-24 grid gap-10 border-t border-border pt-16 lg:grid-cols-[1fr_0.8fr]">
            <section>
              <p className="text-[10px] tracking-[0.35em] text-gold uppercase">Luxury Specifications</p>
              <h2 className="font-display mt-3 text-4xl text-text">Purity, craft, and concierge details.</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {specs.map(([label, value]) => (
                  <div key={label} className="border border-border bg-bg-elevated/60 p-5">
                    <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase">{label}</p>
                    <p className="mt-2 text-sm text-text">{value}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="border border-border bg-bg-elevated/60 p-6">
              <p className="text-[10px] tracking-[0.35em] text-gold uppercase">Experience</p>
              <div className="mt-6 space-y-5">
                {[
                  [ShieldCheck, "Hallmark & certification guidance"],
                  [RotateCw, "360-degree preview ready showroom flow"],
                  [Sparkles, "Complete-the-look recommendations"],
                ].map(([Icon, text]) => (
                  <div key={String(text)} className="flex items-center gap-4 text-text-muted">
                    <Icon className="h-5 w-5 text-gold" />
                    <span>{String(text)}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-gold uppercase">Care Instructions</p>
              <h2 className="font-display mt-3 text-4xl text-text">Preserve the brilliance.</h2>
              <p className="mt-5 text-text-muted">
                Store separately in soft packaging, avoid perfumes and harsh chemicals, and bring
                the piece to our showroom for periodic professional cleaning.
              </p>
            </div>
            <div className="divide-y divide-border border border-border">
              {faqs.map(([question, answer], i) => (
                <button
                  key={question}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full p-5 text-left"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-display text-xl text-text">{question}</span>
                    <ChevronDown className={`h-5 w-5 text-gold transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </span>
                  {openFaq === i && <span className="mt-4 block text-sm leading-relaxed text-text-muted">{answer}</span>}
                </button>
              ))}
            </div>
          </section>

          {related.length > 0 && (
            <div className="mt-24 border-t border-border pt-16">
              <p className="text-[10px] tracking-[0.35em] text-gold uppercase">Complete The Look</p>
              <h2 className="font-display mt-3 text-4xl text-text">You May Also Love</h2>
              <div className="horizontal-scroll mt-10">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} size="lg" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {zoomed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/95 p-6 backdrop-blur-xl"
          onClick={() => setZoomed(false)}
        >
          <button
            className="absolute top-6 right-6 text-[10px] tracking-[0.3em] text-text-muted uppercase"
            onClick={() => setZoomed(false)}
          >
            Close
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image src={gallery[activeImage] ?? product.image} alt={product.name} fill className="object-contain" unoptimized />
          </div>
        </motion.div>
      )}
    </>
  );
}
