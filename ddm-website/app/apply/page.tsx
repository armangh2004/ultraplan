import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import CreditApplicationForm from "@/components/interactive/CreditApplicationForm";

export const metadata: Metadata = {
  title: "Secure Credit Application",
  description:
    "A bespoke financing journey designed for the discerning individual. Absolute discretion, accelerated processing, and terms as refined as the vehicles we offer.",
};

const EDGE_FADE = [
  "linear-gradient(to bottom, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 55%, rgba(0,0,0,0.5) 75%, black 92%, black 100%)",
  "linear-gradient(to right, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 80%, black 92%, black 100%)",
].join(", ");

export default function ApplyPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/images/garage/911showroom.jpg"
            alt="Classic Porsche 911 showroom"
            fill
            priority
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        <ScrollReveal className="relative z-10 text-center max-w-3xl mx-auto py-16 md:py-24">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
            Financial Excellence
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-6">
            Secure Credit <br />
            <span className="serif-italic text-primary">Application</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/50 max-w-[580px] mx-auto leading-relaxed font-light mb-10">
            A bespoke financing journey designed for the discerning individual.
            Absolute discretion, accelerated processing, and terms as refined as
            the vehicles we offer.
          </p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-3">
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
      </section>

      {/* ── What We Collect & Why ───────────────────────────────── */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
              Before You Begin
            </span>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-on-surface mb-6">
              What to Expect
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
              Our concierge team handles the entire credit process on your
              behalf — from application to approval. We collect a few essential
              details so we can work directly with our lending partners to
              secure the most competitive terms for your next acquisition.
            </p>
          </ScrollReveal>

          <StaggerReveal
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {[
              {
                icon: "person",
                title: "Personal Details",
                desc: "We collect your name, address, date of birth, and SSN strictly for identity verification. This is required by our lending partners to process your application — our team submits it on your behalf so you never have to deal with banks directly.",
              },
              {
                icon: "account_balance",
                title: "Financial Profile",
                desc: "Basic employment and income information allows us to match you with the lender offering the best rates and terms for your situation. We do the legwork of comparing options so you receive a tailored financing package without the hassle.",
              },
              {
                icon: "lock",
                title: "Your Privacy, Our Priority",
                desc: "Every field is protected with end-to-end encryption and transmitted only to our vetted lending network. We never sell or share your data. Once your financing is complete, records are purged upon request — your discretion is guaranteed.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 border border-white/[0.06] bg-white/[0.015] rounded-sm h-full flex flex-col group hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center mb-5 group-hover:border-primary/40 transition-colors duration-500">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-headline text-lg italic text-on-surface mb-3">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mt-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Form Section ────────────────────────────────────────── */}
      <section className="px-6 md:px-12 bg-black py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
                Step 01 of 03 — Identity Verification
              </span>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-on-surface">
                Personal Credentials
              </h2>
              <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
                Complete the fields below to begin. All information is
                transmitted securely and handled with absolute discretion.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-white/[0.015] border border-white/[0.06] p-8 md:p-12 rounded-sm">
              <CreditApplicationForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Bottom Image ────────────────────────────────────────── */}
      <section className="relative h-[50vh] bg-black overflow-hidden">
        <ScrollReveal className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/garage/countach.jpg"
              alt="Lamborghini Countach in studio lighting"
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
