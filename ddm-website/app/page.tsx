import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerReveal from "@/components/animation/StaggerReveal";
import TextSplit from "@/components/animation/TextSplit";
import NumberCounter from "@/components/animation/NumberCounter";
import ParallaxImage from "@/components/animation/ParallaxImage";
import MonogramOverlay from "@/components/ui/MonogramOverlay";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Dream Drive Motors | Curated Automotive Excellence",
  description:
    "The gold standard in pre-owned automotive excellence and bespoke financial services. Explore our curated collection of luxury vehicles.",
};

// Image URLs
const HERO_BG =
  "https://res.cloudinary.com/dpcw7jj8i/image/upload/wp9273586_fatkge.jpg";
const SHOWROOM_IMG =
  "https://res.cloudinary.com/dpcw7jj8i/image/upload/pexels-svjae-3764984_hhvah5.jpg";

// ─── Category showcase data ───
const CATEGORIES = [
  {
    name: "Exotic",
    highlight: "Coupes",
    makes: "Lamborghini · Ferrari · Porsche",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBz1VKO7PPNLCY77sBOvIH-61n9xGWD2A25brleceAk-ZJBqK1zObAR2cDRP39wtH1UoMvS1tXwhPGsTP99yOdP4RxdI9C-q6vGM-dbF463n3ZegstH1UYhaIdm68v4j0iIw5ktcMVsNGjhlO9XDx_4F_x2nuHwbOxsYZF0ahMQ8wPitKE6j9f60teq3HBZTsHhWjmUt57OUue9SrPHDIg9OcdO2QmqBStyEz0mEhcyogtOjGCICzxVl99YdPbaNM3-BGgdfXyaeic",
  },
  {
    name: "Luxury",
    highlight: "SUVs",
    makes: "Range Rover · G-Class · Escalade",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDu5ETpZhnNP6d9fDgiXrlVAgzsnNKuHEeTf0rX9VjHaELosqs40jVcGlxfG1lpdKAryMDpV2xD6_glRsn5ws7ujoaDq2a5drVEtUEJZXhtlBcbFQM-68NFiz6t_-72n-1OJaCoaX8BoQtMgVfAgsdsyUf2nn0jT0zLSguvMeTjOEAzYgjPQdwJS-tSWMQcvNF8XMrhDTkccTlh3fESDFkjARPFhDV3kQoqJDif5CtsurLvrrxlGmgybCn2EgGMJX7Ro6L7aMdmvrs",
  },
  {
    name: "Performance",
    highlight: "Sedans",
    makes: "Mercedes S-Class · BMW M5 · Panamera",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVeDPBTHrXZQtmz7rvkROGmpSJ5ZBBiCawmniuHAWThHGFbZOpulcKxMolcJPMz8pEkOY7XqrzLTWZncTvFfOszXXDilCJKMk2IPUbarFqU5JbGJ9d3YzCWf9CCoaAmOH2W8OXh1JG5uu9dIUqqRwtlsmbhpFy6Yz3T2an4naqYeWfdw3EA5OVG_gAIzvM4cJuHx81f1hqgDJjgTY8FZf6S6yePldIaWijA3-mLdB2GBR-djpQksguT-HFkA_PQnBlj4e1QNKNPgI",
  },
];

const DDM_FEATURES = [
  {
    icon: "verified",
    title: "Multi-Point Pedigree",
    description:
      'Every vehicle passes a rigorous 180-point inspection to ensure it meets our "Master Spec" standards before it joins the DDM collection.',
  },
  {
    icon: "event_seat",
    title: "Bespoke Leasing",
    description:
      "Our concierge team crafts custom financial instruments designed to align with your seasonal liquidity and ownership goals.",
  },
  {
    icon: "local_shipping",
    title: "Nationwide White-Glove",
    description:
      "Enclosed delivery to your doorstep, anywhere in the continental United States, with a dedicated specialist for on-site orientation.",
  },
];

const HOMEPAGE_SERVICES = [
  {
    title: "Auto Leasing",
    description:
      "Flexible lease programs with competitive rates, crafted for clients who demand both performance and financial agility.",
    icon: "directions_car",
    href: "/services/leasing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVP6rMNleQeRlFOjCRUV6WUG2KHKNHLfQTkJTwLjcfTP8R39sTFmrzD6i23S9CfImYQQMEmLKtstbmC5IMIbUvFSlex0ibsHudZ6zek9G9cpcmDfMnNaNSgGWVdGurFWttPTDclWOZCxPt9AukvAf7ddFJ3eNA2YE8j6oOfvRhGWn16AQEDozFvkIWGlfymCgABMKty6yeXyUk7pnqp_8XxrtHA4gIblapToBncAr8feWuod1QLHnOL3akz-8sifHfiJcjrBtAYw",
  },
  {
    title: "Auto Financing",
    description:
      "Precision-structured financing solutions designed to complement your lifestyle and investment strategy.",
    icon: "account_balance",
    href: "/services/financing",
    image:
      "https://res.cloudinary.com/dpcw7jj8i/image/upload/wp9015733_lzfnlo.jpg",
  },
  {
    title: "Credit Application",
    description:
      "Discreet, accelerated processing through our streamlined credit pathway. Expert guidance at every step.",
    icon: "verified_user",
    href: "/services/credit-info",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVeDPBTHrXZQtmz7rvkROGmpSJ5ZBBiCawmniuHAWThHGFbZOpulcKxMolcJPMz8pEkOY7XqrzLTWZncTvFfOszXXDilCJKMk2IPUbarFqU5JbGJ9d3YzCWf9CCoaAmOH2W8OXh1JG5uu9dIUqqRwtlsmbhpFy6Yz3T2an4naqYeWfdw3EA5OVG_gAIzvM4cJuHx81f1hqgDJjgTY8FZf6S6yePldIaWijA3-mLdB2GBR-djpQksguT-HFkA_PQnBlj4e1QNKNPgI",
  },
  {
    title: "Sell Your Car",
    description:
      "Receive an immediate, no-obligation offer through our direct acquisition program. No listing delays.",
    icon: "sell",
    href: "/services/acquisition",
    image:
      "https://res.cloudinary.com/dpcw7jj8i/image/upload/pexels-svjae-3764984_hhvah5.jpg",
  },
  {
    title: "Trade-Ins",
    description:
      "Premium valuations for your current vehicle. A seamless transition to your next chapter with DDM.",
    icon: "swap_horiz",
    href: "/services/trade-in",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBG2MCM9ciuVU6jvMVBnRNlfW4kifQS2RBS6CjztM2xulCjl6IoYHU0kmTGzpUwjhzNxBTQPFKO_eKfgFHaPtgjkhCc6bx6Epz8585uYOFiTK1Z3jfxkLtw7JRxsL1zX7KUczi-Pddm3Ibq9wNgzFM_xXAyw2Dc57wvqYT7ng36ywImNzACHyWRGqzZIQ_vkqaWAzN-uKE_2JvG68YncFMj15wuj9j-Wt7kMyuKdq7ZseGgODQtezQHuJMqyorDMuOBxdqJCli58Vw",
  },
  {
    title: "Home Delivery",
    description:
      "White-glove enclosed transport to your doorstep, anywhere in the continental United States.",
    icon: "local_shipping",
    href: "/services/delivery",
    image:
      "https://res.cloudinary.com/dpcw7jj8i/image/upload/wp9273586_fatkge.jpg",
  },
];

const STATS = [
  { end: 180, suffix: "+", label: "Point Inspection" },
  { end: 50, label: "States Delivered" },
  { end: 24, suffix: "/7", label: "Concierge Access" },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero Section — CSS parallax background ─── */}
      <header className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Parallax background via CSS background-attachment: fixed */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('${HERO_BG}')`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.25) 100%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-32">
          <div className="max-w-[700px]">
            {/* Pulsing badge */}
            <div className="inline-flex items-center gap-2 border border-primary/50 px-4 py-1.5 mb-8 text-[11px] tracking-[0.2em] uppercase text-primary backdrop-blur-sm bg-black/30">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Baldwin Park, CA · Est. 2026
            </div>

            <TextSplit
              as="h1"
              className="font-headline text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-on-surface mb-6"
              splitBy="words"
              staggerDelay={0.08}
              duration={1}
            >
              Drive Your Ambition.
            </TextSplit>

            <p
              className="font-body text-lg text-white/80 mb-10 max-w-[520px] leading-relaxed font-light"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              Premium auto leasing and sales made simple. Flexible financing,
              transparent process, and the keys to your dream car — all from
              one trusted dealership.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Button href="/inventory" variant="primary" size="md">
                Explore Collection
              </Button>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white border border-white/50 bg-black/30 backdrop-blur-sm hover:border-primary hover:text-primary transition-all duration-200"
              >
                Our Services
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="flex gap-12 mt-16 pt-8 border-t border-primary/30 flex-wrap">
              <div>
                <div className="font-headline text-3xl text-primary font-bold">
                  500+
                </div>
                <div className="text-[11px] tracking-[0.12em] uppercase text-white/60 mt-1">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="font-headline text-3xl text-primary font-bold">
                  All
                </div>
                <div className="text-[11px] tracking-[0.12em] uppercase text-white/60 mt-1">
                  Credit Types Welcome
                </div>
              </div>
              <div>
                <div className="font-headline text-3xl text-primary font-bold">
                  Fast
                </div>
                <div className="text-[11px] tracking-[0.12em] uppercase text-white/60 mt-1">
                  Same-Day Approval
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent" />
      </header>

      {/* ─── Company Overview ─── */}
      <section className="py-32 md:py-40 bg-background/80 relative overflow-hidden">
        <MonogramOverlay
          className="absolute bottom-0 left-0 p-24"
          opacity={0.025}
          size="text-[24rem]"
        />
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left — Heading */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary mb-8 block">
                  About Dream Drive Motors
                </span>
                <h2 className="font-headline text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                  The Gold Standard in{" "}
                  <br className="hidden lg:block" />
                  <span className="serif-italic text-primary">
                    Automotive Excellence
                  </span>
                </h2>
              </ScrollReveal>
            </div>

            {/* Right — Body + Stats */}
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollReveal delay={0.1}>
                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-6">
                  Dream Drive Motors is not a dealership — it is a private
                  automotive atelier. We source, authenticate, and curate only
                  the most exceptional pre-owned luxury and performance vehicles
                  for collectors and enthusiasts who refuse to compromise.
                </p>
                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-16">
                  From our Baldwin Park gallery to your doorstep, every
                  interaction is defined by discretion, precision, and an
                  unwavering commitment to excellence. Our concierge team handles
                  everything — from bespoke leasing structures to enclosed
                  nationwide delivery.
                </p>
              </ScrollReveal>

              {/* Stats Row */}
              <StaggerReveal className="grid grid-cols-3 gap-8">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="font-headline text-4xl lg:text-5xl text-on-surface mb-2 tracking-tight">
                      <NumberCounter
                        end={stat.end}
                        suffix={stat.suffix || ""}
                        duration={2.5}
                      />
                    </div>
                    <span className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
      </section>

      {/* ─── Curated Selection — Category Cards ─── */}
      <section className="py-32 bg-surface/90 relative">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary mb-6 block">
                  Our Collection
                </span>
                <h2 className="font-headline text-5xl mb-4 text-on-surface">
                  Curated{" "}
                  <span className="serif-italic text-primary">Selection</span>
                </h2>
                <p className="text-on-surface-variant text-sm tracking-wide">
                  We source the world&apos;s finest automobiles across every
                  category.
                </p>
              </div>
              <Link
                href="/inventory"
                className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] border-b border-primary pb-1 hover:text-on-surface hover:border-on-surface transition-all hidden md:inline-block"
              >
                View Full Collection
              </Link>
            </div>
          </ScrollReveal>

          {/* Category Bento Grid */}
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto lg:h-[700px]">
              {/* Featured — Exotic Coupes */}
              <Link
                href="/inventory"
                className="md:col-span-7 relative overflow-hidden rounded-sm group block h-[400px] lg:h-full"
              >
                <Image
                  src={CATEGORIES[0].image}
                  alt={`${CATEGORIES[0].name} ${CATEGORIES[0].highlight}`}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-3 block">
                    {CATEGORIES[0].makes}
                  </span>
                  <h3 className="font-headline text-4xl md:text-5xl text-white mb-2">
                    {CATEGORIES[0].name}{" "}
                    <span className="serif-italic text-primary">
                      {CATEGORIES[0].highlight}
                    </span>
                  </h3>
                  <span className="inline-flex items-center text-primary font-bold text-[10px] uppercase tracking-widest gap-2 group-hover:gap-4 transition-all duration-300 mt-4">
                    Explore{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>

              {/* Compact cards — SUVs & Sedans */}
              <div className="md:col-span-5 flex flex-col gap-4">
                {CATEGORIES.slice(1).map((cat) => (
                  <Link
                    key={cat.name}
                    href="/inventory"
                    className="relative overflow-hidden rounded-sm group block flex-1 min-h-[220px]"
                  >
                    <Image
                      src={cat.image}
                      alt={`${cat.name} ${cat.highlight}`}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 42vw"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <span className="font-label text-[9px] tracking-[0.25em] uppercase text-primary/80 mb-2 block">
                        {cat.makes}
                      </span>
                      <h3 className="font-headline text-2xl md:text-3xl text-white">
                        {cat.name}{" "}
                        <span className="serif-italic text-primary">
                          {cat.highlight}
                        </span>
                      </h3>
                      <span className="inline-flex items-center text-primary font-bold text-[10px] uppercase tracking-widest gap-2 group-hover:gap-4 transition-all duration-300 mt-3">
                        Explore{" "}
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── The DDM Difference — with ParallaxImage ─── */}
      <section className="py-32 bg-surface-container-low/85 relative overflow-hidden">
        {/* Top gradient fade from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-[1]" />
        <MonogramOverlay
          className="absolute top-0 right-0 p-24"
          opacity={0.03}
          size="text-[30rem]"
        />
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Image — now with parallax */}
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <ParallaxImage
                src={SHOWROOM_IMG}
                alt="Luxury showroom interior"
                speed={0.2}
                className="rounded-sm shadow-2xl border border-white/5 h-[400px] lg:h-[520px]"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary mb-6 block">
                  The DDM Difference
                </span>
                <h2 className="font-headline text-5xl lg:text-6xl mb-8 leading-tight">
                  Elite Service for <br />
                  <span className="serif-italic text-primary">
                    The Elite Driver
                  </span>
                </h2>
              </ScrollReveal>

              <StaggerReveal className="space-y-10">
                {DDM_FEATURES.map((feature) => (
                  <div key={feature.title} className="flex gap-6">
                    <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{
                          fontVariationSettings: "'FILL' 1",
                        }}
                      >
                        {feature.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline text-2xl mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent z-[1]" />
      </section>

      {/* ─── Services — with hover background images ─── */}
      <section className="py-32 bg-surface/90">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-16">
              <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary mb-6 block">
                What We Offer
              </span>
              <h2 className="font-headline text-5xl text-on-surface">
                Our{" "}
                <span className="serif-italic text-primary">Services</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 rounded-sm overflow-hidden border border-white/5">
              {HOMEPAGE_SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="bg-surface p-10 md:p-12 hover:bg-surface-container-low transition-colors duration-500 group block relative overflow-hidden"
                >
                  {/* Hover background image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover opacity-0 group-hover:opacity-[0.25] scale-110 group-hover:scale-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-sm bg-primary/5 flex items-center justify-center mb-6 border border-primary/15 group-hover:border-primary/30 transition-colors duration-500">
                      <span
                        className="material-symbols-outlined text-primary text-xl"
                        style={{
                          fontVariationSettings: "'FILL' 1",
                        }}
                      >
                        {service.icon}
                      </span>
                    </div>
                    <h3 className="font-headline text-2xl md:text-3xl mb-3">
                      <span className="serif-italic text-on-surface group-hover:text-primary transition-colors duration-500">
                        {service.title}
                      </span>
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-primary font-bold text-[10px] uppercase tracking-widest gap-2 group-hover:gap-4 transition-all duration-300">
                      Learn More{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <CTASection
        headline={
          <>
            Begin Your{" "}
            <span className="serif-italic">Bespoke Journey</span>
          </>
        }
        subtitle="Whether you are acquiring your first exotic or expanding a collection, our concierge team is ready."
        primaryCTA={{ label: "Explore Collection", href: "/inventory" }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
