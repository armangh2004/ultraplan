"use client";

import { cn } from "@/lib/utils";
import { type InputHTMLAttributes } from "react";

interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string | null;
  variant?: "underline" | "filled";
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  error,
  variant = "filled",
  name,
  id,
  className,
  ...props
}: InputFieldProps) {
  const inputId = id || name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("group flex flex-col gap-2", className)}>
      <label
        htmlFor={inputId}
        className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold transition-colors group-focus-within:text-primary"
      >
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors",
          variant === "filled" &&
            "bg-surface-container-high border-0 border-b border-outline-variant focus:border-primary focus:ring-0 py-5 px-6",
          variant === "underline" &&
            "bg-transparent border-0 border-b border-white/20 focus:border-primary focus:ring-0 py-3 px-0",
          error && "border-error"
        )}
        {...props}
      />
      {error && <p className="text-error text-[11px]">{error}</p>}
    </div>
  );
}
