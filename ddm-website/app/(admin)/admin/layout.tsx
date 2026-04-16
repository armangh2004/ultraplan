import { isAuthenticated } from '@/lib/admin-auth'
import LoginForm from '@/components/admin/LoginForm'
import MobileNav from '@/components/admin/MobileNav'
import LogoutButton from '@/components/admin/LogoutButton'
import Link from 'next/link'

export const metadata = { title: 'Admin | Dream Drive Motors' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated()

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Desktop header */}
      <header className="sticky top-0 z-50 bg-[#131313]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="font-headline text-xl text-[#D4AF37] italic">
            DDM Admin
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/admin/contacts" className="text-sm text-white/70 hover:text-white transition-colors">
              Contacts
            </Link>
            <Link href="/admin/trade-ins" className="text-sm text-white/70 hover:text-white transition-colors">
              Trade-Ins
            </Link>
            <Link href="/admin/sell-cars" className="text-sm text-white/70 hover:text-white transition-colors">
              Sell Cars
            </Link>
            <Link href="/admin/credit-apps" className="text-sm text-white/70 hover:text-white transition-colors">
              Credit Apps
            </Link>
          </nav>

          <LogoutButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>

      <MobileNav />
    </div>
  )
}
