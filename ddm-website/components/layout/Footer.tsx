import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          {/* Left: Logo, tagline, social */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="font-headline italic text-3xl text-primary"
            >
              DDM
            </Link>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 max-w-xs">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
                aria-label="Email"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
            </div>
          </div>

          {/* Right: 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16">
            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                Contact
              </h4>
              <div className="flex flex-col gap-2">
                <p className="text-white/50 text-xs">
                  {BUSINESS_INFO.address}
                </p>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-white/50 hover:text-primary text-xs transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-white/50 hover:text-primary text-xs transition-colors"
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
              <div className="flex flex-col gap-2">
                <Link href="/leasing" className="text-white/50 hover:text-primary text-xs transition-colors">
                  Leasing
                </Link>
                <Link href="/financing" className="text-white/50 hover:text-primary text-xs transition-colors">
                  Financing
                </Link>
                <Link href="/apply" className="text-white/50 hover:text-primary text-xs transition-colors">
                  Credit Application
                </Link>
                <Link href="/acquisition" className="text-white/50 hover:text-primary text-xs transition-colors">
                  Sell Your Car
                </Link>
                <Link href="/trade-in" className="text-white/50 hover:text-primary text-xs transition-colors">
                  Trade-Ins
                </Link>
                <Link href="/delivery" className="text-white/50 hover:text-primary text-xs transition-colors">
                  Delivery
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                Legal
              </h4>
              <div className="flex flex-col gap-2">
                <Link href="/privacy" className="text-white/50 hover:text-primary text-xs transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/50 hover:text-primary text-xs transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="border-t border-white/5 py-10 text-center">
          <p className="text-white/25 text-[10px] tracking-[0.4em] uppercase">
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
