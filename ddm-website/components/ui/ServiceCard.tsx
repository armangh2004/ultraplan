"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  backgroundImage?: string;
  badge?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  backgroundImage,
  badge,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative h-[520px] overflow-hidden bg-surface-container-low transition-all duration-700 block"
      )}
    >
      {/* Background image with hover reveal */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
          className="absolute inset-0 object-cover opacity-0 scale-110 transition-all duration-[1500ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-20 group-hover:scale-100"
        />
      )}

      {/* Content */}
      <div className="relative z-20 p-14 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="material-symbols-outlined text-primary text-3xl opacity-60">
            {icon}
          </span>
          {badge && (
            <span className="text-[9px] border border-primary/40 px-3 py-1 text-primary uppercase tracking-[0.2em] font-medium">
              {badge}
            </span>
          )}
        </div>

        <div className="space-y-8">
          <h3 className="text-5xl font-headline italic text-on-surface group-hover:text-primary transition-colors duration-500">
            {title}
          </h3>
          <p className="text-on-surface-variant/80 font-light leading-relaxed text-base">
            {description}
          </p>
          <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary pt-6 border-t border-white/10 w-full group-hover:border-primary/40 transition-colors duration-500">
            Explore{" "}
            <span className="material-symbols-outlined text-xs">
              arrow_forward
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
