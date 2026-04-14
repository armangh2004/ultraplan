import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Bespoke Home Delivery",
  description:
    "Experience an elite handover ceremony conducted with surgical precision, ensuring your vehicle arrives in showroom-fresh condition.",
};

// Local high-res images
const HERO_BG = "/images/garage/supercar-showroom.jpg";
const CEREMONY_IMG = "/images/garage/lambo-aventador.jpg";
const ECOSYSTEM_IMG = "/images/garage/blackferrari.jpg";
const GLOBE_IMG = "/images/garage/mercedes-rear.jpg";

export default function DeliveryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-end px-6 md:px-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt="Enclosed car delivery transporter"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <ScrollReveal className="relative z-10 max-w-4xl">
          <span className="text-primary font-label uppercase tracking-[0.4em] text-[10px] mb-6 block">
            The Ultimate Arrival
          </span>
          <h1 className="text-7xl md:text-9xl font-headline italic leading-[1] text-on-surface mb-10">
            Bespoke <br /> Home Delivery
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl font-body leading-relaxed opacity-90">
            The culmination of your journey. Experience an elite handover
            ceremony conducted with surgical precision, ensuring your vehicle
            arrives in showroom-fresh condition.
          </p>
        </ScrollReveal>
      </section>

      {/* Handover Experience Bento */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-black">
        <ScrollReveal className="mb-24">
          <h2 className="text-5xl font-headline italic text-on-surface mb-6">
            The Handover Experience
          </h2>
          <div className="w-32 h-px bg-primary" />
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Main Ceremony Card */}
          <div className="md:col-span-8 bg-black rounded-xl overflow-hidden border border-white/5 group">
            <div className="grid md:grid-cols-2 h-full">
              <div className="p-16 flex flex-col justify-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-8">
                  award_star
                </span>
                <h3 className="text-3xl font-headline mb-6 italic">
                  A Ceremony of Ownership
                </h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Every delivery is orchestrated by a Senior Product Concierge.
                  We transform a simple drop-off into a curated event, featuring
                  a comprehensive orientation and technical synchronization in
                  the privacy of your residence.
                </p>
              </div>
              <div className="relative h-80 md:h-auto overflow-hidden">
                <Image
                  src={CEREMONY_IMG}
                  alt="Key handover ceremony"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Punctuality Card */}
          <div className="md:col-span-4 bg-black p-16 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-headline italic mb-6">
                Absolute Punctuality
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-10">
                Time is your most precious asset. Our logistics suite provides
                millimetric GPS tracking and arrival windows precise to a
                five-minute margin.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  timer
                </span>
              </div>
              <div className="text-[10px] font-label uppercase tracking-[0.3em] text-primary">
                Priority Logistic Stream
              </div>
            </div>
          </div>

          {/* Atmosphere Card */}
          <div className="md:col-span-4 bg-black p-16 rounded-xl relative overflow-hidden group border border-white/5">
            <div className="relative z-10">
              <h3 className="text-2xl font-headline italic mb-6">
                Controlled Atmosphere
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Our fleet consists exclusively of custom-engineered,
                climate-controlled trailers. Your vehicle is protected from UV
                exposure, humidity, and road debris throughout its transit.
              </p>
            </div>
            <div className="absolute -bottom-16 -right-16 opacity-[0.03] text-[180px] font-headline select-none italic pointer-events-none">
              CA
            </div>
          </div>

          {/* Ecosystem Card */}
          <div className="md:col-span-8 bg-black rounded-xl flex flex-col md:flex-row items-center p-12 md:p-16 gap-16 border border-white/5">
            <div className="w-full md:w-2/5 relative aspect-video md:aspect-square">
              <Image
                src={ECOSYSTEM_IMG}
                alt="Vehicle interior display"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="rounded-lg grayscale hover:grayscale-0 transition-all duration-700 object-cover"
              />
            </div>
            <div className="w-full md:w-3/5">
              <h3 className="text-2xl font-headline italic mb-6">
                Ecosystem Integration
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-10">
                Beyond the physical handover, we calibrate your digital
                environment. Seating memory, dynamic performance settings, and
                smart-home links are pre-configured to your exact specifications.
              </p>
              <Button
                href="/contact"
                variant="tertiary"
                className="flex items-center gap-4 group"
              >
                Technical Scope
                <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">
                  east
                </span>
              </Button>
            </div>
          </div>
        </StaggerReveal>
      </section>

      {/* Sovereign Logistics Section */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="text-primary font-label uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Diplomatic Reach
            </span>
            <h2 className="text-6xl font-headline italic mb-10 leading-tight">
              Sovereign Logistics,
              <br />
              Unrivaled Custody.
            </h2>
            <p className="text-on-surface-variant mb-16 text-lg leading-relaxed opacity-80">
              From private airfields to remote estates, Dream Drive Motors
              maintains a global custodial network. We manage every complexity of
              international transit, ensuring a borderless experience of
              excellence.
            </p>
            <StaggerReveal className="space-y-10">
              <li className="flex items-start gap-6 list-none">
                <span className="material-symbols-outlined text-primary text-2xl mt-1">
                  language
                </span>
                <div>
                  <span className="block font-semibold text-on-surface text-base mb-1">
                    Bureaucratic Management
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    Our legal team orchestrates all customs, duties, and title
                    registrations globally.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-6 list-none">
                <span className="material-symbols-outlined text-primary text-2xl mt-1">
                  verified_user
                </span>
                <div>
                  <span className="block font-semibold text-on-surface text-base mb-1">
                    Full-Value Indemnity
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    Comprehensive specialized asset protection covering every
                    second of the journey.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-6 list-none">
                <span className="material-symbols-outlined text-primary text-2xl mt-1">
                  fact_check
                </span>
                <div>
                  <span className="block font-semibold text-on-surface text-base mb-1">
                    The Platinum Protocol
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    A 200-point forensic inspection conducted immediately upon
                    arrival.
                  </span>
                </div>
              </li>
            </StaggerReveal>
          </ScrollReveal>

          <ScrollReveal direction="right" className="relative">
            <div className="aspect-square rounded-full flex items-center justify-center p-1 border border-white/10">
              <div className="w-full h-full rounded-full overflow-hidden border border-white/5 shadow-[0_0_80px_rgba(212,175,55,0.1)]">
                <Image
                  src={GLOBE_IMG}
                  alt="Architectural detail"
                  width={800}
                  height={800}
                  quality={90}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="The Standard of Excellence"
        subtitle="Contact our Logistics Director to initiate the curation of your bespoke arrival."
        primaryCTA={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCTA={{
          label: "Request Logistics Dossier",
          href: "/contact",
        }}
      />
    </>
  );
}
