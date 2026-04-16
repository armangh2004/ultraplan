'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { label: 'Contacts', href: '/admin/contacts', icon: 'mail' },
  { label: 'Trade-Ins', href: '/admin/trade-ins', icon: 'swap_horiz' },
  { label: 'Sell Cars', href: '/admin/sell-cars', icon: 'directions_car' },
  { label: 'Credit', href: '/admin/credit-apps', icon: 'credit_card' },
];

export default function MobileNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[44px] min-w-[44px] transition-colors ${
                active ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
              <span className="font-body text-[9px] uppercase tracking-wider font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
