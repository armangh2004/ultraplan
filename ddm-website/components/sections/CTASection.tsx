import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

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
}

export default function CTASection({
  headline,
  subtitle,
  primaryCTA,
  secondaryCTA,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-20 px-6 md:px-12 bg-black relative overflow-hidden",
        className
      )}
    >
      {/* BMW background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/garage/beamer.jpg"
          alt=""
          fill
          className="object-cover object-[center_30%]"
          sizes="100vw"
          quality={90}
          style={{ filter: "brightness(0.2)" }}
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
      </div>

      <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center relative z-10">
        <h2 className="font-headline text-5xl md:text-7xl mb-10 tracking-tighter">
          {headline}
        </h2>
        {subtitle && (
          <p className="text-white/50 text-lg mb-10 max-w-xl">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-6">
          <Button variant="primary" size="lg" href={primaryCTA.href}>
            {primaryCTA.label}
          </Button>
          {secondaryCTA && (
            <Button variant="secondary" size="lg" href={secondaryCTA.href}>
              {secondaryCTA.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
