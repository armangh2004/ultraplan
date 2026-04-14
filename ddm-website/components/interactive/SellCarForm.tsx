"use client";

import { useState, useRef, type FormEvent, type DragEvent } from "react";
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateVIN,
  formatPhone,
  formatMileage,
} from "@/lib/validation";

/* ── tiny inline icons ── */
function CheckIcon() {
  return (
    <svg
      className="inline-block w-3.5 h-3.5 text-emerald-400 ml-1"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ── year range for dropdown ── */
const YEARS = Array.from({ length: 27 }, (_, i) => String(2026 - i)); // 2026 → 2000

export default function SellCarForm() {
  /* ── field state ── */
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [payoff, setPayoff] = useState("");
  const [vin, setVin] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  /* ── validation state ── */
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── helpers: per-field validators ── */
  function validateField(name: string): string | null {
    switch (name) {
      case "fullName":
        return validateRequired(fullName, "Full Name");
      case "phone":
        return validatePhone(phone);
      case "email":
        return validateEmail(email);
      case "year":
        return validateRequired(year, "Year");
      case "make":
        return validateRequired(make, "Make");
      case "model":
        return validateRequired(model, "Model");
      case "mileage":
        return validateRequired(mileage.replace(/,/g, ""), "Mileage");
      case "vin": {
        const vinErr = validateVIN(vin);
        return vinErr;
      }
      default:
        return null;
    }
  }

  function handleBlur(name: string) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name) }));
  }

  /* ── helpers: files ── */
  function handleFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    const accepted = Array.from(newFiles).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...accepted]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  /* ── submit ── */
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "year",
      "make",
      "model",
      "mileage",
    ];

    // Always validate VIN if provided (not required, but must be valid)
    const fieldsToValidate = vin.trim()
      ? [...requiredFields, "vin"]
      : requiredFields;

    const newErrors: Record<string, string | null> = {};
    const newTouched: Record<string, boolean> = {};

    fieldsToValidate.forEach((name) => {
      newErrors[name] = validateField(name);
      newTouched[name] = true;
    });

    setErrors(newErrors);
    setTouched(newTouched);

    const hasErrors = Object.values(newErrors).some((err) => err !== null);
    if (hasErrors) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName("");
      setPhone("");
      setEmail("");
      setYear("");
      setMake("");
      setModel("");
      setMileage("");
      setPayoff("");
      setVin("");
      setDescription("");
      setFiles([]);
      setErrors({});
      setTouched({});
    }, 3000);
  }

  /* ── helpers: is a field valid (touched + no error + has content) ── */
  function isValid(name: string, value: string): boolean {
    return touched[name] === true && !errors[name] && value.trim().length > 0;
  }

  /* ── style tokens ── */
  const inputBase =
    "w-full bg-transparent border-0 border-b border-white/20 text-white placeholder:text-white/30 outline-none py-3 px-0 text-sm transition-colors focus:border-[#D4AF37] focus:ring-0";
  const selectBase =
    "w-full bg-transparent border-0 border-b border-white/20 text-white outline-none py-3 px-0 text-sm transition-colors focus:border-[#D4AF37] focus:ring-0 appearance-none cursor-pointer";
  const labelBase =
    "font-label text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold transition-colors group-focus-within:text-[#D4AF37]";

  const requiredStar = <span className="text-red-500">*</span>;

  /* ── render helpers ── */
  function fieldError(name: string) {
    if (!touched[name] || !errors[name]) return null;
    return <p className="text-red-400 text-[11px] mt-1">{errors[name]}</p>;
  }

  function fieldCheck(name: string, value: string) {
    if (!isValid(name, value)) return null;
    return <CheckIcon />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Row 1: Full Name + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        <div className="group flex flex-col gap-2">
          <label htmlFor="sellFullName" className={labelBase}>
            Full Name {requiredStar}
            {fieldCheck("fullName", fullName)}
          </label>
          <input
            id="sellFullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => handleBlur("fullName")}
            className={inputBase}
          />
          {fieldError("fullName")}
        </div>

        <div className="group flex flex-col gap-2">
          <label htmlFor="sellPhone" className={labelBase}>
            Phone Number {requiredStar}
            {fieldCheck("phone", phone)}
          </label>
          <input
            id="sellPhone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            onBlur={() => handleBlur("phone")}
            className={inputBase}
          />
          {fieldError("phone")}
        </div>
      </div>

      {/* Row 2: Email (full width) */}
      <div className="group flex flex-col gap-2">
        <label htmlFor="sellEmail" className={labelBase}>
          Email {requiredStar}
          {fieldCheck("email", email)}
        </label>
        <input
          id="sellEmail"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          className={inputBase}
        />
        {fieldError("email")}
      </div>

      {/* Row 3: Year / Make / Model (three separate fields) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
        <div className="group flex flex-col gap-2 relative">
          <label htmlFor="sellYear" className={labelBase}>
            Year {requiredStar}
            {fieldCheck("year", year)}
          </label>
          <div className="relative">
            <select
              id="sellYear"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onBlur={() => handleBlur("year")}
              className={`${selectBase} ${!year ? "text-white/30" : "text-white"}`}
            >
              <option value="" disabled className="bg-black text-white/30">
                Select year
              </option>
              {YEARS.map((y) => (
                <option key={y} value={y} className="bg-black text-white">
                  {y}
                </option>
              ))}
            </select>
            {/* dropdown chevron */}
            <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30 text-base">
              expand_more
            </span>
          </div>
          {fieldError("year")}
        </div>

        <div className="group flex flex-col gap-2">
          <label htmlFor="sellMake" className={labelBase}>
            Make {requiredStar}
            {fieldCheck("make", make)}
          </label>
          <input
            id="sellMake"
            name="make"
            type="text"
            placeholder="e.g. BMW"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            onBlur={() => handleBlur("make")}
            className={inputBase}
          />
          {fieldError("make")}
        </div>

        <div className="group flex flex-col gap-2">
          <label htmlFor="sellModel" className={labelBase}>
            Model {requiredStar}
            {fieldCheck("model", model)}
          </label>
          <input
            id="sellModel"
            name="model"
            type="text"
            placeholder="e.g. M4 Competition"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            onBlur={() => handleBlur("model")}
            className={inputBase}
          />
          {fieldError("model")}
        </div>
      </div>

      {/* Row 4: Mileage + Payoff */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        <div className="group flex flex-col gap-2">
          <label htmlFor="sellMileage" className={labelBase}>
            Current Mileage {requiredStar}
            {fieldCheck("mileage", mileage)}
          </label>
          <input
            id="sellMileage"
            name="mileage"
            type="text"
            inputMode="numeric"
            placeholder="12,500"
            value={mileage}
            onChange={(e) => setMileage(formatMileage(e.target.value))}
            onBlur={() => handleBlur("mileage")}
            className={inputBase}
          />
          {fieldError("mileage")}
        </div>

        <div className="group flex flex-col gap-2">
          <label htmlFor="sellPayoff" className={labelBase}>
            Current Payoff &amp; Finance Company Name
          </label>
          <input
            id="sellPayoff"
            name="payoff"
            type="text"
            placeholder="$45,000 / Chase Auto Finance"
            value={payoff}
            onChange={(e) => setPayoff(e.target.value)}
            className={inputBase}
          />
        </div>
      </div>

      {/* Row 5: VIN (full width) */}
      <div className="group flex flex-col gap-2">
        <label htmlFor="sellVin" className={labelBase}>
          Full VIN Number
          {vin.trim() && touched.vin && !errors.vin && <CheckIcon />}
        </label>
        <input
          id="sellVin"
          name="vin"
          type="text"
          placeholder="WP0AF2A99NS123456"
          value={vin}
          onChange={(e) =>
            setVin(e.target.value.toUpperCase().slice(0, 17))
          }
          onBlur={() => handleBlur("vin")}
          maxLength={17}
          className={inputBase}
        />
        {touched.vin && errors.vin && (
          <p className="text-red-400 text-[11px] mt-1">{errors.vin}</p>
        )}
        {touched.vin && !errors.vin && vin.trim().length === 17 && (
          <p className="text-emerald-400 text-[11px] mt-1 flex items-center gap-1">
            <CheckIcon /> VIN is valid
          </p>
        )}
      </div>

      {/* Row 6: Description (full width textarea) */}
      <div className="group flex flex-col gap-2">
        <label htmlFor="sellDescription" className={labelBase}>
          Description of Damage / Condition
        </label>
        <textarea
          id="sellDescription"
          name="description"
          rows={4}
          placeholder="Describe the current condition of the vehicle, including any damage, modifications, or notable features..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputBase} resize-none`}
        />
      </div>

      {/* Row 7: File Upload */}
      <div className="group flex flex-col gap-2">
        <label className={labelBase}>Attach Vehicle Pictures</label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-[#D4AF37] bg-[#D4AF37]/5"
              : "border-white/20 hover:border-white/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <span className="material-symbols-outlined text-white/30 text-4xl mb-3 block">
            cloud_upload
          </span>
          <p className="text-white/50 text-sm">
            Drop files here or{" "}
            <span className="text-[#D4AF37] underline underline-offset-4">
              Select files
            </span>
          </p>
          <p className="text-white/25 text-xs mt-2">
            JPG, PNG, or WEBP up to 10MB each
          </p>
        </div>

        {/* File preview list */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {files.map((file, i) => (
              <div
                key={`${file.name}-${i}`}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded text-xs text-white/60"
              >
                <span className="material-symbols-outlined text-sm text-[#D4AF37]">
                  image
                </span>
                <span className="max-w-[140px] truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="text-white/30 hover:text-red-400 transition-colors ml-1"
                >
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={submitted}
          className="w-full bg-[#D4AF37] text-black py-5 font-label text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#e5c548] transition-all disabled:opacity-80 cursor-pointer"
        >
          {submitted ? (
            <span className="flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-lg">
                check_circle
              </span>
              Submission Received
            </span>
          ) : (
            "Submit Vehicle Information"
          )}
        </button>
        <p className="mt-6 text-[0.55rem] text-white/30 text-center tracking-[0.3em] uppercase font-bold flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-xs text-[#D4AF37]/60">
            lock
          </span>
          Your information is secure and will never be shared
        </p>
      </div>
    </form>
  );
}
