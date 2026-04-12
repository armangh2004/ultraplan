import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  label,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(className)}>
      {label && (
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-6">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}
