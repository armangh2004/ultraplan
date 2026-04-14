import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Bespoke Auto Leasing",
  description:
    "Redefining ownership through curated flexibility. Experience the world's finest automobiles with terms as refined as the vehicles themselves.",
};

const HERO_BG = "/images/garage/supercar-showroom.jpg";
const STEERING_IMG = "/images/garage/mclaren-wheel.jpg";
const KEYS_IMG = "/images/garage/andrea-lappas.jpg";
const BENTO_1 = "/images/garage/gt3rs-showroom.jpg";
const BENTO_2 = "/images/garage/bentley.jpg";
const BENTO_3 = "/images/garage/lambo-sian.jpg";
const BENTO_4 = "/images/garage/bmw-ix3.jpg";

export default function LeasingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt="Luxury sports car in minimalist gallery"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-12 w-full max-w-7xl mx-auto pb-20">
          <ScrollReveal>
            <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] mb-6 block font-bold">
              The Bespoke Program
            </span>
            <h1 className="font-headline text-6xl md:text-8xl italic font-light leading-none mb-8 text-on-surface">
              Bespoke <br />
              Auto <span className="text-primary">Leasing</span>
            </h1>
            <p className="font-body text-xl text-white/50 max-w-xl leading-relaxed mb-10">
              Redefining ownership through curated flexibility. Experience the
              world&apos;s finest automobiles with terms as refined as the
              vehicles themselves.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Inquire Now
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Art of the Lease Section */}
      <section className="bg-black py-16 md:py-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <ScrollReveal className="md:col-span-5 relative z-10">
              <h2 className="font-headline text-5xl italic mb-10 text-on-surface">
                The Art of <br />
                <span className="text-primary">the Lease</span>
              </h2>
              <StaggerReveal className="space-y-10">
                <div className="group border-l border-primary/20 pl-6 hover:border-primary transition-colors duration-500">
                  <h3 className="font-headline text-2xl text-primary mb-3">
                    Curated Terms
                  </h3>
                  <p className="text-white/40 leading-relaxed text-sm">
                    Financial structures tailored to your portfolio, offering
                    tax-optimized solutions and flexible milestones.
                  </p>
                </div>
                <div className="group border-l border-primary/20 pl-6 hover:border-primary transition-colors duration-500">
                  <h3 className="font-headline text-2xl text-primary mb-3">
                    Seamless Rotation
                  </h3>
                  <p className="text-white/40 leading-relaxed text-sm">
                    Transition into the latest releases every 12 to 24 months,
                    keeping your garage at the vanguard of engineering.
                  </p>
                </div>
                <div className="group border-l border-primary/20 pl-6 hover:border-primary transition-colors duration-500">
                  <h3 className="font-headline text-2xl text-primary mb-3">
                    Priority Access
                  </h3>
                  <p className="text-white/40 leading-relaxed text-sm">
                    Lease members receive first-right refusal on limited edition
                    hypercars and heritage restorations before public listing.
                  </p>
                </div>
              </StaggerReveal>
            </ScrollReveal>

            <ScrollReveal direction="right" className="md:col-span-7 grid grid-cols-2 gap-4">
              {/* Left column: Orange McLaren wheel + badge */}
              <div className="space-y-4 pt-8">
                <div className="relative h-[350px] overflow-hidden">
                  <Image
                    src={STEERING_IMG}
                    alt="McLaren wheel detail"
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    quality={90}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: [
                      "linear-gradient(to bottom, black 0%, transparent 8%, transparent 80%, black 100%)",
                      "linear-gradient(to right, black 0%, transparent 8%, transparent 90%, black 100%)",
                    ].join(", "),
                  }} />
                </div>
                <div className="bg-black p-5 border border-white/[0.06]">
                  <span className="material-symbols-outlined text-primary text-2xl mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                  </span>
                  <p className="font-headline text-lg text-on-surface italic">
                    Full Maintenance
                  </p>
                </div>
              </div>
              {/* Right column: Red Porsche GT2 */}
              <div className="space-y-4">
                <div className="bg-black p-5 border border-white/[0.06] flex items-center justify-between">
                  <p className="font-label uppercase tracking-widest text-[10px] text-white/40 font-bold">
                    Membership
                  </p>
                  <p className="font-headline italic text-primary">Prestige</p>
                </div>
                <div className="relative h-[430px] overflow-hidden">
                  <Image
                    src={KEYS_IMG}
                    alt="Red Porsche GT2 rear"
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    quality={90}
                    className="object-cover object-[center_60%]"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: [
                      "linear-gradient(to bottom, black 0%, transparent 8%, transparent 75%, black 100%)",
                      "linear-gradient(to right, black 0%, transparent 8%, transparent 90%, black 100%)",
                    ].join(", "),
                  }} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vehicle Portfolio Bento */}
      <section className="py-16 md:py-24 bg-black">
        <div className="absolute left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <ScrollReveal>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] mb-4 block font-bold">
                  Fleet Selection
                </span>
                <h2 className="font-headline text-5xl italic text-on-surface">
                  Available <span className="text-primary">Collection</span>
                </h2>
              </div>
              <Button
                href="/contact"
                variant="tertiary"
                className="flex items-center gap-2 border-b border-primary pb-1"
              >
                Contact Us{" "}
                <span className="material-symbols-outlined text-sm">east</span>
              </Button>
            </header>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
              {/* Large: Porsche GT3 RS */}
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
                <Image
                  src={BENTO_1}
                  alt="Porsche GT3 RS"
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 p-8 flex flex-col justify-end">
                  <p className="font-label text-[10px] text-primary uppercase tracking-widest mb-1 font-bold">
                    Performance
                  </p>
                  <h3 className="font-headline text-4xl italic text-on-surface">
                    Porsche GT3 RS
                  </h3>
                </div>
              </div>

              {/* Bentley Flying Spur */}
              <div className="md:col-span-2 relative group overflow-hidden min-h-[220px]">
                <Image
                  src={BENTO_2}
                  alt="Bentley Flying Spur"
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-cover object-[center_40%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(to top, black 0%, transparent 40%)",
                }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-8 flex flex-col justify-end">
                  <p className="font-label text-[10px] text-primary uppercase tracking-widest mb-1 font-bold">
                    Luxury Sedan
                  </p>
                  <h3 className="font-headline text-4xl italic text-on-surface">
                    Bentley Flying Spur
                  </h3>
                </div>
              </div>

              {/* Lamborghini Sián */}
              <div className="relative group overflow-hidden min-h-[220px]">
                <Image
                  src={BENTO_3}
                  alt="Lamborghini Sián"
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 p-6 flex flex-col justify-end">
                  <h3 className="font-headline text-2xl italic text-on-surface">
                    Lamborghini Sián
                  </h3>
                </div>
              </div>

              {/* BMW iX3 */}
              <div className="relative group overflow-hidden min-h-[220px]">
                <Image
                  src={BENTO_4}
                  alt="BMW iX3"
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 p-6 flex flex-col justify-end">
                  <h3 className="font-headline text-2xl italic text-on-surface">
                    BMW iX3
                  </h3>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline={
          <>
            Begin Your <span className="text-primary">Journey</span>
          </>
        }
        subtitle="Our concierge team is ready to craft a leasing program that aligns with your lifestyle and legacy."
        primaryCTA={{ label: "Speak with Concierge", href: "/contact" }}
        secondaryCTA={{ label: "Apply for Credit", href: "/apply" }}
      />
    </>
  );
}
