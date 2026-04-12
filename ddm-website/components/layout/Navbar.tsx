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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className="font-headline italic text-2xl text-primary tracking-tighter"
            >
              DDM
            </Link>

            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
                    pathname === link.href
                      ? "text-primary border-b border-primary pb-1"
                      : "text-on-surface/60 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Search + Icons + Inquire */}
          <div className="flex items-center gap-4">
            {/* Search bar — desktop only */}
            <div className="hidden lg:flex items-center bg-white/5 border border-white/10 px-4 py-2 gap-2">
              <span className="material-symbols-outlined text-on-surface/40 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search"
                aria-label="Search inventory"
                className="bg-transparent border-none outline-none text-on-surface text-xs placeholder:text-on-surface/40 w-28"
              />
            </div>

            {/* Icon buttons */}
            <button
              className="text-primary hover:scale-110 transition-transform hidden lg:block"
              aria-label="Schedule appointment"
            >
              <span className="material-symbols-outlined">calendar_today</span>
            </button>
            <button
              className="text-primary hover:scale-110 transition-transform hidden lg:block"
              aria-label="User account"
            >
              <span className="material-symbols-outlined">person</span>
            </button>

            {/* Inquire button */}
            <Button
              variant="primary"
              size="sm"
              href="/contact"
              className="hidden md:inline-block"
            >
              Inquire
            </Button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-on-surface hover:text-primary transition-colors"
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
