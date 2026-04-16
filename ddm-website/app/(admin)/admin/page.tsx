'use client'

import { useState, useEffect } from 'react'
import { StatsCard, StatusBadge } from '@/components/admin'
import Link from 'next/link'

interface Stats {
  [key: string]: { total: number; new: number }
}

interface RecentSubmission {
  id: string
  type: string
  email: string
  status: string
  created_at: string
  first_name?: string
  last_name?: string
  full_name?: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({})
  const [recent, setRecent] = useState<RecentSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats || {})
        setRecent(data.recent || [])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-white/50 text-center py-12 font-body">Loading...</div>
  }

  const cards = [
    { title: 'Contacts', key: 'contacts', href: '/admin/contacts' },
    { title: 'Trade-Ins', key: 'trade-ins', href: '/admin/trade-ins' },
    { title: 'Sell Cars', key: 'sell-cars', href: '/admin/sell-cars' },
    { title: 'Credit Apps', key: 'credit-apps', href: '/admin/credit-apps' },
  ]

  return (
    <div>
      <h1 className="font-headline text-3xl text-white mb-8">Dashboard</h1>

      {/* Stats cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <StatsCard
            key={card.key}
            title={card.title}
            newCount={stats[card.key]?.new || 0}
            totalCount={stats[card.key]?.total || 0}
            href={card.href}
          />
        ))}
      </div>

      {/* Recent submissions */}
      <h2 className="font-headline text-xl text-white mb-4">Recent Submissions</h2>
      <div className="bg-[#131313] rounded-lg border border-white/10 overflow-hidden">
        {recent.length === 0 ? (
          <p className="text-white/50 text-center py-8 font-body">No submissions yet</p>
        ) : (
          <div className="divide-y divide-white/5">
            {recent.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={`/admin/${item.type}/${item.id}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
              >
                <div>
                  <span className="text-white text-sm font-body">
                    {item.full_name || `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'Unknown'}
                  </span>
                  <span className="text-white/40 text-xs font-body ml-3">{item.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={item.status} />
                  <span className="text-white/40 text-xs font-body">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
