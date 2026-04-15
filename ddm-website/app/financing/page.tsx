import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import NumberCounter from "@/components/animation/NumberCounter";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Precision Auto Financing",
  description:
    "Precision Auto Financing at Dream Drive Motors. Competitive rates, fast approvals, and a concierge team that handles everything on your behalf.",
};

const EDGE_FADE_HEAVY = [
  "linear-gradient(to bottom, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 55%, rgba(0,0,0,0.5) 75%, black 92%, black 100%)",
  "linear-gradient(to right, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 80%, black 92%, black 100%)",
].join(", ");

const EDGE_FADE = [
  "linear-gradient(to bottom, black 0%, transparent 10%, transparent 88%, black 100%)",
  "linear-gradient(to right, black 0%, transparent 10%, transparent 88%, black 100%)",
].join(", ");

export default function FinancingPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/images/garage/mecy.jpg"
            alt="Mercedes 300 SL Gullwing in luxury showroom"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[center_55%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <ScrollReveal className="relative z-10 max-w-4xl text-center mx-auto">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
            Bespoke Capital Solutions
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-8">
            Financial <br />
            <span className="text-primary serif-italic">Engineering.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/50 max-w-[580px] mx-auto leading-relaxed font-light">
            Competitive rates, fast approvals, and a concierge team that handles
            the entire financing process on your behalf — so you can focus on the
            drive.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Key Stats ───────────────────────────────────────────── */}
      <section className="py-14 bg-black border-y border-white/[0.04]">
        <StaggerReveal
          className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/[0.06]"
          staggerDelay={0.12}
        >
          <div className="md:px-8 text-center">
            <div className="font-headline italic text-4xl md:text-5xl text-primary mb-2">
              3.2%
            </div>
            <div className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant">
              Prime Entry Rate
            </div>
          </div>
          <div className="md:px-8 text-center">
            <div className="font-headline italic text-4xl md:text-5xl text-primary mb-2">
              <NumberCounter end={24} />h
            </div>
            <div className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant">
              Approval Window
            </div>
          </div>
          <div className="md:px-8 text-center">
            <div className="font-headline italic text-4xl md:text-5xl text-primary mb-2">
              $0
            </div>
            <div className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant">
              Early Exit Fees
            </div>
          </div>
          <div className="md:px-8 text-center">
            <div className="font-headline italic text-4xl md:text-5xl text-primary mb-2">
              <NumberCounter end={30} />+
            </div>
            <div className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant">
              Lending Partners
            </div>
          </div>
        </StaggerReveal>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <ScrollReveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-primary font-label uppercase tracking-[0.4em] text-[10px] mb-6 block">
            The Process
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline italic text-on-surface">
            How Financing Works
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-xl mx-auto"
          staggerDelay={0.15}
        >
          {[
            {
              num: "01",
              icon: "description",
              title: "Apply Online",
              desc: "Complete our secure credit application in under 60 seconds. Our team receives your information instantly and begins working on your behalf.",
            },
            {
              num: "02",
              icon: "account_balance",
              title: "We Shop for You",
              desc: "Our concierge submits your profile to our network of 30+ lending partners to find the most competitive rates and terms available.",
            },
            {
              num: "03",
              icon: "key",
              title: "Drive Away",
              desc: "Review your tailored offer, sign digitally, and pick up your vehicle. We handle the title, registration, and all the paperwork.",
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

      {/* ── Editorial: Philosophy — text left / image right ───── */}
      <section className="py-16 md:py-20 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="text-primary font-label uppercase tracking-[0.4em] text-[10px] mb-6 block">
                  Our Approach
                </span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8">
                  We Handle{" "}
                  <span className="serif-italic text-primary">Everything.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-5 max-w-[600px]">
                  Traditional financing means shopping rates yourself, juggling
                  bank calls, and drowning in paperwork. At DDM, our concierge
                  team does all of that for you. We leverage relationships with
                  over 30 lending partners to negotiate the best possible terms.
                </p>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-[600px]">
                  Whether you are a first-time buyer or expanding a collection,
                  every financing package is structured around your goals — not a
                  one-size-fits-all template.
                </p>
              </ScrollReveal>

              <StaggerReveal className="space-y-5 mb-10" staggerDelay={0.1}>
                {[
                  "Private lender network with tier-one rates",
                  "No early exit penalties or hidden fees",
                  "All paperwork, title, and registration handled by DDM",
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
                <Button href="/apply" variant="primary" size="md">
                  Apply for Financing
                </Button>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right" className="lg:col-span-5">
              <div className="relative w-full h-[260px] md:h-[380px] lg:h-[500px] overflow-hidden">
                <Image
                  src="/images/garage/porsche-headlights.jpg"
                  alt="Porsche headlights detail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={90}
                  className="object-cover object-center"
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
          <span className="text-primary font-label uppercase tracking-[0.4em] text-[10px] mb-6 block">
            Why DDM Financing
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline italic text-on-surface">
            Built for You
          </h2>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto"
          staggerDelay={0.1}
        >
          {[
            {
              icon: "verified_user",
              title: "Elite Privacy",
              desc: "Every transaction is handled with absolute discretion. Your data never leaves our secure network.",
            },
            {
              icon: "speed",
              title: "Fast Approvals",
              desc: "Most applications are pre-qualified within 60 seconds and fully approved within 24 hours.",
            },
            {
              icon: "tune",
              title: "Custom Terms",
              desc: "Flexible structures tailored to your cash flow — from seasonal payments to balloon options.",
            },
            {
              icon: "support_agent",
              title: "Dedicated Advisor",
              desc: "A single point of contact from application to funding. Available by phone, text, or email.",
            },
          ].map((f) => (
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

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to Get Started?"
        subtitle="Apply for financing in under 60 seconds or speak with a dedicated advisor today."
        primaryCTA={{ label: "Apply Now", href: "/apply" }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
        backgroundImage="/images/garage/bentayga.jpg"
      />
    </>
  );
}
