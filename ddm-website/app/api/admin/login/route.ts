import { verifyPassword, createSession, checkRateLimit, recordLoginAttempt, clearLoginAttempts } from '@/lib/admin-auth'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  const { allowed, remaining } = await checkRateLimit(ip)
  if (!allowed) {
    return Response.json(
      { error: 'Too many login attempts. Try again in 15 minutes.' },
      { status: 429, headers: { 'Retry-After': '900' } }
    )
  }

  const { password } = await request.json()

  if (!password || !verifyPassword(password)) {
    await recordLoginAttempt(ip)
    return Response.json(
      { error: 'Invalid password', remaining: remaining - 1 },
      { status: 401 }
    )
  }

  await clearLoginAttempts(ip)
  await createSession()

  return Response.json({ success: true })
}
