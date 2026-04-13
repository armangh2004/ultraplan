import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Seamless Trade-Ins",
  description:
    "Moving between masterpieces should be as effortless as the drive itself. Our Seamless Trade-In program ensures your legacy continues without interruption.",
};

// Local high-res images
const HERO_MODERN = "/images/garage/porsche-headlights.jpg";
const HERO_VINTAGE = "/images/garage/ferrari-classic.jpg";
const BENTO_BG = "/images/garage/supercar-showroom.jpg";

export default function TradeInPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-32 mb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal className="lg:col-span-7">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">
              Concierge Trade-In Service
            </span>
            <h1 className="font-headline text-6xl md:text-8xl leading-tight mb-8">
              The Perfect <br />
              <span className="text-primary serif-italic">Transition.</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed font-light mb-12">
              Moving between masterpieces should be as effortless as the drive
              itself. Our Seamless Trade-In program ensures your legacy continues
              without interruption.
            </p>
            <div className="flex items-center gap-8">
              <Button href="/contact" variant="primary" size="lg">
                Evaluate My Collection
              </Button>
              <div className="flex flex-col">
                <span className="text-primary font-headline text-2xl italic">
                  Maximum Value
                </span>
                <span className="font-label text-[10px] uppercase tracking-widest opacity-60">
                  Applied to your next acquisition
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl relative z-10 border border-outline-variant/20">
              <Image
                src={HERO_MODERN}
                alt="Modern black supercar"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 w-2/3 aspect-square rounded-sm overflow-hidden shadow-2xl border-4 border-black z-20 hidden md:block">
              <Image
                src={HERO_VINTAGE}
                alt="Vintage silver car"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Valuation Section */}
      <section className="bg-black py-32 px-6 md:px-12 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <ScrollReveal className="space-y-16">
              <div>
                <h2 className="font-headline text-5xl mb-6">
                  A Legacy{" "}
                  <span className="serif-italic text-primary">Reimagined</span>
                </h2>
                <p className="text-on-surface-variant leading-relaxed text-lg font-light">
                  We don&apos;t just assess market data; we evaluate the
                  provenance, condition, and soul of your vehicle. Our experts
                  ensure that the value of your current asset is perfectly
                  captured and translated into your next masterpiece.
                </p>
              </div>
              <StaggerReveal className="grid grid-cols-1 gap-12">
                <div className="group">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-primary/10 text-primary border border-primary/20">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        diamond
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline text-2xl mb-2 text-on-surface">
                        Bespoke Appraisals
                      </h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        On-site evaluations by our master technicians, ensuring
                        every nuance of your vehicle is accounted for.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-primary/10 text-primary border border-primary/20">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        trending_up
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline text-2xl mb-2 text-on-surface">
                        Portfolio Integration
                      </h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        Direct application of equity toward your new acquisition,
                        simplifying the transactional complexity of luxury
                        ownership.
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerReveal>
            </ScrollReveal>

            {/* Form Card */}
            <ScrollReveal direction="right">
              <div className="bg-black p-1 rounded-sm shadow-2xl border border-outline-variant/20">
                <div className="bg-black p-10 space-y-8 rounded-sm">
                  <h3 className="font-headline text-3xl font-light">
                    Inquire for{" "}
                    <span className="serif-italic text-primary">Valuation</span>
                  </h3>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">
                        Vehicle Identification
                      </label>
                      <input
                        className="w-full bg-black border-none focus:ring-0 rounded-sm py-4 px-4 text-on-surface text-sm placeholder:opacity-30"
                        placeholder="Year, Make & Model"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">
                        Estimated Mileage
                      </label>
                      <input
                        className="w-full bg-black border-none focus:ring-0 rounded-sm py-4 px-4 text-on-surface text-sm placeholder:opacity-30"
                        placeholder="Current Odometer Reading"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">
                        Next Masterpiece Interest
                      </label>
                      <select className="w-full bg-black border-none focus:ring-0 rounded-sm py-4 px-4 text-on-surface text-sm">
                        <option>Select Inventory Category</option>
                        <option>Modern Performance</option>
                        <option>Vintage Heritage</option>
                        <option>Bespoke Commissions</option>
                      </select>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full mt-4"
                      size="lg"
                    >
                      Request Private Consultation
                    </Button>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bento Grid - DDM Standard */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16">
            <h2 className="font-headline text-4xl mb-4 italic">
              The DDM Standard
            </h2>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
              Excellence in every detail
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Market Knowledge (2-col, 2-row) */}
            <div className="md:col-span-2 md:row-span-2 glass-card rounded-sm p-12 flex flex-col justify-end relative overflow-hidden group border border-outline-variant/15">
              <Image
                src={BENTO_BG}
                alt="Interior detail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 -z-10"
              />
              <h4 className="font-headline text-3xl mb-4 italic text-on-surface relative z-10">
                Unrivaled Market Knowledge
              </h4>
              <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed relative z-10">
                Our curators possess deep insights into global auction trends and
                private sale data to secure your vehicle&apos;s true worth.
              </p>
            </div>

            {/* Tax Efficiency */}
            <div className="md:col-span-2 glass-card rounded-sm p-8 flex items-center justify-between border border-outline-variant/15">
              <div className="max-w-xs">
                <h4 className="font-headline text-2xl mb-2 italic">
                  Tax Efficiency
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Experience the financial advantages of trading in through DDM,
                  leveraging legislative benefits for collection rotation.
                </p>
              </div>
              <span className="material-symbols-outlined text-primary text-5xl opacity-30">
                account_balance
              </span>
            </div>

            {/* 24h Stat */}
            <div className="md:col-span-1 glass-card rounded-sm p-8 flex flex-col justify-center text-center space-y-4 border border-outline-variant/15">
              <span className="font-headline text-5xl text-primary font-light">
                24h
              </span>
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Initial Valuation
              </p>
            </div>

            {/* Certified Badge */}
            <div className="md:col-span-1 glass-card rounded-sm p-8 flex flex-col justify-center text-center space-y-4 border border-outline-variant/15">
              <span
                className="material-symbols-outlined text-primary text-4xl mx-auto"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Certified Integrity
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 px-6 md:px-12 bg-black border-y border-outline-variant/15">
        <ScrollReveal className="max-w-4xl mx-auto text-center">
          <span
            className="material-symbols-outlined text-primary text-6xl mb-8"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            format_quote
          </span>
          <blockquote className="font-headline text-3xl md:text-5xl italic leading-tight mb-12 text-on-surface">
            &ldquo;Dream Drive Motors understands that a collection is dynamic.
            They didn&apos;t just buy my car; they facilitated the evolution of my
            passion.&rdquo;
          </blockquote>
          <cite className="not-italic">
            <span className="font-label text-xs uppercase tracking-widest block text-primary font-bold">
              Lord Julian Sterling
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest opacity-40">
              Private Collector
            </span>
          </cite>
        </ScrollReveal>
      </section>
    </>
  );
}
