"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import ScrollReveal from "@/components/animation/ScrollReveal";
import TextSplit from "@/components/animation/TextSplit";
import Button from "@/components/ui/Button";

export default function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content drifts up and fades as user scrolls
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 pt-32 pb-8 text-center">
      <motion.div
        style={prefersReduced ? {} : { y: contentY, opacity: contentOpacity }}
      >
        {/* Pulsing badge */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-white/[0.03] backdrop-blur-sm px-5 py-2 mb-10 text-[10px] tracking-[0.25em] uppercase text-primary/90">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Baldwin Park, CA · Est. 2026
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="font-headline serif-italic text-2xl md:text-3xl text-primary/80 mb-4 tracking-tight">
            Dream Drive Motors
          </p>
        </ScrollReveal>

        <TextSplit
          as="h1"
          className="font-headline text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-6"
          splitBy="words"
          staggerDelay={0.08}
          duration={1}
        >
          Drive Your Ambition.
        </TextSplit>

        <ScrollReveal delay={0.3}>
          <p className="font-body text-lg md:text-xl text-white/50 mb-12 max-w-[580px] mx-auto leading-relaxed font-light">
            Premium auto leasing and sales made simple. Flexible financing,
            transparent process, and the keys to your dream car.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex gap-5 flex-wrap justify-center">
            <Button href="/leasing" variant="primary" size="md">
              Explore Leasing
            </Button>
            <Link
              href="/apply"
              className="inline-flex items-center px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white/70 border border-white/20 hover:border-primary/60 hover:text-primary transition-all duration-500"
            >
              Apply for Credit
            </Link>
          </div>
        </ScrollReveal>

        {/* Hero Stats — Glass card treatment */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 inline-flex items-center gap-8 md:gap-12 px-8 py-5 border border-white/[0.06] bg-white/[0.02] backdrop-blur-md rounded-sm flex-wrap justify-center">
            <div>
              <div className="font-headline text-3xl text-primary font-bold">
                500+
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/40 mt-1">
                Happy Customers
              </div>
            </div>
            <div className="w-px h-10 bg-primary/15" />
            <div>
              <div className="font-headline text-3xl text-primary font-bold">
                All
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/40 mt-1">
                Credit Types Welcome
              </div>
            </div>
            <div className="w-px h-10 bg-primary/15" />
            <div>
              <div className="font-headline text-3xl text-primary font-bold">
                Fast
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/40 mt-1">
                Same-Day Approval
              </div>
            </div>
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={prefersReduced ? {} : { opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-primary/40 to-transparent"
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
