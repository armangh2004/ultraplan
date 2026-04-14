import type { Metadata } from "next";

import ScrollReveal from "@/components/animation/ScrollReveal";
import MonogramOverlay from "@/components/ui/MonogramOverlay";
import CreditApplicationForm from "@/components/interactive/CreditApplicationForm";

export const metadata: Metadata = {
  title: "Secure Credit Application",
  description:
    "A bespoke financing journey designed for the discerning individual. Absolute discretion, accelerated processing, and terms as refined as the vehicles we offer.",
};

const HERO_IMG = "/images/garage/mclaren-wheel.jpg";

const BENTO_BANNER = "/images/garage/gt3rs-showroom.jpg";

export default function ApplyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-16 relative max-w-screen-2xl mx-auto pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <ScrollReveal>
              <span className="font-label text-primary uppercase tracking-[0.4em] text-[10px] font-bold block mb-8">
                Financial Excellence
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-headline text-7xl md:text-8xl leading-[1.1] text-on-surface mb-10">
                Secure Credit <br />
                <span className="serif-italic text-primary">Application</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-on-surface-variant text-lg max-w-md leading-relaxed mb-12 font-light">
                A bespoke financing journey designed for the discerning
                individual. Absolute discretion, accelerated processing, and
                terms as refined as the vehicles we offer.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex items-center space-x-12">
                <div className="flex items-center space-x-4">
                  <span
                    className="material-symbols-outlined text-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] font-bold">
                    End-to-End Encryption
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className="material-symbols-outlined text-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    timer
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] font-bold">
                    60-Second Prequalification
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="right">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden shadow-2xl border border-outline-variant/20">
                <img
                  alt="Luxury car interior"
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                  src={HERO_IMG}
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-black p-10 shadow-2xl border border-outline-variant/20 max-w-xs">
                <p className="serif-italic text-2xl text-primary mb-3 leading-tight">
                  &ldquo;Discretion is our hallmark.&rdquo;
                </p>
                <p className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">
                  The DDM Concierge Team
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-6 md:px-12 bg-black-low py-16 md:py-24 relative overflow-hidden">
        <MonogramOverlay
          className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4"
          size="text-[50rem]"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-headline text-5xl mb-6">
                Personal Credentials
              </h2>
              <p className="font-label text-[11px] uppercase tracking-[0.4em] text-primary font-bold">
                Step 01 of 03 — Identity Verification
              </p>
            </div>
          </ScrollReveal>
          <CreditApplicationForm />
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Unrivaled Privacy - 2 col */}
          <ScrollReveal className="md:col-span-2">
            <div className="bg-black-low p-16 flex flex-col justify-between group hover:bg-black transition-all duration-500 border border-outline-variant/10 h-full">
              <div>
                <span
                  className="material-symbols-outlined text-5xl text-primary mb-10"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <h3 className="font-headline text-5xl mb-8 leading-tight">
                  Unrivaled Privacy
                </h3>
                <p className="font-body text-on-surface-variant text-lg leading-relaxed max-w-xl font-light">
                  We handle only the essential data required for your
                  application. All records are purged following successful
                  completion of your acquisition, unless otherwise requested.
                </p>
              </div>
              <div className="mt-16 flex items-center text-primary group-hover:gap-6 gap-4 transition-all">
                <span className="font-label text-[11px] uppercase tracking-[0.3em] border-b border-primary pb-1 font-bold">
                  Review Privacy Shield
                </span>
                <span className="material-symbols-outlined text-lg">
                  north_east
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* 24/7 Concierge */}
          <ScrollReveal delay={0.1}>
            <div className="bg-black-high p-16 relative overflow-hidden border border-outline-variant/10 flex flex-col h-full">
              <span className="material-symbols-outlined text-5xl text-primary mb-10">
                support_agent
              </span>
              <h3 className="font-headline text-4xl mb-8 italic">
                24/7 Concierge
              </h3>
              <p className="font-body text-base text-on-surface-variant leading-relaxed font-light mb-auto">
                Dedicated financial advisors available for immediate
                consultation at any hour, globally.
              </p>
              <div className="mt-12">
                <span className="serif-italic text-3xl text-primary block tracking-tight">
                  +1 800 DDM-ELITE
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Prestige Perks */}
          <ScrollReveal delay={0.15}>
            <div className="bg-black-low p-16 border border-outline-variant/15 hover:border-primary/20 transition-all duration-500 h-full">
              <h4 className="font-label text-[11px] uppercase tracking-[0.4em] mb-10 text-primary font-bold">
                Prestige Perks
              </h4>
              <ul className="space-y-8 font-body text-base font-light">
                <li className="flex items-center gap-5">
                  <span
                    className="material-symbols-outlined text-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="tracking-wide">
                    Direct line to Underwriting
                  </span>
                </li>
                <li className="flex items-center gap-5">
                  <span
                    className="material-symbols-outlined text-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="tracking-wide">
                    Priority Vehicle Allocation
                  </span>
                </li>
                <li className="flex items-center gap-5">
                  <span
                    className="material-symbols-outlined text-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="tracking-wide">Exclusive DDM Events</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Cinematic Banner - 2 col */}
          <ScrollReveal delay={0.2} className="md:col-span-2">
            <div className="relative overflow-hidden aspect-[21/9] border border-outline-variant/10 shadow-2xl">
              <img
                alt="Golden motion lines"
                className="w-full h-full object-cover"
                src={BENTO_BANNER}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-16">
                <p className="font-headline text-5xl text-on-surface tracking-tight">
                  Experience the Extraordinary.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
