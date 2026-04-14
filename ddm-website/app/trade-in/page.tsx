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

export default function TradeInPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/garage/ferrari-classic.jpg"
            alt="Ferrari in dramatic lighting"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full py-16 md:py-24">
          <ScrollReveal>
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/80 block mb-6">
              Concierge Trade-In Service
            </span>
            <h1 className="font-headline text-6xl md:text-8xl leading-tight mb-8 text-on-surface">
              The Perfect <br />
              <span className="text-primary serif-italic">Transition.</span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl leading-relaxed font-light mb-10">
              Moving between masterpieces should be as effortless as the drive
              itself. Premium valuations for your current vehicle, seamlessly
              applied to your next chapter with DDM.
            </p>
            <div className="flex items-center gap-12 flex-wrap">
              <div>
                <span className="text-primary font-headline text-3xl serif-italic">
                  Maximum Value
                </span>
                <span className="font-label text-[10px] uppercase tracking-widest text-white/30 block mt-1">
                  Applied to your next acquisition
                </span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block" />
              <div>
                <span className="text-primary font-headline text-3xl serif-italic">
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

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/80 block mb-6">
                Start Your Trade-In
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-4">
                Trade-In{" "}
                <span className="serif-italic text-primary">Application</span>
              </h2>
              <p className="text-white/40 max-w-lg mx-auto">
                Tell us about your current vehicle and what you&apos;re looking for
                next. Our team will provide a premium valuation within 24 hours.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="border border-white/[0.06] rounded-sm p-8 md:p-12">
              <TradeInForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/80 block mb-6">
                How It Works
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-on-surface">
                Four Simple{" "}
                <span className="serif-italic text-primary">Steps</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                icon: "description",
                title: "Submit Details",
                desc: "Share your vehicle information and photos through our secure form.",
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
                className="group p-8 border border-white/[0.06] rounded-sm hover:border-primary/20 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-headline text-2xl text-primary/30 serif-italic group-hover:text-primary transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-sm bg-white/[0.02] flex items-center justify-center border border-primary/10 group-hover:border-primary/30 transition-colors">
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
                <p className="text-white/35 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

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
    </>
  );
}
