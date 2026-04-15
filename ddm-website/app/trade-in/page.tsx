import type { Metadata } from "next";
import Image from "next/image";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import TradeInForm from "@/components/interactive/TradeInForm";

export const metadata: Metadata = {
  title: "Seamless Trade-Ins",
  description:
    "Moving between masterpieces should be as effortless as the drive itself. Our Seamless Trade-In program ensures your legacy continues without interruption.",
};

const EDGE_FADE = [
  "linear-gradient(to bottom, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 55%, rgba(0,0,0,0.5) 75%, black 92%, black 100%)",
  "linear-gradient(to right, black 0%, black 5%, rgba(0,0,0,0.5) 20%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 80%, black 92%, black 100%)",
].join(", ");

export default function TradeInPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/garage/old911.jpg"
            alt="Classic Porsche 911 in dramatic garage lighting"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[center_40%] hidden md:block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full py-16 md:py-24 text-center">
          <ScrollReveal>
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/80 block mb-6">
              Concierge Trade-In Service
            </span>
            <h1 className="font-headline text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-8">
              The Perfect <br />
              <span className="text-primary serif-italic">Transition.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-white/50 max-w-[580px] mx-auto leading-relaxed font-light mb-10">
              Moving between masterpieces should be as effortless as the drive
              itself. Premium valuations for your current vehicle, seamlessly
              applied to your next chapter with DDM.
            </p>
            <div className="flex items-center gap-6 md:gap-12 flex-wrap justify-center">
              <div>
                <span className="text-primary font-headline text-2xl sm:text-3xl serif-italic">
                  Maximum Value
                </span>
                <span className="font-label text-[10px] uppercase tracking-widest text-white/30 block mt-1">
                  Applied to your next acquisition
                </span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block" />
              <div>
                <span className="text-primary font-headline text-2xl sm:text-3xl serif-italic">
                  24h
                </span>
                <span className="font-label text-[10px] uppercase tracking-widest text-white/30 block mt-1">
                  Initial Valuation
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/80 block mb-6">
                How It Works
              </span>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-on-surface">
                Four Simple{" "}
                <span className="serif-italic text-primary">Steps</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                icon: "description",
                title: "Submit Details",
                desc: "Share your vehicle information and photos through our secure form below.",
              },
              {
                num: "02",
                icon: "price_check",
                title: "Get Valuation",
                desc: "Receive a premium market valuation from our expert appraisal team within 24 hours.",
              },
              {
                num: "03",
                icon: "handshake",
                title: "Choose Your Next",
                desc: "Browse our curated inventory and apply your trade-in value directly toward your new vehicle.",
              },
              {
                num: "04",
                icon: "key",
                title: "Drive Away",
                desc: "We handle all paperwork, title transfers, and logistics. You just enjoy the new keys.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="group p-8 border border-white/[0.06] bg-white/[0.015] rounded-sm hover:border-primary/20 hover:shadow-gold-sm transition-all duration-500 h-full flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-headline text-2xl text-primary/30 serif-italic group-hover:text-primary transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-sm bg-primary/[0.06] flex items-center justify-center border border-primary/15 group-hover:border-primary/30 group-hover:shadow-gold-sm transition-all duration-500">
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {step.icon}
                    </span>
                  </div>
                </div>
                <h4 className="font-headline text-xl mb-3 text-on-surface">
                  {step.title}
                </h4>
                <p className="text-white/35 text-sm leading-relaxed mt-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Form Section ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/80 block mb-6">
                Start Your Trade-In
              </span>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-on-surface mb-4">
                Trade-In{" "}
                <span className="serif-italic text-primary">Application</span>
              </h2>
              <p className="text-white/40 max-w-lg mx-auto">
                Tell us about your current vehicle and what you&apos;re looking
                for next. Our team will provide a premium valuation within 24
                hours.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="border border-white/[0.06] bg-white/[0.015] rounded-sm p-8 md:p-12">
              <TradeInForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <ScrollReveal className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <span
            className="material-symbols-outlined text-primary/30 text-6xl mb-8"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            format_quote
          </span>
          <blockquote className="font-headline text-2xl md:text-4xl serif-italic leading-tight mb-10 text-on-surface">
            &ldquo;Dream Drive Motors understands that a collection is dynamic.
            They didn&apos;t just buy my car; they facilitated the evolution of
            my passion.&rdquo;
          </blockquote>
          <cite className="not-italic">
            <span className="font-label text-xs uppercase tracking-widest block text-primary font-bold">
              Private Collector
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest text-white/30">
              Los Angeles, CA
            </span>
          </cite>
        </ScrollReveal>
      </section>

      {/* ── Bottom Image ────────────────────────────────────────── */}
      <section className="relative h-[50vh] bg-black overflow-hidden">
        <ScrollReveal className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/garage/corvette.jpg"
              alt="Corvette C8 in studio lighting"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-[center_60%] opacity-50"
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
