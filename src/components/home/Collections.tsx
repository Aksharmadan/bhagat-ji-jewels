"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { COLLECTIONS } from "@/lib/constants";

export function Collections() {
  return (
    <section id="collections" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Curated Excellence"
          title="Featured Collections"
          subtitle="Ten worlds of brilliance — each curated for those who understand that true luxury is eternal."
        />

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {COLLECTIONS.map((col) => (
            <StaggerItem key={col.id}>
              <motion.article
                whileHover={{ y: -8 }}
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden"
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-luxury via-black-luxury/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 60px rgba(212,175,55,0.15)" }} />
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <p className="mb-1 text-[10px] tracking-[0.3em] text-royal-gold uppercase">{col.subtitle}</p>
                  <h3 className="font-display text-xl text-ivory">{col.title}</h3>
                  <ArrowUpRight className="mt-3 h-5 w-5 text-royal-gold opacity-0 transition-all group-hover:opacity-100" />
                </div>
                <div className="absolute top-0 left-0 h-px w-0 bg-royal-gold transition-all duration-500 group-hover:w-full" />
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
