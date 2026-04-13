"use client";

import Image from "next/image";
import Link from "next/link";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import MonogramOverlay from "@/components/ui/MonogramOverlay";
import CTASection from "@/components/sections/CTASection";

const INVENTORY_CATEGORIES = [
  {
    name: "Exotic",
    highlight: "Coupes",
    makes: "Lamborghini · Ferrari · Porsche · McLaren",
    description: "Track-bred precision meets road-going luxury. The pinnacle of automotive engineering.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz1VKO7PPNLCY77sBOvIH-61n9xGWD2A25brleceAk-ZJBqK1zObAR2cDRP39wtH1UoMvS1tXwhPGsTP99yOdP4RxdI9C-q6vGM-dbF463n3ZegstH1UYhaIdm68v4j0iIw5ktcMVsNGjhlO9XDx_4F_x2nuHwbOxsYZF0ahMQ8wPitKE6j9f60teq3HBZTsHhWjmUt57OUue9SrPHDIg9OcdO2QmqBStyEz0mEhcyogtOjGCICzxVl99YdPbaNM3-BGgdfXyaeic",
    span: "lg:col-span-2 lg:row-span-2",
    titleSize: "text-5xl md:text-6xl",
  },
  {
    name: "Luxury",
    highlight: "SUVs",
    makes: "Range Rover · G-Class · Escalade · Bentayga",
    description: "Commanding presence with uncompromising comfort for every terrain.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu5ETpZhnNP6d9fDgiXrlVAgzsnNKuHEeTf0rX9VjHaELosqs40jVcGlxfG1lpdKAryMDpV2xD6_glRsn5ws7ujoaDq2a5drVEtUEJZXhtlBcbFQM-68NFiz6t_-72n-1OJaCoaX8BoQtMgVfAgsdsyUf2nn0jT0zLSguvMeTjOEAzYgjPQdwJS-tSWMQcvNF8XMrhDTkccTlh3fESDFkjARPFhDV3kQoqJDif5CtsurLvrrxlGmgybCn2EgGMJX7Ro6L7aMdmvrs",
    span: "lg:col-span-1 lg:row-span-1",
    titleSize: "text-3xl md:text-4xl",
  },
  {
    name: "Performance",
    highlight: "Sedans",
    makes: "Mercedes S-Class · BMW M5 · Porsche Panamera",
    description: "Four-door elegance with the soul of a sports car.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVeDPBTHrXZQtmz7rvkROGmpSJ5ZBBiCawmniuHAWThHGFbZOpulcKxMolcJPMz8pEkOY7XqrzLTWZncTvFfOszXXDilCJKMk2IPUbarFqU5JbGJ9d3YzCWf9CCoaAmOH2W8OXh1JG5uu9dIUqqRwtlsmbhpFy6Yz3T2an4naqYeWfdw3EA5OVG_gAIzvM4cJuHx81f1hqgDJjgTY8FZf6S6yePldIaWijA3-mLdB2GBR-djpQksguT-HFkA_PQnBlj4e1QNKNPgI",
    span: "lg:col-span-1 lg:row-span-1",
    titleSize: "text-3xl md:text-4xl",
  },
  {
    name: "Grand",
    highlight: "Tourers",
    makes: "Aston Martin · Bentley · Rolls-Royce",
    description: "Continental elegance for the long-distance connoisseur.",
    image: "https://res.cloudinary.com/dpcw7jj8i/image/upload/pexels-svjae-3764984_hhvah5.jpg",
    span: "lg:col-span-1 lg:row-span-1",
    titleSize: "text-3xl md:text-4xl",
  },
  {
    name: "Open-Top",
    highlight: "Convertibles",
    makes: "Ferrari Spider · Porsche Cabriolet · Aston Volante",
    description: "The sky is your ceiling. Designed for the open road.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG2MCM9ciuVU6jvMVBnRNlfW4kifQS2RBS6CjztM2xulCjl6IoYHU0kmTGzpUwjhzNxBTQPFKO_eKfgFHaPtgjkhCc6bx6Epz8585uYOFiTK1Z3jfxkLtw7JRxsL1zX7KUczi-Pddm3Ibq9wNgzFM_xXAyw2Dc57wvqYT7ng36ywImNzACHyWRGqzZIQ_vkqaWAzN-uKE_2JvG68YncFMj15wuj9j-Wt7kMyuKdq7ZseGgODQtezQHuJMqyorDMuOBxdqJCli58Vw",
    span: "lg:col-span-1 lg:row-span-1",
    titleSize: "text-3xl md:text-4xl",
  },
  {
    name: "Electric",
    highlight: "Luxury",
    makes: "Tesla · Porsche Taycan · Mercedes EQS · Lucid",
    description: "Silent power. Zero compromise. The future of performance.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCESArkuH84LgtmzJk0qQbadAsxKXYSGyNNSmaxJVdZohKhwZmRpo5jzQAPtQwo1qO8BvAMCDK7z9jCSPNKhp1KVdxhEQHL4j1WS0KsvgpjNeZYDoCq5rJkWKg0YDxKuU-C-3p60PhG9EhV_a5aji-J6Id_6zG36byVc_6PHUNgfUYdvDGxI-kwPkPHxRvrDouXOrlRXe_HRdRl_F1b3lXGxPhiudRAsoa1VKsbWiHpTF4L8BRa7oLhO0eH2zez0Ycl7lXiHj3_kp8",
    span: "lg:col-span-1 lg:row-span-1",
    titleSize: "text-3xl md:text-4xl",
  },
  {
    name: "Hyper",
    highlight: "Cars",
    makes: "Bugatti · Pagani · Koenigsegg · Rimac",
    description: "Limited production. Unlimited ambition. For the ultimate collector.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVP6rMNleQeRlFOjCRUV6WUG2KHKNHLfQTkJTwLjcfTP8R39sTFmrzD6i23S9CfImYQQMEmLKtstbmC5IMIbUvFSlex0ibsHudZ6zek9G9cpcmDfMnNaNSgGWVdGurFWttPTDclWOZCxPt9AukvAf7ddFJ3eNA2YE8j6oOfvRhGWn16AQEDozFvkIWGlfymCgABMKty6yeXyUk7pnqp_8XxrtHA4gIblapToBncAr8feWuod1QLHnOL3akz-8sifHfiJcjrBtAYw",
    span: "lg:col-span-2 lg:row-span-1",
    titleSize: "text-4xl md:text-5xl",
  },
];

export default function InventoryPage() {
  return (
    <>
      {/* Fixed DDM Monogram Watermark */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span
          className="font-headline italic text-[35vw] leading-none whitespace-nowrap"
          style={{ opacity: 0.02, letterSpacing: "-0.05em" }}
        >
          DDM
        </span>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 py-16">
        {/* ─── Hero Title Section ─── */}
        <header className="mb-20 pt-16">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block font-bold">
                Our Collection
              </span>
              <h1 className="font-headline text-7xl md:text-9xl leading-[0.9] text-on-surface mb-8">
                The <span className="serif-italic">Reserve</span> <br />
                <span className="gold-gradient-text">Collection</span>
              </h1>
              <p className="text-on-surface/60 font-body text-xl leading-relaxed max-w-xl">
                We source the world&apos;s finest automobiles across every category.
                Any vehicle can be made available based on your financing
                and credit profile — your dream car is within reach.
              </p>
            </div>
          </ScrollReveal>
        </header>

        {/* ─── Availability Note ─── */}
        <ScrollReveal>
          <div className="mb-16 flex items-center gap-4 bg-primary/5 border border-primary/20 px-8 py-5">
            <span
              className="material-symbols-outlined text-primary text-2xl flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              info
            </span>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              <span className="text-primary font-semibold">Any car can be yours.</span>{" "}
              Our inventory is not limited to what you see here. We can source and acquire
              any vehicle worldwide based on your financing approval and credit history.
              Contact our concierge team to discuss your dream car.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── Category Grid ─── */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[320px]">
          {INVENTORY_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href="/contact"
              className={`relative overflow-hidden rounded-sm group block ${cat.span}`}
            >
              <Image
                src={cat.image}
                alt={`${cat.name} ${cat.highlight}`}
                fill
                className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-700" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <span className="font-label text-[9px] tracking-[0.25em] uppercase text-primary/80 mb-2 block">
                  {cat.makes}
                </span>
                <h3 className={`font-headline ${cat.titleSize} text-white mb-2`}>
                  {cat.name}{" "}
                  <span className="serif-italic text-primary">
                    {cat.highlight}
                  </span>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-md">
                  {cat.description}
                </p>
                <span className="inline-flex items-center text-primary font-bold text-[10px] uppercase tracking-widest gap-2 group-hover:gap-4 transition-all duration-300">
                  Inquire{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </StaggerReveal>

        {/* ─── Bespoke Ordering Card ─── */}
        <ScrollReveal>
          <div className="mt-16 bg-primary/5 border border-primary/20 p-12 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <span
              className="material-symbols-outlined text-7xl text-primary flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <div>
              <h3 className="font-headline text-4xl md:text-5xl mb-4">
                Bespoke{" "}
                <span className="serif-italic text-primary">Sourcing</span>
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed mb-6 max-w-2xl">
                Don&apos;t see your dream car? Our global acquisition network can locate
                and secure any vehicle — from factory-fresh exotics to rare collector
                editions. Every acquisition includes our 180-point inspection and
                white-glove delivery.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-primary font-bold text-[10px] uppercase tracking-widest gap-2 hover:gap-4 transition-all duration-300 border-b border-primary pb-1"
              >
                Start Your Search{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Closing CTA ─── */}
      <CTASection
        headline={
          <>
            Find Your{" "}
            <span className="serif-italic">Dream Car</span>
          </>
        }
        subtitle="Tell us what you're looking for and our concierge team will make it happen."
        primaryCTA={{ label: "Contact Concierge", href: "/contact" }}
        secondaryCTA={{ label: "View Services", href: "/services" }}
      />
    </>
  );
}
