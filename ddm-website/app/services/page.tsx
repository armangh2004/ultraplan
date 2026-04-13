import type { Metadata } from "next";
import Image from "next/image";
import { SERVICE_ITEMS } from "@/lib/constants";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import GlassCard from "@/components/ui/GlassCard";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services & Concierge",
  description:
    "Explore Dream Drive Motors' full suite of bespoke automotive services — leasing, financing, credit assistance, trade-ins, nationwide delivery, and dedicated concierge.",
};

// Local high-res image paths
const HERO_BG = "/images/garage/gt3rs-showroom.jpg";
const BESPOKE_IMG = "/images/garage/ferrari-classic.jpg";

// Background images for service cards
const SERVICE_BG: Record<string, string> = {
  Leasing: "/images/garage/porsche-headlights.jpg",
  Financing: "/images/garage/bmw-ix3.jpg",
  "Sell / Trade-In": "/images/garage/dodge-challenger.jpg",
  Concierge: "/images/garage/mercedes-rear.jpg",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={HERO_BG}
            alt="Luxury interior detail"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover grayscale-[40%] brightness-75 scale-105"
          />
        </div>

        <ScrollReveal className="relative z-20 max-w-5xl space-y-12 mt-20">
          <div className="space-y-6">
            <span className="font-label text-[10px] uppercase tracking-[0.6em] text-primary/80 block">
              Established 2024
            </span>
            <h1 className="text-8xl md:text-[10rem] font-headline italic text-primary leading-[0.85] tracking-tighter text-glow">
              The Elite
              <br />
              Concierge
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-on-surface-variant font-light max-w-xl leading-relaxed">
            A legacy of distinction. Bespoke automotive services tailored for
            the most discerning collectors and enthusiasts worldwide.
          </p>
        </ScrollReveal>
      </section>

      {/* Mastery Section */}
      <section className="py-48 px-6 md:px-12 max-w-[1600px] mx-auto relative overflow-hidden">
        <ScrollReveal className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-16 relative z-10">
          <div className="space-y-6">
            <span className="font-label text-[10px] uppercase tracking-[0.5em] text-primary/60 block">
              Curated Services
            </span>
            <h2 className="text-7xl md:text-9xl font-headline italic text-on-surface leading-[1.05] tracking-tight">
              Mastery of the <br />
              Automotive Journey
            </h2>
          </div>
          <p className="text-on-surface-variant/70 max-w-md text-lg font-light leading-relaxed border-l border-primary/30 pl-10 mb-4">
            From acquisition to collection management, our comprehensive suite
            of services ensures every detail of your ownership is executed with
            absolute precision.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 relative z-10 border border-white/5">
          {SERVICE_ITEMS.map((item) => (
            <ServiceCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              href={item.href}
              backgroundImage={SERVICE_BG[item.title]}
              badge={item.badge}
            />
          ))}
        </StaggerReveal>
      </section>

      {/* Bespoke Experience Section */}
      <section className="py-56 px-6 md:px-12 bg-black relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 relative z-10">
          <ScrollReveal className="flex-1 space-y-14">
            <div className="space-y-6">
              <span className="font-label text-[10px] uppercase tracking-[0.5em] text-primary block">
                The Inner Circle
              </span>
              <h2 className="text-8xl md:text-[9rem] font-headline italic text-on-surface leading-[0.9] tracking-tighter">
                Bespoke
                <br />
                Experience
              </h2>
            </div>
            <p className="text-xl text-on-surface-variant leading-relaxed font-light max-w-xl">
              Our concierge team isn&apos;t just about sales&mdash;they are
              curators of a legacy. From sourcing elusive limited editions to
              managing global logistics, we offer attention that transcends the
              dealership model.
            </p>
            <div className="grid grid-cols-3 gap-16 border-t border-white/10 pt-16">
              <div className="space-y-3">
                <div className="text-5xl font-headline italic text-primary">
                  24/7
                </div>
                <div className="font-label text-[9px] tracking-[0.3em] text-on-surface-variant/50 uppercase">
                  Availability
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl font-headline italic text-primary">
                  50+
                </div>
                <div className="font-label text-[9px] tracking-[0.3em] text-on-surface-variant/50 uppercase">
                  Global Hubs
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl font-headline italic text-primary">
                  Elite
                </div>
                <div className="font-label text-[9px] tracking-[0.3em] text-on-surface-variant/50 uppercase">
                  Tier Status
                </div>
              </div>
            </div>
            <Button href="/contact" variant="tertiary" className="group flex items-center gap-8">
              <span className="text-[11px] uppercase tracking-[0.5em] font-medium">
                Inquire about membership
              </span>
              <span className="h-px w-24 bg-primary/30 group-hover:w-40 transition-all duration-1000 inline-block" />
            </Button>
          </ScrollReveal>

          <ScrollReveal direction="right" className="flex-1 relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <Image
                src={BESPOKE_IMG}
                alt="Collector lifestyle"
                fill
                sizes="100vw"
            quality={90}
                className="object-cover grayscale-[20%] brightness-75 transition-transform duration-[3s] hover:scale-110"
              />
            </div>
            <GlassCard className="absolute -bottom-16 -left-16 max-w-sm shadow-2xl z-20">
              <span className="material-symbols-outlined text-primary mb-8 text-4xl opacity-50">
                format_quote
              </span>
              <p className="text-2xl italic font-headline text-on-surface leading-relaxed">
                &ldquo;The attention to detail was beyond anything I&apos;ve
                experienced in thirty years of collecting.&rdquo;
              </p>
              <div className="mt-10 flex items-center gap-6">
                <div className="h-px w-10 bg-primary/40" />
                <p className="text-[10px] font-label tracking-[0.4em] text-primary uppercase">
                  Julian Vance, Collector
                </p>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
