'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-white/50 hover:text-white transition-colors"
    >
      Logout
    </button>
  )
}
