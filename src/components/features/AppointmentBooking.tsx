"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, User, Star, ArrowRight } from "lucide-react";
import { STORE_LOCATIONS, OCCASIONS } from "@/lib/constants";
import { inquireProduct } from "@/lib/actions";

export function AppointmentBooking() {
  const [storeId, setStoreId] = useState<string>(STORE_LOCATIONS[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("11:30 AM");
  const [occasion, setOccasion] = useState<string>(OCCASIONS[0]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;
    
    const selectedStore = STORE_LOCATIONS.find((s) => s.id === storeId);
    const storeName = selectedStore ? selectedStore.name : "Showroom";
    
    const text = `Hi Bhagat Ji Jewels, I would like to book a private showroom visit for:
- Name: ${name}
- Showroom: ${storeName}
- Date: ${date}
- Time: ${time}
- Occasion: ${occasion}
${notes ? `- Consultation Focus: ${notes}` : ""}`;

    inquireProduct(text);
  };

  return (
    <form
      onSubmit={handleBooking}
      className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-6 shadow-lg max-w-lg mx-auto space-y-5"
    >
      <div className="flex items-center gap-2 pb-4 border-b border-border/60">
        <Calendar className="text-gold h-5 w-5" />
        <h3 className="font-display text-xl font-bold text-text uppercase tracking-wide">Bespoke Appointment</h3>
      </div>

      <div className="space-y-4">
        {/* Name input */}
        <div>
          <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1 block">Full Name</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <User size={14} />
            </span>
            <input
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded text-xs text-text bg-transparent outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Store Selector */}
        <div>
          <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1 block">Select Showroom</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <MapPin size={14} />
            </span>
            <select
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded text-xs text-text bg-transparent outline-none focus:border-accent"
            >
              {STORE_LOCATIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date and Time selectors */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1 block">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded text-xs text-text bg-transparent outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1 block">Preferred Time</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Clock size={14} />
              </span>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-border rounded text-xs text-text bg-transparent outline-none focus:border-accent"
              >
                {["10:30 AM", "11:30 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Occasion Selection */}
        <div>
          <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1 block">Consultation Occasion</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <Star size={14} />
            </span>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded text-xs text-text bg-transparent outline-none focus:border-accent"
            >
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Consult note */}
        <div>
          <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1 block">Consultation Focus / Notes (Optional)</label>
          <textarea
            placeholder="E.g. looking for heavy kundan choker set, solitaire rings..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-border rounded text-xs text-text bg-transparent outline-none focus:border-accent resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors shadow"
        >
          Book via WhatsApp Concierge <ArrowRight size={13} />
        </button>

        <p className="text-[10px] text-center text-text-muted leading-relaxed">
          *Showroom consultations are private, free of charge, and offer bespoke preview options for collections.
        </p>
      </div>
    </form>
  );
}
