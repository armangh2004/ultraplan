"use client";

import { useState, useCallback, type FormEvent } from "react";
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateVIN,
  formatPhone,
  formatMileage,
} from "@/lib/validation";

const YEARS = Array.from({ length: 27 }, (_, i) => String(2026 - i)); // 2026 down to 2000

export default function TradeInForm() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    // Current vehicle — split into year / make / model
    currentYear: "",
    currentMake: "",
    currentModel: "",
    currentMileage: "",
    currentVin: "",
    currentPayoff: "",
    condition: "",
    // Desired vehicle
    desiredVehicle: "",
    desiredCategory: "Select Category",
    timeline: "Select Timeline",
    additionalNotes: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  /* ── helpers ─────────────────────────────────── */

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }

  /** Mark a field as touched, then run its validation immediately. */
  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(field, form);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form],
  );

  function handleFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  /* ── submit ──────────────────────────────────── */

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Touch every required field so inline errors show
    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "currentYear",
      "currentMake",
      "currentModel",
      "currentMileage",
    ];
    const allTouched: Record<string, boolean> = {};
    requiredFields.forEach((f) => (allTouched[f] = true));
    setTouched((prev) => ({ ...prev, ...allTouched }));

    const newErrors: Record<string, string | null> = {};
    requiredFields.forEach((f) => {
      newErrors[f] = validateField(f, form);
    });
    // Also validate VIN if provided
    newErrors.currentVin = validateVIN(form.currentVin);

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e !== null)) return;
    setSubmitted(true);
  }

  /* ── success state ───────────────────────────── */

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
          Trade-In Request Submitted
        </h3>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          Our acquisition team will review your vehicle details and contact you
          within 24 hours with a preliminary valuation.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              fullName: "",
              phone: "",
              email: "",
              currentYear: "",
              currentMake: "",
              currentModel: "",
              currentMileage: "",
              currentVin: "",
              currentPayoff: "",
              condition: "",
              desiredVehicle: "",
              desiredCategory: "Select Category",
              timeline: "Select Timeline",
              additionalNotes: "",
            });
            setFiles([]);
            setErrors({});
            setTouched({});
          }}
          className="text-primary font-label text-[10px] uppercase tracking-widest border-b border-primary/40 pb-1 hover:border-primary transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  /* ── form ─────────────────────────────────────── */

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      {/* Section 1: Contact Information */}
      <div>
        <h3 className="font-headline text-2xl mb-8 text-on-surface">
          <span className="text-primary serif-italic">01</span>
          <span className="mx-3 text-white/10">&mdash;</span>
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <Field
            label="Full Name"
            required
            error={errors.fullName}
            valid={touched.fullName && !errors.fullName}
          >
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              placeholder="Your full name"
              className="form-input"
            />
          </Field>

          <Field
            label="Phone Number"
            required
            error={errors.phone}
            valid={touched.phone && !errors.phone}
          >
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", formatPhone(e.target.value))}
              onBlur={() => handleBlur("phone")}
              placeholder="(555) 123-4567"
              className="form-input"
            />
          </Field>

          <Field
            label="Email Address"
            required
            error={errors.email}
            valid={touched.email && !errors.email}
            className="md:col-span-2"
          >
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="your@email.com"
              className="form-input"
            />
          </Field>
        </div>
      </div>

      {/* Section 2: Your Current Vehicle */}
      <div>
        <h3 className="font-headline text-2xl mb-8 text-on-surface">
          <span className="text-primary serif-italic">02</span>
          <span className="mx-3 text-white/10">&mdash;</span>
          Your Current Vehicle
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
          {/* Year / Make / Model — three separate fields */}
          <Field
            label="Year"
            required
            error={errors.currentYear}
            valid={touched.currentYear && !errors.currentYear}
          >
            <select
              value={form.currentYear}
              onChange={(e) => update("currentYear", e.target.value)}
              onBlur={() => handleBlur("currentYear")}
              className="form-input appearance-none cursor-pointer"
            >
              <option value="">Select Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Make"
            required
            error={errors.currentMake}
            valid={touched.currentMake && !errors.currentMake}
          >
            <input
              type="text"
              value={form.currentMake}
              onChange={(e) => update("currentMake", e.target.value)}
              onBlur={() => handleBlur("currentMake")}
              placeholder="e.g. Porsche"
              className="form-input"
            />
          </Field>

          <Field
            label="Model"
            required
            error={errors.currentModel}
            valid={touched.currentModel && !errors.currentModel}
          >
            <input
              type="text"
              value={form.currentModel}
              onChange={(e) => update("currentModel", e.target.value)}
              onBlur={() => handleBlur("currentModel")}
              placeholder="e.g. 911 GT3"
              className="form-input"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-8">
          <Field
            label="Current Mileage"
            required
            error={errors.currentMileage}
            valid={touched.currentMileage && !errors.currentMileage}
          >
            <input
              type="text"
              value={form.currentMileage}
              onChange={(e) =>
                update("currentMileage", formatMileage(e.target.value))
              }
              onBlur={() => handleBlur("currentMileage")}
              placeholder="e.g. 12,500"
              className="form-input"
            />
          </Field>

          <Field
            label="Full VIN Number"
            error={errors.currentVin}
            valid={
              touched.currentVin &&
              !errors.currentVin &&
              form.currentVin.length === 17
            }
          >
            <input
              type="text"
              value={form.currentVin}
              onChange={(e) =>
                update(
                  "currentVin",
                  e.target.value.toUpperCase().slice(0, 17),
                )
              }
              onBlur={() => {
                setTouched((prev) => ({ ...prev, currentVin: true }));
                setErrors((prev) => ({
                  ...prev,
                  currentVin: validateVIN(form.currentVin),
                }));
              }}
              placeholder="17-character VIN"
              maxLength={17}
              className="form-input"
            />
          </Field>

          <Field label="Current Payoff / Finance Company">
            <input
              type="text"
              value={form.currentPayoff}
              onChange={(e) => update("currentPayoff", e.target.value)}
              placeholder="Amount owed & lender name"
              className="form-input"
            />
          </Field>

          <div>{/* intentional spacer for grid alignment */}</div>

          <Field label="Vehicle Condition" className="md:col-span-2">
            <textarea
              value={form.condition}
              onChange={(e) => update("condition", e.target.value)}
              placeholder="Describe any modifications, damage, or notable features..."
              rows={3}
              className="form-input resize-none"
            />
          </Field>
        </div>

        {/* Photo upload */}
        <div className="mt-8">
          <label className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold block mb-3">
            Attach Vehicle Photos
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`border border-dashed rounded-sm p-8 text-center transition-colors cursor-pointer ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-white/10 hover:border-white/20"
            }`}
            onClick={() =>
              document.getElementById("trade-in-photos")?.click()
            }
          >
            <span className="material-symbols-outlined text-white/20 text-3xl mb-2">
              cloud_upload
            </span>
            <p className="text-white/30 text-sm">
              Drop files here or{" "}
              <span className="text-primary">Select files</span>
            </p>
            <p className="text-white/15 text-xs mt-1">
              JPG, PNG, PDF &mdash; Max 32MB
            </p>
            <input
              id="trade-in-photos"
              type="file"
              multiple
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {files.map((f, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 text-xs text-white/60 rounded-sm"
                >
                  {f.name}
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-white/30 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Desired Vehicle */}
      <div>
        <h3 className="font-headline text-2xl mb-8 text-on-surface">
          <span className="text-primary serif-italic">03</span>
          <span className="mx-3 text-white/10">&mdash;</span>
          Your Next Masterpiece
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <Field label="Desired Vehicle (if known)">
            <input
              type="text"
              value={form.desiredVehicle}
              onChange={(e) => update("desiredVehicle", e.target.value)}
              placeholder="e.g. 2024 Lamborghini Hurac&aacute;n"
              className="form-input"
            />
          </Field>
          <Field label="Category of Interest">
            <select
              value={form.desiredCategory}
              onChange={(e) => update("desiredCategory", e.target.value)}
              className="form-input appearance-none cursor-pointer"
            >
              <option disabled>Select Category</option>
              <option>Exotic Coupes</option>
              <option>Luxury SUVs</option>
              <option>Performance Sedans</option>
              <option>Grand Tourers</option>
              <option>Electric / Hybrid</option>
              <option>Open to Suggestions</option>
            </select>
          </Field>
          <Field label="Purchase Timeline">
            <select
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value)}
              className="form-input appearance-none cursor-pointer"
            >
              <option disabled>Select Timeline</option>
              <option>Immediately</option>
              <option>Within 1 Month</option>
              <option>Within 3 Months</option>
              <option>Just Exploring</option>
            </select>
          </Field>
          <Field label="Additional Notes">
            <input
              type="text"
              value={form.additionalNotes}
              onChange={(e) => update("additionalNotes", e.target.value)}
              placeholder="Anything else we should know"
              className="form-input"
            />
          </Field>
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col items-center pt-4">
        <button
          type="submit"
          className="group bg-primary text-on-primary px-16 py-5 font-label uppercase tracking-[0.3em] text-[11px] font-bold transition-all hover:brightness-110 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
        >
          <span className="flex items-center gap-4">
            Submit Trade-In Request
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </span>
        </button>
        <p className="mt-6 text-white/25 text-[10px] uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">lock</span>
          Your information is secure and confidential
        </p>
      </div>

      {/* Inline styles for form inputs */}
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
          border-bottom-color: #d4af37;
        }
        select.form-input {
          padding-right: 8px;
        }
        select.form-input option {
          background: #000;
          color: #e5e2e1;
        }
      `}</style>
    </form>
  );
}

/* ── Field-level validation logic ────────────── */

function validateField(
  field: string,
  form: Record<string, string>,
): string | null {
  switch (field) {
    case "fullName":
      return validateRequired(form.fullName, "Full Name");
    case "phone":
      return validatePhone(form.phone);
    case "email":
      return validateEmail(form.email);
    case "currentYear":
      return validateRequired(form.currentYear, "Year");
    case "currentMake":
      return validateRequired(form.currentMake, "Make");
    case "currentModel":
      return validateRequired(form.currentModel, "Model");
    case "currentMileage":
      return validateRequired(form.currentMileage, "Mileage");
    case "currentVin":
      return validateVIN(form.currentVin);
    default:
      return null;
  }
}

/* ── Reusable Field wrapper ──────────────────── */

function Field({
  label,
  required: isRequired,
  error,
  valid,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string | null;
  valid?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold block mb-2">
        {label}
        {isRequired && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative">
        {children}
        {/* Inline status icon (error or success) */}
        {error && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-red-400">
            <span
              className="material-symbols-outlined text-base"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              error
            </span>
          </span>
        )}
        {!error && valid && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-emerald-400">
            <span
              className="material-symbols-outlined text-base"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </span>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
