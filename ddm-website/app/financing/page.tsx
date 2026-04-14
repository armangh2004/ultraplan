import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import MonogramOverlay from "@/components/ui/MonogramOverlay";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Precision Auto Financing",
  description:
    "Precision Auto Financing at Dream Drive Motors transcends traditional lending. We curate high-performance portfolios for high-performance lifestyles.",
};

export default function FinancingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[819px] flex items-center px-6 md:px-12 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/garage/mercedes-rear.jpg"
            alt="Luxury car interior"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <ScrollReveal className="relative z-10 max-w-5xl mx-auto w-full">
          <span className="font-label uppercase tracking-[0.3em] text-primary text-[10px] mb-6 block">
            Bespoke Capital Solutions
          </span>
          <h1 className="font-headline text-7xl md:text-8xl italic font-light tracking-tight text-on-surface leading-[0.9]">
            Financial <br />
            <span className="text-primary serif-italic">Engineering.</span>
          </h1>
          <p className="mt-8 text-xl text-on-surface-variant max-w-xl font-light leading-relaxed">
            Precision Auto Financing at Dream Drive Motors transcends traditional
            lending. We curate high-performance portfolios for high-performance
            lifestyles.
          </p>
          <div className="mt-12 flex gap-6">
            <Button href="/contact" variant="primary">
              Inquire Privately
            </Button>
            <Button href="/contact" variant="secondary">
              View Rates
            </Button>
          </div>
        </ScrollReveal>

        <MonogramOverlay className="right-[-5rem] bottom-[-5rem]" />
      </section>

      {/* Bento Grid Specs */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-black">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[600px]">
          {/* Main Feature Card */}
          <ScrollReveal className="md:col-span-8 bg-black rounded-xl overflow-hidden relative group border border-outline-variant/10">
            <div className="p-12 relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl mb-6">
                  account_balance
                </span>
                <h3 className="font-headline text-4xl text-on-surface mb-4">
                  Private Lender Network
                </h3>
                <p className="text-on-surface-variant max-w-md leading-relaxed">
                  Access an exclusive ecosystem of tier-one financial
                  institutions and boutique private lenders, ensuring terms that
                  are as exceptional as the vehicles they secure.
                </p>
              </div>
              <div className="flex items-center gap-12 border-t border-outline-variant/20 pt-8 mt-12">
                <div>
                  <span className="block text-primary font-headline text-3xl serif-italic">
                    3.2%
                  </span>
                  <span className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant">
                    Prime Entry Rate
                  </span>
                </div>
                <div>
                  <span className="block text-primary font-headline text-3xl serif-italic">
                    24h
                  </span>
                  <span className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant">
                    Approval Window
                  </span>
                </div>
                <div>
                  <span className="block text-primary font-headline text-3xl serif-italic">
                    $0
                  </span>
                  <span className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant">
                    Early Exit Fees
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block">
              <Image
                src="/images/garage/supercar-showroom.jpg"
                alt="Showroom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover grayscale opacity-20"
              />
            </div>
          </ScrollReveal>

          {/* Elite Privacy Card */}
          <ScrollReveal
            delay={0.15}
            className="md:col-span-4 bg-black rounded-xl p-10 flex flex-col justify-end relative overflow-hidden border border-outline-variant/10"
          >
            <div className="absolute top-0 left-0 p-10">
              <span className="material-symbols-outlined text-primary text-3xl">
                verified_user
              </span>
            </div>
            <h3 className="font-headline text-3xl text-on-surface mb-4">
              Elite Privacy
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Every transaction is handled with absolute discretion. Our
              concierge team manages all documentation, shielding your time and
              your data.
            </p>
          </ScrollReveal>

          {/* Small Grid Items */}
          <StaggerReveal className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black rounded-xl p-8 border-l-2 border-primary border-t border-r border-b border-t-outline-variant/10 border-r-outline-variant/10 border-b-outline-variant/10">
              <h4 className="font-headline text-xl text-primary serif-italic mb-2">
                Concierge Portfolios
              </h4>
              <p className="text-on-surface-variant text-sm">
                Customized structures for corporate fleet acquisition or private
                collection expansion.
              </p>
            </div>
            <div className="bg-black rounded-xl p-8 group hover:bg-black transition-colors border border-outline-variant/10">
              <h4 className="font-headline text-xl text-on-surface serif-italic mb-2">
                Tax Optimization
              </h4>
              <p className="text-on-surface-variant text-sm">
                Strategically aligned financing solutions designed to complement
                your wealth management goals.
              </p>
            </div>
            <div className="bg-black rounded-xl p-8 flex items-center justify-between border border-outline-variant/10">
              <div>
                <h4 className="font-headline text-xl text-on-surface serif-italic">
                  Trust Score
                </h4>
                <span className="font-label text-[10px] uppercase tracking-widest text-primary">
                  A+ Certified Platinum
                </span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-4xl">
                shield
              </span>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Editorial / Signature Statement */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <ScrollReveal className="col-span-12 md:col-span-5 relative">
            <Image
              src="/images/garage/porsche-headlights.jpg"
              alt="Financial Professional"
              width={600}
              height={800}
              quality={90}
              className="rounded-lg shadow-2xl grayscale border border-outline-variant/20"
            />
          </ScrollReveal>

          <ScrollReveal direction="right" className="col-span-12 md:col-span-7">
            <span className="font-label uppercase tracking-[0.4em] text-outline text-[10px] block mb-6">
              The Philosophy
            </span>
            <h2 className="font-headline text-5xl md:text-6xl italic text-on-surface leading-tight mb-8">
              Lending is an Art,{" "}
              <br />
              <span className="text-primary serif-italic">
                Structure is the Science.
              </span>
            </h2>
            <blockquote className="border-l border-primary pl-8 py-2">
              <p className="text-xl text-on-surface font-light italic leading-relaxed">
                &ldquo;We don&apos;t just provide capital; we provide the
                architectural foundation for your automotive legacy. Every rate
                is negotiated, every contract is bespoke.&rdquo;
              </p>
              <cite className="block mt-6 font-label uppercase tracking-widest text-[10px] text-primary">
                &mdash; Julian Vane, Head of Portfolio Management
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-black">
        <ScrollReveal className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-label uppercase tracking-widest mb-8">
            Invitation Only
          </div>
          <h2 className="font-headline text-5xl md:text-7xl italic text-on-surface mb-8">
            Ready to Engineer Your Next Acquisition?
          </h2>
          <p className="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto">
            Speak with a Senior Portfolio Architect today for a confidential
            assessment of your financing requirements.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="bg-black p-1.5 rounded-lg flex items-center max-w-md w-full border border-outline-variant/30">
              <input
                className="bg-transparent border-none focus:ring-0 text-on-surface w-full px-4 py-3 placeholder:text-outline font-body text-sm"
                placeholder="Your private email"
                type="email"
              />
              <Button href="/contact" variant="primary" size="sm" className="whitespace-nowrap">
                Request Callback
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
