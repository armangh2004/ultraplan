"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500"
        animate={{
          backgroundColor: scrolled
            ? "rgba(0, 0, 0, 0.95)"
            : "rgba(0, 0, 0, 0.6)",
          borderColor: scrolled
            ? "rgba(212, 175, 55, 0.08)"
            : "rgba(255, 255, 255, 0.03)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <motion.div
          className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center"
          animate={{ paddingTop: scrolled ? 14 : 20, paddingBottom: scrolled ? 14 : 20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-10">
            <AnimatedLogo className="relative" />

            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-5 xl:gap-7"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    className="relative"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + i * 0.04,
                      ease: [0.25, 0.1, 0.25, 1.0],
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`text-xs tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300 hover:-translate-y-px ${
                        isActive
                          ? "text-primary"
                          : "text-on-surface/50 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-indicator"
                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Right: Inquire + Hamburger */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="primary"
              size="sm"
              href="/contact"
              className="hidden md:inline-block"
            >
              Inquire
            </Button>

            <button
              className="lg:hidden text-on-surface hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Subtle gold glow line at bottom when scrolled */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgba(212,175,55,0.15) 30%, rgba(212,175,55,0.15) 70%, transparent)",
          }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
