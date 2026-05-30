"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, Share2, Video } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { formatWhatsAppLink } from "@/lib/utils";

const LINKS = [
  { label: "Our Legacy", href: "#heritage" },
  { label: "Collections", href: "#collections" },
  { label: "Bridal", href: "#bridal" },
  { label: "Visit Store", href: "#store" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-royal-gold/20 bg-black-luxury pt-24 pb-12">
      <div className="absolute top-0 left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-royal-gold to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image src="/logo.png" alt={BRAND.name} width={100} height={100} className="mb-6" />
            <p className="text-sm leading-relaxed text-ivory/50">{BRAND.tagline}</p>
            <p className="mt-4 text-xs tracking-[0.3em] text-royal-gold uppercase">
              Est. {BRAND.established}
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs tracking-[0.3em] text-royal-gold uppercase">Explore</h4>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ivory/60 transition-colors hover:text-royal-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs tracking-[0.3em] text-royal-gold uppercase">Visit Us</h4>
            <p className="text-sm leading-relaxed text-ivory/60">{BRAND.address.full}</p>
            <p className="mt-4 text-sm text-ivory/60">{BRAND.hours}</p>
            <div className="mt-4 space-y-1">
              {BRAND.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-sm text-royal-gold hover:underline">
                  {p}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-xs tracking-[0.3em] text-royal-gold uppercase">Newsletter</h4>
            <p className="mb-4 text-sm text-ivory/50">Join our circle of elegance.</p>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border border-royal-gold/20 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-royal-gold/50 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-royal-gold px-4 py-3 text-black-luxury transition-opacity hover:opacity-90"
                aria-label="Subscribe"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-8 flex gap-4">
              <a href={BRAND.social.instagram} className="text-ivory/50 hover:text-royal-gold" aria-label="Instagram">
                <Share2 className="h-5 w-5" />
              </a>
              <a href={BRAND.social.facebook} className="text-ivory/50 hover:text-royal-gold" aria-label="Facebook">
                <Globe className="h-5 w-5" />
              </a>
              <a href={BRAND.social.youtube} className="text-ivory/50 hover:text-royal-gold" aria-label="YouTube">
                <Video className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-royal-gold/10 pt-8 md:flex-row">
          <p className="text-xs text-ivory/40">
            © {new Date().getFullYear()} {BRAND.name}. Crafted with legacy since {BRAND.established}.
          </p>
          <p className="text-xs text-ivory/40">
            {BRAND.owners.join(" & ")} · Generations of Trust
          </p>
          <a
            href={formatWhatsAppLink(BRAND.whatsapp[0])}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] text-royal-gold uppercase hover:underline"
          >
            WhatsApp Concierge
          </a>
        </div>
      </div>
    </footer>
  );
}
