'use client';

import Link from 'next/link';

interface StatsCardProps {
  title: string;
  newCount: number;
  totalCount: number;
  href: string;
}

export default function StatsCard({ title, newCount, totalCount, href }: StatsCardProps) {
  return (
    <Link
      href={href}
      className="block bg-surface border border-white/10 p-6 rounded-lg transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.06)] min-h-[44px]"
    >
      <h3 className="font-headline text-lg text-on-surface mb-4">{title}</h3>

      <div className="flex items-end justify-between">
        <div>
          <span className="text-primary text-3xl font-bold font-body">{newCount}</span>
          <span className="text-on-surface-variant text-sm font-body ml-2">new</span>
        </div>
        <div className="text-on-surface-variant text-sm font-body">
          {totalCount} total
        </div>
      </div>
    </Link>
  );
}
