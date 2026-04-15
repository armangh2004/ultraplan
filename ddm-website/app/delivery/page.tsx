import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import NumberCounter from "@/components/animation/NumberCounter";
import ParallaxImage from "@/components/animation/ParallaxImage";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Bespoke Home Delivery",
  description:
    "White-glove vehicle delivery to your door. Enclosed transport, real-time tracking, and a personal handover ceremony for every client.",
};

const STEPS = [
  {
    num: "01",
    title: "Preparation",
    desc: "Your vehicle undergoes a meticulous detail and 120-point quality inspection before loading into our climate-controlled enclosed trailer.",
    icon: "auto_awesome",
  },
  {
    num: "02",
    title: "In Transit",
    desc: "Real-time GPS tracking with live photo updates at every milestone. You'll always know exactly where your vehicle is.",
    icon: "local_shipping",
  },
  {
    num: "03",
    title: "Arrival",
    desc: "A personal concierge guides you through a comprehensive orientation and hands you the keys at your door.",
    icon: "home",
  },
];

const FEATURES = [
  {
    icon: "verified_user",
    title: "Fully Insured Transit",
    desc: "Comprehensive bumper-to-bumper coverage from the moment your vehicle leaves our facility until it's in your hands.",
  },
  {
    icon: "thermostat",
    title: "Climate-Controlled",
    desc: "Custom-engineered enclosed trailers protect against UV, humidity, road debris, and temperature extremes.",
  },
  {
    icon: "support_agent",
    title: "Dedicated Concierge",
    desc: "A single point of contact manages your entire delivery from scheduling to the final walk-around at your residence.",
  },
  {
    icon: "timer",
    title: "Precise Scheduling",
    desc: "Choose your preferred delivery window. Our logistics team coordinates arrival within a 30-minute margin.",
  },
];

/* Seamless edge-fade gradients — blend images into the black background */
const EDGE_FADE = [
  "linear-gradient(to bottom, black 0%, transparent 10%, transparent 88%, black 100%)",
  "linear-gradient(to right, black 0%, transparent 10%, transparent 88%, black 100%)",
].join(", ");

/* Heavy fade for editorial images — fully dissolves all edges into black */
const EDGE_FADE_HEAVY = [
  "linear-gradient(to bottom, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 55%, rgba(0,0,0,0.5) 75%, black 92%, black 100%)",
  "linear-gradient(to right, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 80%, black 92%, black 100%)",
].join(", ");

export default function DeliveryPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/garage/rr.jpg"
            alt="Rolls Royce ready for delivery"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[center_40%] hidden md:block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </div>

        <ScrollReveal className="relative z-10 max-w-4xl text-center mx-auto">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
            White-Glove Service
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-6 md:mb-10">
            Delivered to <br /> Your Door.
          </h1>
          <p className="font-body text-lg md:text-xl text-white/50 max-w-[580px] mx-auto leading-relaxed font-light">
            Every vehicle leaves our facility in showroom condition and arrives
            with a personal handover ceremony — wherever you are.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Process Timeline ────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <ScrollReveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
            The Process
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline italic text-on-surface">
            From Our Hands to Yours
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto"
          staggerDelay={0.15}
        >
          {STEPS.map((step) => (
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

      {/* ── Editorial: White-Glove — text left / image right ───── */}
      <section className="py-16 md:py-20 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left — Text */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
                  The Handover
                </span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8">
                  A Ceremony, <br className="hidden lg:block" />
                  <span className="serif-italic text-primary">
                    Not a Drop-Off.
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-5 max-w-[600px]">
                  Every delivery is orchestrated by a Senior Product Concierge
                  who transforms a simple handover into a curated experience.
                  From a comprehensive vehicle orientation to syncing your
                  digital preferences, every detail is addressed in the comfort
                  of your residence.
                </p>
              </ScrollReveal>

              <StaggerReveal className="space-y-5 mb-10 pt-4" staggerDelay={0.1}>
                {[
                  "Full vehicle orientation and feature walkthrough",
                  "Seat memory, drive modes, and infotainment configured to your preferences",
                  "Complete documentation package presented and reviewed",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <span
                      className="material-symbols-outlined text-primary text-lg mt-0.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-white/50 text-sm">{item}</span>
                  </div>
                ))}
              </StaggerReveal>

              <ScrollReveal delay={0.25}>
                <Button href="/contact" variant="primary" size="md">
                  Schedule Delivery
                </Button>
              </ScrollReveal>
            </div>

            {/* Right — Genesis Image with seamless edge blending */}
            <ScrollReveal direction="right" className="lg:col-span-5">
              <div className="relative w-full h-[260px] md:h-[380px] lg:h-[500px] overflow-hidden">
                <Image
                  src="/images/garage/carbon.png"
                  alt="Carbon fiber Porsche in studio lighting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={90}
                  className="object-cover object-[10%_center]"
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

      {/* ── Features Grid ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <ScrollReveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
            Our Standard
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline italic text-on-surface">
            Built Around Care
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto"
          staggerDelay={0.1}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-8 md:p-10 rounded-sm border border-white/[0.06] hover:border-primary/15 transition-all duration-500 group bg-white/[0.015]"
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
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* ── Stats Strip ─────────────────────────────────────────── */}
      <section className="py-16 bg-black border-y border-white/[0.04]">
        <StaggerReveal
          className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/[0.06]"
          staggerDelay={0.12}
        >
          <div className="md:px-8 text-center">
            <div className="font-headline italic text-4xl md:text-5xl text-primary mb-2">
              <NumberCounter end={500} />+
            </div>
            <div className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant">
              Vehicles Delivered
            </div>
          </div>
          <div className="md:px-8 text-center">
            <div className="font-headline italic text-4xl md:text-5xl text-primary mb-2">
              <NumberCounter end={48} />
            </div>
            <div className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant">
              State Coverage
            </div>
          </div>
          <div className="md:px-8 text-center">
            <div className="font-headline italic text-4xl md:text-5xl text-primary mb-2">
              <NumberCounter end={100} />%
            </div>
            <div className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant">
              Enclosed Transport
            </div>
          </div>
          <div className="md:px-8 text-center">
            <div className="font-headline italic text-4xl md:text-5xl text-on-surface mb-2">
              0
            </div>
            <div className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant">
              Damage Claims
            </div>
          </div>
        </StaggerReveal>
      </section>

      {/* ── Editorial: Coverage — image left / text right ────────  */}
      <section className="py-16 md:py-20 bg-black relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left — P1 Image with seamless edge blending */}
            <ScrollReveal direction="left" className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative w-full h-[260px] md:h-[380px] lg:h-[500px] overflow-hidden">
                <Image
                  src="/images/garage/812.jpg"
                  alt="Ferrari 812 Superfast front view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={90}
                  className="object-cover object-[center_45%]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: EDGE_FADE_HEAVY }}
                />
              </div>
            </ScrollReveal>

            {/* Right — Text */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal>
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
                  Nationwide Reach
                </span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8">
                  Coast to Coast, <br className="hidden lg:block" />
                  <span className="serif-italic text-primary">
                    Door to Door.
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-5 max-w-[600px]">
                  From California to New York, Dream Drive Motors maintains a
                  nationwide logistics network. Whether you are in a major city
                  or a remote estate, we deliver with the same standard of care
                  and precision.
                </p>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-[600px]">
                  Our fleet of enclosed transporters operates on optimized
                  routes with real-time monitoring. Every vehicle is
                  individually secured, climate-protected, and tracked via GPS
                  from departure to your doorstep.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Button href="/contact" variant="secondary" size="md">
                  Get a Delivery Quote
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Showcase Gallery with Parallax ───────────────────────  */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <ScrollReveal className="text-center mb-12 max-w-2xl mx-auto">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
            Recently Delivered
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline italic text-on-surface">
            Arriving in Style
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto"
          staggerDelay={0.12}
        >
          {[
            { src: "/images/garage/redp.jpg", alt: "Ferrari Purosangue Roma" },
            { src: "/images/garage/bentley_close.jpg", alt: "Bentley Continental Detail" },
            { src: "/images/garage/purosangue.jpg", alt: "Ferrari Purosangue" },
          ].map((img) => (
            <div
              key={img.src}
              className="relative h-56 md:h-72 lg:h-80 overflow-hidden group"
            >
              <ParallaxImage
                src={img.src}
                alt={img.alt}
                className="h-full w-full"
              />
              {/* Seamless edge fade */}
              <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ background: EDGE_FADE }}
              />
              {/* Hover overlay with label */}
              <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-[3] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <CTASection
        headline="Ready for Your Arrival?"
        subtitle="Contact our delivery team to schedule a white-glove handover at your convenience."
        primaryCTA={{ label: "Schedule Delivery", href: "/contact" }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
