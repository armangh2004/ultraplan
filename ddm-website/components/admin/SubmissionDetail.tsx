'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import StatusBadge from './StatusBadge'
import AdminNotes from './AdminNotes'
import PhotoGallery from './PhotoGallery'

interface SubmissionDetailProps {
  type: string
  id: string
}

type SubmissionData = Record<string, unknown>

const TYPE_LABELS: Record<string, string> = {
  contacts: 'Contact Submission',
  'trade-ins': 'Trade-In Submission',
  'sell-cars': 'Sell Car Submission',
  'credit-apps': 'Credit Application',
}

const TYPE_NAV_LABELS: Record<string, string> = {
  contacts: 'Contacts',
  'trade-ins': 'Trade-Ins',
  'sell-cars': 'Sell Cars',
  'credit-apps': 'Credit Apps',
}

function formatDate(value: unknown): string {
  if (typeof value !== 'string') return ''
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '\u2014'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value)
}

function Field({ label, value, linkType }: { label: string; value: unknown; linkType?: 'email' | 'phone' }) {
  const displayValue = formatValue(value)
  const hasLink = linkType && typeof value === 'string' && value !== ''

  return (
    <div className="flex flex-col gap-1">
      <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">
        {label}
      </span>
      <span className="font-body text-sm text-white whitespace-pre-wrap break-words">
        {hasLink ? (
          <a
            href={linkType === 'email' ? `mailto:${value}` : `tel:${value}`}
            className="text-white hover:text-[#D4AF37] transition-colors underline-offset-2 hover:underline"
          >
            {displayValue}
          </a>
        ) : (
          displayValue
        )}
      </span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <div className="bg-surface-container-high px-5 py-3 border-b border-white/10">
        <h2 className="font-headline text-base text-primary italic">{title}</h2>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {children}
      </div>
    </div>
  )
}

export default function SubmissionDetail({ type, id }: SubmissionDetailProps) {
  const [data, setData] = useState<SubmissionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ssnRevealed, setSsnRevealed] = useState(false)
  const [ssnLoading, setSsnLoading] = useState(false)
  const [revealedSSN, setRevealedSSN] = useState<string | null>(null)

  const fetchSubmission = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/submissions/${id}?type=${type}`)
      if (!res.ok) {
        if (res.status === 404) {
          setError('Submission not found')
        } else {
          setError('Failed to load submission')
        }
        return
      }
      const json = await res.json()
      setData(json.data)
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }, [id, type])

  useEffect(() => {
    fetchSubmission()
  }, [fetchSubmission])

  async function handleStatusChange(newStatus: string) {
    try {
      const res = await fetch(`/api/admin/submissions/${id}?type=${type}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setData((prev) => (prev ? { ...prev, status: newStatus } : prev))
      }
    } catch {
      // Status update failed silently
    }
  }

  async function handleNotesSave(notes: string) {
    const res = await fetch(`/api/admin/submissions/${id}?type=${type}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_notes: notes }),
    })
    if (!res.ok) throw new Error('Failed to save notes')
    setData((prev) => (prev ? { ...prev, admin_notes: notes } : prev))
  }

  async function handleRevealSSN() {
    setSsnLoading(true)
    try {
      const res = await fetch(
        `/api/admin/submissions/${id}?type=credit-apps&revealSSN=true`
      )
      if (res.ok) {
        const json = await res.json()
        setRevealedSSN(json.data?.ssn_display ?? null)
        setSsnRevealed(true)
      }
    } catch {
      // Reveal failed
    } finally {
      setSsnLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="text-white/50 text-center py-24 font-body">Loading submission...</div>
    )
  }

  // Error state
  if (error || !data) {
    return (
      <div className="flex flex-col items-center gap-4 py-24">
        <span className="material-symbols-outlined text-[48px] text-white/20">error</span>
        <p className="font-body text-white/50 text-sm">{error || 'Submission not found'}</p>
        <Link
          href={`/admin/${type}`}
          className="font-body text-primary text-sm hover:underline"
        >
          Back to {TYPE_NAV_LABELS[type] || type}
        </Link>
      </div>
    )
  }

  const status = typeof data.status === 'string' ? data.status : 'new'
  const adminNotes = typeof data.admin_notes === 'string' ? data.admin_notes : ''
  const photoUrls = Array.isArray(data.photo_signed_urls) ? (data.photo_signed_urls as string[]) : []
  const hasPhotos = type === 'trade-ins' || type === 'sell-cars'
  const ssnDisplay = ssnRevealed && revealedSSN ? revealedSSN : (data.ssn_display as string | undefined)

  return (
    <div className="flex flex-col gap-6">
      {/* Back link and header */}
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/${type}`}
          className="flex items-center gap-1 text-white/50 hover:text-white transition-colors font-body text-sm min-h-[44px]"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          {TYPE_NAV_LABELS[type] || type}
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline text-2xl sm:text-3xl text-white">
            {TYPE_LABELS[type] || 'Submission'}
          </h1>
          <span className="font-body text-xs text-white/40">
            {formatDate(data.created_at)}
          </span>
        </div>
        <StatusBadge status={status} onStatusChange={handleStatusChange} />
      </div>

      {/* Data sections by type */}
      {type === 'contacts' && (
        <>
          <Section title="Personal Information">
            <Field label="First Name" value={data.first_name} />
            <Field label="Last Name" value={data.last_name} />
            <Field label="Email" value={data.email} linkType="email" />
            <Field label="Phone" value={data.phone} linkType="phone" />
          </Section>
          <Section title="Inquiry">
            <Field label="Interest" value={data.interest} />
            <div className="sm:col-span-2">
              <Field label="Message" value={data.message} />
            </div>
          </Section>
        </>
      )}

      {type === 'trade-ins' && (
        <>
          <Section title="Personal Information">
            <Field label="Full Name" value={data.full_name} />
            <Field label="Phone" value={data.phone} linkType="phone" />
            <Field label="Email" value={data.email} linkType="email" />
          </Section>
          <Section title="Current Vehicle">
            <Field label="Year" value={data.vehicle_year} />
            <Field label="Make" value={data.vehicle_make} />
            <Field label="Model" value={data.vehicle_model} />
            <Field label="Mileage" value={data.mileage} />
            <Field label="VIN" value={data.vin} />
          </Section>
          {(data.payoff_amount || data.payoff_info) && (
            <Section title="Financial">
              <Field label="Payoff Info" value={data.payoff_amount ?? data.payoff_info} />
            </Section>
          )}
          {data.condition && (
            <Section title="Condition">
              <div className="sm:col-span-2">
                <Field label="Condition" value={data.condition} />
              </div>
            </Section>
          )}
          {(data.desired_vehicle || data.category || data.purchase_timeline) && (
            <Section title="Preferences">
              <Field label="Desired Vehicle" value={data.desired_vehicle} />
              <Field label="Category" value={data.category} />
              <Field label="Purchase Timeline" value={data.purchase_timeline} />
            </Section>
          )}
          {data.additional_notes && (
            <Section title="Additional Notes">
              <div className="sm:col-span-2">
                <Field label="Notes" value={data.additional_notes} />
              </div>
            </Section>
          )}
        </>
      )}

      {type === 'sell-cars' && (
        <>
          <Section title="Personal Information">
            <Field label="Full Name" value={data.full_name} />
            <Field label="Phone" value={data.phone} linkType="phone" />
            <Field label="Email" value={data.email} linkType="email" />
          </Section>
          <Section title="Vehicle">
            <Field label="Year" value={data.vehicle_year} />
            <Field label="Make" value={data.vehicle_make} />
            <Field label="Model" value={data.vehicle_model} />
            <Field label="Mileage" value={data.mileage} />
            <Field label="VIN" value={data.vin} />
          </Section>
          {(data.payoff_amount || data.payoff_info) && (
            <Section title="Financial">
              <Field label="Payoff Info" value={data.payoff_amount ?? data.payoff_info} />
            </Section>
          )}
          {data.description && (
            <Section title="Description">
              <div className="sm:col-span-2">
                <Field label="Description" value={data.description} />
              </div>
            </Section>
          )}
        </>
      )}

      {type === 'credit-apps' && (
        <>
          <Section title="Personal Information">
            <Field label="First Name" value={data.first_name} />
            <Field label="Last Name" value={data.last_name} />
            <Field label="Email" value={data.email} linkType="email" />
            <Field label="Phone" value={data.phone} linkType="phone" />
            <Field label="Date of Birth" value={data.date_of_birth} />
          </Section>

          <Section title="Social Security Number">
            <div className="sm:col-span-2 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="font-body text-sm text-white font-mono">
                  {ssnDisplay || 'XXX-XX-XXXX'}
                </span>
                {!ssnRevealed && (
                  <button
                    type="button"
                    onClick={handleRevealSSN}
                    disabled={ssnLoading}
                    className="bg-amber-600/20 text-amber-400 border border-amber-500/30 font-body font-bold uppercase text-[10px] tracking-widest px-4 py-2 rounded transition-all hover:bg-amber-600/30 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    {ssnLoading ? 'Revealing...' : 'Reveal SSN'}
                  </button>
                )}
              </div>
              {!ssnRevealed && (
                <p className="font-body text-[11px] text-amber-400/60 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  This action is logged for audit purposes.
                </p>
              )}
              {ssnRevealed && (
                <p className="font-body text-[11px] text-amber-400/60 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  SSN revealed. This action has been logged.
                </p>
              )}
            </div>
          </Section>

          <Section title="License">
            <Field label="License Number" value={data.license_number} />
            <Field label="License State" value={data.license_state} />
          </Section>

          <Section title="Address">
            <Field label="Address Line 1" value={data.address_line1} />
            <Field label="Address Line 2" value={data.address_line2} />
            <Field label="City" value={data.city} />
            <Field label="State" value={data.state} />
            <Field label="ZIP Code" value={data.zip} />
            <Field label="Housing Status" value={data.housing_status} />
            <Field label="Monthly Payment" value={data.monthly_payment} />
            <Field label="Time at Residence" value={data.time_at_residence} />
          </Section>

          <Section title="Employment">
            <Field label="Employer" value={data.employer} />
            <Field label="Job Title" value={data.job_title} />
            <Field label="Phone" value={data.employer_phone} linkType="phone" />
            <Field label="Address" value={data.employer_address} />
            <Field label="City" value={data.employer_city} />
            <Field label="State" value={data.employer_state} />
            <Field label="ZIP Code" value={data.employer_zip} />
            <Field label="Annual Income" value={data.annual_income} />
            <Field label="Time at Job" value={data.time_at_job} />
          </Section>

          <Section title="Financing">
            <Field label="Buyer Type" value={data.buyer_type} />
            <Field label="Financing Type" value={data.financing_type} />
          </Section>
        </>
      )}

      {/* Photos section */}
      {hasPhotos && (
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <div className="bg-surface-container-high px-5 py-3 border-b border-white/10">
            <h2 className="font-headline text-base text-primary italic">Photos</h2>
          </div>
          <div className="p-5">
            <PhotoGallery urls={photoUrls} />
          </div>
        </div>
      )}

      {/* Admin notes */}
      <div className="border border-white/10 rounded-lg overflow-hidden">
        <div className="bg-surface-container-high px-5 py-3 border-b border-white/10">
          <h2 className="font-headline text-base text-primary italic">Admin Notes</h2>
        </div>
        <div className="p-5">
          <AdminNotes notes={adminNotes} onSave={handleNotesSave} />
        </div>
      </div>
    </div>
  )
}
