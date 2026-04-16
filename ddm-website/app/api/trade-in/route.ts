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
    fullName, phone, email, currentYear, currentMake, currentModel,
    currentMileage, currentVin, currentPayoff, condition,
    photoUrls, desiredVehicle, desiredCategory, timeline, additionalNotes
  } = body

  const errors: string[] = []
  if (!fullName?.trim()) errors.push('Full name is required')
  if (!phone?.trim()) errors.push('Phone number is required')
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!currentYear?.trim()) errors.push('Vehicle year is required')
  if (!currentMake?.trim()) errors.push('Vehicle make is required')
  if (!currentModel?.trim()) errors.push('Vehicle model is required')
  if (!currentMileage?.trim()) errors.push('Mileage is required')

  if (errors.length > 0) {
    return Response.json({ error: errors[0] }, { status: 400 })
  }

  const { error } = await supabase.from('trade_in_submissions').insert({
    full_name: stripHtml(fullName.trim()),
    phone: phone.trim(),
    email: email.trim(),
    vehicle_year: currentYear.trim(),
    vehicle_make: stripHtml(currentMake.trim()),
    vehicle_model: stripHtml(currentModel.trim()),
    mileage: currentMileage.trim(),
    vin: currentVin?.trim() || null,
    payoff_info: currentPayoff?.trim() || null,
    condition: condition?.trim() || null,
    photo_urls: photoUrls?.length > 0 ? photoUrls : null,
    desired_vehicle: desiredVehicle?.trim() || null,
    category_of_interest: desiredCategory?.trim() || null,
    purchase_timeline: timeline?.trim() || null,
    additional_notes: additionalNotes?.trim() || null,
  })

  if (error) {
    console.error('Trade-in submission error:', error)
    return Response.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }

  return Response.json({ success: true })
}
