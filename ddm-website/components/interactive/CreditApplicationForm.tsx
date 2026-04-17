"use client";

import { useState, useCallback, type FormEvent, type ChangeEvent, type FocusEvent } from "react";
import InputField from "@/components/ui/InputField";
import {
  validateRequired,
  validateEmail,
  validatePhone,
  formatPhone,
  formatSSN,
} from "@/lib/validation";

/* ── US States ─────────────────────────────────────────────────────── */
const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

/* ── Section config ────────────────────────────────────────────────── */
const SECTIONS = [
  { id: 1, label: "Personal Information" },
  { id: 2, label: "Residential Information" },
  { id: 3, label: "Employment Information" },
  { id: 4, label: "Financing Preference" },
] as const;

/* ── Form data shape ───────────────────────────────────────────────── */
interface FormData {
  /* 1 — Personal */
  firstName: string;
  lastName: string;
  email: string;
  cellPhone: string;
  dateOfBirth: string;
  ssn: string;
  driverLicense: string;
  driverLicenseState: string;
  /* 2 — Residential */
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  housingStatus: string;
  monthlyPayment: string;
  timeAtResidence: string;
  /* 3 — Employment */
  employerName: string;
  jobTitle: string;
  employerPhone: string;
  employerAddress: string;
  employerCity: string;
  employerState: string;
  employerZip: string;
  annualIncome: string;
  yearsAtJob: string;
  monthsAtJob: string;
  /* 4 — Financing */
  buyerType: "buyer" | "co-buyer";
  financingType: "lease" | "finance";
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  cellPhone: "",
  dateOfBirth: "",
  ssn: "",
  driverLicense: "",
  driverLicenseState: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  housingStatus: "",
  monthlyPayment: "",
  timeAtResidence: "",
  employerName: "",
  jobTitle: "",
  employerPhone: "",
  employerAddress: "",
  employerCity: "",
  employerState: "",
  employerZip: "",
  annualIncome: "",
  yearsAtJob: "",
  monthsAtJob: "",
  buyerType: "buyer",
  financingType: "finance",
};

/* ── Required fields set ──────────────────────────────────────────── */
const REQUIRED_FIELDS = new Set<keyof FormData>([
  "firstName",
  "lastName",
  "email",
  "cellPhone",
  "dateOfBirth",
  "ssn",
  "driverLicense",
  "driverLicenseState",
  "addressLine1",
  "city",
  "state",
  "zipCode",
  "employerName",
  "annualIncome",
]);

/* ── Per-field validation logic ───────────────────────────────────── */
const FIELD_LABELS: Partial<Record<keyof FormData, string>> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  cellPhone: "Cell Phone",
  dateOfBirth: "Date of Birth",
  ssn: "Social Security Number",
  driverLicense: "Driver License #",
  driverLicenseState: "Driver License State",
  addressLine1: "Address",
  city: "City",
  state: "State",
  zipCode: "Zip Code",
  employerName: "Employer Name",
  annualIncome: "Annual Gross Income",
};

function validateField(key: keyof FormData, value: string): string | null {
  if (key === "email") return validateEmail(value);
  if (key === "cellPhone") return validatePhone(value);
  if (key === "employerPhone" && value.trim()) return validatePhone(value);
  const label = FIELD_LABELS[key];
  if (label && REQUIRED_FIELDS.has(key)) return validateRequired(value, label);
  return null;
}

/* ── Reusable styled select ────────────────────────────────────────── */
function SelectField({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
  required,
  valid,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string | null;
  required?: boolean;
  valid?: boolean;
}) {
  return (
    <div className="group flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold transition-colors group-focus-within:text-primary"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full bg-transparent border-0 border-b text-on-surface py-3 px-0
            transition-colors font-body appearance-none cursor-pointer outline-none
            ${error ? "border-error" : valid && !error ? "border-green-500" : "border-white/20 focus:border-primary"}
            ${!value ? "text-on-surface-variant/40" : ""}
          `}
        >
          {placeholder && (
            <option value="" disabled className="bg-black text-on-surface-variant/40">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-black text-on-surface">
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom chevron or valid checkmark */}
        {valid && !error ? (
          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-green-500 text-sm">
            &#10003;
          </span>
        ) : (
          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/50 text-[18px]">
            expand_more
          </span>
        )}
      </div>
      {error && <p className="text-error text-[11px]">{error}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════ */
export default function CreditApplicationForm() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [activeSection, setActiveSection] = useState(1);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [hp, setHp] = useState('');

  /* Helper — update a single field */
  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // If the field was already touched and had an error, re-validate on change
    if (touched[key]) {
      const err = validateField(key, value as string);
      setErrors((prev) => ({ ...prev, [key]: err }));
    }
  }

  /* Helper — mark field as touched and validate */
  const handleBlur = useCallback(
    (key: keyof FormData) => {
      setTouched((prev) => ({ ...prev, [key]: true }));
      const err = validateField(key, form[key] as string);
      setErrors((prev) => ({ ...prev, [key]: err }));
    },
    [form]
  );

  /* Helper — input onChange shorthand */
  function inputHandler(key: keyof FormData) {
    return (e: ChangeEvent<HTMLInputElement>) => set(key, e.target.value as FormData[typeof key]);
  }

  /* Helper — phone input onChange with formatting */
  function phoneInputHandler(key: keyof FormData) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhone(e.target.value);
      set(key, formatted as FormData[typeof key]);
    };
  }

  /* Helper — SSN input onChange with formatting */
  function ssnInputHandler() {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const formatted = formatSSN(e.target.value);
      set("ssn", formatted);
    };
  }

  /* Helper — select onChange shorthand */
  function selectHandler(key: keyof FormData) {
    return (e: ChangeEvent<HTMLSelectElement>) => set(key, e.target.value as FormData[typeof key]);
  }

  /* Helper — blur handler for inputs */
  function blurHandler(key: keyof FormData) {
    return () => handleBlur(key);
  }

  /* Helper — check if a field is valid (touched, has content, no error) */
  function isFieldValid(key: keyof FormData): boolean {
    return touched[key] === true && !errors[key] && (form[key] as string).trim().length > 0;
  }

  /* Helper — get error for display (only if touched) */
  function displayError(key: keyof FormData): string | null | undefined {
    return touched[key] ? errors[key] : undefined;
  }

  /* ── Validation ─────────────────────────────────────────────────── */
  function validate(): boolean {
    const e: Record<string, string | null> = {};

    /* Section 1 */
    e.firstName = validateRequired(form.firstName, "First Name");
    e.lastName = validateRequired(form.lastName, "Last Name");
    e.email = validateEmail(form.email);
    e.cellPhone = validatePhone(form.cellPhone);
    e.dateOfBirth = validateRequired(form.dateOfBirth, "Date of Birth");
    e.ssn = validateRequired(form.ssn, "Social Security Number");
    e.driverLicense = validateRequired(form.driverLicense, "Driver License #");
    e.driverLicenseState = validateRequired(form.driverLicenseState, "Driver License State");

    /* Section 2 */
    e.addressLine1 = validateRequired(form.addressLine1, "Address");
    e.city = validateRequired(form.city, "City");
    e.state = validateRequired(form.state, "State");
    e.zipCode = validateRequired(form.zipCode, "Zip Code");
    e.housingStatus = validateRequired(form.housingStatus, "Housing Status");
    e.monthlyPayment = validateRequired(form.monthlyPayment, "Monthly Payment");
    e.timeAtResidence = validateRequired(form.timeAtResidence, "Time at Residence");

    /* Section 3 */
    e.employerName = validateRequired(form.employerName, "Employer Name");
    e.jobTitle = validateRequired(form.jobTitle, "Title / Position");
    e.employerPhone = form.employerPhone.trim() ? validatePhone(form.employerPhone) : null;
    e.employerAddress = validateRequired(form.employerAddress, "Employer Address");
    e.employerCity = validateRequired(form.employerCity, "City");
    e.employerState = validateRequired(form.employerState, "State");
    e.employerZip = validateRequired(form.employerZip, "Zip Code");
    e.annualIncome = validateRequired(form.annualIncome, "Annual Gross Income");
    e.yearsAtJob = validateRequired(form.yearsAtJob, "Years at Job");
    e.monthsAtJob = validateRequired(form.monthsAtJob, "Months at Job");

    setErrors(e);

    // Mark all fields as touched on submit
    const allTouched: Record<string, boolean> = {};
    for (const key of Object.keys(e)) {
      allTouched[key] = true;
    }
    setTouched((prev) => ({ ...prev, ...allTouched }));

    /* Find first section with an error and jump there */
    const hasError = Object.values(e).some(Boolean);
    if (hasError) {
      const section1Keys: (keyof FormData)[] = [
        "firstName","lastName","email","cellPhone","dateOfBirth","ssn","driverLicense","driverLicenseState",
      ];
      const section2Keys: (keyof FormData)[] = [
        "addressLine1","city","state","zipCode","housingStatus","monthlyPayment","timeAtResidence",
      ];
      const section3Keys: (keyof FormData)[] = [
        "employerName","jobTitle","employerPhone","employerAddress","employerCity","employerState","employerZip","annualIncome","yearsAtJob","monthsAtJob",
      ];

      if (section1Keys.some((k) => e[k])) setActiveSection(1);
      else if (section2Keys.some((k) => e[k])) setActiveSection(2);
      else if (section3Keys.some((k) => e[k])) setActiveSection(3);
    }

    return !hasError;
  }

  /* ── Submit ─────────────────────────────────────────────────────── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch('/api/credit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _hp: hp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ── Success state ──────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center mb-8">
          <span className="material-symbols-outlined text-primary text-4xl">
            check
          </span>
        </div>
        <h3 className="font-headline text-3xl md:text-4xl italic mb-4 text-on-surface">
          Application Received
        </h3>
        <p className="font-body text-on-surface-variant max-w-md leading-relaxed mb-3">
          Thank you, {form.firstName}. Your credit application has been securely
          submitted. Our finance team will review your information and reach out
          within 24 hours.
        </p>
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 mb-10">
          A confirmation has been sent to {form.email}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm(initialFormData);
            setErrors({});
            setTouched({});
            setActiveSection(1);
          }}
          className="font-label text-[11px] uppercase tracking-[0.3em] text-primary border border-primary/30 px-10 py-4 hover:bg-primary/10 transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  /* ── Step indicator ─────────────────────────────────────────────── */
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-0 mb-16 md:mb-20 overflow-x-auto">
      {SECTIONS.map((section, idx) => {
        const isActive = section.id === activeSection;
        const isCompleted = section.id < activeSection;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => {
              // Allow going back freely, but block skipping ahead
              if (section.id <= activeSection) {
                setActiveSection(section.id);
              }
            }}
            className={`flex items-center gap-0 group shrink-0 ${section.id <= activeSection ? "cursor-pointer" : "cursor-not-allowed"}`}
          >
            {/* Connector line (before) */}
            {idx > 0 && (
              <div
                className={`w-8 md:w-14 h-px transition-colors ${
                  isCompleted || isActive ? "bg-primary" : "bg-white/10"
                }`}
              />
            )}
            {/* Step circle */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-label font-bold transition-all
                  ${isActive
                    ? "bg-primary text-on-primary"
                    : isCompleted
                      ? "bg-primary/20 text-primary border border-primary/40"
                      : "bg-white/5 text-on-surface-variant/50 border border-white/10"
                  }
                `}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-[18px]">check</span>
                ) : (
                  `0${section.id}`
                )}
              </div>
              <span
                className={`
                  font-label text-[9px] md:text-[10px] uppercase tracking-[0.15em] transition-colors hidden md:block
                  ${isActive ? "text-primary" : isCompleted ? "text-primary/60" : "text-on-surface-variant/40"}
                `}
              >
                {section.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );

  /* ── Section heading ────────────────────────────────────────────── */
  const SectionHeading = ({
    step,
    title,
  }: {
    step: number;
    title: string;
  }) => (
    <div className="mb-12">
      <h3 className="font-headline text-2xl md:text-3xl italic text-on-surface">
        <span className="text-primary font-label not-italic text-sm tracking-[0.15em] mr-3">
          0{step}
        </span>
        <span className="text-on-surface-variant/30 mr-3">&mdash;</span>
        {title}
      </h3>
    </div>
  );

  /* ── Per-section required fields ─────────────────────────────────── */
  const SECTION_REQUIRED: Record<number, (keyof FormData)[]> = {
    1: ["firstName", "lastName", "email", "cellPhone", "dateOfBirth", "ssn", "driverLicense", "driverLicenseState"],
    2: ["addressLine1", "city", "state", "zipCode"],
    3: ["employerName", "annualIncome"],
  };

  /* Validate current section and return true if all required fields pass */
  function validateCurrentSection(): boolean {
    const requiredKeys = SECTION_REQUIRED[activeSection] || [];
    const newErrors: Record<string, string | null> = {};
    const newTouched: Record<string, boolean> = {};

    for (const key of requiredKeys) {
      newTouched[key] = true;
      newErrors[key] = validateField(key, form[key] as string);
    }

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors((prev) => ({ ...prev, ...newErrors }));

    return !requiredKeys.some((key) => newErrors[key]);
  }

  /* Advance to next section only if current section validates */
  function handleContinue() {
    if (validateCurrentSection()) {
      setActiveSection((s) => s + 1);
    }
  }

  /* ── Navigation buttons ─────────────────────────────────────────── */
  const SectionNav = () => (
    <div className="flex items-center justify-between pt-12 mt-12 border-t border-white/5">
      {activeSection > 1 ? (
        <button
          type="button"
          onClick={() => setActiveSection((s) => s - 1)}
          className="flex items-center gap-3 font-label text-[11px] uppercase tracking-[0.25em] text-on-surface-variant hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          Previous
        </button>
      ) : (
        <div />
      )}
      {activeSection < 4 ? (
        <button
          type="button"
          onClick={handleContinue}
          className="flex items-center gap-3 font-label text-[11px] uppercase tracking-[0.25em] text-primary hover:text-primary/80 transition-colors group"
        >
          Continue
          <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </button>
      ) : (
        <div />
      )}
    </div>
  );

  /* ══════════════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════════════ */
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <StepIndicator />

      {/* ── SECTION 1 : Personal Information ────────────────────────── */}
      {activeSection === 1 && (
        <div>
          <SectionHeading step={1} title="Personal Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <InputField
              label="First Name"
              name="firstName"
              variant="underline"
              placeholder="John"
              value={form.firstName}
              onChange={inputHandler("firstName")}
              onBlur={blurHandler("firstName")}
              error={displayError("firstName")}
              required
              valid={isFieldValid("firstName")}
            />
            <InputField
              label="Last Name"
              name="lastName"
              variant="underline"
              placeholder="Doe"
              value={form.lastName}
              onChange={inputHandler("lastName")}
              onBlur={blurHandler("lastName")}
              error={displayError("lastName")}
              required
              valid={isFieldValid("lastName")}
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              variant="underline"
              placeholder="john@example.com"
              value={form.email}
              onChange={inputHandler("email")}
              onBlur={blurHandler("email")}
              error={displayError("email")}
              required
              valid={isFieldValid("email")}
            />
            <InputField
              label="Cell Phone"
              name="cellPhone"
              type="tel"
              variant="underline"
              placeholder="(555) 000-0000"
              value={form.cellPhone}
              onChange={phoneInputHandler("cellPhone")}
              onBlur={blurHandler("cellPhone")}
              error={displayError("cellPhone")}
              required
              valid={isFieldValid("cellPhone")}
            />
            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              variant="underline"
              value={form.dateOfBirth}
              onChange={inputHandler("dateOfBirth")}
              onBlur={blurHandler("dateOfBirth")}
              error={displayError("dateOfBirth")}
              required
              valid={isFieldValid("dateOfBirth")}
            />
            <InputField
              label="Social Security Number"
              name="ssn"
              variant="underline"
              placeholder="XXX-XX-XXXX"
              value={form.ssn}
              onChange={ssnInputHandler()}
              onBlur={blurHandler("ssn")}
              error={displayError("ssn")}
              autoComplete="off"
              required
              valid={isFieldValid("ssn")}
            />
            <InputField
              label="Driver License #"
              name="driverLicense"
              variant="underline"
              placeholder="License number"
              value={form.driverLicense}
              onChange={inputHandler("driverLicense")}
              onBlur={blurHandler("driverLicense")}
              error={displayError("driverLicense")}
              required
              valid={isFieldValid("driverLicense")}
            />
            <SelectField
              label="Driver License State"
              name="driverLicenseState"
              value={form.driverLicenseState}
              onChange={selectHandler("driverLicenseState")}
              onBlur={blurHandler("driverLicenseState") as unknown as (e: FocusEvent<HTMLSelectElement>) => void}
              placeholder="Select state"
              options={US_STATES.map((s) => ({ value: s, label: s }))}
              error={displayError("driverLicenseState")}
              required
              valid={isFieldValid("driverLicenseState")}
            />
          </div>
          <SectionNav />
        </div>
      )}

      {/* ── SECTION 2 : Residential Information ─────────────────────── */}
      {activeSection === 2 && (
        <div>
          <SectionHeading step={2} title="Residential Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="md:col-span-2">
              <InputField
                label="Address Line 1"
                name="addressLine1"
                variant="underline"
                placeholder="Street address"
                value={form.addressLine1}
                onChange={inputHandler("addressLine1")}
                onBlur={blurHandler("addressLine1")}
                error={displayError("addressLine1")}
                required
                valid={isFieldValid("addressLine1")}
              />
            </div>
            <div className="md:col-span-2">
              <InputField
                label="Address Line 2 / Suite / Apt"
                name="addressLine2"
                variant="underline"
                placeholder="Apt, suite, unit, etc. (optional)"
                value={form.addressLine2}
                onChange={inputHandler("addressLine2")}
              />
            </div>
            <InputField
              label="City"
              name="city"
              variant="underline"
              placeholder="City"
              value={form.city}
              onChange={inputHandler("city")}
              onBlur={blurHandler("city")}
              error={displayError("city")}
              required
              valid={isFieldValid("city")}
            />
            <SelectField
              label="State"
              name="state"
              value={form.state}
              onChange={selectHandler("state")}
              onBlur={blurHandler("state") as unknown as (e: FocusEvent<HTMLSelectElement>) => void}
              placeholder="Select state"
              options={US_STATES.map((s) => ({ value: s, label: s }))}
              error={displayError("state")}
              required
              valid={isFieldValid("state")}
            />
            <InputField
              label="Zip Code"
              name="zipCode"
              variant="underline"
              placeholder="00000"
              value={form.zipCode}
              onChange={inputHandler("zipCode")}
              onBlur={blurHandler("zipCode")}
              error={displayError("zipCode")}
              required
              valid={isFieldValid("zipCode")}
            />
            <SelectField
              label="Housing Status"
              name="housingStatus"
              value={form.housingStatus}
              onChange={selectHandler("housingStatus")}
              placeholder="Select status"
              options={[
                { value: "Own", label: "Own" },
                { value: "Rent", label: "Rent" },
                { value: "Other", label: "Other" },
              ]}
              error={displayError("housingStatus")}
            />
            <InputField
              label="Monthly Payment"
              name="monthlyPayment"
              variant="underline"
              placeholder="$ 0.00"
              value={form.monthlyPayment}
              onChange={inputHandler("monthlyPayment")}
              error={displayError("monthlyPayment")}
            />
            <SelectField
              label="Time at Residence"
              name="timeAtResidence"
              value={form.timeAtResidence}
              onChange={selectHandler("timeAtResidence")}
              placeholder="Select duration"
              options={[
                { value: "Less than 1 year", label: "Less than 1 year" },
                { value: "1-2 years", label: "1 - 2 years" },
                { value: "3-4 years", label: "3 - 4 years" },
                { value: "5-9 years", label: "5 - 9 years" },
                { value: "10+ years", label: "10+ years" },
              ]}
              error={displayError("timeAtResidence")}
            />
          </div>
          <SectionNav />
        </div>
      )}

      {/* ── SECTION 3 : Employment Information ──────────────────────── */}
      {activeSection === 3 && (
        <div>
          <SectionHeading step={3} title="Employment Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <InputField
              label="Employer Name"
              name="employerName"
              variant="underline"
              placeholder="Company name"
              value={form.employerName}
              onChange={inputHandler("employerName")}
              onBlur={blurHandler("employerName")}
              error={displayError("employerName")}
              required
              valid={isFieldValid("employerName")}
            />
            <InputField
              label="Title / Position"
              name="jobTitle"
              variant="underline"
              placeholder="Your role"
              value={form.jobTitle}
              onChange={inputHandler("jobTitle")}
              error={displayError("jobTitle")}
            />
            <InputField
              label="Employer Phone"
              name="employerPhone"
              type="tel"
              variant="underline"
              placeholder="(555) 000-0000"
              value={form.employerPhone}
              onChange={phoneInputHandler("employerPhone")}
              onBlur={blurHandler("employerPhone")}
              error={displayError("employerPhone")}
            />
            <InputField
              label="Street Address"
              name="employerAddress"
              variant="underline"
              placeholder="Employer street address"
              value={form.employerAddress}
              onChange={inputHandler("employerAddress")}
              error={displayError("employerAddress")}
            />
            <InputField
              label="City"
              name="employerCity"
              variant="underline"
              placeholder="City"
              value={form.employerCity}
              onChange={inputHandler("employerCity")}
              error={displayError("employerCity")}
            />
            <SelectField
              label="State"
              name="employerState"
              value={form.employerState}
              onChange={selectHandler("employerState")}
              placeholder="Select state"
              options={US_STATES.map((s) => ({ value: s, label: s }))}
              error={displayError("employerState")}
            />
            <InputField
              label="Zip Code"
              name="employerZip"
              variant="underline"
              placeholder="00000"
              value={form.employerZip}
              onChange={inputHandler("employerZip")}
              error={displayError("employerZip")}
            />
            <InputField
              label="Annual Gross Income"
              name="annualIncome"
              variant="underline"
              placeholder="$ 0.00"
              value={form.annualIncome}
              onChange={inputHandler("annualIncome")}
              onBlur={blurHandler("annualIncome")}
              error={displayError("annualIncome")}
              required
              valid={isFieldValid("annualIncome")}
            />
            <SelectField
              label="Years at Job"
              name="yearsAtJob"
              value={form.yearsAtJob}
              onChange={selectHandler("yearsAtJob")}
              placeholder="Years"
              options={Array.from({ length: 31 }, (_, i) => ({
                value: String(i),
                label: i === 0 ? "Less than 1" : i === 30 ? "30+" : String(i),
              }))}
              error={displayError("yearsAtJob")}
            />
            <SelectField
              label="Months at Job"
              name="monthsAtJob"
              value={form.monthsAtJob}
              onChange={selectHandler("monthsAtJob")}
              placeholder="Months"
              options={Array.from({ length: 12 }, (_, i) => ({
                value: String(i),
                label: String(i),
              }))}
              error={displayError("monthsAtJob")}
            />
          </div>
          <SectionNav />
        </div>
      )}

      {/* ── SECTION 4 : Financing Preference ────────────────────────── */}
      {activeSection === 4 && (
        <div>
          <SectionHeading step={4} title="Financing Preference" />

          {/* Buyer / Co-Buyer toggle */}
          <div className="mb-12">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-4">
              Application Type
            </p>
            <div className="flex gap-4">
              {(["buyer", "co-buyer"] as const).map((type) => {
                const isActive = form.buyerType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => set("buyerType", type)}
                    className={`
                      relative px-8 py-4 flex items-center gap-3 transition-all cursor-pointer
                      font-label text-[11px] uppercase tracking-[0.25em] font-bold
                      ${isActive
                        ? "bg-primary/10 text-primary border border-primary"
                        : "bg-transparent text-on-surface-variant/60 border border-white/10 hover:border-white/25"
                      }
                    `}
                  >
                    <span
                      className={`
                        w-2 h-2 rounded-full transition-colors
                        ${isActive ? "bg-primary" : "bg-white/20"}
                      `}
                    />
                    {type === "buyer" ? "Buyer" : "Co-Buyer"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lease / Finance toggle */}
          <div className="mb-12">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-4">
              Financing Structure
            </p>
            <div className="flex gap-4">
              {([
                { key: "lease" as const, icon: "account_balance", label: "Lease" },
                { key: "finance" as const, icon: "payments", label: "Finance" },
              ]).map(({ key, icon, label }) => {
                const isActive = form.financingType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => set("financingType", key)}
                    className={`
                      px-8 py-5 flex items-center gap-4 transition-all cursor-pointer group
                      ${isActive
                        ? "bg-primary text-on-primary border border-primary"
                        : "bg-transparent border border-white/10 hover:border-primary/40"
                      }
                    `}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        isActive
                          ? "text-on-primary"
                          : "text-primary group-hover:scale-110"
                      } transition-transform`}
                    >
                      {icon}
                    </span>
                    <span className="font-label text-[11px] uppercase tracking-[0.3em] font-bold">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consent / disclaimer */}
          <div className="border-t border-white/5 pt-10 mb-10">
            <p className="font-body text-[12px] text-on-surface-variant/50 leading-relaxed max-w-2xl">
              By submitting this application, you authorize Dream Drive Motors to obtain
              your credit report from one or more consumer reporting agencies in
              connection with your application for credit. You certify that the
              information provided is true and complete.
            </p>
          </div>

          {/* Honeypot */}
          <input type="text" name="_hp" value={hp} onChange={e => setHp(e.target.value)} className="absolute opacity-0 h-0 w-0 pointer-events-none" tabIndex={-1} autoComplete="off" />

          {/* Submit */}
          <div className="flex flex-col items-center pt-6">
            {apiError && <p className="text-red-400 text-sm mb-4">{apiError}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative bg-primary text-on-primary px-20 py-5 font-label uppercase tracking-[0.3em] text-[11px] font-bold transition-all hover:brightness-110 hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center gap-5">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-2">
                  arrow_forward
                </span>
              </span>
            </button>
            <p className="mt-8 font-label text-[10px] text-on-surface-variant/50 uppercase tracking-[0.2em] flex items-center gap-3 font-bold">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              Secure 256-bit SSL encrypted connection
            </p>
          </div>

          {/* Also show back button */}
          <div className="flex items-center pt-10 mt-6 border-t border-white/5">
            <button
              type="button"
              onClick={() => setActiveSection(3)}
              className="flex items-center gap-3 font-label text-[11px] uppercase tracking-[0.25em] text-on-surface-variant hover:text-primary transition-colors group"
            >
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              Previous
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
