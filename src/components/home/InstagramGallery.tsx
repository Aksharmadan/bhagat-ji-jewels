"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSTAGRAM_POSTS } from "@/lib/constants";

export function InstagramGallery() {
  return (
    <section className="py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="@bhagatjijewels"
          title="Follow Our Journey"
          subtitle="A glimpse into the world of timeless brilliance."
        />

        <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {INSTAGRAM_POSTS.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative mb-3 break-inside-avoid overflow-hidden md:mb-4"
            >
              <div className={`relative ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
                <Image
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black-luxury/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Share2 className="h-8 w-8 text-ivory" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
