import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import MonogramOverlay from "@/components/ui/MonogramOverlay";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Direct Acquisition",
  description:
    "A streamlined exit for the world's most significant automobiles. No listing delays. No public exposure. Just immediate valuation and liquidity.",
};

// Image URLs from design
const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBpYvFsh3XMMIvdkzMjBDseH1rubqIQ7d3eVONinpAooPq5magGmjr_Tr5Y28fGUx0S0lcdH_NQNCAUWCgM8al07UiE079KC2p9laN5S0k-WJSFtciCL8XLsxsxaL7OXX2Z7gIC5rR0yolja4gTWvVCoQx20kGByM_ueN9vsllRK4PteWHzKv5rHNXLTFnFUpCzUrA0YHAyenhW3lvCn1xNStFB73voSv1ZSE3uiPSFxMOGMa5Nmy4An1il38lSHR5gnS4Lb_ep3Qc";
const LOGISTICS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuoi9hDMqN8ZSRJ29ypRajkLQ386aF8ovVZg-wz5zoEmsFIpIPU3fIAn5A2nZcRpukagWyjoYfiZf5unMusJgtce0DDaEuAGimkYBhRijBafoDrDl1MR5NV08oKEVpZBlzM0apvyND6QG6fAGS3t5yfP6QmB-Hcr771kHTErCiEZT-pJB1BicYspsWPUUQMGlmTAKIo2SwgYQA1BLalmVDmyB2hfgFCeZ4IIRsKSandq0NSOeiRBRQXQmqSrVAMTx8Zxi58OYgbUo";
const PROCESS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDkWME-16neWbv9AWvMYAtuRPikBryAkMP73RXfX0nPJ9C9Recx5u3FNpyfTBZqYId1D8Hc_nd7pvliffopWvBcRLpdovMSHQlhgWhRhYX-qXMhoro2FWpm-PbNJmUbOZ_CQfxs_Ccxe_fOkZbeM67_3leNfEP88GtnllN7R-oiYuyl_UTBPvwh1Qif3JKGQz0i1_ktnvvW0Rt72xljqqEUEQQKnwmj_tj0AXfhnoMs2-tEymXvPX7SEjkC2cEyxemOyjtCeU5al3U";

export default function AcquisitionPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[870px] flex items-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt="Vintage Porsche in architectural garage"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <ScrollReveal className="relative z-10 max-w-4xl mx-auto w-full">
          <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] mb-6 block">
            The DDM Acquisition Protocol
          </span>
          <h1 className="font-headline text-7xl md:text-8xl italic text-on-surface leading-tight mb-8">
            Direct <br />
            <span className="text-primary serif-italic">Acquisition.</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant font-light max-w-2xl leading-relaxed mb-12">
            A streamlined exit for the world&apos;s most significant automobiles.
            No listing delays. No public exposure. Just immediate valuation and
            liquidity.
          </p>
          <div className="flex items-center gap-8">
            <Button href="/contact" variant="primary" size="lg">
              Initiate Valuation
            </Button>
            <div className="flex flex-col">
              <span className="text-on-surface-variant text-[10px] uppercase tracking-widest">
                Average processing time
              </span>
              <span className="text-primary font-headline text-2xl italic">
                48 Hours
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Value Proposition Bento Grid */}
      <section className="py-32 px-6 md:px-12 bg-surface-container-low relative">
        <MonogramOverlay className="right-0 top-1/4" />
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          {/* Main Feature Card */}
          <ScrollReveal className="md:col-span-8 bg-surface-container-highest p-12 rounded-xl flex flex-col justify-between min-h-[500px] border border-outline-variant/10">
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-8">
                account_balance
              </span>
              <h2 className="font-headline text-5xl text-on-surface italic mb-6">
                Unrivaled Market Liquidity.
              </h2>
              <p className="text-on-surface-variant text-lg max-w-lg leading-relaxed">
                We bypass the traditional auction houses and public marketplaces.
                Dream Drive Motors utilizes institutional-grade capital to provide
                immediate payouts for individual vehicles or entire collections.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-outline-variant/20">
              <div>
                <div className="text-3xl font-headline text-primary mb-2">
                  $500M+
                </div>
                <div className="font-label text-[10px] uppercase tracking-widest opacity-60">
                  Capital Deployed
                </div>
              </div>
              <div>
                <div className="text-3xl font-headline text-primary mb-2">
                  24h
                </div>
                <div className="font-label text-[10px] uppercase tracking-widest opacity-60">
                  Initial Appraisal
                </div>
              </div>
              <div>
                <div className="text-3xl font-headline text-primary mb-2">
                  100%
                </div>
                <div className="font-label text-[10px] uppercase tracking-widest opacity-60">
                  Confidentiality
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Gold Appraisal Card */}
          <ScrollReveal
            delay={0.15}
            className="md:col-span-4 bg-primary text-on-primary p-12 rounded-xl flex flex-col justify-between"
          >
            <h3 className="font-headline text-4xl italic leading-tight">
              Elite Appraisal Standards.
            </h3>
            <div className="space-y-6">
              <p className="text-sm font-medium leading-relaxed">
                Our team of forensic specialists evaluates provenance, mechanical
                integrity, and market rarity to provide a valuation that reflects
                the true collector value.
              </p>
              <ul className="space-y-4 font-label text-[11px] uppercase tracking-[0.15em] font-bold">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  Provenance Verification
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  Mechanical Audit
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  Global Market Parity
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Logistics Glass Card */}
          <ScrollReveal className="md:col-span-12">
            <GlassCard className="rounded-xl flex flex-col md:flex-row items-center gap-12 border border-outline-variant/10">
              <div className="w-full md:w-1/3 relative aspect-square">
                <Image
                  src={LOGISTICS_IMG}
                  alt="Luxury car interior"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-headline text-4xl text-on-surface italic mb-4">
                  Discrete Concierge Logistics.
                </h4>
                <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                  Upon agreement, we manage 100% of the logistics. From enclosed
                  multi-car transport to international customs and title
                  transfers&mdash;the process remains invisible and effortless for
                  you.
                </p>
                <Button href="/services/delivery" variant="tertiary" className="flex items-center gap-2 group">
                  Explore Logistics Excellence
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">
                    arrow_forward
                  </span>
                </Button>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-24 items-start">
          <ScrollReveal className="w-full md:w-1/2 md:sticky md:top-32">
            <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] mb-6 block">
              The Methodology
            </span>
            <h2 className="font-headline text-6xl text-on-surface italic leading-tight mb-8">
              Four Steps to <br />
              <span className="text-primary">Absolute Liquidity.</span>
            </h2>
            <StaggerReveal className="space-y-12 mt-16">
              {[
                {
                  num: "01",
                  title: "Digital Dossier Submission",
                  desc: "Provide initial documentation and imagery via our secure, encrypted portal.",
                },
                {
                  num: "02",
                  title: "On-Site Forensic Audit",
                  desc: "Our specialists visit your location for a detailed physical inspection and historical verification.",
                },
                {
                  num: "03",
                  title: "Immediate Valuation Offer",
                  desc: "A binding, no-obligation cash offer valid for 72 hours, backed by bank guarantees.",
                },
                {
                  num: "04",
                  title: "Vault Settlement",
                  desc: "Same-day wire transfer followed by professional transport coordination.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-8 group">
                  <span className="font-headline text-4xl text-outline-variant/30 italic group-hover:text-primary transition-colors">
                    {step.num}.
                  </span>
                  <div>
                    <h5 className="text-xl font-headline text-on-surface italic mb-2">
                      {step.title}
                    </h5>
                    <p className="text-on-surface-variant text-sm max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </ScrollReveal>

          <ScrollReveal direction="right" className="w-full md:w-1/2 space-y-12">
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={PROCESS_IMG}
                alt="Vintage car key handover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="bg-surface-container p-12 rounded-xl border border-outline-variant/15">
              <span
                className="material-symbols-outlined text-primary text-4xl mb-6"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <blockquote className="font-headline text-2xl italic text-on-surface leading-relaxed mb-8">
                &ldquo;The discretion provided by Dream Drive Motors is
                unparalleled. Selling my collection of early Ferraris was handled
                with a level of professionalism I haven&apos;t seen in the retail
                market.&rdquo;
              </blockquote>
              <cite className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant not-italic">
                &mdash; Private Collector, Monaco
              </cite>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12">
        <ScrollReveal className="max-w-screen-2xl mx-auto bg-primary/10 border border-primary/20 p-20 rounded-xl relative overflow-hidden text-center">
          <MonogramOverlay className="left-0 bottom-0 text-primary/5" />
          <h2 className="font-headline text-6xl italic mb-8 relative z-10">
            Prepare Your Collection <br /> for Acquisition.
          </h2>
          <p className="text-xl max-w-2xl font-light mb-12 relative z-10 mx-auto text-on-surface-variant">
            Join the exclusive circle of collectors who prioritize time and
            professional integrity above all else. Contact our direct acquisition
            desk today.
          </p>
          <div className="flex flex-col md:flex-row gap-6 relative z-10 w-full max-w-md mx-auto">
            <input
              className="flex-1 bg-white/5 border-0 border-b-2 border-primary/30 focus:ring-0 focus:border-primary text-on-surface placeholder:text-on-surface-variant/50 font-label tracking-widest text-[10px] py-4"
              placeholder="YOUR EMAIL"
              type="email"
            />
            <Button href="/contact" variant="primary">
              Begin Request
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
