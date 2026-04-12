import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
  variant?: "featured" | "compact" | "grid";
  className?: string;
}

function BadgeLabel({ badge }: { badge?: Vehicle["badge"] }) {
  if (!badge) return null;
  const label = badge === "new-arrival" ? "New Arrival" : "Certified Pre-Owned";
  const badgeClass =
    badge === "new-arrival"
      ? "bg-primary/90 text-on-primary"
      : "bg-white/10 backdrop-blur-md text-on-surface border border-white/20";
  return (
    <span
      className={cn(
        "text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 shadow-xl",
        badgeClass
      )}
    >
      {label}
    </span>
  );
}

function FeaturedCard({ vehicle, className }: VehicleCardProps) {
  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-sm bg-surface-container-high border border-outline-variant/10 block h-full",
        className
      )}
    >
      <Image
        src={vehicle.images.hero}
        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        fill
        sizes="(max-width: 768px) 100vw, 66vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-10">
        {vehicle.badge && (
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 block">
            {vehicle.badge === "new-arrival"
              ? "New Arrival"
              : "Certified Pre-Owned"}
          </span>
        )}
        <h3 className="font-headline text-4xl text-on-surface mb-2 uppercase">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-on-surface-variant text-sm mb-6 max-w-xs leading-relaxed">
          {vehicle.tagline}
        </p>
        <div className="flex items-center gap-6">
          <span className="text-primary font-bold text-xl">
            {formatCurrency(vehicle.price)}
          </span>
          <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">
            or {formatCurrency(vehicle.monthlyLease)}/mo
          </span>
        </div>
      </div>
    </Link>
  );
}

function CompactCard({ vehicle, className }: VehicleCardProps) {
  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-sm bg-surface-container-high border border-outline-variant/10 block h-full",
        className
      )}
    >
      <Image
        src={vehicle.images.hero}
        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-8">
        <h3 className="font-headline text-2xl text-on-surface mb-1 uppercase">
          {vehicle.make} {vehicle.model}
        </h3>
        <span className="text-primary font-bold text-[10px] uppercase tracking-widest">
          {vehicle.category}
        </span>
      </div>
    </Link>
  );
}

function GridCard({ vehicle, className }: VehicleCardProps) {
  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className={cn(
        "group bg-surface border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-700 block",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={vehicle.images.hero}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
          quality={90}
        />
        {vehicle.badge && (
          <div className="absolute top-6 left-6">
            <BadgeLabel badge={vehicle.badge} />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/40 mb-2">
              {vehicle.year} {vehicle.make}
            </p>
            <h3 className="font-headline text-4xl text-on-surface serif-italic">
              {vehicle.model}
            </h3>
          </div>
        </div>

        {/* Specs Row */}
        <div className="flex gap-6 mb-8 border-y border-white/5 py-6">
          <div className="flex items-center gap-2 text-on-surface/60 text-[11px] tracking-wide uppercase">
            <span className="material-symbols-outlined text-primary text-base">
              speed
            </span>
            {vehicle.specs.acceleration}
          </div>
          <div className="flex items-center gap-2 text-on-surface/60 text-[11px] tracking-wide uppercase">
            <span className="material-symbols-outlined text-primary text-base">
              bolt
            </span>
            {vehicle.specs.horsepower}hp
          </div>
          <div className="flex items-center gap-2 text-on-surface/60 text-[11px] tracking-wide uppercase">
            <span className="material-symbols-outlined text-primary text-base">
              settings_input_component
            </span>
            {vehicle.specs.drivetrain}
          </div>
        </div>

        {/* Price + Arrow */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-label text-[9px] tracking-[0.2em] uppercase text-on-surface/40 mb-1 font-bold">
              Monthly Lease
            </p>
            <p className="text-3xl font-headline text-primary">
              {formatCurrency(vehicle.monthlyLease)}
              <span className="text-xs font-body italic text-on-surface/40 ml-1">
                /mo
              </span>
            </p>
          </div>
          <span
            aria-label="View details"
            className="bg-white/5 hover:bg-primary group/btn p-5 transition-all duration-500 border border-white/5 inline-flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-on-surface group-hover/btn:text-on-primary transition-colors">
              arrow_forward
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function VehicleCard({
  vehicle,
  variant = "grid",
  className,
}: VehicleCardProps) {
  switch (variant) {
    case "featured":
      return (
        <FeaturedCard vehicle={vehicle} className={className} />
      );
    case "compact":
      return (
        <CompactCard vehicle={vehicle} className={className} />
      );
    case "grid":
    default:
      return (
        <GridCard vehicle={vehicle} className={className} />
      );
  }
}
