import type { Metadata } from "next";
import Link from "next/link";

import ScrollReveal from "@/components/animation/ScrollReveal";
import ContactForm from "@/components/interactive/ContactForm";
import { BUSINESS_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact & Inquire",
  description:
    "The direct line to excellence. Submit an inquiry or schedule a private viewing at our Baldwin Park atelier.",
};

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBRz84nMhqoJq8Nb9QTXqQ9VA8iAkLj4B6olmECUeSkNE_nr7XjyIE4dT2RcnEN2NjJcHebQVamNSN0rw0ZxiEtkDkKttlDMX1A5tphn_nVijENMq1fISnYJARBoifc8T5HiQSOb3cVTN9qrpRt5TNuQWefNve6GhfkcmxSYfHUsxhRZjED9RxlpbsE546FjmYpxQivP232xP_0X4_WxWnoupjNE7ZVYmTzuodsGb-CAhE9j0KIbMVxCcaYMqJpAnNYCDSESXMtkoI";

const SIDE_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAvIF3uj_S1AiVu4YzXLzqwHMWMizbFfj5KBrwH2wDg_QlnOX-WcCAt19tcMG-W4GoC_nAqogjm43OxiNhqjCgenZ_rZPfci--CumFnxs7uavuNYtdR_L2vdLfzaXabFzlbqCvnL8sHM5_wJZTFwlYC53i1UAAWZFkDrfvnieHNRr_J3z_4nVE5BIZ3xXNuJopuE5SVp8PXQ_QW1citIHK4DNsnh4oC4ko6Sa0khDOiajNHRFv-EQ1qRvkOhmAsh4GU7i9cyNPn6aE";

const MAP_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCJWTFQ57ZtU0bfH0wLAvURRPAtlQM8M1Exov2HlrfESjtNKXQ1IP477furBSdIB_Y1fh7mF0i_bgye5zBQugKNFl4g83TQUGxYUMbov_nunpwRQFx_Am9qo-YwBPtDgmQq7mWrEApDdky9kxcIYcAHxpg0O96pNYuwF6qbzggndbRMXz7weeS7ksK3KsfOofcw8H36tfd4JHCLd1uHXw7IMJsKidZ7wiZh_ySghqYgvV-XWYdpAh-aUxGV9eQyQpkVq8arX7CgigQ";

const SIDEBAR_LINKS = [
  {
    label: "Showroom",
    href: "/inventory",
    icon: "directions_car",
    active: false,
  },
  {
    label: "Private Collection",
    href: "/inventory",
    icon: "auto_awesome",
    active: false,
  },
  {
    label: "Service Center",
    href: "/services",
    icon: "settings",
    active: false,
  },
  {
    label: "Financial Suites",
    href: "/services/financing",
    icon: "account_balance",
    active: false,
  },
  { label: "Contact", href: "/contact", icon: "mail", active: true },
];

export default function ContactPage() {
  return (
    <>
      {/* Sidebar - Desktop only */}
      <aside className="hidden lg:flex h-full w-72 fixed left-0 border-r border-white/5 flex-col py-8 z-40 bg-[#0a0a0a] pt-32">
        <div className="px-8 mb-12">
          <h3 className="text-primary font-headline font-medium text-xl">
            DDM Concierge
          </h3>
          <p className="font-body uppercase tracking-[0.15em] text-[0.6rem] text-on-surface-variant mt-1">
            Exclusive Member Access
          </p>
        </div>
        <nav className="flex-grow space-y-1">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center mx-4 py-3.5 px-6 transition-all font-body uppercase tracking-[0.15em] text-[0.7rem] ${
                link.active
                  ? "bg-surface-container-high text-primary"
                  : "text-on-surface/50 hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined mr-4 text-lg">
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-8 pt-8 border-t border-white/5">
          <Link
            href="/contact"
            className="w-full py-4 text-primary text-[0.65rem] font-bold tracking-[0.2em] border border-primary/20 hover:bg-primary/5 transition-all uppercase block text-center"
          >
            Schedule Viewing
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72 pt-20">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex items-center px-8 md:px-12 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-30 grayscale contrast-125"
              alt="Luxury performance vehicle interior with ambient lighting"
              src={HERO_BG}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-4xl">
            <ScrollReveal>
              <span className="font-body uppercase tracking-[0.4em] text-[0.65rem] text-primary mb-6 block font-bold">
                The Contact Experience
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-6xl md:text-8xl font-headline italic font-light tracking-tight leading-[0.95]">
                The Direct Line <br />
                to Excellence.
              </h1>
            </ScrollReveal>
          </div>
        </section>

        {/* Form & Content Section */}
        <section className="px-8 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left: Contact Details */}
          <div className="lg:col-span-4 space-y-16">
            <ScrollReveal>
              <div>
                <h2 className="font-headline text-4xl mb-10 font-light">
                  The Baldwin Park Atelier
                </h2>
                <div className="space-y-10 text-on-surface font-body">
                  <div className="flex items-start gap-6">
                    <span className="material-symbols-outlined text-primary mt-1">
                      location_on
                    </span>
                    <address className="not-italic leading-relaxed tracking-wider text-sm text-on-surface/70">
                      {BUSINESS_INFO.address}
                    </address>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="material-symbols-outlined text-primary">
                      call
                    </span>
                    <a
                      href={`tel:${BUSINESS_INFO.phone.replace(/-/g, "")}`}
                      className="hover:text-primary transition-colors tracking-[0.15em] text-sm text-on-surface/70"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="material-symbols-outlined text-primary">
                      mail
                    </span>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="hover:text-primary transition-colors tracking-[0.15em] text-sm text-on-surface/70"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="p-10 bg-surface-container-low border border-white/5 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-headline text-2xl mb-4 font-light">
                    Private Appointments
                  </h3>
                  <p className="text-[0.8rem] text-on-surface/50 mb-8 leading-relaxed font-body">
                    Experience our curation firsthand. We offer bespoke private
                    viewings and virtual walkthroughs for our global clientele.
                  </p>
                  <Link
                    href="/contact"
                    className="text-primary font-bold tracking-[0.25em] text-[0.65rem] flex items-center gap-3 group-hover:gap-5 transition-all uppercase"
                  >
                    Schedule a Viewing{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="aspect-[4/5] overflow-hidden grayscale contrast-125 opacity-40 border border-white/5">
                <img
                  className="w-full h-full object-cover"
                  alt="Classic car silhouette in atmospheric lighting"
                  src={SIDE_IMG}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Inquiry Form */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="right">
              <ContactForm />
            </ScrollReveal>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full h-[600px] bg-background relative overflow-hidden group border-y border-white/5">
          <div className="absolute inset-0 grayscale contrast-125 opacity-30 transition-all duration-1000 scale-105 group-hover:scale-100">
            <img
              className="w-full h-full object-cover"
              alt="Night aerial city view"
              src={MAP_IMG}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-16 bg-background/95 backdrop-blur-xl border border-primary/20 text-center max-w-sm w-full shadow-2xl relative z-10">
              <span className="material-symbols-outlined text-primary text-5xl mb-6">
                pin_drop
              </span>
              <h4 className="font-headline text-3xl mb-2 font-light">
                The Atelier
              </h4>
              <p className="text-[0.65rem] tracking-[0.4em] uppercase text-on-surface/50 mb-8 font-bold">
                Baldwin Park, California
              </p>
              <div className="h-px w-12 bg-primary/40 mx-auto" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
