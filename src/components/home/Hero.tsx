"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

const ThreeGoldScene = dynamic(
  () => import("@/components/effects/ThreeGoldScene").then((m) => m.ThreeGoldScene),
  { ssr: false }
);
import { BRAND } from "@/lib/constants";
import { formatWhatsAppLink } from "@/lib/utils";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    const chars = headlineRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 80, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.03,
        duration: 1.2,
        delay: 2.8,
        ease: "power3.out",
      }
    );
  }, []);

  const title = "Timeless Elegance Since 1960";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80"
          className="h-full w-full object-cover opacity-40"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-golden-jewelry-close-up-39874-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black-luxury/70 via-black-luxury/50 to-black-luxury" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.12),transparent_50%)]" />
      </div>

      <ThreeGoldScene />

      <div className="noise-overlay absolute inset-0 z-[2]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 text-center lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="mb-8 flex justify-center"
        >
          <Image
            src="/logo.png"
            alt={BRAND.name}
            width={140}
            height={140}
            className="drop-shadow-[0_0_60px_rgba(212,175,55,0.4)]"
            priority
          />
        </motion.div>

        <p className="mb-6 text-xs tracking-[0.5em] text-royal-gold uppercase">
          Where Heritage Becomes Luxury
        </p>

        <h1
          ref={headlineRef}
          className="font-display mb-8 text-5xl leading-[1.1] font-light text-ivory md:text-7xl lg:text-8xl"
          style={{ perspective: 1000 }}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1 }}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-ivory/60 md:text-xl"
        >
          For over six decades, BHAGAT JI JEWELS has crafted heirlooms that transcend
          time — where generational trust meets the brilliance of royal Indian luxury.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#collections">Explore Collections</Button>
          <Button href="#contact" variant="outline">
            Book a Visit
          </Button>
          <Button
            href={formatWhatsAppLink(BRAND.whatsapp[0], "I would like concierge assistance.")}
            variant="ghost"
            external
          >
            WhatsApp Concierge
          </Button>
          <Button href="#heritage" variant="outline">
            Discover Legacy
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.4em] text-ivory/40 uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-12 w-px bg-gradient-to-b from-royal-gold to-transparent"
            />
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-royal-gold/10 blur-[120px]" style={{ animation: "pulse-glow 6s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-royal-gold/8 blur-[100px]" />
    </section>
  );
}
