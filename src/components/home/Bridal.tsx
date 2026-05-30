"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Bridal() {
  return (
    <section id="bridal" className="relative overflow-hidden py-32 md:py-48">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1606800052052-a08af8348e18?w=1920&q=80"
          alt="Bridal luxury"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0505]/95 via-black-luxury/90 to-black-luxury/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(180,30,30,0.15),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.5em] text-[#c9a227] uppercase">The Bridal Experience</p>
            <h2 className="font-display mb-8 text-5xl leading-tight text-ivory md:text-6xl lg:text-7xl">
              Where <span className="text-gradient-gold">Royalty</span>
              <br />
              Meets Your Union
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-ivory/60">
              Your wedding day deserves more than jewelry — it deserves a crown. Our bridal
              collection blends temple artistry, Kundan mastery, and contemporary grandeur
              for the bride who was born to reign.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="#contact">Book Bridal Consultation</Button>
              <Button href="#collections" variant="outline">
                View Bridal Sets
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-[4/5] overflow-hidden border border-[#8b1a1a]/30"
              >
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                  alt="Bridal jewelry set"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505] via-transparent to-transparent" />
              </motion.div>
              <div className="absolute -right-4 -bottom-4 border border-royal-gold/30 bg-black-luxury/80 p-6 backdrop-blur-md md:-right-8 md:-bottom-8">
                <p className="font-display text-3xl text-royal-gold">500+</p>
                <p className="text-xs tracking-[0.2em] text-ivory/60 uppercase">Bridal Stories Written</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
