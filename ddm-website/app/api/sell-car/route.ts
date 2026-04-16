import { supabase } from '@/lib/supabase'

export const runtime = 'nodejs'

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '')
}

export async function POST(request: Request) {
  const body = await request.json()

  if (body._hp) {
    return Response.json({ success: true })
  }

  const {
    fullName, phone, email, year, make, model,
    mileage, vin, payoff, description, photoUrls
  } = body

  const errors: string[] = []
  if (!fullName?.trim()) errors.push('Full name is required')
  if (!phone?.trim()) errors.push('Phone number is required')
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!year?.trim()) errors.push('Vehicle year is required')
  if (!make?.trim()) errors.push('Vehicle make is required')
  if (!model?.trim()) errors.push('Vehicle model is required')
  if (!mileage?.trim()) errors.push('Mileage is required')

  if (errors.length > 0) {
    return Response.json({ error: errors[0] }, { status: 400 })
  }

  const { error } = await supabase.from('sell_car_submissions').insert({
    full_name: stripHtml(fullName.trim()),
    phone: phone.trim(),
    email: email.trim(),
    vehicle_year: year.trim(),
    vehicle_make: stripHtml(make.trim()),
    vehicle_model: stripHtml(model.trim()),
    mileage: mileage.trim(),
    vin: vin?.trim() || null,
    payoff_info: payoff?.trim() || null,
    description: description?.trim() || null,
    photo_urls: photoUrls?.length > 0 ? photoUrls : null,
  })

  if (error) {
    console.error('Sell car submission error:', error)
    return Response.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }

  return Response.json({ success: true })
}
