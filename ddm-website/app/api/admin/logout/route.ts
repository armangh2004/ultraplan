import { clearSession } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST() {
  await clearSession()
  return Response.json({ success: true })
}
