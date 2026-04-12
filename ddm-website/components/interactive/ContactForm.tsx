"use client";

import { useState, type FormEvent } from "react";
import InputField from "@/components/ui/InputField";
import {
  validateRequired,
  validateEmail,
  validateMinLength,
} from "@/lib/validation";

const INTEREST_OPTIONS = ["Acquisition", "Leasing", "Bespoke", "General"];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nameError = validateRequired(name, "Full Name");
    const emailError = validateEmail(email);
    const messageError = validateMinLength(message, 10, "Message");

    const newErrors = {
      name: nameError,
      email: emailError,
      message: messageError,
    };

    setErrors(newErrors);

    if (nameError || emailError || messageError) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setInterest("");
      setMessage("");
      setErrors({});
    }, 2000);
  }

  return (
    <div className="bg-surface-container-low p-8 md:p-16 border border-white/5">
      <h3 className="font-headline text-5xl mb-16 font-light">
        Submit an Inquiry
      </h3>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <InputField
            label="Full Name"
            name="contactName"
            type="text"
            placeholder="Johnathan Sterling"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
          <InputField
            label="Email Address"
            name="contactEmail"
            type="email"
            placeholder="j.sterling@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
        </div>

        {/* Nature of Interest */}
        <div className="space-y-6">
          <label className="font-body uppercase tracking-[0.2em] text-[0.6rem] text-on-surface/40 font-bold">
            Nature of Interest
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {INTEREST_OPTIONS.map((option) => (
              <label
                key={option}
                className="relative flex items-center justify-center py-4 border border-white/10 cursor-pointer hover:bg-white/5 transition-all group"
              >
                <input
                  type="radio"
                  name="interest"
                  value={option}
                  checked={interest === option}
                  onChange={(e) => setInterest(e.target.value)}
                  className="hidden peer"
                />
                <span className="text-[0.6rem] tracking-[0.15em] peer-checked:text-primary absolute inset-0 flex items-center justify-center text-on-surface/40 font-bold uppercase transition-all peer-checked:bg-white/5">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3 group">
          <label
            htmlFor="contactMessage"
            className="font-body uppercase tracking-[0.2em] text-[0.6rem] text-on-surface/40 group-focus-within:text-primary transition-colors font-bold"
          >
            Message
          </label>
          <textarea
            id="contactMessage"
            name="contactMessage"
            rows={6}
            placeholder="How may our concierge assist you today?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-surface-container border-none px-6 py-5 focus:ring-1 focus:ring-primary/40 transition-all font-body text-sm placeholder:text-on-surface/20 resize-none text-on-surface outline-none"
          />
          {errors.message && (
            <p className="text-error text-[11px]">{errors.message}</p>
          )}
        </div>

        <div className="pt-8">
          <button
            type="submit"
            disabled={submitted}
            className="w-full bg-primary text-on-primary py-6 font-body text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl disabled:opacity-80"
          >
            {submitted ? (
              <span className="flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-lg">check</span>
                Inquiry Sent
              </span>
            ) : (
              "Send Inquiry"
            )}
          </button>
          <p className="mt-8 text-[0.55rem] text-on-surface/30 text-center tracking-[0.3em] uppercase font-bold">
            A concierge representative will respond within 24 hours.
          </p>
        </div>
      </form>
    </div>
  );
}
