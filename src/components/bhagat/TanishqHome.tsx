"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Coins,
} from "lucide-react";
import { getProducts } from "@/lib/products";
import { bookVisit } from "@/lib/actions";
import { LegacyTimeline } from "@/components/features/LegacyTimeline";
import { CustomConfigurator } from "@/components/features/CustomConfigurator";
import { RingSizeEstimator } from "@/components/features/RingSizeEstimator";
import { OutfitMatcher } from "@/components/features/OutfitMatcher";
import { CertificatePortal } from "@/components/features/CertificatePortal";
import { GiftStyling } from "@/components/features/GiftStyling";
import { HallmarkSeal } from "@/components/features/HallmarkSeal";
import { PriceAlerts } from "@/components/features/PriceAlerts";
import { ProductCard } from "@/components/bhagat/ProductCard";
import { ContactSection } from "@/components/bhagat/ContactSection";
import { useTranslation } from "@/hooks/useTranslation";

const JewelryMotion = dynamic(
  () => import("@/components/bhagat/JewelryMotion").then((m) => m.JewelryMotion),
  { ssr: false }
);

export function TanishqHome() {
  const { t } = useTranslation();
  const [slide, setSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"gold" | "diamond" | "platinum" | "silver">("gold");
  const [motionReady, setMotionReady] = useState(false);
  const studioRef = useRef<HTMLDivElement>(null);
  
  const heroSlides = useMemo(() => [
    {
      title: t("heroTitle1"),
      eyebrow: t("collections"),
      copy: t("heroDesc1"),
      image: "/jewelry/bhagat/diamond-necklace.jpg",
      position: "object-[58%_center]",
      href: "/collections",
    },
    {
      title: t("heroTitle2"),
      eyebrow: t("heroTitle2"),
      copy: t("heroDesc2"),
      image: "/jewelry/bhagat/diamond-ring-2.jpg",
      position: "object-[58%_center]",
      href: "/collections/brilliance",
    },
    {
      title: t("heroTitle3"),
      eyebrow: t("ourHeritage"),
      copy: t("heroDesc3"),
      image: "/jewelry/bhagat/gold-bangles.jpg",
      position: "object-[60%_center]",
      href: "/collections?category=Bangles",
    },
    {
      title: "Bridal Radiance",
      eyebrow: "Wedding Vault",
      copy: "Layered gold necklaces, kundan accents, and heirloom sets curated for grand celebrations.",
      image: "/jewelry/bhagat/bridal-set.jpg",
      position: "object-[56%_center]",
      href: "/bridal",
    },
  ], [t]);

  const categoryShortcuts = [
    { name: t("categoryNecklaces"), href: "/collections?category=Necklaces", icon: "💎", desc: t("categoryNecklacesDesc") },
    { name: t("categoryEarrings"), href: "/collections?category=Earrings", icon: "✨", desc: t("categoryEarringsDesc") },
    { name: t("categoryBangles"), href: "/collections?category=Bangles", icon: "💍", desc: t("categoryBanglesDesc") },
    { name: t("categoryRings"), href: "/collections?category=Rings", icon: "💝", desc: t("categoryRingsDesc") },
    { name: t("categoryPendants"), href: "/collections?category=Pendants", icon: "⭐", desc: t("categoryPendantsDesc") },
    { name: t("categoryChains"), href: "/collections?category=Chains", icon: "🔗", desc: t("categoryChainsDesc") }
  ];

  const trendingProducts = getProducts({ trending: true }).slice(0, 8);
  const goldProducts = getProducts({ metal: "Gold" }).slice(0, 4);
  const diamondProducts = getProducts({ metal: "Diamond" }).slice(0, 4);
  const platinumProducts = getProducts({ metal: "Platinum" }).slice(0, 4);
  const silverProducts = getProducts({ metal: "Silver" }).slice(0, 4);
  const revealProps = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const node = studioRef.current;
    if (!node || motionReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMotionReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "450px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [motionReady]);

  const handleBookAppointment = () => {
    bookVisit();
  };

  return (
    <div className="bg-bg dark:bg-bg-dark text-text transition-colors duration-300">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative pt-[7rem] md:pt-[8.5rem] lg:pt-[10rem] h-[85vh] md:h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          {heroSlides.map((item, idx) => (
            <div
              key={`hero-${idx}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                idx === slide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={idx === 0}
                className={`object-cover ${item.position}`}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-900/42 to-neutral-950/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
              
              <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-center pt-24 sm:pt-32 px-6 sm:px-12 lg:px-24 max-w-2xl text-white">
                <span className="text-[10px] tracking-[0.35em] text-accent dark:text-gold uppercase font-bold mb-3 animate-fade-in">
                  {item.eyebrow}
                </span>
                <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight uppercase">
                  {item.title}
                </h1>
                <p className="mt-4 text-sm md:text-lg text-neutral-200 font-sans leading-relaxed">
                  {item.copy}
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 sm:px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-accent-hover transition-colors shadow-lg w-full sm:w-auto text-center"
                  >
                    {t("exploreVault")} <ArrowRight size={13} />
                  </Link>
                  <button
                    onClick={handleBookAppointment}
                    className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/10 backdrop-blur text-white px-5 sm:px-7 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-white/20 transition-colors w-full sm:w-auto text-center"
                  >
                    {t("bookShowroom")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute top-1/2 left-6 z-30 hidden md:grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur hover:bg-black/40 transition-colors"
          aria-label="Prev Slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute top-1/2 right-6 z-30 hidden md:grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur hover:bg-black/40 transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dash Indicators */}
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={`h-1.5 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.35)] transition-all duration-500 ${
                idx === slide ? "w-10 bg-accent" : "w-4 bg-white/65 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Shop by Category (Shortcuts grid) */}
      <motion.section {...revealProps()} className="py-20 px-6 max-w-[1500px] mx-auto text-center">
        <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">{t("categories")}</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text mt-2 mb-1">{t("perfectHarmony")}</h2>
        <p className="text-xs text-text-muted max-w-md mx-auto mb-12">
          {t("perfectHarmonyDesc")}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
          {categoryShortcuts.map((cat, idx) => (
            <Link
              key={`cat-${idx}`}
              href={cat.href}
              className="group flex flex-col items-center bg-white dark:bg-neutral-900 border border-border/70 hover:border-accent p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/5 text-2xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-text mt-4">{cat.name}</h3>
              <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wide">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* 3. Featured Tab Showcase (Tanishq tab-style) */}
      <motion.section {...revealProps()} className="py-16 bg-neutral-50 dark:bg-neutral-900/30 border-y border-border">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">{t("curatedVault")}</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text mt-1.5">{t("signatureExclusives")}</h2>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-4 mt-6 md:mt-0 border-b border-border md:border-none pb-2 md:pb-0">
              {(["gold", "diamond", "platinum", "silver"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs tracking-widest font-semibold uppercase pb-1.5 transition-colors ${
                    activeTab === tab
                      ? "text-accent border-b-2 border-accent"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {tab === "gold" ? t("pureGold") : tab === "diamond" ? t("certifiedDiamond") : tab === "platinum" ? t("platinum") : t("silver")}
                </button>
              ))}
            </div>
          </div>

          {/* Tab contents */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === "gold" &&
              goldProducts.map((p, idx) => <ProductCard key={p.id} product={p} index={idx} size="w-full" />)}
            {activeTab === "diamond" &&
              diamondProducts.map((p, idx) => <ProductCard key={p.id} product={p} index={idx} size="w-full" />)}
            {activeTab === "platinum" &&
              platinumProducts.map((p, idx) => <ProductCard key={p.id} product={p} index={idx} size="w-full" />)}
            {activeTab === "silver" &&
              silverProducts.map((p, idx) => <ProductCard key={p.id} product={p} index={idx} size="w-full" />)}
          </div>
        </div>
      </motion.section>

      {/* 4. ORO-inspired Floating Motion Layer */}
      <motion.section {...revealProps()} className="mx-auto max-w-[1500px] gap-12 px-6 py-20 grid lg:grid-cols-2 items-center">
        <div>
          <span className="text-[10px] tracking-[0.35em] text-accent uppercase font-bold block mb-1">{t("interactiveStudio")}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text leading-tight uppercase">
            {t("precisionTitle")}
          </h2>
          <p className="mt-4 text-xs text-text-muted leading-relaxed max-w-lg">
            {t("precisionDesc")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/collections?category=Bangles"
              className="inline-flex bg-accent text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-accent-hover transition-colors"
            >
              {t("exploreBangles")}
            </Link>
            <Link
              href="/collections?metal=Platinum"
              className="inline-flex border border-border px-6 py-3 text-xs font-semibold tracking-wider text-text-muted hover:text-text uppercase transition-colors"
            >
              {t("platinumEdit")}
            </Link>
          </div>
        </div>
        <div ref={studioRef} className="relative min-h-[320px] sm:min-h-[400px] overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 shadow-[0_24px_70px_rgba(0,0,0,0.15)] flex items-center justify-center">
          <Image
            src="/jewelry/bhagat/gold-bangles.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover transition-opacity duration-700 ${motionReady ? "opacity-0" : "opacity-100"}`}
          />
          {motionReady && <JewelryMotion className="absolute inset-0 h-full w-full" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-center">
            <span className="text-[10px] tracking-widest text-gold uppercase block mb-1">{t("satinFinish")}</span>
            <p className="font-display text-lg font-bold">{t("bCNCkada")}</p>
          </div>
        </div>
      </motion.section>

      {/* 5. Trending Horizontal Carousel */}
      <motion.section {...revealProps()} className="py-20 bg-neutral-50 dark:bg-neutral-900/30 border-y border-border overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 mb-10 flex justify-between items-end">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">{t("trendingNow")}</span>
            <h2 className="font-display text-3xl font-bold text-text">{t("generationalFavs")}</h2>
          </div>
          <Link href="/collections" className="text-xs text-accent underline underline-offset-4 font-semibold hover:text-accent-hover">
            {t("viewAllVault")} &rarr;
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 px-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
          {trendingProducts.map((p, idx) => (
            <div key={p.id} className="snap-start shrink-0 w-[280px]">
              <ProductCard product={p} index={idx} size="w-full" />
            </div>
          ))}
        </div>
      </motion.section>

      {/* 6. Live Custom Bespoke Configurator */}
      <motion.section {...revealProps()} id="custom-design" className="py-20 border-b border-border">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="mb-12 text-center">
            <span className="text-[10px] tracking-[0.35em] text-accent uppercase font-bold">{t("bespokeStudio")}</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-text mt-2">{t("designYourLegacy")}</h2>
          </div>
          <CustomConfigurator />
        </div>
      </motion.section>

      {/* 7. Bridal Rivaah Spotlight Section */}
      <motion.section {...revealProps()} className="py-24 bg-white dark:bg-neutral-950">
        <div className="max-w-[1500px] mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
            <Image
              src="/jewelry/bhagat/gold-set.jpg"
              alt="Bhagat Ji bridal gold jewellery set"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[52%_center]"
            />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-widest text-rose-500 uppercase font-bold block mb-1">{t("rivaahWeddingSuites")}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text leading-tight">
              {t("completeBridalEnsemble")}
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              {t("completeBridalEnsembleDesc")}
            </p>
            <div className="pt-4 flex gap-4">
              <Link
                href="/collections"
                className="inline-flex bg-gradient-to-r from-[#a8874c] via-[#c9a96e] to-[#e8d5a8] px-6 py-3 text-xs font-bold tracking-wider uppercase text-neutral-950 shadow-md transition-transform hover:-translate-y-0.5"
              >
                {t("exploreVault")}
              </Link>
              <Link
                href="/appointment"
                className="inline-flex border border-border hover:border-text px-6 py-3 text-xs font-semibold tracking-wider text-text-muted hover:text-text uppercase transition-colors"
              >
                {t("bespokeBookingBtn")}
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 8. Sizing & Outfit consultant tools */}
      <motion.section {...revealProps()} className="py-20 bg-neutral-50 dark:bg-neutral-900/30 border-y border-border">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <OutfitMatcher />
            <RingSizeEstimator />
          </div>
        </div>
      </motion.section>

      {/* 9. Golden Harvest Plan Banner */}
      <motion.section {...revealProps()} className="py-20 bg-gradient-to-br from-neutral-950 via-neutral-900 to-accent text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-40 w-40 bg-accent/20 rounded-full blur-3xl" />
        <div className="max-w-[1000px] mx-auto px-6 text-center space-y-6 relative z-10">
          <Coins className="text-gold h-10 w-10 mx-auto" />
          <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-bold">{t("plannedGifting")}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            {t("goldenHarvestSchemeTitle")}
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed max-w-xl mx-auto">
            {t("goldenHarvestSavingsDesc")}
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/gold-savings"
              className="inline-flex bg-accent text-white px-7 py-3 text-xs font-semibold tracking-wider uppercase hover:bg-accent-hover transition-colors shadow-lg"
            >
              {t("calculateMaturityBonusesBtn")}
            </Link>
            <Link
              href="/digital-gold"
              className="inline-flex bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              {t("digitalGoldInfoBtn")}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 10. Legacy Timeline */}
      <motion.section {...revealProps()} className="py-20 px-6 max-w-[1500px] mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[10px] tracking-[0.35em] text-accent uppercase font-bold">{t("familyStory")}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text mt-1.5">{t("generationalHeritage")}</h2>
        </div>
        <LegacyTimeline />
      </motion.section>

      {/* 11. Verification Portals */}
      <motion.section {...revealProps()} className="py-20 bg-neutral-50 dark:bg-neutral-900/30 border-y border-border">
        <div className="max-w-[1500px] mx-auto px-6 grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <CertificatePortal />
            <PriceAlerts />
          </div>
          <div>
            <GiftStyling />
          </div>
        </div>
      </motion.section>

      {/* Hallmark seal and WhatsApp bubble */}
      <HallmarkSeal />

      {/* 12. Showroom Location Invitation */}
      <motion.section {...revealProps()} id="visit" className="py-20 px-6">
        <div className="mx-auto max-w-[1400px] bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-accent uppercase font-bold">{t("visitShowrooms")}</span>
            <h2 className="font-display mt-2 text-3xl md:text-4xl font-bold text-text">
              {t("privateAppointments")}
            </h2>
            <p className="mt-3 max-w-lg text-xs text-text-muted leading-relaxed">
              {t("privateAppointmentsDesc")}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link
              href="/store-locator"
              className="inline-flex bg-accent text-white px-6 py-3.5 rounded text-xs font-semibold uppercase tracking-wider shadow hover:bg-accent-hover transition-colors"
            >
              {t("locateShowroomsBtn")}
            </Link>
            <Link
              href="/appointment"
              className="inline-flex border border-border hover:border-text px-6 py-3.5 rounded text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-text transition-colors"
            >
              {t("bookAppointmentLabel")}
            </Link>
          </div>
        </div>
      </motion.section>

      <ContactSection />
    </div>
  );
}
