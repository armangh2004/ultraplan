"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function BudgetSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [ownership, setOwnership] = useState<"lease" | "buy">("lease");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/inventory");
  }

  return (
    <div className={cn(className)}>
      <div className="glass-card p-1 rounded-sm shadow-2xl border border-outline-variant/10">
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-high/60 p-6 rounded-sm grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
        >
          {/* Monthly Budget */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant block">
              Monthly Budget
            </label>
            <select className="w-full bg-surface-container-highest/50 border-none rounded-sm text-xs text-on-surface focus:ring-1 focus:ring-primary h-10 px-3">
              <option>$500 - $1,000</option>
              <option>$1,000 - $2,500</option>
              <option>$2,500+</option>
            </select>
          </div>

          {/* Preferred Type */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant block">
              Preferred Type
            </label>
            <select className="w-full bg-surface-container-highest/50 border-none rounded-sm text-xs text-on-surface focus:ring-1 focus:ring-primary h-10 px-3">
              <option>Exotic Coupe</option>
              <option>Luxury SUV</option>
              <option>Performance Sedan</option>
            </select>
          </div>

          {/* Ownership Toggle */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant block">
              Ownership
            </label>
            <div className="flex bg-surface-container-highest/50 p-1 rounded-sm h-10">
              <button
                type="button"
                onClick={() => setOwnership("lease")}
                className={cn(
                  "flex-1 text-[10px] rounded-sm font-bold uppercase transition-colors",
                  ownership === "lease"
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Lease
              </button>
              <button
                type="button"
                onClick={() => setOwnership("buy")}
                className={cn(
                  "flex-1 text-[10px] rounded-sm font-bold uppercase transition-colors",
                  ownership === "buy"
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Buy
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-primary text-on-primary h-10 flex items-center justify-center gap-2 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] hover:brightness-110 transition-all px-6"
          >
            <span className="material-symbols-outlined text-sm">search</span>
            Find My DDM
          </button>
        </form>
      </div>
    </div>
  );
}
