"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function StoreExperience() {
  return (
    <section id="store" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="The Flagship Experience"
          title="Visit Our Sanctuary of Gold"
          subtitle="Step into an atmosphere where every detail whispers luxury — personalized consultations, family warmth, and timeless elegance."
        />

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {[
            {
              img: "https://images.unsplash.com/photo-1617032213175-1fc37d0f3d41?w=600&q=80",
              title: "Luxury Ambiance",
              desc: "A palace-inspired showroom designed for intimate discovery.",
            },
            {
              img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad5?w=600&q=80",
              title: "Personal Consultation",
              desc: "One-on-one guidance from our master jewelers and family proprietors.",
            },
            {
              img: "https://images.unsplash.com/photo-1601121143461-5415b4e6c4b8?w=600&q=80",
              title: "Generational Trust",
              desc: "Where grandparents, parents, and children shop together — as family.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group relative aspect-[4/5] overflow-hidden">
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black-luxury via-black-luxury/30 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-8">
                  <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                  <p className="mt-2 text-sm text-ivory/60">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button href="#contact">Schedule Your Private Visit</Button>
        </Reveal>
      </div>
    </section>
  );
}
