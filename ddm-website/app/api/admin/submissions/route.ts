import { isAuthenticated } from '@/lib/admin-auth'
import { supabase } from '@/lib/supabase'

export const runtime = 'nodejs'

const VALID_TYPES = ['contacts', 'trade-ins', 'sell-cars', 'credit-apps'] as const
const TABLE_MAP: Record<string, string> = {
  'contacts': 'contact_submissions',
  'trade-ins': 'trade_in_submissions',
  'sell-cars': 'sell_car_submissions',
  'credit-apps': 'credit_applications',
}
const DEFAULT_PAGE_SIZE = 25
const MAX_PAGE_SIZE = 10000

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const type = url.searchParams.get('type') || 'contacts'
  const status = url.searchParams.get('status')
  const search = url.searchParams.get('search')
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const pageSizeParam = url.searchParams.get('pageSize')
  const pageSize = pageSizeParam
    ? Math.min(Math.max(1, parseInt(pageSizeParam, 10) || DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE)
    : DEFAULT_PAGE_SIZE

  if (!VALID_TYPES.includes(type as typeof VALID_TYPES[number])) {
    return Response.json({ error: 'Invalid type' }, { status: 400 })
  }

  const table = TABLE_MAP[type]
  const offset = (page - 1) * pageSize

  let query = supabase.from(table).select('*', { count: 'exact' })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  if (search) {
    // Sanitize search input
    const sanitized = search.replace(/[%_,().]/g, '')
    if (sanitized) {
      if (type === 'contacts' || type === 'credit-apps') {
        query = query.or(`first_name.ilike.%${sanitized}%,last_name.ilike.%${sanitized}%,email.ilike.%${sanitized}%`)
      } else {
        query = query.or(`full_name.ilike.%${sanitized}%,email.ilike.%${sanitized}%`)
      }
    }
  }

  query = query.order('created_at', { ascending: false }).range(offset, offset + pageSize - 1)

  const { data, count, error } = await query

  if (error) {
    console.error('Submissions query error:', error)
    return Response.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }

  return Response.json({
    data: data || [],
    total: count || 0,
    page,
    pageSize,
  })
}
