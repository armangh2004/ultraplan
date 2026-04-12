import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function calculateLease(
  msrp: number,
  downPayment: number,
  termMonths: number,
  residualPercent: number = 0.5,
  moneyFactor: number = 0.00125
) {
  const residual = msrp * residualPercent;
  const netCapCost = msrp - downPayment;
  const depreciation = (netCapCost - residual) / termMonths;
  const financeCharge = (netCapCost + residual) * moneyFactor;
  const monthly = depreciation + financeCharge;
  const totalInterest = financeCharge * termMonths;
  return {
    monthly: Math.round(monthly),
    residual: Math.round(residual),
    totalInterest: Math.round(totalInterest),
    purchaseOption: Math.round(residual),
  };
}
