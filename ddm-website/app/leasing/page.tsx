import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import NumberCounter from "@/components/animation/NumberCounter";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Bespoke Auto Leasing",
  description:
    "Redefining ownership through curated flexibility. Experience the world's finest automobiles with terms as refined as the vehicles themselves.",
};

const EDGE_FADE_HEAVY = [
  "linear-gradient(to bottom, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 55%, rgba(0,0,0,0.5) 75%, black 92%, black 100%)",
  "linear-gradient(to right, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 80%, black 92%, black 100%)",
].join(", ");

export default function LeasingPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/images/garage/supercar-showroom.jpg"
            alt="Luxury sports car in minimalist gallery"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <ScrollReveal className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
            The Bespoke Program
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-8">
            Bespoke Auto{" "}
            <span className="text-primary serif-italic">Leasing</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/50 max-w-[580px] mx-auto leading-relaxed font-light mb-10">
            Redefining ownership through curated flexibility. Experience the
            world&apos;s finest automobiles with terms as refined as the vehicles
            themselves.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Inquire Now
          </Button>
        </ScrollReveal>
      </section>

      {/* ── Key Benefits ────────────────────────────────────────── */}
      <section className="py-14 md:py-16 px-6 md:px-12 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <ScrollReveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-primary font-label uppercase tracking-[0.4em] text-[10px] mb-6 block">
            Why Lease with DDM
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline italic text-on-surface">
            The DDM Advantage
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto"
          staggerDelay={0.1}
        >
          {[
            {
              icon: "tune",
              title: "Curated Terms",
              desc: "Financial structures tailored to your portfolio, offering tax-optimized solutions and flexible milestones.",
            },
            {
              icon: "swap_horiz",
              title: "Seamless Rotation",
              desc: "Transition into the latest releases every 12 to 24 months, keeping your garage at the cutting edge.",
            },
            {
              icon: "build",
              title: "Full Maintenance",
              desc: "Every scheduled service, wear item, and unexpected repair is covered for the entire lease term.",
            },
            {
              icon: "star",
              title: "Priority Access",
              desc: "Lease members receive first-right on limited editions and heritage vehicles before public listing.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-8 md:p-10 rounded-sm border border-white/[0.06] hover:border-primary/15 transition-all duration-500 group bg-white/[0.015] h-full flex flex-col"
            >
              <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center mb-6 group-hover:border-primary/40 group-hover:shadow-gold-sm transition-all duration-500">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {f.icon}
                </span>
              </div>
              <h3 className="text-lg font-headline italic mb-3 text-on-surface">
                {f.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-auto">
                {f.desc}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* ── Editorial: text left / image right ──────────────────── */}
      <section className="py-14 md:py-16 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="text-primary font-label uppercase tracking-[0.4em] text-[10px] mb-6 block">
                  The Art of the Lease
                </span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8">
                  Drive More,{" "}
                  <span className="serif-italic text-primary">Own Less.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-5 max-w-[600px]">
                  Our leasing program is designed for enthusiasts who want the
                  thrill of driving the world&apos;s finest cars without the
                  long-term commitment. Lower monthly payments, zero depreciation
                  risk, and the freedom to upgrade whenever you want.
                </p>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-[600px]">
                  Whether it&apos;s an exotic weekend car or a daily luxury
                  sedan, our concierge team structures every lease around your
                  lifestyle — not a spreadsheet.
                </p>
              </ScrollReveal>

              <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10" staggerDelay={0.1}>
                <div className="border border-white/[0.05] bg-white/[0.015] rounded-sm p-5">
                  <div className="font-headline text-2xl sm:text-3xl lg:text-4xl text-primary mb-1 tracking-tight">
                    <NumberCounter end={12} />-<NumberCounter end={60} />
                  </div>
                  <span className="font-label text-[9px] tracking-[0.25em] uppercase text-white/35">
                    Month Terms
                  </span>
                </div>
                <div className="border border-white/[0.05] bg-white/[0.015] rounded-sm p-5">
                  <div className="font-headline text-2xl sm:text-3xl lg:text-4xl text-primary mb-1 tracking-tight">
                    $0
                  </div>
                  <span className="font-label text-[9px] tracking-[0.25em] uppercase text-white/35">
                    Down Available
                  </span>
                </div>
                <div className="border border-white/[0.05] bg-white/[0.015] rounded-sm p-5">
                  <div className="font-headline text-2xl sm:text-3xl lg:text-4xl text-primary mb-1 tracking-tight">
                    <NumberCounter end={100} />%
                  </div>
                  <span className="font-label text-[9px] tracking-[0.25em] uppercase text-white/35">
                    Maintenance Covered
                  </span>
                </div>
              </StaggerReveal>

              <ScrollReveal delay={0.25}>
                <Button href="/apply" variant="primary" size="md">
                  Apply for a Lease
                </Button>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right" className="lg:col-span-5">
              <div className="relative w-full h-[260px] md:h-[380px] lg:h-[500px] overflow-hidden">
                <Image
                  src="/images/garage/red.jpg"
                  alt="Ferrari SF90 Spider in studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={90}
                  className="object-cover object-[center_50%]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: EDGE_FADE_HEAVY }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── How Leasing Works ───────────────────────────────────── */}
      <section className="py-14 md:py-16 px-6 md:px-12 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <ScrollReveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-primary font-label uppercase tracking-[0.4em] text-[10px] mb-6 block">
            The Process
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline italic text-on-surface">
            How It Works
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-xl mx-auto"
          staggerDelay={0.15}
        >
          {[
            {
              num: "01",
              icon: "search",
              title: "Choose Your Car",
              desc: "Browse our curated collection or tell us exactly what you want. We source vehicles from our network of trusted partners worldwide.",
            },
            {
              num: "02",
              icon: "description",
              title: "Custom Structure",
              desc: "Our concierge team builds a lease around your preferences — term length, mileage, down payment, and monthly budget.",
            },
            {
              num: "03",
              icon: "key",
              title: "Drive Away",
              desc: "Sign digitally, schedule delivery or pickup, and start driving. When the lease ends, upgrade, extend, or walk away.",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="relative p-6 md:p-10 lg:p-12 rounded-sm border border-white/[0.06] hover:border-primary/15 transition-all duration-500 group bg-white/[0.015] h-full flex flex-col"
            >
              <span className="absolute top-8 right-8 font-headline italic text-6xl text-white/[0.04] group-hover:text-primary/10 transition-colors duration-500 select-none">
                {step.num}
              </span>
              <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center mb-8 group-hover:border-primary/40 transition-colors duration-500">
                <span
                  className="material-symbols-outlined text-primary text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {step.icon}
                </span>
              </div>
              <h3 className="text-2xl font-headline italic mb-4 text-on-surface">
                {step.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <CTASection
        headline={
          <>
            Begin Your <span className="text-primary">Journey</span>
          </>
        }
        subtitle="Our concierge team is ready to craft a leasing program that aligns with your lifestyle."
        primaryCTA={{ label: "Speak with Concierge", href: "/contact" }}
        secondaryCTA={{ label: "Apply for Credit", href: "/apply" }}
        backgroundImage="/images/garage/aston.jpg"
      />
    </>
  );
}
