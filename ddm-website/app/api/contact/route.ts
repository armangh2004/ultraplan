import { supabase } from '@/lib/supabase'

export const runtime = 'nodejs'

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '')
}

export async function POST(request: Request) {
  const body = await request.json()

  // Honeypot check — silently ignore bot submissions
  if (body._hp) {
    return Response.json({ success: true })
  }

  const { firstName, lastName, email, phone, interest, message } = body

  // Server-side validation
  const errors: string[] = []
  if (!firstName?.trim()) errors.push('First name is required')
  if (!lastName?.trim()) errors.push('Last name is required')
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!message?.trim() || message.trim().length < 10) errors.push('Message must be at least 10 characters')

  if (errors.length > 0) {
    return Response.json({ error: errors[0] }, { status: 400 })
  }

  const { error } = await supabase.from('contact_submissions').insert({
    first_name: stripHtml(firstName.trim()),
    last_name: stripHtml(lastName.trim()),
    email: email.trim(),
    phone: phone?.trim() || null,
    interest: interest?.trim() || null,
    message: stripHtml(message.trim()),
  })

  if (error) {
    console.error('Contact submission error:', error)
    return Response.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }

  return Response.json({ success: true })
}
