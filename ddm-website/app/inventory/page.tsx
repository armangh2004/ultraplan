"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { VEHICLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import ScrollReveal from "@/components/animation/ScrollReveal";
import VehicleCard from "@/components/ui/VehicleCard";
import MonogramOverlay from "@/components/ui/MonogramOverlay";

// Image URLs from design
const COLLECTION_CLASSICS =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBJnzoG-lMWv5kS6qNuczDeJAp9Lcbuc52YkhmKg5gNLx6HHDyCm26DnSIg3JaNVK8yffi-Lj9wz1wSZZl2zRntwGqd5FKfsB33tUeAiQ8lxxKwMwW8cs78RtypYI1cbQg9nZK1XOnuMV6Gyt_1n1cTZ32u0TR1tQxrF5U_3a-Q_tsjxdXG6PyTctRW6YbtWHmoQePfSZUxqjpl2sKhsm_uMlnAoRnMhoqbmQEwHPQNDhF3B-EM2US9mq_P3yKS8Vfa_CoyfEw-ny8";
const COLLECTION_ELECTRIC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCESArkuH84LgtmzJk0qQbadAsxKXYSGyNNSmaxJVdZohKhwZmRpo5jzQAPtQwo1qO8BvAMCDK7z9jCSPNKhp1KVdxhEQHL4j1WS0KsvgpjNeZYDoCq5rJkWKg0YDxKuU-C-3p60PhG9EhV_a5aji-J6Id_6zG36byVc_6PHUNgfUYdvDGxI-kwPkPHxRvrDouXOrlRXe_HRdRl_F1b3lXGxPhiudRAsoa1VKsbWiHpTF4L8BRa7oLhO0eH2zez0Ycl7lXiHj3_kp8";
const COLLECTION_INTERIORS =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpApBXBaWZb0UbEqoIIxN2KGjJ-Y-dyOkCxO20iM8JMHg-yyvYJypJzDCgFheD9U0gU_vMqeu6FtFQCXajzm6oHPA6Ne7XSED1-iaxTRlyXMhGHfufLVpvDLbNi0AY6q6aeR3rf50lR2OATW8d4wY07jWKyq-AVsiAHpRJxF8bkZ4AII5dW1IRX9duCKE-WTrhdxnmvLzSznde76-T6FO24D4S3OfUxKXgzQluJMWwd1I4TCqb8f-np3n6Rb9J1qUUP_jCLnRKs8";

const MANUFACTURERS = [
  { label: "All", value: "all" },
  { label: "Porsche", value: "porsche" },
  { label: "Ferrari", value: "ferrari" },
  { label: "Lamborghini", value: "lamborghini" },
] as const;

const BODY_STYLES = [
  { label: "Coupe", value: "coupe" },
  { label: "Convertible", value: "convertible" },
  { label: "SUV", value: "suv" },
] as const;

export default function InventoryPage() {
  const [manufacturer, setManufacturer] = useState("all");
  const [bodyStyle, setBodyStyle] = useState<string | null>(null);

  const filtered = VEHICLES.filter((v) => {
    if (manufacturer !== "all" && v.manufacturer !== manufacturer) return false;
    if (bodyStyle && v.category !== bodyStyle) return false;
    return true;
  });

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
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block font-bold">
              Curated Excellence
            </span>
            <h1 className="font-headline text-7xl md:text-9xl leading-[0.9] text-on-surface mb-8">
              The <span className="serif-italic">Reserve</span> <br />
              <span className="gold-gradient-text">Inventory</span>
            </h1>
            <p className="text-on-surface/60 font-body text-xl leading-relaxed max-w-xl">
              Explore our strictly vetted selection of high-performance vehicles
              and luxury grand tourers. Every unit is a masterpiece of
              engineering.
            </p>
          </div>
          <div className="hidden md:flex gap-12 border-l border-white/10 pl-12 h-fit">
            <div className="text-left">
              <p className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface/40 mb-2">
                Available Units
              </p>
              <p className="font-headline text-6xl text-on-surface leading-none">
                {VEHICLES.length}
              </p>
            </div>
            <div className="text-left">
              <p className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface/40 mb-2">
                Showroom Loc.
              </p>
              <p className="font-headline text-6xl text-on-surface leading-none serif-italic">
                LAX
              </p>
            </div>
          </div>
        </header>

        {/* ─── Filters ─── */}
        <section className="mb-16 bg-surface-container border border-white/5 p-8 flex flex-wrap gap-12 items-center">
          {/* Manufacturer */}
          <div className="flex flex-col gap-3">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-on-surface/40 font-bold">
              Manufacturer
            </span>
            <div className="flex gap-4 flex-wrap">
              {MANUFACTURERS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setManufacturer(m.value)}
                  className={cn(
                    "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
                    manufacturer === m.value
                      ? "bg-primary text-on-primary"
                      : "bg-white/5 text-on-surface hover:text-primary border border-white/5"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-12 bg-white/10 hidden md:block" />

          {/* Body Style */}
          <div className="flex flex-col gap-3">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-on-surface/40 font-bold">
              Body Style
            </span>
            <div className="flex gap-4 flex-wrap">
              {BODY_STYLES.map((b) => (
                <button
                  key={b.value}
                  onClick={() =>
                    setBodyStyle(bodyStyle === b.value ? null : b.value)
                  }
                  className={cn(
                    "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
                    bodyStyle === b.value
                      ? "bg-primary text-on-primary"
                      : "bg-white/5 text-on-surface hover:text-primary border border-white/5"
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter/Sort Decorative */}
          <div className="ml-auto flex gap-8">
            <button className="flex items-center gap-3 text-primary font-label text-[10px] tracking-[0.2em] uppercase font-bold border-b border-primary/30 pb-1">
              <span className="material-symbols-outlined text-lg">tune</span>{" "}
              Filter
            </button>
            <button className="flex items-center gap-3 text-on-surface/60 font-label text-[10px] tracking-[0.2em] uppercase font-bold border-b border-white/10 pb-1 hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-lg">
                swap_vert
              </span>{" "}
              Sort By
            </button>
          </div>
        </section>

        {/* ─── Vehicle Grid ─── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((vehicle) => (
              <motion.div
                key={vehicle.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <VehicleCard vehicle={vehicle} variant="grid" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-32">
            <p className="font-headline text-3xl text-on-surface-variant">
              No vehicles match your criteria
            </p>
            <p className="text-on-surface-variant/60 text-sm mt-4">
              Try adjusting your filters to explore our collection.
            </p>
          </div>
        )}

        {/* ─── Curated Collections ─── */}
        <section className="mt-32">
          <h2 className="font-headline text-5xl mb-12 text-on-surface">
            Curated{" "}
            <span className="serif-italic gold-gradient-text">
              Collections
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 md:h-[700px]">
            {/* The Classics */}
            <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group border border-white/5">
              <img
                src={COLLECTION_CLASSICS}
                alt="Vintage classic sports cars collection"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-12 left-12">
                <p className="font-label text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-bold">
                  Heritage Selection
                </p>
                <h4 className="font-headline text-5xl text-on-surface serif-italic">
                  The Classics
                </h4>
              </div>
            </div>

            {/* Electric Luxury */}
            <div className="md:col-span-2 md:row-span-1 relative overflow-hidden group border border-white/5">
              <img
                src={COLLECTION_ELECTRIC}
                alt="Electric vehicle charging port close-up"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <p className="font-label text-[10px] tracking-[0.4em] uppercase text-primary mb-3 font-bold">
                  Modern Era
                </p>
                <h4 className="font-headline text-3xl text-on-surface serif-italic">
                  Electric Luxury
                </h4>
              </div>
            </div>

            {/* Interiors */}
            <div className="md:col-span-1 md:row-span-1 relative overflow-hidden group border border-white/5 bg-surface-container min-h-[200px]">
              <img
                src={COLLECTION_INTERIORS}
                alt="Steering wheel and dashboard"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="block w-12 h-px bg-primary mx-auto mb-4" />
                  <h4 className="font-label text-[10px] tracking-[0.4em] uppercase text-on-surface font-bold">
                    Interiors
                  </h4>
                </div>
              </div>
            </div>

            {/* Bespoke Ordering */}
            <div className="md:col-span-1 md:row-span-1 relative overflow-hidden group bg-primary p-10 flex flex-col justify-between border border-primary/20 min-h-[200px]">
              <span className="material-symbols-outlined text-5xl text-on-primary">
                auto_awesome
              </span>
              <div>
                <h4 className="font-headline text-3xl text-on-primary serif-italic leading-tight mb-3">
                  Bespoke Ordering
                </h4>
                <p className="text-on-primary/70 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                  Tailor every stitch to your preference.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
