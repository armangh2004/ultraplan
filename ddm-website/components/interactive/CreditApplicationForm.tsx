"use client";

import { useState, type FormEvent } from "react";
import InputField from "@/components/ui/InputField";
import {
  validateRequired,
  validateEmail,
  validatePhone,
} from "@/lib/validation";

export default function CreditApplicationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("Direct Call");
  const [financingType, setFinancingType] = useState<"lease" | "finance">(
    "lease"
  );
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nameError = validateRequired(name, "Legal Full Name");
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    const newErrors = {
      name: nameError,
      email: emailError,
      phone: phoneError,
    };

    setErrors(newErrors);

    if (nameError || emailError || phoneError) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setPhone("");
      setContactMethod("Direct Call");
      setFinancingType("lease");
      setErrors({});
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        <InputField
          label="Legal Full Name"
          name="fullName"
          type="text"
          placeholder="Mr. Sterling Archer"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="concierge@ddm.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          label="Phone Identification"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
        />
        <div className="group flex flex-col gap-2">
          <label
            htmlFor="contactMethod"
            className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold transition-colors group-focus-within:text-primary"
          >
            Preferred Contact Method
          </label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            className="w-full bg-surface-container-high border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-5 px-6 transition-all font-body appearance-none cursor-pointer outline-none"
          >
            <option>Direct Call</option>
            <option>Encrypted Message</option>
            <option>Email Liaison</option>
          </select>
        </div>
      </div>

      {/* Tailored Options */}
      <div className="pt-10">
        <div className="bg-surface-container-high p-16 flex flex-col md:flex-row items-center justify-between gap-12 border-l-4 border-primary shadow-xl">
          <div className="max-w-md text-center md:text-left">
            <h3 className="font-headline text-3xl italic mb-4">
              Tailored Options
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Selection of bespoke lease and finance structures available upon
              identity confirmation.
            </p>
          </div>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setFinancingType("lease")}
              className={`px-8 py-5 flex items-center space-x-4 transition-colors cursor-pointer group ${
                financingType === "lease"
                  ? "bg-primary text-on-primary border border-primary"
                  : "bg-surface border border-outline-variant/20 hover:border-primary/40"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  financingType === "lease"
                    ? "text-on-primary"
                    : "text-primary group-hover:scale-110"
                } transition-transform`}
              >
                account_balance
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.3em] font-bold">
                Lease
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFinancingType("finance")}
              className={`px-8 py-5 flex items-center space-x-4 transition-colors cursor-pointer group ${
                financingType === "finance"
                  ? "bg-primary text-on-primary border border-primary"
                  : "bg-surface border border-outline-variant/20 hover:border-primary/40"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  financingType === "finance"
                    ? "text-on-primary"
                    : "text-primary group-hover:scale-110"
                } transition-transform`}
              >
                payments
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.3em] font-bold">
                Finance
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col items-center pt-12">
        <button
          type="submit"
          disabled={submitted}
          className="group relative bg-primary text-on-primary px-20 py-6 font-label uppercase tracking-[0.3em] text-[11px] font-bold transition-all hover:brightness-110 hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden disabled:opacity-80"
        >
          <span className="relative z-10 flex items-center gap-5">
            {submitted ? (
              <>
                <span className="material-symbols-outlined text-lg">check</span>
                Submitted
              </>
            ) : (
              <>
                Proceed to Verification
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-2">
                  arrow_forward
                </span>
              </>
            )}
          </span>
        </button>
        <p className="mt-10 font-label text-[10px] text-on-surface-variant uppercase tracking-[0.2em] flex items-center gap-3 font-bold opacity-70">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          Secure 256-bit SSL encrypted connection
        </p>
      </div>
    </form>
  );
}
