import { notFound } from 'next/navigation'
import SubmissionDetail from '@/components/admin/SubmissionDetail'

const VALID_TYPES = ['contacts', 'trade-ins', 'sell-cars', 'credit-apps']

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>
}) {
  const { type, id } = await params

  if (!VALID_TYPES.includes(type)) {
    notFound()
  }

  return <SubmissionDetail type={type} id={id} />
}
