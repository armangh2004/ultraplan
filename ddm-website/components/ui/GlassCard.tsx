import { cn } from "@/lib/utils";

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
  padding?: string;
}

export default function GlassCard({
  className,
  children,
  padding = "p-8",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card border border-outline-variant/10",
        padding,
        className
      )}
    >
      {children}
    </div>
  );
}
