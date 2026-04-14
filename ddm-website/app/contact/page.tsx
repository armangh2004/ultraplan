import type { Metadata } from "next";

import ScrollReveal from "@/components/animation/ScrollReveal";
import ContactForm from "@/components/interactive/ContactForm";
import { BUSINESS_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dream Drive Motors. Submit an inquiry, schedule a visit, or call us directly.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <ScrollReveal>
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/80 block mb-6">
              Get in Touch
            </span>
            <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight mb-6">
              Contact{" "}
              <span className="serif-italic text-primary">Us</span>
            </h1>
            <p className="text-white/40 text-lg max-w-xl leading-relaxed font-light">
              Have a question about leasing, financing, or selling your vehicle?
              Our team is here to help. Reach out and we&apos;ll get back to you
              within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main content: Contact Info + Form */}
      <section className="bg-black py-16 md:py-24 px-6 md:px-12">
        <div className="absolute left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: Contact details */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <div className="space-y-10">
                {/* Address */}
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-sm bg-white/[0.03] flex items-center justify-center border border-primary/10 flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2">
                      Visit Us
                    </h3>
                    <address className="not-italic text-on-surface text-sm leading-relaxed">
                      {BUSINESS_INFO.address}
                    </address>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-sm bg-white/[0.03] flex items-center justify-center border border-primary/10 flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      call
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2">
                      Call Us
                    </h3>
                    <a
                      href={`tel:${BUSINESS_INFO.phone.replace(/-/g, "")}`}
                      className="text-on-surface text-sm hover:text-primary transition-colors"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-sm bg-white/[0.03] flex items-center justify-center border border-primary/10 flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      mail
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2">
                      Email Us
                    </h3>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-on-surface text-sm hover:text-primary transition-colors"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-sm bg-white/[0.03] flex items-center justify-center border border-primary/10 flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      schedule
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2">
                      Hours
                    </h3>
                    <p className="text-on-surface text-sm">Mon – Sat: 9 AM – 7 PM</p>
                    <p className="text-white/40 text-sm">Sun: By Appointment</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Google Maps embed */}
            <ScrollReveal delay={0.1}>
              <div className="mt-12 aspect-[4/3] rounded-sm overflow-hidden border border-white/[0.06]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.6!2d-117.9611!3d34.0851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2db00000000%3A0x0!2s15132+Arrow+Hwy%2C+Baldwin+Park%2C+CA!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(50%)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dream Drive Motors Location"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="right">
              <div className="border border-white/[0.06] rounded-sm p-8 md:p-12">
                <h2 className="font-headline text-3xl md:text-4xl mb-2 text-on-surface">
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
