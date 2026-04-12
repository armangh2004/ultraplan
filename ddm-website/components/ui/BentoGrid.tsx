import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  gap?: number;
  height?: string;
}

export default function BentoGrid({
  children,
  className,
  cols = 12,
  gap = 8,
  height,
}: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1",
        `md:grid-cols-${cols}`,
        `gap-${gap}`,
        height,
        className
      )}
    >
      {children}
    </div>
  );
}
