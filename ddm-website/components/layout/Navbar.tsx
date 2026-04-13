"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

const SERVICE_DROPDOWN = [
  { label: "Auto Leasing", href: "/services/leasing" },
  { label: "Auto Financing", href: "/services/financing" },
  { label: "Credit Application", href: "/services/credit-info" },
  { label: "Sell Your Car", href: "/services/acquisition" },
  { label: "Trade-Ins", href: "/services/trade-in" },
  { label: "Home Delivery", href: "/services/delivery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
              {NAV_LINKS.map((link) => {
                const isServices = link.label === "Services";
                const isActive = isServices
                  ? pathname.startsWith("/services")
                  : pathname === link.href;

                if (isServices) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`text-[10px] tracking-[0.2em] uppercase transition-colors inline-flex items-center gap-1 ${
                          isActive
                            ? "text-primary border-b border-primary pb-1"
                            : "text-on-surface/60 hover:text-primary"
                        }`}
                      >
                        {link.label}
                        <span className="material-symbols-outlined text-[14px]">
                          expand_more
                        </span>
                      </Link>

                      {/* Dropdown */}
                      {servicesOpen && (
                        <div className="absolute top-full left-0 pt-3">
                          <div className="bg-surface-container border border-white/10 backdrop-blur-xl shadow-2xl py-2 min-w-[220px]">
                            {SERVICE_DROPDOWN.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-5 py-3 text-[10px] tracking-[0.15em] uppercase transition-colors ${
                                  pathname === item.href
                                    ? "text-primary bg-primary/5"
                                    : "text-on-surface/70 hover:text-primary hover:bg-white/5"
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
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
