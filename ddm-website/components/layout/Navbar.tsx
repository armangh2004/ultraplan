"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="font-headline italic text-2xl text-primary tracking-tighter"
            >
              DDM
            </Link>

            <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[9px] tracking-[0.18em] uppercase transition-colors whitespace-nowrap ${
                      isActive
                        ? "text-primary border-b border-primary pb-1"
                        : "text-on-surface/60 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Inquire + Hamburger */}
          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="sm"
              href="/contact"
              className="hidden md:inline-block"
            >
              Inquire
            </Button>

            {/* Mobile/tablet hamburger — show below xl */}
            <button
              className="xl:hidden text-on-surface hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
