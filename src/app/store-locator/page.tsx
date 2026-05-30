import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, MessageSquare, Clock, Map, Sparkles } from "lucide-react";
import { STORE_LOCATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Showroom | Store Locator",
  description: "Find the Bhagat Ji Jewels showroom in Chandausi, Uttar Pradesh. View address, maps, and book a showroom visit.",
};

export default function StoreLocatorPage() {
  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark pt-[7.5rem] pb-24 lg:pt-[10.5rem]">
      {/* Title */}
      <section className="bg-white dark:bg-neutral-900 border-b border-border py-12 mb-12 text-center px-6">
        <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold flex justify-center items-center gap-1">
          <Sparkles size={10} className="text-gold" /> Showroom locator
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text mt-3">
          Our Heritage Showroom
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-xs text-text-muted leading-relaxed font-sans">
          Step into a world of pure gold, sparkling diamonds, and majestic bridal suites. Visit our flagship showroom in Chandausi, Uttar Pradesh for private heritage guidance.
        </p>
      </section>

      {/* Single Store Showcase */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Store Card Details */}
          <div className="bg-white dark:bg-neutral-900 border border-border/80 p-8 rounded-xl shadow-md flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex h-12 w-12 shrink-0 bg-accent/5 rounded-full items-center justify-center text-accent">
                <MapPin size={24} />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-text">{STORE_LOCATIONS[0].name}</h3>
                  <p className="text-sm text-text-muted mt-2 leading-relaxed">{STORE_LOCATIONS[0].address}</p>
                </div>
                
                <div className="space-y-3 text-sm text-text-muted border-t border-border/40 pt-6">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-accent/60" />
                    <span>{STORE_LOCATIONS[0].hours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-accent/60" />
                    <span>{STORE_LOCATIONS[0].phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <a
                href={`https://wa.me/${STORE_LOCATIONS[0].whatsapp}?text=${encodeURIComponent(
                  `Hi Bhagat Ji Jewels, I would like to consult with you regarding jewelry designs.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageSquare size={14} /> WhatsApp
              </a>
              <Link
                href={`/appointment?store=${STORE_LOCATIONS[0].id}`}
                className="flex-1 inline-flex justify-center items-center bg-accent hover:bg-accent-hover text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                Book Visit
              </Link>
            </div>
          </div>

          {/* Map Embed */}
          <div className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-5 shadow-md flex flex-col h-full min-h-[400px]">
            <h3 className="text-xs font-bold tracking-widest text-text uppercase flex items-center gap-2 mb-4">
              <Map size={14} className="text-accent" /> {STORE_LOCATIONS[0].name} Map
            </h3>
            <div className="relative flex-1 w-full rounded-lg overflow-hidden border border-border/60 bg-neutral-100 min-h-[300px]">
              <iframe
                src={STORE_LOCATIONS[0].mapEmbed}
                width="100%"
                height="100%"
                className="border-none opacity-85 dark:opacity-75"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bhagat Ji Showroom Map"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
