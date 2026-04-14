"use client";

import { useState, useCallback, type FormEvent } from "react";
import {
  validateRequired,
  validateEmail,
  validatePhone,
  formatPhone,
} from "@/lib/validation";

const INTEREST_OPTIONS = [
  "Auto Leasing",
  "Auto Financing",
  "Sell My Car",
  "Trade-In",
  "General Inquiry",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }

  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      let error: string | null = null;
      if (field === "email") error = validateEmail(form.email);
      else if (field === "phone" && form.phone) error = validatePhone(form.phone);
      else if (field === "firstName") error = validateRequired(form.firstName, "First name");
      else if (field === "lastName") error = validateRequired(form.lastName, "Last name");
      else if (field === "message") error = form.message.trim().length < 10 ? "Please enter at least 10 characters" : null;
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [form],
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string | null> = {
      firstName: validateRequired(form.firstName, "First name"),
      lastName: validateRequired(form.lastName, "Last name"),
      email: validateEmail(form.email),
      message: form.message.trim().length < 10 ? "Please enter at least 10 characters" : null,
    };
    if (form.phone) newErrors.phone = validatePhone(form.phone);

    setErrors(newErrors);
    setTouched({ firstName: true, lastName: true, email: true, phone: true, message: true });
    if (Object.values(newErrors).some((e) => e !== null)) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <span
          className="material-symbols-outlined text-primary text-6xl mb-6"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <h3 className="font-headline text-3xl mb-4 text-on-surface">
          Message Sent
        </h3>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          Thank you, {form.firstName}. A member of our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ firstName: "", lastName: "", email: "", phone: "", interest: "", message: "" });
            setErrors({});
            setTouched({});
          }}
          className="text-primary font-label text-[10px] uppercase tracking-widest border-b border-primary/40 pb-1 hover:border-primary transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <Field label="First Name" required error={touched.firstName ? errors.firstName : null} valid={touched.firstName && !errors.firstName && !!form.firstName}>
          <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} onBlur={() => handleBlur("firstName")} placeholder="Your first name" className="form-input" />
        </Field>
        <Field label="Last Name" required error={touched.lastName ? errors.lastName : null} valid={touched.lastName && !errors.lastName && !!form.lastName}>
          <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} onBlur={() => handleBlur("lastName")} placeholder="Your last name" className="form-input" />
        </Field>
        <Field label="Email" required error={touched.email ? errors.email : null} valid={touched.email && !errors.email && !!form.email}>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} onBlur={() => handleBlur("email")} placeholder="your@email.com" className="form-input" />
        </Field>
        <Field label="Phone" error={touched.phone ? errors.phone : null} valid={touched.phone && !errors.phone && !!form.phone}>
          <input type="tel" value={form.phone} onChange={(e) => update("phone", formatPhone(e.target.value))} onBlur={() => handleBlur("phone")} placeholder="(555) 123-4567" className="form-input" />
        </Field>
      </div>

      {/* Interest selection */}
      <div>
        <label className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold block mb-4">
          What can we help you with?
        </label>
        <div className="flex flex-wrap gap-3">
          {INTEREST_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => update("interest", option)}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-widest transition-all duration-300 ${
                form.interest === option
                  ? "bg-primary text-on-primary font-bold"
                  : "border border-white/10 text-white/40 hover:border-primary/40 hover:text-white/60"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <Field label="Message" required error={touched.message ? errors.message : null} valid={touched.message && !errors.message && form.message.length >= 10}>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          placeholder="How can we help you today?"
          rows={5}
          className="form-input resize-none"
        />
      </Field>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="group w-full bg-primary text-on-primary py-5 font-label text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:brightness-110 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
        >
          <span className="flex items-center justify-center gap-3">
            Send Message
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </span>
        </button>
        <p className="mt-6 text-center text-white/25 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">schedule</span>
          We respond within 24 hours
        </p>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 0;
          color: #e5e2e1;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s;
        }
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
        .form-input:focus {
          border-bottom-color: #D4AF37;
        }
      `}</style>
    </form>
  );
}

function Field({ label, required, error, valid, children }: {
  label: string;
  required?: boolean;
  error?: string | null;
  valid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold block mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        {valid && <span className="text-green-400 ml-2 text-xs">&#10003;</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
