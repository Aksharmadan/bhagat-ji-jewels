"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, ShoppingBag, User, Mic } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Legacy", href: "#heritage" },
  { label: "Collections", href: "#collections" },
  { label: "Bridal", href: "#bridal" },
  { label: "Bestsellers", href: "#bestsellers" },
  { label: "Experience", href: "#store" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleVoice = () => {
    type SpeechCtor = new () => {
      lang: string;
      onresult: ((e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
      onend: (() => void) | null;
      start: () => void;
    };
    const Win = window as Window & {
      webkitSpeechRecognition?: SpeechCtor;
      SpeechRecognition?: SpeechCtor;
    };
    const SpeechRecognitionCtor = Win.webkitSpeechRecognition ?? Win.SpeechRecognition;
    if (!SpeechRecognitionCtor) {
      alert("Voice search is available in supported browsers.");
      return;
    }
    setVoiceActive(true);
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-IN";
    recognition.onresult = () => {
      document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
      setVoiceActive(false);
    };
    recognition.onend = () => setVoiceActive(false);
    recognition.start();
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-700",
          scrolled ? "glass-luxury py-3 shadow-lg" : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="BHAGAT JI JEWELS"
              width={48}
              height={48}
              className="h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-105 md:h-12 md:w-12"
            />
            <span className="hidden font-display text-sm tracking-[0.2em] text-ivory/90 lg:block">
              BHAGAT JI
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[11px] tracking-[0.25em] text-ivory/70 uppercase transition-colors hover:text-royal-gold"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-royal-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={handleVoice}
              className={cn(
                "hidden p-2 text-ivory/60 transition-colors hover:text-royal-gold md:block",
                voiceActive && "text-royal-gold"
              )}
              aria-label="Voice search"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button className="hidden p-2 text-ivory/60 hover:text-royal-gold md:block" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <button className="hidden p-2 text-ivory/60 hover:text-royal-gold md:block" aria-label="Wishlist">
              <Heart className="h-4 w-4" />
            </button>
            <button className="hidden p-2 text-ivory/60 hover:text-royal-gold md:block" aria-label="Cart">
              <ShoppingBag className="h-4 w-4" />
            </button>
            <button className="hidden p-2 text-ivory/60 hover:text-royal-gold md:block" aria-label="Account">
              <User className="h-4 w-4" />
            </button>
            <button
              className="p-2 text-ivory lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black-luxury/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="h-8 w-8 text-ivory" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 pt-12">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl tracking-[0.15em] text-ivory uppercase"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
