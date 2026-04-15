import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/constants";
import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";

export default function Footer() {
  return (
    <footer className="bg-black relative">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
          {/* Left: Logo, tagline, social */}
          <ScrollReveal className="flex flex-col gap-6">
            <Link href="/" aria-label="Dream Drive Motors - Home">
              <span className="font-headline italic text-primary text-3xl tracking-tight">
                DDM
              </span>
            </Link>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 max-w-xs leading-relaxed">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300"
                aria-label="Email"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Right: 3-column grid */}
          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
            staggerDelay={0.12}
          >
            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                Contact
              </h4>
              <div className="flex flex-col gap-3">
                <p className="text-white/50 text-xs">
                  {BUSINESS_INFO.address}
                </p>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-white/50 hover:text-primary hover:translate-x-1 text-xs transition-all duration-300 inline-block"
                >
                  {BUSINESS_INFO.email}
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-white/50 hover:text-primary hover:translate-x-1 text-xs transition-all duration-300 inline-block"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                Services
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Leasing", href: "/leasing" },
                  { label: "Financing", href: "/financing" },
                  { label: "Credit Application", href: "/apply" },
                  { label: "Sell Your Car", href: "/acquisition" },
                  { label: "Trade-Ins", href: "/trade-in" },
                  { label: "Delivery", href: "/delivery" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/50 hover:text-primary hover:translate-x-1 text-xs transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                Legal
              </h4>
              <div className="flex flex-col gap-3">
                <Link
                  href="/privacy"
                  className="text-white/50 hover:text-primary hover:translate-x-1 text-xs transition-all duration-300 inline-block"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-white/50 hover:text-primary hover:translate-x-1 text-xs transition-all duration-300 inline-block"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </StaggerReveal>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="border-t border-white/[0.04] py-10 text-center" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}>
          <p className="text-white/25 text-[10px] tracking-[0.4em] uppercase">
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
