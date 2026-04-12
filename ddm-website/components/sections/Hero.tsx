import { cn } from "@/lib/utils";

interface HeroProps {
  label?: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  backgroundImage?: string;
  height?: string;
  className?: string;
  overlay?: React.ReactNode;
}

export default function Hero({
  label,
  title,
  subtitle,
  children,
  backgroundImage,
  height = "min-h-screen",
  className,
  overlay,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative w-full flex items-center overflow-hidden",
        height,
        className
      )}
    >
      {/* Background image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          {overlay ?? (
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="max-w-xl">
          {label && (
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">
              {label}
            </span>
          )}
          <div className="mb-8">{title}</div>
          {subtitle && (
            <p className="font-body text-lg text-on-surface-variant mb-12 max-w-md leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
