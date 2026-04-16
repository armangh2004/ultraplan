import { supabase } from '@/lib/supabase'
import { encryptSSN } from '@/lib/encryption'

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
    firstName, lastName, email, cellPhone, dateOfBirth, ssn,
    driverLicense, driverLicenseState,
    addressLine1, addressLine2, city, state, zipCode,
    housingStatus, monthlyPayment, timeAtResidence,
    employerName, jobTitle, employerPhone,
    employerAddress, employerCity, employerState, employerZip,
    annualIncome, yearsAtJob, monthsAtJob,
    buyerType, financingType
  } = body

  // Validate required fields
  const required: Record<string, unknown> = {
    firstName, lastName, email, cellPhone, dateOfBirth, ssn,
    driverLicense, driverLicenseState,
    addressLine1, city, state, zipCode,
    housingStatus, monthlyPayment, timeAtResidence,
    employerName, jobTitle,
    employerAddress, employerCity, employerState, employerZip,
    annualIncome, yearsAtJob, monthsAtJob,
    buyerType, financingType
  }

  for (const [field, value] of Object.entries(required)) {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return Response.json({ error: `${field} is required` }, { status: 400 })
    }
  }

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Valid email is required' }, { status: 400 })
  }

  // Validate and encrypt SSN
  const ssnDigits = ssn.replace(/\D/g, '')
  if (ssnDigits.length !== 9) {
    return Response.json({ error: 'SSN must be 9 digits' }, { status: 400 })
  }

  let ssnEncrypted: string
  try {
    ssnEncrypted = encryptSSN(ssn)
  } catch {
    console.error('SSN encryption failed')
    return Response.json({ error: 'Failed to process application. Please try again.' }, { status: 500 })
  }

  const { error } = await supabase.from('credit_applications').insert({
    first_name: stripHtml(firstName.trim()),
    last_name: stripHtml(lastName.trim()),
    email: email.trim(),
    phone: cellPhone.trim(),
    date_of_birth: dateOfBirth.trim(),
    ssn_encrypted: ssnEncrypted,
    ssn_key_version: 1,
    drivers_license_number: driverLicense.trim(),
    drivers_license_state: driverLicenseState.trim(),
    address_line1: stripHtml(addressLine1.trim()),
    address_line2: addressLine2?.trim() || null,
    city: stripHtml(city.trim()),
    state: state.trim(),
    zip_code: zipCode.trim(),
    housing_status: housingStatus.trim(),
    monthly_payment: monthlyPayment.trim(),
    time_at_residence: timeAtResidence.trim(),
    employer_name: stripHtml(employerName.trim()),
    job_title: stripHtml(jobTitle.trim()),
    employer_phone: employerPhone?.trim() || null,
    employer_address: stripHtml(employerAddress.trim()),
    employer_city: stripHtml(employerCity.trim()),
    employer_state: employerState.trim(),
    employer_zip: employerZip.trim(),
    annual_income: annualIncome.trim(),
    years_at_job: yearsAtJob.trim(),
    months_at_job: monthsAtJob.trim(),
    buyer_type: buyerType.trim(),
    financing_type: financingType.trim(),
  })

  if (error) {
    console.error('Credit application error:', error)
    return Response.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }

  return Response.json({ success: true })
}
