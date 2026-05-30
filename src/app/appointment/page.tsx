import { Metadata } from "next";
import { Sparkles, Calendar, Clock, ShieldCheck, Star } from "lucide-react";
import { AppointmentBooking } from "@/components/features/AppointmentBooking";
import { STORE_LOCATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book Showroom Appointment | Bhagat Ji Jewels",
  description: "Schedule a private consultation at our Chandausi, Moradabad, Bareilly, Aligarh, or Noida showrooms. Try on collections with expert stylists.",
};

export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark pt-[7.5rem] pb-24 lg:pt-[10.5rem]">
      {/* Title */}
      <section className="bg-white dark:bg-neutral-900 border-b border-border py-12 mb-12 text-center px-6">
        <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold flex justify-center items-center gap-1">
          <Sparkles size={10} className="text-gold" /> Personalized styling consultations
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text mt-3 uppercase tracking-wide">
          Book Showroom Appointment
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-xs text-text-muted leading-relaxed font-sans">
          Schedule a private viewing. Try on our royal bridal sets, custom kadas, or certified diamond rings with a dedicated heritage stylist.
        </p>
      </section>

      {/* Content Split */}
      <section className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-12 gap-12 items-start">
        
        {/* Benefits details */}
        <div className="md:col-span-7 space-y-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text uppercase tracking-wide">
              The Showroom Experience
            </h2>
            <p className="text-xs text-text-muted leading-relaxed mt-2">
              Every appointment is designed to offer maximum privacy, security, and dedicated guidance. Take all the time you need to select the perfect ornaments for your family legacy.
            </p>
          </div>

          {/* Core Perks */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2 border-l-2 border-accent pl-4">
              <h3 className="text-sm font-bold text-text uppercase tracking-wider">Private Suites</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Enjoy comfortable private viewing lounges away from the crowd, perfect for bridal fittings.
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-accent pl-4">
              <h3 className="text-sm font-bold text-text uppercase tracking-wider">Personal Stylist</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Receive undivided attention from our senior consultants to match your outfit and size preferences.
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-accent pl-4">
              <h3 className="text-sm font-bold text-text uppercase tracking-wider">Custom Studio</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Sketch, modify, and finalize custom designs with our jewelry designers present at your showroom.
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-accent pl-4">
              <h3 className="text-sm font-bold text-text uppercase tracking-wider">Purity Check</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Witness gold purity testing in real-time under our high-precision caratometer machines.
              </p>
            </div>
          </div>

          {/* Showroom Addresses list snippet */}
          <div className="bg-neutral-50 dark:bg-neutral-900/60 rounded-xl p-6 border border-border/60 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-text uppercase">Available Showrooms:</h4>
            <div className="divide-y divide-border/60 space-y-3.5 pt-2">
              {STORE_LOCATIONS.map((store) => (
                <div key={store.id} className="text-xs space-y-1 pt-3 first:pt-0">
                  <h5 className="font-bold text-text">{store.name}</h5>
                  <p className="text-[11px] text-text-muted leading-normal">{store.address}</p>
                  <p className="text-[10px] text-accent dark:text-gold uppercase tracking-wide">{store.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form widget */}
        <div className="md:col-span-5 sticky top-[9rem]">
          <AppointmentBooking />
        </div>

      </section>
    </div>
  );
}
