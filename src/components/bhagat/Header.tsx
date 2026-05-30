"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Heart,
  User,
  X,
  Moon,
  Sun,
  MapPin,
  Sparkles,
  Gift,
  Coins,
  Gem,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { inquireProduct } from "@/lib/actions";
import { BRAND } from "@/lib/constants";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { GoldTicker } from "@/components/features/GoldTicker";
import { AudioSoundscape } from "@/components/features/AudioSoundscape";

export function Header() {
  const { t, lang } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<"jewellery" | "collections" | "savings" | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { wishlist } = useWishlist();

  const handleLangChange = (l: string) => {
    localStorage.setItem("lang", l);
    window.dispatchEvent(new Event("langChange"));
    setLangOpen(false);
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const closeLangMenu = (event: PointerEvent) => {
      if (!langMenuRef.current?.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeLangMenu);
    return () => document.removeEventListener("pointerdown", closeLangMenu);
  }, []);

  const handleWhatsAppChat = () => {
    inquireProduct("General Consultation");
  };

  const mobileCategories = [
    { name: "Necklaces", href: "/collections?category=Necklaces" },
    { name: "Earrings", href: "/collections?category=Earrings" },
    { name: "Bangles", href: "/collections?category=Bangles" },
    { name: "Rings", href: "/collections?category=Rings" },
    { name: "Bracelets", href: "/collections?category=Bracelets" },
    { name: "Chains", href: "/collections?category=Chains" },
    { name: "Pendants", href: "/collections?category=Pendants" },
    { name: "Mangalsutra", href: "/collections?category=Mangalsutra" },
    { name: "Nose Pins", href: "/collections?category=Nose Pins" },
    { name: "Anklets", href: "/collections?category=Anklets" },
    { name: "Coins & Bars", href: "/collections?category=Coins & Bars" },
  ];

  const mobileMetals = [
    { name: "Gold", href: "/collections?metal=Gold" },
    { name: "Platinum", href: "/collections?metal=Platinum" },
    { name: "Diamond", href: "/collections?metal=Diamond" },
    { name: "Silver", href: "/collections?metal=Silver" },
  ];

  const mobileCollectionTiles = [
    { name: "Platinum Signature", href: "/collections/platinum-signature", image: "https://images.pexels.com/photos/12081609/pexels-photo-12081609.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { name: "Kada", href: "/collections?category=Bangles&q=kada", image: "/jewelry/bhagat/gold-bangles.jpg" },
    { name: "Matrix", href: "/collections?category=Bangles&q=matrix", image: "/jewelry/bhagat/gold-set.jpg" },
    { name: "Cuffs", href: "/collections?category=Bracelets&q=cuffs", image: "/jewelry/bhagat/mens-gold.jpg" },
    { name: "Iktara", href: "/collections?category=Bangles&q=iktara", image: "/jewelry/bhagat/temple-gold.jpg" },
    { name: "Silver Stories", href: "/collections/silver-stories", image: "/jewelry/collection-cards/silver-stories.png" },
    { name: "Shapes", href: "/collections?metal=Gold&q=shapes", image: "/jewelry/bhagat/gold-necklace-2.jpg" },
  ];

  const quickNavItems = [
    { label: t("allJewellery"), href: "/collections", Icon: Sparkles },
    { label: t("gold"), href: "/collections?metal=Gold", Icon: Coins },
    { label: t("diamond"), href: "/collections?metal=Diamond", Icon: Gem },
    { label: t("earrings"), href: "/collections?category=Earrings", Icon: Sparkles },
    { label: t("rings"), href: "/collections?category=Rings", Icon: Heart },
    { label: t("dailyWear"), href: "/collections?occasion=Daily Wear", Icon: Sun, compact: true },
    { label: t("gemstone"), href: "/collections/brilliance", Icon: Gem, compact: true },
    { label: t("wedding"), href: "/collections?occasion=Wedding", Icon: Heart, compact: true },
    { label: t("gifting"), href: "/collections?occasion=Gifting", Icon: Gift, compact: true },
  ];

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 flex flex-col">
        {/* Top utility bar */}
        <div className="bg-bg/95 dark:bg-black/95 text-[11px] border-b border-border/60 py-1.5 px-4 hidden md:block">
          <div className="mx-auto max-w-[1500px] flex justify-between items-center text-text-muted font-sans font-medium tracking-wider">
            <div className="flex items-center gap-6">
              <Link href="/store-locator" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <MapPin size={12} className="text-accent" /> {t("findStore")}
              </Link>
              <Link href="/gold-rate" className="hover:text-accent transition-colors flex items-center gap-1">
                <Sparkles size={11} className="text-gold" /> {t("liveRates")}
              </Link>
              <Link href="/about" className="hover:text-accent transition-colors">
                {t("ourHeritage")}
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <span>{t("concierge")}: +91 98370 20133</span>
              <div className="h-3 w-px bg-border/60" />
              <Link href="/appointment" className="hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4">
                {t("bookAppointment")}
              </Link>
            </div>
          </div>
        </div>

        {/* Live Ticker strip */}
        <GoldTicker />

        {/* Header container */}
        <header
          className={cn(
            "border-b transition-all duration-500 w-full",
            scrolled
              ? "bg-bg/95 border-border/80 shadow-md backdrop-blur-xl py-2"
              : "bg-bg border-transparent py-4"
          )}
          onMouseLeave={() => setActiveMega(null)}
        >
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-2 overflow-visible px-3 sm:px-6 lg:px-8">
            {/* Left: Mobile menu toggle + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 p-2 text-text transition-colors hover:text-accent lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <div className="relative h-9 w-9 sm:h-12 sm:w-12 overflow-hidden rounded-full border border-gold/25 p-0.5 shrink-0">
                  <Image
                    src="/logo.png"
                    alt={BRAND.name}
                    fill
                    sizes="48px"
                    className="object-contain rounded-full"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm sm:text-base tracking-[0.2em] font-bold text-text uppercase leading-none">
                    Bhagat Ji
                  </span>
                  <span className="text-[7px] sm:text-[8px] tracking-[0.35em] text-accent dark:text-gold uppercase font-semibold mt-0.5 sm:mt-1">
                    Jewels
                  </span>
                </div>
              </Link>
            </div>

            {/* Middle: Quick Icon Navigation */}
            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex xl:gap-3 2xl:gap-5">
              {quickNavItems.map(({ label, href, Icon, compact }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "group items-center gap-2 whitespace-nowrap text-[12px] font-sans font-semibold tracking-wide text-text-muted transition-colors hover:text-accent xl:text-[13px]",
                    compact ? "hidden 2xl:flex" : "flex"
                  )}
                >
                  <Icon className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent" />
                  <span>{label}</span>
                </Link>
              ))}

              <button
                onMouseEnter={() => setActiveMega("collections")}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap text-[12px] font-sans font-semibold tracking-wide transition-colors xl:text-[13px]",
                  activeMega === "collections" ? "text-accent" : "text-text-muted hover:text-accent"
                )}
              >
                <Menu className="h-4 w-4" />
                <span>{t("more")}</span>
              </button>
            </nav>

            {/* Right: Search, Wishlist, Themes & Settings */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 text-neutral-700 dark:text-neutral-200">
              {/* Search trigger or bar */}
              <form action="/collections" className="relative hidden 2xl:block w-64">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  name="q"
                  placeholder={t("searchPlaceholder")}
                  className="w-full h-9 pl-9 pr-4 rounded-full border border-border/80 bg-neutral-50 dark:bg-neutral-900 text-xs text-text outline-none focus:border-accent transition-colors"
                />
              </form>

              {/* Wishlist Link with Badge */}
              <Link href="/wishlist" aria-label="Wishlist" className="relative shrink-0 p-2 hover:text-accent transition-colors">
                <Heart size={20} className={cn(wishlist.length > 0 ? "fill-rose-500 text-rose-500" : "")} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[8px] font-bold text-white shadow-sm animate-scale-in">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Showroom Booking Icon */}
              <Link href="/appointment" aria-label="Book Appointment" className="hidden shrink-0 p-2 hover:text-accent transition-colors sm:block">
                <User size={20} />
              </Link>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/45 bg-bg-elevated px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-text shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all hover:border-gold hover:bg-gold/10 hover:text-gold dark:bg-neutral-950 dark:text-gold-light dark:shadow-[0_0_26px_rgba(212,175,55,0.16)]"
                title={`${theme === "light" ? t("dark") : t("light")} Mode`}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                <span className="hidden lg:inline">{theme === "light" ? t("dark") : t("light")}</span>
              </button>

              {/* Language Dropdown */}
              <div ref={langMenuRef} className="relative flex shrink-0 items-center border-l border-border/60 pl-1">
                <button
                  type="button"
                  onClick={() => setLangOpen((current) => !current)}
                  className="inline-flex h-11 min-w-12 items-center justify-center rounded-lg border border-border bg-bg-elevated px-3 text-[11px] font-bold uppercase tracking-wider text-text shadow-sm transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold"
                  aria-haspopup="menu"
                  aria-expanded={langOpen}
                  aria-label="Change language"
                >
                  <span>{lang}</span>
                </button>
                <div
                  className={cn(
                    "absolute right-0 top-full z-50 mt-3 w-32 overflow-hidden rounded-lg border border-border/80 bg-bg shadow-2xl transition-all",
                    langOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                  )}
                  role="menu"
                >
                  {["EN", "HI"].map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => handleLangChange(l)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 text-left text-xs font-bold transition-colors hover:bg-gold/10 hover:text-gold",
                        lang === l ? "bg-gold/10 text-accent dark:text-gold" : "text-text-muted"
                      )}
                      role="menuitem"
                    >
                      <span>{l === "EN" ? "English" : "हिन्दी"}</span>
                      <span className="text-[10px] uppercase">{l}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio controls */}
              <AudioSoundscape />
            </div>
          </div>

          {/* Mega Menus Overlay */}
          <AnimatePresence>
            {activeMega && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute left-0 right-0 top-full bg-bg border-b border-border shadow-2xl z-40 hidden lg:block overflow-hidden"
                onMouseEnter={() => setActiveMega(activeMega)}
              >
                <div className="mx-auto max-w-[1500px] px-10 py-10">
                  {activeMega === "jewellery" && (
                    <div className="grid grid-cols-4 gap-8">
                      <div>
                        <h4 className="text-xs font-sans font-bold tracking-widest text-accent uppercase mb-4 pb-2 border-b border-border/60">{t("necklacesPendants")}</h4>
                        <ul className="space-y-2.5 text-[13px] text-text-muted">
                          <li><Link href="/collections?category=Necklaces" className="hover:text-accent transition-colors">Luxury Necklaces</Link></li>
                          <li><Link href="/collections?category=Pendants" className="hover:text-accent transition-colors">Gemstone Pendants</Link></li>
                          <li><Link href="/collections?category=Mangalsutra" className="hover:text-accent transition-colors">Diamond & Gold Mangalsutras</Link></li>
                          <li><Link href="/collections/heritage-classics" className="hover:text-accent transition-colors">Heritage Classics</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-sans font-bold tracking-widest text-accent uppercase mb-4 pb-2 border-b border-border/60">{t("earringsNosePins")}</h4>
                        <ul className="space-y-2.5 text-[13px] text-text-muted">
                          <li><Link href="/collections?category=Earrings" className="hover:text-accent transition-colors">Studs & Solitaires</Link></li>
                          <li><Link href="/collections?category=Earrings&q=jhumka" className="hover:text-accent transition-colors">Antique Gold Jhumkas</Link></li>
                          <li><Link href="/collections?category=Earrings&q=chandbali" className="hover:text-accent transition-colors">Royal Chandbalis</Link></li>
                          <li><Link href="/collections?category=Nose Pins" className="hover:text-accent transition-colors">Nose Pins & Naths</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-sans font-bold tracking-widest text-accent uppercase mb-4 pb-2 border-b border-border/60">{t("banglesWristwear")}</h4>
                        <ul className="space-y-2.5 text-[13px] text-text-muted">
                          <li><Link href="/collections?category=Bangles" className="hover:text-accent transition-colors">Gold Kangans</Link></li>
                          <li><Link href="/collections?category=Bangles&q=cnc" className="hover:text-accent transition-colors">CNC Engineered Bangles</Link></li>
                        </ul>
                      </div>
                      <div className="bg-neutral-50 dark:bg-neutral-900/60 p-6 rounded-lg border border-border/40 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] tracking-widest text-accent font-bold uppercase block mb-1">{t("featuredSpotlight")}</span>
                          <h5 className="font-display text-xl text-text font-semibold">{t("bridalConsultTitle")}</h5>
                          <p className="text-xs text-text-muted mt-2 leading-relaxed">
                            {t("bridalConsultDesc")}
                          </p>
                        </div>
                        <Link href="/appointment" className="mt-4 inline-block text-xs text-accent underline underline-offset-4 font-semibold">
                          {t("scheduleBookingBtn")} &rarr;
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeMega === "collections" && (
                    <div className="grid grid-cols-5 gap-6">
                      <div className="col-span-4 grid grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-xs font-sans font-bold tracking-widest text-accent uppercase mb-3">{t("bhagatSignature")}</h4>
                          <ul className="space-y-2 text-xs text-text-muted">
                            <li><Link href="/collections/heritage-classics" className="hover:text-accent transition-colors font-medium">Heritage Classics (Temple)</Link></li>
                            <li><Link href="/collections/platinum-signature" className="hover:text-accent transition-colors font-medium">Platinum Signature (950 Platinum)</Link></li>
                            <li><Link href="/collections/kada" className="hover:text-accent transition-colors font-medium">Kada</Link></li>
                            <li><Link href="/collections/gold-chains" className="hover:text-accent transition-colors font-medium">Gold Chains</Link></li>
                            <li><Link href="/collections/cuban" className="hover:text-accent transition-colors font-medium">Cuban</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-sans font-bold tracking-widest text-accent uppercase mb-3">{t("modernCreations")}</h4>
                          <ul className="space-y-2 text-xs text-text-muted">
                            <li><Link href="/collections/brilliance" className="hover:text-accent transition-colors font-medium">Brilliance (Diamond Statement)</Link></li>
                            <li><Link href="/collections/matrix" className="hover:text-accent transition-colors font-medium">Matrix</Link></li>
                            <li><Link href="/collections/cuff" className="hover:text-accent transition-colors font-medium">Cuff</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-sans font-bold tracking-widest text-accent uppercase mb-3">{t("specialEditions")}</h4>
                          <ul className="space-y-2 text-xs text-text-muted">
                            <li><Link href="/collections/silver-stories" className="hover:text-accent transition-colors font-medium">Silver Stories (925 Silver)</Link></li>
                            <li><Link href="/collections/spiral" className="hover:text-accent transition-colors font-medium">Spiral</Link></li>
                            <li><Link href="/collections/bolt" className="hover:text-accent transition-colors font-medium">Bolt</Link></li>
                          </ul>
                        </div>
                      </div>
                      <div className="relative h-full min-h-[160px] overflow-hidden rounded-lg border border-border/40">
                        <Image
                          src="/jewelry/collection-cards/heritage-classics.png"
                          alt="Heritage"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col justify-end text-white">
                          <span className="text-[9px] tracking-wider uppercase text-gold">{t("heritageSpotlight")}</span>
                          <h5 className="font-display text-sm font-semibold mt-1">{t("heritageSpotlightTitle")}</h5>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMega === "savings" && (
                    <div className="grid grid-cols-3 gap-8">
                      <div className="border-r border-border/60 pr-8">
                        <span className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-3">
                          <Coins size={16} />
                        </span>
                        <h4 className="text-sm font-sans font-bold tracking-wider text-text mb-2">{t("digitalGoldAccumulate")}</h4>
                        <p className="text-xs text-text-muted leading-relaxed mb-4">
                          {t("digitalGoldDesc")}
                        </p>
                        <Link href="/digital-gold" className="text-xs text-accent font-semibold hover:underline">
                          {t("learnDigitalGold")} &rarr;
                        </Link>
                      </div>
                      <div className="border-r border-border/60 pr-8">
                        <span className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-3">
                          <Gift size={16} />
                        </span>
                        <h4 className="text-sm font-sans font-bold tracking-wider text-text mb-2">{t("goldenHarvestSchemeTitle")}</h4>
                        <p className="text-xs text-text-muted leading-relaxed mb-4">
                          {t("goldenHarvestSchemeDesc")}
                        </p>
                        <Link href="/gold-savings" className="text-xs text-accent font-semibold hover:underline">
                          {t("calculateSavingsBtn")} &rarr;
                        </Link>
                      </div>
                      <div className="flex flex-col justify-center bg-accent/5 p-6 rounded-lg border border-accent/10">
                        <Award className="text-gold h-6 w-6 mb-2" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-accent">{t("purityGuarantee100")}</h4>
                        <p className="text-[11px] text-text-muted leading-normal mt-1">
                          {t("purityGuaranteeDesc")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex bg-black/50 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              data-lenis-prevent
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="custom-scroll h-full w-[min(94vw,980px)] overscroll-contain overflow-y-auto bg-bg shadow-2xl"
            >
              <div className="grid min-h-full md:grid-cols-[260px_1fr_1.45fr]">
                <div className="border-r border-border bg-bg px-7 py-7 md:px-9">
                  <button
                    onClick={() => setOpen(false)}
                    className="mb-12 inline-flex items-center gap-3 text-sm font-bold tracking-[0.28em] text-text uppercase"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" /> Close
                  </button>

                  <nav className="space-y-0">
                    {[
                      ["Collection", "/collections"],
                      ["Favorites", "/wishlist"],
                      ["Find Store", "/store-locator"],
                      ["About Us", "/about"],
                      ["Terms of Service", "/about"],
                      ["Privacy Policy", "/about"],
                      ["Contact Us", "/#contact"],
                      ["Upcoming Events", "/appointment"],
                    ].map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-border py-5 text-base font-bold tracking-[0.24em] text-text uppercase transition-colors hover:text-accent"
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="border-r border-border px-7 py-10 md:px-9 md:py-20">
                  <p className="mb-5 text-sm font-bold tracking-[0.24em] text-text-muted uppercase">Category Collections</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-text-muted md:block md:space-y-4">
                    {mobileCategories.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block transition-colors hover:text-text"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="my-8 h-px bg-border" />

                  <p className="mb-5 text-sm font-bold tracking-[0.24em] text-text-muted uppercase">Metal Filter</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-text-muted md:block md:space-y-4">
                    {mobileMetals.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block transition-colors hover:text-text"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="px-7 py-10 md:px-9 md:py-20">
                  <p className="mb-8 text-sm font-bold tracking-[0.24em] text-text-muted uppercase">Gold Collection</p>
                  <div className="grid grid-cols-2 gap-x-5 gap-y-9">
                    {mobileCollectionTiles.map((item) => (
                      <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="group block">
                        <div className="relative aspect-[4/3] overflow-hidden border border-border bg-white shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 42vw, 220px"
                          />
                        </div>
                        <p className="mt-3 text-sm font-bold tracking-wide text-text uppercase">{item.name}</p>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-10 border-t border-border pt-6">
                    <button
                      onClick={() => {
                        setOpen(false);
                        handleWhatsAppChat();
                      }}
                      className="w-full border border-border bg-white py-3 text-xs font-bold tracking-[0.2em] text-text uppercase transition-colors hover:border-accent hover:text-accent"
                    >
                      {t("whatsAppConcierge")}
                    </button>
                    <p className="mt-3 text-center text-[10px] text-text-muted">{BRAND.hours}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex-1" onClick={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
