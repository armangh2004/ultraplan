"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, BUSINESS_INFO } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants = {
  closed: {
    x: "100%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
  },
  open: {
    x: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: 40 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Escape key closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-background"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <div className="flex justify-end px-6 md:px-12 py-5">
            <button
              onClick={onClose}
              className="text-on-surface hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>

          {/* Nav links */}
          <nav aria-label="Mobile navigation" className="flex flex-col gap-6 px-10 mt-12">
            {NAV_LINKS.map((link, i) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`font-headline italic text-3xl transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-on-surface/60 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Business info at bottom */}
          <motion.div
            className="absolute bottom-12 left-10 flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="text-on-surface/50 hover:text-primary text-xs transition-colors"
            >
              {BUSINESS_INFO.phone}
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="text-on-surface/50 hover:text-primary text-xs transition-colors"
            >
              {BUSINESS_INFO.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
