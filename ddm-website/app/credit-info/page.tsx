import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import MonogramOverlay from "@/components/ui/MonogramOverlay";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Credit Application",
  description:
    "A bespoke financing journey designed for the discerning individual. Absolute discretion, accelerated processing, and terms as refined as the vehicles we curate.",
};

// Local high-res images
const HERO_IMG = "/images/garage/porsche-headlights.jpg";
const BANNER_IMG = "/images/garage/gt3rs-showroom.jpg";

export default function CreditInfoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-40 mb-16 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <span className="font-label text-primary uppercase tracking-[0.5em] text-[9px] block mb-6">
              Financial Distinction
            </span>
            <h1 className="font-headline text-7xl md:text-8xl italic leading-[0.95] text-on-surface mb-10">
              Secure Credit <br />
              <span className="not-italic font-extralight opacity-40">
                Application
              </span>
            </h1>
            <p className="font-body text-on-surface-variant text-lg max-w-md leading-relaxed mb-12">
              A bespoke financing journey designed for the discerning individual.
              Absolute discretion, accelerated processing, and terms as refined
              as the vehicles we curate.
            </p>
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-3">
                <span
                  className="material-symbols-outlined text-primary text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <span className="font-label text-[9px] uppercase tracking-[0.3em] opacity-60">
                  Tier-1 Encryption
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="material-symbols-outlined text-primary text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  timer
                </span>
                <span className="font-label text-[9px] uppercase tracking-[0.3em] opacity-60">
                  Rapid Prequalification
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="relative">
            <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5 relative">
              <Image
                src={HERO_IMG}
                alt="Luxury car interior"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-black p-10 border border-white/10 max-w-xs shadow-2xl">
              <p className="font-headline italic text-xl text-primary mb-3">
                &ldquo;Discretion is our hallmark.&rdquo;
              </p>
              <p className="font-label text-[8px] uppercase tracking-[0.4em] text-on-surface-variant">
                The Executive Concierge Team
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-6 md:px-12 py-16 md:py-24 relative bg-black">
        {/* Watermark */}
        <MonogramOverlay
          text="ELITE"
          size="text-[25rem]"
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center"
        />

        <ScrollReveal className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-headline text-5xl mb-6 italic">
              Personal Credentials
            </h2>
            <p className="font-label text-[10px] uppercase tracking-[0.5em] text-primary">
              Step 01 of 03 &mdash; Identity Verification
            </p>
          </div>

          <form className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              <div className="relative group">
                <label className="font-label text-[9px] uppercase tracking-[0.4em] text-on-surface-variant mb-3 block group-focus-within:text-primary transition-colors">
                  Legal Full Name
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-white/20 focus:border-primary focus:ring-0 text-on-surface py-3 px-0 transition-all font-body text-lg placeholder:text-white/10"
                  placeholder="e.g. Julian Vane"
                  type="text"
                />
              </div>
              <div className="relative group">
                <label className="font-label text-[9px] uppercase tracking-[0.4em] text-on-surface-variant mb-3 block group-focus-within:text-primary transition-colors">
                  Email Address
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-white/20 focus:border-primary focus:ring-0 text-on-surface py-3 px-0 transition-all font-body text-lg placeholder:text-white/10"
                  placeholder="liaison@private.com"
                  type="email"
                />
              </div>
              <div className="relative group">
                <label className="font-label text-[9px] uppercase tracking-[0.4em] text-on-surface-variant mb-3 block group-focus-within:text-primary transition-colors">
                  Phone Identification
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-white/20 focus:border-primary focus:ring-0 text-on-surface py-3 px-0 transition-all font-body text-lg placeholder:text-white/10"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
              </div>
              <div className="relative group">
                <label className="font-label text-[9px] uppercase tracking-[0.4em] text-on-surface-variant mb-3 block group-focus-within:text-primary transition-colors">
                  Preferred Contact Method
                </label>
                <select className="w-full bg-transparent border-0 border-b border-white/20 focus:border-primary focus:ring-0 text-on-surface py-3 px-0 transition-all font-body text-lg appearance-none cursor-pointer">
                  <option className="bg-black">Direct Call</option>
                  <option className="bg-black">Encrypted Message</option>
                  <option className="bg-black">Email Liaison</option>
                </select>
              </div>
            </div>

            {/* Tailored Structures Card */}
            <div className="pt-12">
              <div className="bg-black p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                <div className="max-w-md text-center md:text-left">
                  <h3 className="font-headline text-3xl italic mb-3">
                    Tailored Structures
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant opacity-80">
                    Selection of bespoke lease and finance paths available upon
                    identity confirmation.
                  </p>
                </div>
                <div className="flex gap-6">
                  <div className="px-8 py-4 bg-white/5 border border-white/10 flex items-center space-x-4">
                    <span className="material-symbols-outlined text-primary text-xl">
                      account_balance
                    </span>
                    <span className="font-label text-[9px] uppercase tracking-[0.4em]">
                      Lease
                    </span>
                  </div>
                  <div className="px-8 py-4 bg-white/5 border border-white/10 flex items-center space-x-4">
                    <span className="material-symbols-outlined text-primary text-xl">
                      payments
                    </span>
                    <span className="font-label text-[9px] uppercase tracking-[0.4em]">
                      Finance
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center pt-16">
              <Button variant="primary" size="lg" className="group">
                <span className="relative z-10 flex items-center gap-6">
                  Proceed to Verification
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-3 text-lg">
                    arrow_forward
                  </span>
                </span>
              </Button>
              <p className="mt-10 font-label text-[8px] text-on-surface-variant uppercase tracking-[0.3em] opacity-40">
                Your data is secured via 256-bit SSL encryption standards.
              </p>
            </div>
          </form>
        </ScrollReveal>
      </section>

      {/* Features Bento Grid */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Unrivaled Privacy (2-col) */}
          <div className="md:col-span-2 bg-black p-16 border border-white/5 flex flex-col justify-between group hover:border-primary/30 transition-all duration-500">
            <div>
              <span className="material-symbols-outlined text-5xl text-primary mb-12 block">
                verified
              </span>
              <h3 className="font-headline text-5xl mb-8 leading-tight italic">
                Unrivaled Privacy
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed max-w-xl text-lg">
                We handle only the essential data required for your application.
                All records are purged following successful completion of your
                acquisition, unless otherwise requested by your estate.
              </p>
            </div>
            <div className="mt-16 flex items-center text-primary gap-4 opacity-80 group-hover:opacity-100 transition-all">
              <span className="font-label text-[10px] uppercase tracking-[0.4em]">
                Review Privacy Protocol
              </span>
              <span className="material-symbols-outlined text-base">
                north_east
              </span>
            </div>
          </div>

          {/* 24/7 Concierge */}
          <div className="bg-black p-16 border border-white/5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-5xl text-primary mb-12 block">
                support_agent
              </span>
              <h3 className="font-headline text-4xl mb-8 italic">
                24/7 Global Concierge
              </h3>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Dedicated financial advisors available for immediate consultation
                at any hour, regardless of your time zone.
              </p>
            </div>
            <div className="mt-12">
              <span className="font-headline text-3xl text-primary">
                +1 800 DREAM
              </span>
            </div>
          </div>

          {/* Prestige Perks */}
          <div className="bg-black p-16 border border-white/5">
            <h4 className="font-label text-[10px] uppercase tracking-[0.5em] mb-12 text-primary">
              Prestige Perks
            </h4>
            <ul className="space-y-8 font-body text-base">
              <li className="flex items-start gap-6 group">
                <span className="material-symbols-outlined text-primary text-xl group-hover:scale-110 transition-transform">
                  star
                </span>
                <span className="opacity-80">Direct Underwriting Access</span>
              </li>
              <li className="flex items-start gap-6 group">
                <span className="material-symbols-outlined text-primary text-xl group-hover:scale-110 transition-transform">
                  star
                </span>
                <span className="opacity-80">
                  Priority Build-Slot Allocation
                </span>
              </li>
              <li className="flex items-start gap-6 group">
                <span className="material-symbols-outlined text-primary text-xl group-hover:scale-110 transition-transform">
                  star
                </span>
                <span className="opacity-80">Exclusive Gala Invitations</span>
              </li>
            </ul>
          </div>

          {/* Cinematic Banner */}
          <div className="md:col-span-2 relative border border-white/5 overflow-hidden aspect-[21/9]">
            <Image
              src={BANNER_IMG}
              alt="Cinematic abstract"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover grayscale brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-16">
              <p className="font-headline text-4xl text-on-surface italic">
                Experience the Extraordinary.
              </p>
            </div>
          </div>
        </StaggerReveal>
      </section>
    </>
  );
}
