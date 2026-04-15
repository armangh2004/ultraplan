import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import SellCarForm from "@/components/interactive/SellCarForm";

export const metadata: Metadata = {
  title: "Sell Your Car | Dream Drive Motors",
  description:
    "Sell your car with ease. Get an immediate valuation and a competitive offer from Dream Drive Motors. Fast, convenient, and secure.",
};

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Submit Your Info",
    desc: "Fill out the form with your vehicle details and upload photos.",
    icon: "description",
  },
  {
    num: "02",
    title: "Get a Valuation",
    desc: "Our team reviews your submission and provides a competitive market valuation.",
    icon: "query_stats",
  },
  {
    num: "03",
    title: "Accept the Offer",
    desc: "Review the offer at your pace. No pressure, no obligations.",
    icon: "handshake",
  },
  {
    num: "04",
    title: "Get Paid",
    desc: "Accept and receive fast payment. We handle all the paperwork and logistics.",
    icon: "payments",
  },
];

const EDGE_FADE = [
  "linear-gradient(to bottom, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 55%, rgba(0,0,0,0.5) 75%, black 92%, black 100%)",
  "linear-gradient(to right, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 80%, black 92%, black 100%)",
].join(", ");

export default function AcquisitionPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/garage/gt3rs-showroom.jpg"
            alt="Porsche GT3 RS in showroom"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        <ScrollReveal className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
            Dream Drive Motors
          </span>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-6">
            Sell Your Car
          </h1>
          <p className="font-body text-lg md:text-xl text-white/50 max-w-[580px] mx-auto leading-relaxed font-light">
            A fast, easy, and convenient way to sell your vehicle. Submit your
            details below and receive a competitive offer&mdash;no hassle, no
            obligations.
          </p>
        </ScrollReveal>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
              How It Works
            </span>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-on-surface">
              Simple. Fast. Transparent.
            </h2>
          </ScrollReveal>

          <StaggerReveal
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                className="relative bg-white/[0.015] border border-white/[0.06] p-8 rounded-sm h-full flex flex-col group hover:border-primary/20 hover:shadow-gold-sm transition-all duration-500"
              >
                <span className="font-headline text-5xl text-white/5 italic absolute top-4 right-6 group-hover:text-primary/10 transition-colors duration-500">
                  {step.num}
                </span>

                <span
                  className="material-symbols-outlined text-primary text-3xl mb-5 block group-hover:scale-110 transition-transform duration-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {step.icon}
                </span>
                <h3 className="font-headline text-xl text-on-surface italic mb-3">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mt-auto">
                  {step.desc}
                </p>

                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary/15" />
                )}
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Form Section ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
                Get Started
              </span>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-on-surface">
                Vehicle &amp; Contact Information
              </h2>
              <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
                Provide your details and vehicle information below. The more
                information you include, the faster we can get you an accurate
                offer.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="bg-white/[0.015] border border-white/[0.06] p-8 md:p-14 rounded-sm">
              <SellCarForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Bottom Image ────────────────────────────────────────── */}
      <section className="relative h-[50vh] bg-black overflow-hidden">
        <ScrollReveal className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/garage/urus.jpg"
              alt="Lamborghini Urus in dramatic studio lighting"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-[center_55%] opacity-50"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: EDGE_FADE }}
            />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
