import type { Metadata } from "next";

import ScrollReveal from "@/components/animation/ScrollReveal";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "The Atelier",
  description:
    "Dream Drive Motors was founded on the principle that the acquisition of a luxury vehicle should be as exceptional as the drive itself.",
};

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA3w-1rWviv9eXR4-4e6capLwsdnaCtoplsi86CwgyG-GIXFhQYMxEfMXkH0B4-qXDQ8gbASGdi9qotjgPhJ0LH_hGQgM-nYOwV3CZ7JZlBl6cTrIa2tNYU1Hp4h7gDY9DvFwkrVf6gW6M-Vaa9GFNNUOrErxAXKGJZ9O23oEbnNOuUMW4pS-jnj-hAl1SzwcqTlDfKDI3f2Dy5G_F4lueAWpWnBkqPLT2OyfnMCl6tVULzxHrdZVF8ku8mE7WZ3gQ04V_sfgBJBrs";

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto text-center md:text-left">
        <div className="max-w-4xl">
          <ScrollReveal>
            <p className="font-label text-[10px] uppercase tracking-[0.6em] text-primary mb-10 opacity-80">
              Established 2024
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-headline text-7xl md:text-9xl font-light tracking-tighter leading-[0.85] mb-16">
              The Atelier: <br />
              <span className="serif-italic">Bespoke Excellence</span>
            </h1>
          </ScrollReveal>
          <div className="h-[1px] w-32 bg-primary/40 mx-auto md:mx-0" />
        </div>
      </section>

      {/* ─── Hero Image ─── */}
      <section className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto mb-40">
        <ScrollReveal>
          <div className="aspect-[21/9] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out border border-white/5">
            <img
              src={HERO_IMG}
              alt="The Dream Drive Collection"
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ─── Editorial About Section ─── */}
      <section className="pb-40 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12">
          {/* Left Column */}
          <div className="md:col-span-4">
            <ScrollReveal>
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/60 block mb-6">
                Our Philosophy
              </span>
              <h2 className="font-headline text-5xl md:text-6xl leading-[1.1] tracking-tight">
                The Art of <br />
                <span className="serif-italic">Curated Motoring</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Right Column */}
          <div className="md:col-start-6 md:col-span-7 space-y-10">
            <ScrollReveal delay={0.1}>
              <p className="font-body text-2xl md:text-3xl text-on-surface-variant leading-snug font-light">
                Dream Drive Motors was founded on the principle that the
                acquisition of a luxury vehicle should be as exceptional as the
                drive itself.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="h-px w-16 bg-primary/20" />
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="font-body text-lg text-on-surface-variant/70 leading-relaxed max-w-2xl">
                The Atelier is our dedicated space for this vision&mdash;a
                sanctuary where automotive engineering meets personalized
                curation. We operate beyond the traditional dealership model,
                focusing on provenance, technical integrity, and the unique story
                of every vehicle. For the discerning collector, we provide a
                private, white-glove experience that ensures every transition is
                seamless and every acquisition is an investment in excellence.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="pt-12 grid grid-cols-2 gap-8 border-t border-white/10">
                <div>
                  <p className="font-headline text-2xl text-primary">
                    Private Gallery
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface/40 mt-2">
                    Baldwin Park, CA
                  </p>
                </div>
                <div>
                  <p className="font-headline text-2xl text-primary">
                    By Appointment
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface/40 mt-2">
                    Global Concierge
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <CTASection
        headline={
          <>
            Begin Your{" "}
            <span className="serif-italic">Bespoke Journey</span>
          </>
        }
        primaryCTA={{ label: "Request Membership", href: "/contact" }}
        secondaryCTA={{ label: "Schedule a Visit", href: "/contact" }}
        background="bg-[#080808]"
      />
    </>
  );
}
