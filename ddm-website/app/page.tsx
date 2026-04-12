import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VEHICLES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import TextSplit from "@/components/animation/TextSplit";
import ParallaxImage from "@/components/animation/ParallaxImage";
import MonogramOverlay from "@/components/ui/MonogramOverlay";
import Button from "@/components/ui/Button";
import VehicleCard from "@/components/ui/VehicleCard";
import BudgetSearch from "@/components/interactive/BudgetSearch";

export const metadata: Metadata = {
  title: "Dream Drive Motors | Curated Automotive Excellence",
  description:
    "The gold standard in pre-owned automotive excellence and bespoke financial services. Explore our curated collection of luxury vehicles.",
};

// Image URLs from design
const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVP6rMNleQeRlFOjCRUV6WUG2KHKNHLfQTkJTwLjcfTP8R39sTFmrzD6i23S9CfImYQQMEmLKtstbmC5IMIbUvFSlex0ibsHudZ6zek9G9cpcmDfMnNaNSgGWVdGurFWttPTDclWOZCxPt9AukvAf7ddFJ3eNA2YE8j6oOfvRhGWn16AQEDozFvkIWGlfymCgABMKty6yeXyUk7pnqp_8XxrtHA4gIblapToBncAr8feWuod1QLHnOL3akz-8sifHfiJcjrBtAYw";
const SHOWROOM_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuBmiTxjQD3VNN3YIbE1K209QgtZm00zAdKTRBkwcJt2rXzlk0CEq03qvjNvOllxpsZtM7TcOjY-0Yizm-L3RgOtJ6lC1HlQoEA_lwAsIgxUC2Ef4HnAaQEJIdE20TRBDIaOu-mvBpjbBpHSWnseArhnxiYTZZrpjfPq5qf-pCw3W4bqe6WB_QbRjdcAfXBbfs_J08EW3hNxubpLjdQQ8Q_LWGUmb57pNSugYGSeinlGspntVXPS0ssVqPPf3TYNI1tuV0gmFJU00";

// Pick vehicles for the bento grid
const featured = VEHICLES[0]; // Porsche 911 GT3 RS
const compact1 = VEHICLES[2]; // Range Rover SV
const compact2 = VEHICLES[3]; // Mercedes S 580

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

const SERVICES = [
  {
    title: "Sell or",
    highlight: "Trade",
    description:
      "We provide market-leading valuations for your current asset. Experience a seamless transition to your next dream drive.",
    cta: "Get Appraisal",
    href: "/services/trade-in",
  },
  {
    title: "The",
    highlight: "Leasing",
    afterHighlight: "Desk",
    description:
      "Unlock flexible ownership with DDM Leasing. Low commitments, high performance, and tax-efficient structures.",
    cta: "Explore Terms",
    href: "/services/leasing",
  },
  {
    title: "DDM",
    highlight: "Atelier",
    description:
      "Personalize your acquisition with ceramic coating, custom interiors, or performance upgrades before delivery.",
    cta: "View Upgrades",
    href: "/about",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <header className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt="Close-up of a luxury grand tourer"
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2">
          <div className="max-w-xl">
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">
              The Digital Concierge for Automotive Excellence
            </span>
            <TextSplit
              as="h1"
              className="font-headline text-6xl lg:text-8xl leading-none text-on-surface mb-8"
              splitBy="words"
              staggerDelay={0.08}
              duration={1}
            >
              Drive Your Ambition.
            </TextSplit>
            <p className="font-body text-lg text-on-surface-variant mb-12 max-w-md leading-relaxed">
              DREAM DRIVE MOTORS curates only the finest pre-owned performance
              and luxury vehicles for the discerning driver.
            </p>
            <div className="flex gap-4">
              <Button href="/inventory" variant="primary" size="md">
                Explore Collection
              </Button>
              <Button href="/services/leasing" variant="secondary" size="md">
                Lease Programs
              </Button>
            </div>
          </div>
        </div>

        {/* Budget Search Tool */}
        <BudgetSearch className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-20" />
      </header>

      {/* ─── Curated Selection ─── */}
      <section className="py-32 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="font-headline text-5xl mb-4 text-on-surface">
                  Curated{" "}
                  <span className="serif-italic text-primary">Selection</span>
                </h2>
                <p className="text-on-surface-variant text-sm tracking-wide">
                  The current limited-run inventory at our Baldwin Park atelier.
                </p>
              </div>
              <Link
                href="/inventory"
                className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] border-b border-primary pb-1 hover:text-on-surface hover:border-on-surface transition-all hidden md:inline-block"
              >
                View Full Inventory
              </Link>
            </div>
          </ScrollReveal>

          {/* Bento Grid */}
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto lg:h-[800px]">
              <div className="md:col-span-8">
                <VehicleCard
                  vehicle={featured}
                  variant="featured"
                  className="h-full"
                />
              </div>
              <div className="md:col-span-4 flex flex-col gap-8">
                <VehicleCard
                  vehicle={compact1}
                  variant="compact"
                  className="flex-1"
                />
                <VehicleCard
                  vehicle={compact2}
                  variant="compact"
                  className="flex-1"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── The DDM Difference ─── */}
      <section className="py-32 bg-surface-container-low relative overflow-hidden">
        <MonogramOverlay
          className="absolute top-0 right-0 p-24"
          opacity={0.03}
          size="text-[30rem]"
        />
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Image */}
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <Image
                src={SHOWROOM_IMG}
                alt="Luxury showroom interior"
                width={800}
                height={600}
                className="rounded-sm shadow-2xl border border-white/5 w-full h-auto"
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary mb-6 block">
                  The DDM Difference
                </span>
                <h2 className="font-headline text-5xl lg:text-6xl mb-8 leading-tight">
                  Elite Service for <br />
                  <span className="serif-italic text-primary">
                    The Elite Driver
                  </span>
                </h2>
              </ScrollReveal>

              <StaggerReveal className="space-y-10">
                {DDM_FEATURES.map((feature) => (
                  <div key={feature.title} className="flex gap-6">
                    <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20">
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
                      <h4 className="font-headline text-2xl mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Overview ─── */}
      <section className="py-32 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/5 rounded-sm overflow-hidden border border-white/5">
              {SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="bg-surface p-12 hover:bg-surface-container-low transition-colors duration-500 group block"
                >
                  <h3 className="font-headline text-3xl mb-4">
                    {service.title}{" "}
                    <span className="serif-italic text-primary">
                      {service.highlight}
                    </span>
                    {service.afterHighlight
                      ? ` ${service.afterHighlight}`
                      : ""}
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-primary font-bold text-[10px] uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
                    {service.cta}{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
