import { cn } from "@/lib/utils";

interface MonogramOverlayProps {
  opacity?: number;
  text?: string;
  className?: string;
  size?: string;
}

export default function MonogramOverlay({
  opacity = 0.03,
  text = "DDM",
  className,
  size = "text-[20rem]",
}: MonogramOverlayProps) {
  return (
    <span
      className={cn("monogram-overlay", size, className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
