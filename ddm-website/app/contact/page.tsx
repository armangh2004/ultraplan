import type { Metadata } from "next";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import ContactForm from "@/components/interactive/ContactForm";
import { BUSINESS_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dream Drive Motors. Submit an inquiry, schedule a visit, or call us directly.",
};

const CONTACT_ITEMS = [
  {
    icon: "location_on",
    label: "Visit Us",
    content: BUSINESS_INFO.address,
  },
  {
    icon: "call",
    label: "Call Us",
    content: BUSINESS_INFO.phone,
    href: `tel:${BUSINESS_INFO.phone.replace(/-/g, "")}`,
  },
  {
    icon: "mail",
    label: "Email Us",
    content: BUSINESS_INFO.email,
    href: `mailto:${BUSINESS_INFO.email}`,
  },
  {
    icon: "schedule",
    label: "Hours",
    content: "Mon – Sat: 9 AM – 7 PM",
    subtext: "Sun: By Appointment",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-40 pb-20 px-6 md:px-12 flex items-center justify-center">
        <div className="max-w-screen-2xl mx-auto text-center">
          <ScrollReveal>
            <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-6 block">
              Get in Touch
            </span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-6">
              Contact{" "}
              <span className="serif-italic text-primary">Us</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-white/50 max-w-[580px] mx-auto leading-relaxed font-light">
              Have a question about leasing, financing, or selling your vehicle?
              Our team is here to help. Reach out and we&apos;ll get back to you
              within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main content: Contact Info + Form */}
      <section className="bg-black py-16 md:py-24 px-6 md:px-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 section-divider" />

        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: Contact details */}
          <div className="lg:col-span-4">
            <StaggerReveal className="space-y-6" staggerDelay={0.1}>
              {CONTACT_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-5 p-5 border border-white/[0.04] bg-white/[0.015] hover:border-primary/15 transition-colors duration-500 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-primary/[0.06] flex items-center justify-center border border-primary/15 flex-shrink-0 group-hover:border-primary/30 group-hover:shadow-gold-sm transition-all duration-500">
                    <span
                      className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform duration-500"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2">
                      {item.label}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-on-surface text-sm hover:text-primary transition-colors duration-300"
                      >
                        {item.content}
                      </a>
                    ) : item.label === "Visit Us" ? (
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=15132+Arrow+Hwy+Baldwin+Park+CA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="not-italic text-on-surface text-sm leading-relaxed hover:text-primary transition-colors duration-300 block"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <>
                        <p className="text-on-surface text-sm">{item.content}</p>
                        {item.subtext && (
                          <p className="text-white/40 text-sm">{item.subtext}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </StaggerReveal>

            {/* Directions link */}
            <ScrollReveal delay={0.2}>
              <a
                href="https://www.google.com/maps/search/?api=1&query=15132+Arrow+Hwy+Baldwin+Park+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center gap-4 p-5 border border-white/[0.04] bg-white/[0.015] hover:border-primary/15 transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-sm bg-primary/[0.06] flex items-center justify-center border border-primary/15 flex-shrink-0 group-hover:border-primary/30 group-hover:shadow-gold-sm transition-all duration-500">
                  <span
                    className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform duration-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    directions
                  </span>
                </div>
                <div>
                  <span className="text-on-surface text-sm group-hover:text-primary transition-colors duration-300 block">
                    Get Directions
                  </span>
                  <span className="text-white/35 text-xs">
                    Opens in Google Maps
                  </span>
                </div>
                <span className="material-symbols-outlined text-white/20 text-sm ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                  north_east
                </span>
              </a>
            </ScrollReveal>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="right">
              <div className="border border-white/[0.06] bg-white/[0.015] p-8 md:p-12">
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-2 text-on-surface">
                  Send Us a{" "}
                  <span className="serif-italic text-primary">Message</span>
                </h2>
                <p className="text-white/35 text-sm mb-10">
                  Fill out the form below and our team will be in touch shortly.
                </p>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
