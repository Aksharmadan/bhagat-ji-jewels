"use client";

import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function Editorial() {
  return (
    <>
      <section className="relative overflow-hidden border-y border-border bg-gradient-to-b from-bg-card to-bg py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 text-center sm:px-6" data-reveal>
          <p className="text-[10px] tracking-[0.45em] text-gold uppercase">Since {BRAND.established}</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,7vw,4.5rem)] leading-[1.05] text-text">
            <span className="text-gradient-gold">Heritage.</span> Trust.
            <br />
            Timeless Brilliance.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-text-muted">
            {BRAND.tagline}
          </p>
        </div>
      </section>

      <section id="legacy" className="section-padding">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <p className="text-[10px] tracking-[0.4em] text-gold uppercase">The Anand Family Legacy</p>
            <h2 className="font-display mt-4 text-3xl leading-tight text-text sm:text-4xl md:text-5xl">
              Where Indian Craftsmanship Meets Uncompromising Purity
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-text-muted">
              <p>
                For over six decades in Chandausi, {BRAND.name} has been more than a jewellery store —
                we are custodians of your family&apos;s most precious moments.
              </p>
              <p>
                Every piece is BIS hallmarked, hand-finished by master artisans, and presented with
                the warmth of a family you can trust for generations.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/collections" className="btn-gold">
                View Collections
              </Link>
              <Link href="/#contact" className="btn-outline">
                <span>Meet Us</span>
              </Link>
            </div>
            <p className="mt-8 text-sm text-gold">
              — {BRAND.owners.join(" & ")}, Proprietors
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden border border-border" data-scale-reveal>
            <Image
              src="/jewelry/bhagat/gold-necklace-2.jpg"
              alt="Bhagat Ji Jewels craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 border-l-2 border-gold pl-4">
              <p className="font-display text-5xl text-gold">{BRAND.established}</p>
              <p className="text-[10px] tracking-[0.3em] text-text-muted uppercase">Established</p>
            </div>
          </div>
        </div>
      </section>

      <section id="bridal" className="relative min-h-[70vh] overflow-hidden sm:min-h-[80vh]">
        <Image
          src="/jewelry/collection-cards/heritage-classics.png"
          alt="Bhagat Ji heritage collection"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/60" />
        <div className="section-padding relative z-10 flex min-h-[70vh] flex-col items-center justify-center text-center sm:min-h-[80vh]">
          <p className="text-[10px] tracking-[0.45em] text-gold uppercase" data-reveal>
            Signature Collections by Bhagat Ji
          </p>
          <h2 className="font-display mt-6 max-w-3xl text-4xl leading-tight text-text sm:text-5xl md:text-6xl" data-reveal>
            Every milestone deserves
            <span className="italic text-gradient-gold"> craft from the vault.</span>
          </h2>
          <Link
            href="/collections"
            className="btn-gold mt-10"
            data-reveal
          >
            Explore Collections
          </Link>
        </div>
      </section>
    </>
  );
}
