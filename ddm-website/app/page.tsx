import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import TextSplit from "@/components/animation/TextSplit";
import NumberCounter from "@/components/animation/NumberCounter";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import HeroLambo from "@/components/sections/HeroLambo";

export const metadata: Metadata = {
  title: "Dream Drive Motors | Curated Automotive Excellence",
  description:
    "The gold standard in pre-owned automotive excellence and bespoke financial services. Explore our curated collection of luxury vehicles.",
};

// ─── High-res local images ───
const ABOUT_IMG = "/images/garage/porsche-headlights.jpg";
const CURATED_IMG = "/images/garage/ferrari-classic.jpg";
const ELITE_IMG = "/images/garage/bmw-ix3.jpg";

// ─── Data ───
const DDM_FEATURES = [
  {
    icon: "verified",
    title: "Multi-Point Pedigree",
    description:
      'Every vehicle passes a rigorous 180-point inspection to ensure it meets our "Master Spec" standards before it joins the DDM collection.',
  },
  {
    icon: "event_seat",
    title: "Bespoke Leasing",
    description:
      "Our concierge team crafts custom financial instruments designed to align with your seasonal liquidity and ownership goals.",
  },
  {
    icon: "local_shipping",
    title: "Nationwide White-Glove",
    description:
      "Enclosed delivery to your doorstep, anywhere in the continental United States, with a dedicated specialist for on-site orientation.",
  },
];

const HOMEPAGE_SERVICES = [
  {
    title: "Auto Leasing",
    description:
      "Flexible lease programs with competitive rates, crafted for clients who demand both performance and financial agility.",
    icon: "directions_car",
    href: "/services/leasing",
    image: "/images/garage/lambo-aventador.jpg",
  },
  {
    title: "Auto Financing",
    description:
      "Precision-structured financing solutions designed to complement your lifestyle and investment strategy.",
    icon: "account_balance",
    href: "/services/financing",
    image: "/images/garage/porsche-headlights.jpg",
  },
  {
    title: "Credit Application",
    description:
      "Discreet, accelerated processing through our streamlined credit pathway. Expert guidance at every step.",
    icon: "verified_user",
    href: "/services/credit-info",
    image: "/images/garage/mclaren-artura.jpg",
  },
  {
    title: "Sell Your Car",
    description:
      "Receive an immediate, no-obligation offer through our direct acquisition program. No listing delays.",
    icon: "sell",
    href: "/services/acquisition",
    image: "/images/garage/gt3rs-showroom.jpg",
  },
  {
    title: "Trade-Ins",
    description:
      "Premium valuations for your current vehicle. A seamless transition to your next chapter with DDM.",
    icon: "swap_horiz",
    href: "/services/trade-in",
    image: "/images/garage/ferrari-f8.jpg",
  },
  {
    title: "Home Delivery",
    description:
      "White-glove enclosed transport to your doorstep, anywhere in the continental United States.",
    icon: "local_shipping",
    href: "/services/delivery",
    image: "/images/garage/dodge-challenger.jpg",
  },
];

const STATS = [
  { end: 180, suffix: "+", label: "Point Inspection" },
  { end: 50, label: "States Delivered" },
  { end: 24, suffix: "/7", label: "Concierge Access" },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <header className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
        {/* Lambo background — cinematic reveal */}
        <HeroLambo />

        {/* Hero Content — sits on top of the lambo */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 pt-32 pb-8 text-center">
          {/* Pulsing badge */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border border-primary/40 px-5 py-2 mb-10 text-[10px] tracking-[0.25em] uppercase text-primary/90">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Baldwin Park, CA · Est. 2026
            </div>
          </ScrollReveal>

          <TextSplit
            as="h1"
            className="font-headline text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-6"
            splitBy="words"
            staggerDelay={0.08}
            duration={1}
          >
            Drive Your Ambition.
          </TextSplit>

          <ScrollReveal delay={0.3}>
            <p className="font-body text-lg md:text-xl text-white/50 mb-12 max-w-[580px] mx-auto leading-relaxed font-light">
              Premium auto leasing and sales made simple. Flexible financing,
              transparent process, and the keys to your dream car.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex gap-5 flex-wrap justify-center">
              <Button href="/inventory" variant="primary" size="md">
                Explore Collection
              </Button>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white/70 border border-white/20 hover:border-primary/60 hover:text-primary transition-all duration-500"
              >
                Our Services
              </Link>
            </div>
          </ScrollReveal>

          {/* Hero Stats */}
          <ScrollReveal delay={0.5}>
            <div className="flex gap-12 mt-16 justify-center flex-wrap">
              <div>
                <div className="font-headline text-3xl text-primary font-bold">
                  500+
                </div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-white/40 mt-1">
                  Happy Customers
                </div>
              </div>
              <div className="w-px bg-white/[0.06]" />
              <div>
                <div className="font-headline text-3xl text-primary font-bold">
                  All
                </div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-white/40 mt-1">
                  Credit Types Welcome
                </div>
              </div>
              <div className="w-px bg-white/[0.06]" />
              <div>
                <div className="font-headline text-3xl text-primary font-bold">
                  Fast
                </div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-white/40 mt-1">
                  Same-Day Approval
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] bg-gradient-to-t from-black to-transparent" />
      </header>

      {/* ─── About DDM — 65% text left / 35% image right ─── */}
      <section className="py-28 md:py-40 bg-black relative overflow-hidden">
        {/* Decorative gold line accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left — Text (65%) */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-8 block">
                  About Dream Drive Motors
                </span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8">
                  The Gold Standard in{" "}
                  <br className="hidden lg:block" />
                  <span className="serif-italic text-primary">
                    Automotive Excellence
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-5 max-w-[600px]">
                  Dream Drive Motors is not a dealership — it is a private
                  automotive atelier. We source, authenticate, and curate only
                  the most exceptional pre-owned luxury and performance vehicles
                  for collectors and enthusiasts who refuse to compromise.
                </p>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-16 max-w-[600px]">
                  From our Baldwin Park gallery to your doorstep, every
                  interaction is defined by discretion, precision, and an
                  unwavering commitment to excellence.
                </p>
              </ScrollReveal>

              {/* Stats Row */}
              <StaggerReveal className="grid grid-cols-3 gap-8 border-t border-white/[0.06] pt-10">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-headline text-4xl lg:text-5xl text-on-surface mb-2 tracking-tight">
                      <NumberCounter
                        end={stat.end}
                        suffix={stat.suffix || ""}
                        duration={2.5}
                      />
                    </div>
                    <span className="font-label text-[9px] tracking-[0.25em] uppercase text-white/35">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </StaggerReveal>
            </div>

            {/* Right — Porsche Image (35%) with seamless blending */}
            <ScrollReveal direction="right" className="lg:col-span-5">
              <div className="relative w-full h-[450px] lg:h-[620px] overflow-hidden">
                <Image
                  src={ABOUT_IMG}
                  alt="Porsche headlights in darkness"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={90}
                />
                {/* Seamless edge fade to black */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: [
                      "linear-gradient(to bottom, black 0%, transparent 12%, transparent 85%, black 100%)",
                      "linear-gradient(to right, black 0%, transparent 12%, transparent 85%, black 100%)",
                    ].join(", "),
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Curated Selection — image left / text right ─── */}
      <section className="py-28 md:py-40 bg-black relative">
        {/* Decorative gold line accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left — Ferrari Image with seamless blending */}
            <ScrollReveal direction="left" className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative w-full h-[450px] lg:h-[620px] overflow-hidden">
                <Image
                  src={CURATED_IMG}
                  alt="Ferrari in dark showroom"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={90}
                />
                {/* Seamless edge fade to black */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: [
                      "linear-gradient(to bottom, black 0%, transparent 12%, transparent 85%, black 100%)",
                      "linear-gradient(to right, black 0%, transparent 12%, transparent 85%, black 100%)",
                    ].join(", "),
                  }}
                />
              </div>
            </ScrollReveal>

            {/* Right — Text */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal>
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-8 block">
                  Our Collection
                </span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl mb-6 text-on-surface leading-[1.1]">
                  Curated{" "}
                  <span className="serif-italic text-primary">Selection</span>
                </h2>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-5 max-w-[540px]">
                  We source the world&apos;s finest automobiles across every
                  category — from exotic coupes and luxury SUVs to performance
                  sedans and grand tourers.
                </p>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-12 max-w-[540px]">
                  Every vehicle in our collection is hand-selected for its
                  provenance, condition, and desirability. We work with a global
                  network of collectors and dealers to bring you options that
                  never reach the open market.
                </p>
                <Link
                  href="/inventory"
                  className="group inline-flex items-center text-primary font-bold text-[10px] uppercase tracking-widest gap-2 hover:gap-4 transition-all duration-500"
                >
                  <span className="border-b border-primary/40 group-hover:border-primary pb-1 transition-colors duration-500">
                    View Full Collection
                  </span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Elite Service — text left / image right ─── */}
      <section className="py-28 md:py-40 bg-black relative overflow-hidden">
        {/* Decorative gold line accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Subtle ambient glow */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, #D4AF37 0%, transparent 70%)",
          }}
        />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left — Content */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
                  The DDM Difference
                </span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl mb-12 leading-tight">
                  Elite Service for <br />
                  <span className="serif-italic text-primary">
                    The Elite Driver
                  </span>
                </h2>
              </ScrollReveal>

              <StaggerReveal className="space-y-10">
                {DDM_FEATURES.map((feature) => (
                  <div key={feature.title} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-sm bg-white/[0.02] flex items-center justify-center flex-shrink-0 border border-primary/15 group-hover:border-primary/40 transition-colors duration-500">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{
                          fontVariationSettings: "'FILL' 1",
                        }}
                      >
                        {feature.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl md:text-2xl mb-2 text-on-surface">
                        {feature.title}
                      </h4>
                      <p className="text-white/40 text-sm leading-relaxed max-w-[440px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </StaggerReveal>
            </div>

            {/* Right — BMW Image with seamless blending */}
            <ScrollReveal direction="right" className="lg:col-span-5">
              <div className="relative w-full h-[450px] lg:h-[620px] overflow-hidden">
                <Image
                  src={ELITE_IMG}
                  alt="BMW iX3 illuminated"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={90}
                />
                {/* Seamless edge fade to black */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: [
                      "linear-gradient(to bottom, black 0%, transparent 12%, transparent 85%, black 100%)",
                      "linear-gradient(to right, black 0%, transparent 12%, transparent 85%, black 100%)",
                    ].join(", "),
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="py-28 md:py-40 bg-black relative">
        {/* Decorative gold line accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-20 text-center">
              <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
                What We Offer
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-on-surface">
                Our{" "}
                <span className="serif-italic text-primary">Services</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] overflow-hidden">
              {HOMEPAGE_SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="bg-black p-10 md:p-12 transition-all duration-700 group block relative overflow-hidden min-h-[320px]"
                >
                  {/* Hover background image — much more visible */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover opacity-0 group-hover:opacity-40 scale-[1.15] group-hover:scale-100 transition-all duration-[2s] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={90}
                    />
                    {/* Gradient overlay — keeps text readable while image is visible */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 100%)",
                      }}
                    />
                    {/* Gold tint on the bottom edge */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                      style={{
                        background: "linear-gradient(to top, rgba(212,175,55,0.08) 0%, transparent 40%)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-sm bg-white/[0.03] flex items-center justify-center mb-8 border border-primary/10 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-700">
                      <span
                        className="material-symbols-outlined text-primary text-lg"
                        style={{
                          fontVariationSettings: "'FILL' 1",
                        }}
                      >
                        {service.icon}
                      </span>
                    </div>
                    <h3 className="font-headline text-2xl md:text-3xl mb-3">
                      <span className="serif-italic text-on-surface group-hover:text-primary transition-colors duration-500">
                        {service.title}
                      </span>
                    </h3>
                    <p className="text-white/35 text-sm leading-relaxed mb-8 group-hover:text-white/60 transition-colors duration-500">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-primary/50 group-hover:text-primary font-bold text-[10px] uppercase tracking-widest gap-2 group-hover:gap-4 transition-all duration-500">
                      Learn More{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <CTASection
        headline={
          <>
            Begin Your{" "}
            <span className="serif-italic">Bespoke Journey</span>
          </>
        }
        subtitle="Whether you are acquiring your first exotic or expanding a collection, our concierge team is ready."
        primaryCTA={{ label: "Explore Collection", href: "/inventory" }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
