import { supabase } from '@/lib/supabase'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const { filename, contentType } = await request.json()

  if (!filename || !contentType) {
    return Response.json({ error: 'filename and contentType are required' }, { status: 400 })
  }

  // Validate content type
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  if (!allowed.includes(contentType)) {
    return Response.json({ error: 'File type not allowed' }, { status: 400 })
  }

  const ext = filename.split('.').pop() || 'bin'
  const path = `uploads/${randomUUID()}.${ext}`

  const { data, error } = await supabase.storage
    .from('submissions')
    .createSignedUploadUrl(path)

  if (error) {
    console.error('Upload URL error:', error)
    return Response.json({ error: 'Failed to create upload URL' }, { status: 500 })
  }

  return Response.json({
    uploadUrl: data.signedUrl,
    token: data.token,
    path,
  })
}
