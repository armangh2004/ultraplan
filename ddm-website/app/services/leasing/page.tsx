import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import MonogramOverlay from "@/components/ui/MonogramOverlay";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Bespoke Auto Leasing",
  description:
    "Redefining ownership through curated flexibility. Experience the world's finest automobiles with terms as refined as the vehicles themselves.",
};

// Local high-res images
const HERO_BG = "/images/garage/supercar-showroom.jpg";
const STEERING_IMG = "/images/garage/mclaren-wheel.jpg";
const KEYS_IMG = "/images/garage/porsche-headlights.jpg";
const BENTO_1 = "/images/garage/gt3rs-showroom.jpg";
const BENTO_2 = "/images/garage/ferrari-classic.jpg";
const BENTO_3 = "/images/garage/lambo-aventador.jpg";
const BENTO_4 = "/images/garage/bmw-ix3.jpg";

export default function LeasingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt="Luxury sports car in minimalist gallery"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-12 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-24">
          <ScrollReveal className="md:col-span-8">
            <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] mb-6 block font-bold">
              The Bespoke Program
            </span>
            <h1 className="font-headline text-6xl md:text-8xl italic font-light leading-none mb-8 text-on-surface">
              Bespoke <br />
              Auto <span className="text-primary">Leasing</span>
            </h1>
            <p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed">
              Redefining ownership through curated flexibility. Experience the
              world&apos;s finest automobiles with terms as refined as the
              vehicles themselves.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-span-4 flex flex-col items-start md:items-end">
            <GlassCard className="w-full shadow-2xl">
              <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-4 font-bold">
                Starting At
              </p>
              <p className="font-headline text-4xl mb-6 text-on-surface">
                $3,850{" "}
                <span className="text-sm font-body italic text-on-surface-variant">
                  / month
                </span>
              </p>
              <Button href="/contact" variant="primary" className="w-full">
                Inquire Now
              </Button>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Art of the Lease Section */}
      <section className="bg-black py-32 relative">
        <MonogramOverlay className="left-0 top-1/4" />
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <ScrollReveal className="md:col-span-5 relative z-10">
              <h2 className="font-headline text-5xl italic mb-12 text-on-surface">
                The Art of <br />
                <span className="text-primary">the Lease</span>
              </h2>
              <StaggerReveal className="space-y-12">
                <div className="group border-l border-primary/20 pl-6 hover:border-primary transition-colors duration-500">
                  <h3 className="font-headline text-2xl text-primary mb-4">
                    Curated Terms
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    Financial structures tailored to your portfolio, offering
                    tax-optimized solutions and flexible milestones.
                  </p>
                </div>
                <div className="group border-l border-primary/20 pl-6 hover:border-primary transition-colors duration-500">
                  <h3 className="font-headline text-2xl text-primary mb-4">
                    Seamless Rotation
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    The ability to transition into the latest releases every 12
                    to 24 months, ensuring your garage remains at the vanguard of
                    engineering.
                  </p>
                </div>
                <div className="group border-l border-primary/20 pl-6 hover:border-primary transition-colors duration-500">
                  <h3 className="font-headline text-2xl text-primary mb-4">
                    Priority Access
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    Lease members receive first-right refusal on limited edition
                    hypercars and heritage restorations before public listing.
                  </p>
                </div>
              </StaggerReveal>
            </ScrollReveal>

            <ScrollReveal direction="right" className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="relative h-[400px] rounded-sm overflow-hidden border border-outline-variant/10">
                  <Image
                    src={STEERING_IMG}
                    alt="Luxury car steering wheel"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
                <div className="bg-black p-6 rounded-sm border border-outline-variant/10">
                  <span
                    className="material-symbols-outlined text-primary text-3xl mb-4"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  <p className="font-headline text-xl text-on-surface italic">
                    Full Maintenance
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-black p-6 rounded-sm flex items-center justify-between border border-outline-variant/10">
                  <p className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant font-bold">
                    Membership Tier
                  </p>
                  <p className="font-headline italic text-primary">Prestige</p>
                </div>
                <div className="relative h-[500px] rounded-sm overflow-hidden border border-outline-variant/10">
                  <Image
                    src={KEYS_IMG}
                    alt="Car keys and leather wallet"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vehicle Portfolio Bento */}
      <section className="py-32 bg-black">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <ScrollReveal>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] mb-4 block font-bold">
                  Fleet Selection
                </span>
                <h2 className="font-headline text-5xl italic text-on-surface">
                  Available <span className="text-primary">Narratives</span>
                </h2>
              </div>
              <Button
                href="/inventory"
                variant="tertiary"
                className="flex items-center gap-2 border-b border-primary pb-1"
              >
                View All Inventory{" "}
                <span className="material-symbols-outlined text-sm">east</span>
              </Button>
            </header>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[800px]">
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-sm border border-outline-variant/10">
                <Image
                  src={BENTO_1}
                  alt="Centurion GT"
                  fill
                  sizes="100vw"
            quality={90}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                  <p className="font-label text-[10px] text-primary uppercase tracking-widest mb-1 font-bold">
                    Grand Tourer
                  </p>
                  <h3 className="font-headline text-4xl italic text-on-surface">
                    Centurion GT
                  </h3>
                </div>
              </div>

              <div className="md:col-span-2 relative group overflow-hidden rounded-sm border border-outline-variant/10 min-h-[250px]">
                <Image
                  src={BENTO_2}
                  alt="Vantage R"
                  fill
                  sizes="100vw"
            quality={90}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                  <p className="font-label text-[10px] text-primary uppercase tracking-widest mb-1 font-bold">
                    Heritage Series
                  </p>
                  <h3 className="font-headline text-4xl italic text-on-surface">
                    Vantage R
                  </h3>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-sm border border-outline-variant/10 min-h-[250px]">
                <Image
                  src={BENTO_3}
                  alt="The Roadster"
                  fill
                  sizes="100vw"
            quality={90}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <h3 className="font-headline text-2xl italic text-on-surface">
                    The Roadster
                  </h3>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-sm border border-outline-variant/10 min-h-[250px]">
                <Image
                  src={BENTO_4}
                  alt="EV Vision"
                  fill
                  sizes="100vw"
            quality={90}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <h3 className="font-headline text-2xl italic text-on-surface">
                    EV Vision
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
        subtitle="Our concierge team is ready to craft a leasing program that aligns with your lifestyle and legacy. Available for private consultations."
        primaryCTA={{ label: "Speak with Concierge", href: "/contact" }}
        secondaryCTA={{ label: "Request Brochure", href: "/contact" }}
      />
    </>
  );
}
