import type { Metadata } from "next";

import ScrollReveal from "@/components/animation/ScrollReveal";
import LeaseCalculator from "@/components/interactive/LeaseCalculator";

export const metadata: Metadata = {
  title: "Lease Calculator",
  description:
    "Experience the precision of high-end automotive acquisition. Tailor your monthly investment with our secure, concierge-calibrated calculator.",
};

const RELATED_OPPORTUNITIES = [
  {
    label: "Executive Series",
    title: "Interior Customization",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHx45KEvfyrQf5fI-2riuB-B8WjBl1WGtDOCgUb0o5ktG_s2gWYC7A6aDmuJal82ridnxY9xL3xhQ8vaopJgHvDIVHVwIorBb3JcbOX-GNGSU1O8zCRG_FfO_YPhW4Bl95tm2A0Ma6QwBkKWKv7QK1sc5ectpq-Put7q-9yMDA8jM4bJr33n-tsz-52UQkrm5gXsJezODDa0U7nGJjdV7ybDz5pxshohwyK9jj0mjMNUUGWFlxHU2CLl9W-PgvajVCO2adHU_a2lg",
    alt: "Luxury car interior",
  },
  {
    label: "Legacy Fleet",
    title: "Collector Leases",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-XMGmIc91xIstiqX_x0Gvu8EA-tVMO9hDXU4DsS4tZut0Bw70ZPWT-S6EUC76iwYjOxfCxdlWnaPlL7CVClCmDkcYoTbtcPaUP6AlQ2AXwvFJrDI6DkdbsuNgbmkYzH3OFRLKnKCZe-LM4x-2pNnw0y229VNvRl0WYxyQOJCX9cl4iz6e9sam83DUznMpdO22yfxIX_xzlsqDZxWH_aXqqZIJTv5pO2xdeXiWxdSUlCh18mdiCsTvVn49x_eTeGiCPzIhSXzBL8s",
    alt: "Vintage car and mansion",
  },
  {
    label: "Concierge Care",
    title: "Maintenance Inclusive",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrkD0mLVv44Lwrsm7K-9Tm4-oZ_v4oxh-VEsMkbQEEYEPgJl3aOCEu1E99LBY-i9V9Rig3olHGJxxf2LfQ-ZKnl3VYnwL3jQBXXgB0NrqyKOONPE-EO9DnoB1qRY0VJB0M0m5_L6Qfo2D9zXMhQxUcMjoUkQ8TjtOxr3uAsibkxp28PQjyauaHeEd_tAiS-dEfxiqVKppmFP5NERYsEUuQrv5mm1qWfOGpKNeswRd5bj-2YBiF-2ciwCtCrJw2k8Vjo6_Ef3F4bTI",
    alt: "High-end steering wheel logo",
  },
];

export default function CalculatorPage() {
  return (
    <>
      {/* Hero Section */}
      <header className="pt-48 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <ScrollReveal>
          <span className="font-label text-primary uppercase tracking-[0.5em] text-[10px] mb-8 block font-semibold">
            Financial Engineering
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-[100px] font-extralight text-on-surface leading-[0.9] mb-10">
            Bespoke Lease <br />
            <span className="serif-italic text-primary">Strategy</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="font-body text-on-surface/60 text-lg leading-relaxed max-w-2xl font-light">
            Experience the precision of high-end automotive acquisition. Tailor
            your monthly investment with our secure, concierge-calibrated
            calculator.
          </p>
        </ScrollReveal>
      </header>

      {/* Calculator Interface */}
      <section className="px-6 md:px-12 pb-32 max-w-[1440px] mx-auto">
        <LeaseCalculator />
      </section>

      {/* Related Opportunities */}
      <section className="px-6 md:px-12 pb-32 max-w-[1440px] mx-auto">
        <ScrollReveal>
          <h3 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extralight mb-20 text-on-surface">
            Related{" "}
            <span className="serif-italic text-primary">Opportunities</span>
          </h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {RELATED_OPPORTUNITIES.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden mb-8 border border-white/[0.06] bg-white/[0.015] group-hover:border-primary/15 transition-colors duration-500">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                </div>
                <p className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/80 mb-3 font-bold">
                  {item.label}
                </p>
                <h4 className="font-headline text-3xl font-light text-on-surface">
                  {item.title}
                </h4>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
