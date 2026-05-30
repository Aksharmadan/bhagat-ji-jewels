"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShieldCheck, Award, Heart, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { submitInquiry } from "@/lib/actions";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await submitInquiry({
        name: "Newsletter Subscriber",
        phone: "0000000000",
        email,
        type: "newsletter",
        message: "Newsletter signup",
      });
      setDone(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className="border-t border-border/85 bg-neutral-50 dark:bg-black/40 pb-12 pt-20">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-border/60 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/5 text-accent">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-xs font-sans font-bold tracking-widest text-text uppercase">{t("hallmark100")}</h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">{t("hallmarkDesc")}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/5 text-accent">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-xs font-sans font-bold tracking-widest text-text uppercase">{t("conciergeSecure")}</h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">{t("conciergeDesc")}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/5 text-accent">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="text-xs font-sans font-bold tracking-widest text-text uppercase">{t("generationalTrust")}</h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">{t("generationalTrustDesc")}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-5">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt={BRAND.name} width={60} height={60} className="rounded-full" />
              <div className="flex flex-col">
                <span className="font-display text-base tracking-[0.2em] font-bold text-text uppercase leading-none">
                  Bhagat Ji Jewels
                </span>
                <span className="text-[9px] tracking-wider text-accent uppercase font-semibold mt-1">
                  Est. 1960
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm text-text-muted leading-relaxed max-w-sm">
              {t("aboutDesc")}
            </p>
            
            {/* Social media links */}
            <div className="mt-6 flex items-center gap-4 text-text-muted">
              <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href={BRAND.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="YouTube">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="text-xs font-sans font-bold tracking-widest text-text uppercase">{t("ourCollections")}</h4>
            <ul className="mt-6 space-y-3 text-xs text-text-muted">
              <li><Link href="/collections/heritage-classics" className="hover:text-accent transition-colors">Heritage Classics</Link></li>
              <li><Link href="/collections/gold-chains" className="hover:text-accent transition-colors">Gold Chains</Link></li>
              <li><Link href="/collections/kada" className="hover:text-accent transition-colors">Kada</Link></li>
              <li><Link href="/collections/brilliance" className="hover:text-accent transition-colors">Brilliance Diamonds</Link></li>
              <li><Link href="/collections/silver-stories" className="hover:text-accent transition-colors">Silver Stories</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-xs font-sans font-bold tracking-widest text-text uppercase">{t("quickLinks")}</h4>
            <ul className="mt-6 space-y-3 text-xs text-text-muted">
              <li><Link href="/store-locator" className="hover:text-accent transition-colors">Store Locator</Link></li>
              <li><Link href="/gold-rate" className="hover:text-accent transition-colors">Gold Rate Today</Link></li>
              <li><Link href="/gold-savings" className="hover:text-accent transition-colors">Golden Harvest Savings</Link></li>
              <li><Link href="/digital-gold" className="hover:text-accent transition-colors">Digital Gold</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Heritage Timeline</Link></li>
              <li><Link href="/appointment" className="hover:text-accent transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscriber */}
          <div>
            <h4 className="text-xs font-sans font-bold tracking-widest text-text uppercase">{t("luxuryNewsletter")}</h4>
            <p className="mt-6 text-xs text-text-muted leading-relaxed">
              {t("subscribeDesc")}
            </p>
            {done ? (
              <p className="mt-6 text-accent flex items-center gap-1.5 text-xs font-semibold animate-scale-in">
                <Heart size={14} className="fill-rose-500 text-rose-500" /> {t("onPrivateList")}
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="mt-6 flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-border bg-transparent py-2 text-xs focus:border-accent focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="mt-2 w-full bg-accent text-white py-2 text-center text-[10px] font-sans tracking-widest uppercase font-semibold hover:bg-accent-hover transition-colors"
                >
                  {t("joinCircle")}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Details */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-8 text-xs text-text-muted md:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Showroom: Kaserath Bazaar, Chandausi</span>
            <span>&bull;</span>
            <span>Owners: {BRAND.owners.join(" & ")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
