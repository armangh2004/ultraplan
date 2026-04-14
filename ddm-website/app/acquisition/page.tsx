import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
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

export default function AcquisitionPage() {
  return (
    <>
      {/* Hero Section */}
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
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <ScrollReveal className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="font-label text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] mb-6 block">
            Dream Drive Motors
          </span>
          <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl italic text-white leading-tight mb-6">
            Sell Your Car
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            A fast, easy, and convenient way to sell your vehicle. Submit your
            details below and receive a competitive offer&mdash;no hassle, no
            obligations.
          </p>
        </ScrollReveal>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-label text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Get Started
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-white italic">
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
            <div className="bg-black border border-white/10 p-8 md:p-14 rounded-xl">
              <SellCarForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="font-label text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] mb-4 block">
              How It Works
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white italic">
              Simple. Fast. Transparent.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="relative bg-black border border-white/10 p-8 rounded-xl h-full group hover:border-[#D4AF37]/30 transition-colors">
                  {/* Step number */}
                  <span className="font-headline text-5xl text-white/5 italic absolute top-4 right-6 group-hover:text-[#D4AF37]/10 transition-colors">
                    {step.num}
                  </span>

                  <span
                    className="material-symbols-outlined text-[#D4AF37] text-3xl mb-5 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {step.icon}
                  </span>
                  <h3 className="font-headline text-xl text-white italic mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Connector line (visible on large screens, not on last item) */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-white/10" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
