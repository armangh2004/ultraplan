import type { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'nodejs'

// Invoked daily by Vercel Cron (see vercel.json). Vercel automatically sends
// `Authorization: Bearer ${CRON_SECRET}` when the CRON_SECRET env var is set on
// the project. Updates public.keep_alive so the Supabase free-tier project never
// hits the 7-day inactivity pause. The GitHub Actions workflow
// (.github/workflows/supabase-keepalive.yml) is the independent backup.
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET

  // Fail closed if the secret is missing or does not match.
  if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pingedAt = new Date().toISOString()
  const { error } = await supabase
    .from('keep_alive')
    .update({ last_ping: pingedAt })
    .eq('id', 1)

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true, pinged_at: pingedAt })
}
