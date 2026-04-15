import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animation/ScrollReveal";

interface CTAProps {
  label?: string;
  href: string;
}

interface CTASectionProps {
  headline: React.ReactNode;
  subtitle?: string;
  primaryCTA: CTAProps;
  secondaryCTA?: CTAProps;
  className?: string;
  backgroundImage?: string;
}

export default function CTASection({
  headline,
  subtitle,
  primaryCTA,
  secondaryCTA,
  className,
  backgroundImage,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-24 md:py-32 px-6 md:px-12 bg-black relative overflow-hidden",
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage || "/images/garage/beamer.jpg"}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={100}
          unoptimized
          style={{ filter: `brightness(${backgroundImage ? 0.5 : 0.18})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to bottom, black 0%, transparent 25%, transparent 65%, black 100%)",
              "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.4) 100%)",
            ].join(", "),
          }}
        />
        {/* Subtle gold ambient glow behind headline area */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-[0.04] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, #D4AF37 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

      <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center relative z-10">
        <ScrollReveal>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-7xl mb-10 tracking-tighter">
            {headline}
          </h2>
        </ScrollReveal>
        {subtitle && (
          <ScrollReveal delay={0.15}>
            <p className="text-white/50 text-lg mb-10 max-w-xl">
              {subtitle}
            </p>
          </ScrollReveal>
        )}
        <ScrollReveal delay={0.25}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Button variant="primary" size="lg" href={primaryCTA.href}>
              {primaryCTA.label}
            </Button>
            {secondaryCTA && (
              <Button variant="secondary" size="lg" href={secondaryCTA.href}>
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
