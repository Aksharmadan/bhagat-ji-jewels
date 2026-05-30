"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const METALS = [
  {
    name: "Gold Chains",
    href: "/collections/heritage-classics",
    image: "/jewelry/collection-cards/heritage-classics.png",
    desc: "Heirloom craft from the signature vault",
    gradient: "from-amber-900/40 to-transparent",
  },
  {
    name: "Diamond Signatures",
    href: "/collections/brilliance",
    image: "/jewelry/collection-cards/brilliance.png",
    desc: "Light, symmetry, and occasion",
    gradient: "from-slate-400/20 to-transparent",
  },
  {
    name: "Heritage Classics",
    href: "/collections/gold-chains",
    image: "/jewelry/collection-cards/gold-chains.png",
    desc: "Ceremonial chains with family memory",
    gradient: "from-blue-900/20 to-transparent",
  },
  {
    name: "Silver Stories",
    href: "/collections/silver-stories",
    image: "/jewelry/collection-cards/silver-stories.png",
    desc: "Clean silhouettes for everyday shine",
    gradient: "from-zinc-400/20 to-transparent",
  },
];

export function MetalsShowcase() {
  return (
    <section className="section-padding border-t border-border">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 text-center md:mb-14" data-reveal>
          <p className="text-[10px] tracking-[0.4em] text-gold uppercase">Portfolio Chapters</p>
          <h2 className="font-display mt-3 text-3xl text-text sm:text-4xl md:text-5xl">
            Collections That Open Like a Private Gallery
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-text-muted">
            Explore by mood, occasion, and craft language, then step into the full collection.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METALS.map((metal, i) => (
            <motion.div
              key={metal.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <Link
                href={metal.href}
                className="group relative block aspect-[4/5] overflow-hidden border border-border bg-bg-elevated"
              >
                <Image
                  src={metal.image}
                  alt={`${metal.name} jewellery at Bhagat Ji Jewels`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${metal.gradient} via-bg/50 to-bg/20`} />
                <div className="absolute right-0 bottom-0 left-0 p-5">
                  <h3 className="font-display text-2xl text-text">{metal.name}</h3>
                  <p className="mt-1 text-xs text-text-muted">{metal.desc}</p>
                  <span className="mt-3 inline-block text-[10px] tracking-[0.25em] text-gold uppercase opacity-0 transition-opacity group-hover:opacity-100">
                    Open Collection →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
