"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { getProducts } from "@/lib/products";
import { BRAND } from "@/lib/constants";
import { bookVisit } from "@/lib/actions";

const JewelryMotion = dynamic(
  () => import("@/components/bhagat/JewelryMotion").then((m) => m.JewelryMotion),
  { ssr: false }
);

export function Hero() {
  const featured = getProducts({ featured: true }).slice(0, 5);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const product = featured[index] ?? featured[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % Math.max(featured.length, 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [featured.length]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".hero-actions", { y: 24, opacity: 0, duration: 0.9, delay: 0.85 });
      gsap.from(".hero-visual", { scale: 0.9, opacity: 0, duration: 1.2, delay: 0.1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".hero-product-img", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.65 });
  }, [index]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(212,175,55,0.12),transparent_46%),linear-gradient(115deg,rgba(8,8,8,0.94)_0%,rgba(8,8,8,0.8)_46%,rgba(26,22,18,0.58)_100%)]" />
      {product && (
        <Image
          src={product.image}
          alt=""
          fill
          priority
          className="object-cover opacity-20 blur-sm scale-105"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="mb-4 inline-block border border-gold/25 bg-bg/30 px-3 py-1 text-[10px] tracking-[0.35em] text-gold uppercase backdrop-blur-md">
            Portfolio House · Est. {BRAND.established}
          </p>
          <h1 className="font-display text-[clamp(2.25rem,6.5vw,4.75rem)] leading-[1.02] font-light text-text">
            <span className="hero-line block">Bhagat Ji Jewels</span>
            <span className="hero-line block text-gradient-gold">Heritage in Motion</span>
          </h1>
          <p className="hero-line mx-auto mt-6 max-w-md text-base leading-relaxed text-text-muted lg:mx-0">
            A private portfolio of bridal heirlooms, diamond signatures, ceremonial sets, and
            modern classics from Chandausi&apos;s trusted family jewellers.
          </p>
          <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/collections" className="btn-gold w-full sm:w-auto">
              Open Portfolio
            </Link>
            <button type="button" onClick={bookVisit} className="btn-outline w-full sm:w-auto">
              <span>WhatsApp Concierge</span>
            </button>
          </div>
          {product && (
            <p className="mt-6 text-xs tracking-[0.16em] text-text-muted uppercase">
              Featured piece <span className="text-gold">{product.name}</span>
            </p>
          )}
        </div>

        <div className="hero-visual order-1 relative flex min-h-[360px] items-center justify-center lg:order-2 lg:min-h-[480px]">
          <div className="absolute inset-0 opacity-70">
            <JewelryMotion className="h-full w-full" />
          </div>
          <div className="animate-float-jewel relative z-10 aspect-[4/5] w-full max-w-sm overflow-hidden border border-gold/20 bg-bg shadow-[0_0_80px_rgba(212,175,55,0.15)]">
            {product && (
              <Image
                key={product.id}
                src={product.image}
                alt={product.name}
                fill
                className="hero-product-img object-cover"
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 border border-border bg-bg/65 px-3 py-1 text-[9px] tracking-[0.22em] text-text-muted uppercase backdrop-blur-md">
              Portfolio
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-1 bg-text-muted/50"}`}
                aria-label={`View piece ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
