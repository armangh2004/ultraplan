import { isAuthenticated } from '@/lib/admin-auth'
import { supabase } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tables = [
    { key: 'contacts', table: 'contact_submissions' },
    { key: 'trade-ins', table: 'trade_in_submissions' },
    { key: 'sell-cars', table: 'sell_car_submissions' },
    { key: 'credit-apps', table: 'credit_applications' },
  ]

  // Run all stat queries in parallel
  const statsPromises = tables.map(async ({ key, table }) => {
    const [{ count: total }, { count: newCount }] = await Promise.all([
      supabase.from(table).select('*', { count: 'exact', head: true }),
      supabase.from(table).select('*', { count: 'exact', head: true }).eq('status', 'new'),
    ])
    return { key, total: total || 0, new: newCount || 0 }
  })

  const statsResults = await Promise.all(statsPromises)
  const stats: Record<string, { total: number; new: number }> = {}
  for (const { key, ...counts } of statsResults) {
    stats[key] = counts
  }

  // Recent 10 submissions across all tables
  const recentPromises = tables.map(async ({ key, table }) => {
    const nameCol = key === 'contacts' || key === 'credit-apps' ? 'first_name, last_name' : 'full_name'
    const { data } = await supabase
      .from(table)
      .select(`id, ${nameCol}, email, status, created_at`)
      .order('created_at', { ascending: false })
      .limit(3)

    return ((data as Record<string, unknown>[] | null) || []).map((row) => ({
      ...row,
      type: key,
    })) as Array<Record<string, unknown> & { type: string; created_at: string }>
  })

  const recentArrays = await Promise.all(recentPromises)
  const recent = recentArrays
    .flat()
    .sort((a, b) => new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime())
    .slice(0, 10)

  return Response.json({ stats, recent })
}
