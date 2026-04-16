import { isAuthenticated } from '@/lib/admin-auth'
import { supabase } from '@/lib/supabase'
import { decryptSSN, maskSSN } from '@/lib/encryption'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

const TABLE_MAP: Record<string, string> = {
  'contacts': 'contact_submissions',
  'trade-ins': 'trade_in_submissions',
  'sell-cars': 'sell_car_submissions',
  'credit-apps': 'credit_applications',
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const url = new URL(request.url)
  const type = url.searchParams.get('type')
  const revealSSN = url.searchParams.get('revealSSN') === 'true'

  if (!type || !TABLE_MAP[type]) {
    return Response.json({ error: 'Invalid type' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from(TABLE_MAP[type])
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return Response.json({ error: 'Submission not found' }, { status: 404 })
  }

  // Handle SSN for credit applications
  if (type === 'credit-apps' && data.ssn_encrypted) {
    if (revealSSN) {
      const headersList = await headers()
      const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
      await supabase.from('admin_audit_log').insert({
        action: 'ssn_viewed',
        submission_type: 'credit_applications',
        submission_id: id,
        ip_address: ip,
      })

      try {
        const decrypted = decryptSSN(data.ssn_encrypted)
        data.ssn_display = decrypted
      } catch {
        data.ssn_display = 'Decryption failed'
      }
    } else {
      try {
        const decrypted = decryptSSN(data.ssn_encrypted)
        data.ssn_display = maskSSN(decrypted)
      } catch {
        data.ssn_display = 'XXX-XX-XXXX'
      }
    }
    delete data.ssn_encrypted
    delete data.ssn_key_version
  }

  // Generate signed URLs for photos
  if (data.photo_urls?.length > 0) {
    const signedUrls = await Promise.all(
      data.photo_urls.map(async (path: string) => {
        const { data: urlData } = await supabase.storage
          .from('submissions')
          .createSignedUrl(path, 3600)
        return urlData?.signedUrl || null
      })
    )
    data.photo_signed_urls = signedUrls.filter(Boolean)
  }

  return Response.json({ data })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const url = new URL(request.url)
  const type = url.searchParams.get('type')

  if (!type || !TABLE_MAP[type]) {
    return Response.json({ error: 'Invalid type' }, { status: 400 })
  }

  const body = await request.json()
  const updates: Record<string, unknown> = {}

  if (body.status) {
    const validStatuses = ['new', 'reviewed', 'contacted', 'archived']
    if (!validStatuses.includes(body.status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 })
    }
    updates.status = body.status
  }

  if (body.admin_notes !== undefined) {
    updates.admin_notes = body.admin_notes
  }

  if (Object.keys(updates).length === 0) {
    return Response.json({ error: 'No updates provided' }, { status: 400 })
  }

  const { error } = await supabase
    .from(TABLE_MAP[type])
    .update(updates)
    .eq('id', id)

  if (error) {
    console.error('Update error:', error)
    return Response.json({ error: 'Failed to update' }, { status: 500 })
  }

  return Response.json({ success: true })
}
