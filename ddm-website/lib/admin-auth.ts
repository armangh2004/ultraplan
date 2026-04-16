import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { supabase } from './supabase'

const COOKIE_NAME = 'ddm_admin_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days
const MAX_ATTEMPTS = 5
const RATE_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function getSecret(): string {
  return process.env.ADMIN_PASSWORD!
}

function createToken(): string {
  const timestamp = Date.now().toString()
  const hmac = createHmac('sha256', getSecret())
  hmac.update(timestamp)
  const signature = hmac.digest('hex')
  return `${timestamp}.${signature}`
}

function verifyToken(token: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [timestamp, signature] = parts

  // Check token expiry
  const tokenAge = Date.now() - parseInt(timestamp, 10)
  if (isNaN(tokenAge) || tokenAge > MAX_AGE * 1000 || tokenAge < 0) return false

  const hmac = createHmac('sha256', getSecret())
  hmac.update(timestamp)
  const expected = hmac.digest('hex')

  try {
    return timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}

export function verifyPassword(input: string): boolean {
  const password = getSecret()
  try {
    return timingSafeEqual(
      Buffer.from(input, 'utf8'),
      Buffer.from(password, 'utf8')
    )
  } catch {
    return false
  }
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  const token = createToken()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  })
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyToken(token)
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date(Date.now() - RATE_WINDOW_MS).toISOString()

  // Clean old entries and get current count
  await supabase
    .from('login_attempts')
    .delete()
    .lt('window_start', windowStart)

  const { data } = await supabase
    .from('login_attempts')
    .select('attempt_count')
    .eq('ip_address', ip)
    .gte('window_start', windowStart)
    .single()

  const currentCount = data?.attempt_count ?? 0
  const remaining = Math.max(0, MAX_ATTEMPTS - currentCount)

  return { allowed: currentCount < MAX_ATTEMPTS, remaining }
}

export async function recordLoginAttempt(ip: string): Promise<void> {
  const windowStart = new Date(Date.now() - RATE_WINDOW_MS).toISOString()

  const { data } = await supabase
    .from('login_attempts')
    .select('id, attempt_count')
    .eq('ip_address', ip)
    .gte('window_start', windowStart)
    .single()

  if (data) {
    await supabase
      .from('login_attempts')
      .update({ attempt_count: data.attempt_count + 1 })
      .eq('id', data.id)
  } else {
    await supabase
      .from('login_attempts')
      .insert({ ip_address: ip, attempt_count: 1, window_start: new Date().toISOString() })
  }
}

export async function clearLoginAttempts(ip: string): Promise<void> {
  await supabase
    .from('login_attempts')
    .delete()
    .eq('ip_address', ip)
}
