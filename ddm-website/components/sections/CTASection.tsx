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
  background?: string;
}

export default function CTASection({
  headline,
  subtitle,
  primaryCTA,
  secondaryCTA,
  className,
  background = "bg-surface-container-lowest",
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-48 px-6 md:px-12 border-t border-white/5",
        background,
        className
      )}
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center">
        <h2 className="font-headline text-6xl md:text-8xl mb-16 tracking-tighter">
          {headline}
        </h2>
        {subtitle && (
          <p className="text-on-surface-variant text-lg mb-12 max-w-xl">
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
