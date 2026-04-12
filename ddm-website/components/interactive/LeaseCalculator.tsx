"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { VEHICLES, LEASE_DEFAULTS } from "@/lib/constants";
import { formatCurrency, formatNumber, calculateLease } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";

const TERMS = [24, 36, 48] as const;
const MILEAGE_OPTIONS = [
  { value: 10000, label: "Limited" },
  { value: 12000, label: "Standard" },
  { value: 15000, label: "Executive" },
] as const;

export default function LeaseCalculator() {
  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState(
    VEHICLES[0].slug
  );
  const [downPayment, setDownPayment] = useState(25000);
  const [termMonths, setTermMonths] = useState<24 | 36 | 48>(36);
  const [annualMileage, setAnnualMileage] = useState(12000);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedVehicle = useMemo(
    () => VEHICLES.find((v) => v.slug === selectedVehicleSlug) ?? VEHICLES[0],
    [selectedVehicleSlug]
  );

  const result = useMemo(
    () =>
      calculateLease(
        selectedVehicle.price,
        downPayment,
        termMonths,
        LEASE_DEFAULTS.residualPercent,
        LEASE_DEFAULTS.moneyFactor
      ),
    [selectedVehicle.price, downPayment, termMonths]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Left Side: Inputs */}
      <div className="lg:col-span-7 space-y-16">
        {/* Vehicle Selection */}
        <div className="space-y-6">
          <label className="font-label uppercase text-[10px] tracking-[0.4em] text-primary/80 font-bold">
            Selected Vehicle
          </label>
          <div className="relative">
            <div
              className="flex items-center gap-8 p-6 bg-surface border border-outline/20 group hover:border-primary/40 transition-all cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-32 h-20 bg-background overflow-hidden relative">
                <img
                  src={selectedVehicle.images.hero}
                  alt={`${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
              </div>
              <div>
                <h3 className="font-headline text-2xl text-on-surface">
                  {selectedVehicle.year} {selectedVehicle.make}{" "}
                  {selectedVehicle.model}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface/40 mt-1">
                  MSRP: {formatCurrency(selectedVehicle.price)}
                </p>
              </div>
              <span className="material-symbols-outlined ml-auto text-primary">
                expand_more
              </span>
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-surface border border-outline/20 shadow-2xl max-h-80 overflow-y-auto">
                {VEHICLES.map((vehicle) => (
                  <div
                    key={vehicle.slug}
                    className={`flex items-center gap-6 p-4 cursor-pointer transition-all hover:bg-surface-container ${
                      vehicle.slug === selectedVehicleSlug
                        ? "border-l-2 border-primary bg-surface-container-high"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedVehicleSlug(vehicle.slug);
                      setDropdownOpen(false);
                    }}
                  >
                    <div className="w-20 h-14 bg-background overflow-hidden flex-shrink-0">
                      <img
                        src={vehicle.images.hero}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-headline text-lg text-on-surface">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface/40">
                        {formatCurrency(vehicle.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sliders Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Down Payment */}
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <label className="font-label uppercase text-[10px] tracking-[0.4em] text-primary/80 font-bold">
                Down Payment
              </label>
              <span className="font-headline text-4xl text-primary">
                {formatCurrency(downPayment)}
              </span>
            </div>
            <div className="relative py-4">
              <input
                type="range"
                min={5000}
                max={50000}
                step={1000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-4 text-[9px] uppercase tracking-[0.2em] text-on-surface/30">
                <span>Min $5,000</span>
                <span>Max $50,000</span>
              </div>
            </div>
          </div>

          {/* Lease Term */}
          <div className="space-y-8">
            <label className="font-label uppercase text-[10px] tracking-[0.4em] text-primary/80 font-bold">
              Lease Term (Months)
            </label>
            <div className="flex gap-4">
              {TERMS.map((term) => (
                <button
                  key={term}
                  onClick={() => setTermMonths(term)}
                  className={`flex-1 py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${
                    termMonths === term
                      ? "bg-primary text-on-primary font-black"
                      : "border border-outline/30 text-on-surface/50 hover:border-primary hover:text-on-surface"
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Annual Mileage */}
          <div className="space-y-8 md:col-span-2">
            <label className="font-label uppercase text-[10px] tracking-[0.4em] text-primary/80 font-bold">
              Annual Mileage
            </label>
            <div className="grid grid-cols-3 gap-6">
              {MILEAGE_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setAnnualMileage(option.value)}
                  className={`p-8 bg-surface cursor-pointer text-center group transition-all ${
                    annualMileage === option.value
                      ? "border border-primary"
                      : "border border-outline/20 hover:border-primary/40"
                  }`}
                >
                  <p
                    className={`text-[9px] uppercase tracking-[0.3em] mb-3 ${
                      annualMileage === option.value
                        ? "text-primary"
                        : "text-on-surface/40 group-hover:text-primary"
                    }`}
                  >
                    {option.label}
                  </p>
                  <p className="font-headline text-3xl text-on-surface">
                    {formatNumber(option.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Results Panel */}
      <div className="lg:col-span-5 lg:sticky top-40">
        <GlassCard
          className="border border-outline/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
          padding="p-12"
        >
          <div className="text-center space-y-12">
            <div className="inline-block px-6 py-2 border border-primary/30 text-primary text-[9px] uppercase tracking-[0.4em] font-bold">
              Estimated Monthly Investment
            </div>

            <div>
              <span className="font-headline text-8xl lg:text-9xl font-bold text-on-surface tracking-tighter serif-italic">
                {formatCurrency(result.monthly)}
              </span>
              <span className="font-headline text-2xl text-on-surface/40 ml-4 font-light italic">
                /mo*
              </span>
            </div>

            <div className="space-y-6 pt-12 border-t border-outline/20">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] tracking-[0.3em] uppercase text-on-surface/40 font-semibold">
                  Purchase Option Price
                </span>
                <span className="font-headline text-2xl text-on-surface">
                  {formatCurrency(result.purchaseOption)}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] tracking-[0.3em] uppercase text-on-surface/40 font-semibold">
                  Total Interest (Est)
                </span>
                <span className="font-headline text-2xl text-on-surface">
                  {formatCurrency(result.totalInterest)}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <Link
                href="/contact"
                className="w-full py-6 bg-primary text-on-primary font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white transition-all shadow-[0_20px_40px_rgba(212,175,55,0.15)] block text-center"
              >
                Request Bespoke Quote
              </Link>
              <Link
                href="/apply"
                className="w-full py-6 border border-outline text-on-surface font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-white/5 transition-all block text-center"
              >
                Start Credit Application
              </Link>
            </div>

            <div className="flex items-center justify-center gap-10 pt-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg text-primary/60">
                  verified_user
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-on-surface/40 font-bold">
                  Secure
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg text-primary/60">
                  support_agent
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-on-surface/40 font-bold">
                  Concierge
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="mt-10 px-8">
          <p className="text-[9px] leading-relaxed text-on-surface/30 italic uppercase tracking-[0.15em] text-center">
            *Estimates only. Final terms subject to credit approval and specific
            vehicle availability. All leases are facilitated through our bespoke
            concierge network. Taxes, titles, and registration fees are
            calculated upon formal proposal.
          </p>
        </div>
      </div>
    </div>
  );
}
