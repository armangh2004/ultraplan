'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from './DataTable'
import SubmissionCard from './SubmissionCard'

type SubmissionType = 'contacts' | 'trade-ins' | 'sell-cars' | 'credit-apps'

interface SubmissionsViewProps {
  type: SubmissionType
  title: string
}

const STATUS_OPTIONS = ['all', 'new', 'reviewed', 'contacted', 'archived']

const COLUMNS: Record<SubmissionType, { key: string; label: string }[]> = {
  contacts: [
    { key: 'created_at', label: 'Date' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'interest', label: 'Interest' },
    { key: 'status', label: 'Status' },
  ],
  'trade-ins': [
    { key: 'created_at', label: 'Date' },
    { key: 'name', label: 'Name' },
    { key: 'vehicle', label: 'Vehicle' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ],
  'sell-cars': [
    { key: 'created_at', label: 'Date' },
    { key: 'name', label: 'Name' },
    { key: 'vehicle', label: 'Vehicle' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ],
  'credit-apps': [
    { key: 'created_at', label: 'Date' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'application_type', label: 'Type' },
    { key: 'status', label: 'Status' },
  ],
}

function transformRow(row: Record<string, unknown>, type: SubmissionType): Record<string, unknown> {
  const transformed = { ...row }

  // Build computed name field
  if (type === 'contacts' || type === 'credit-apps') {
    const first = (row.first_name as string) || ''
    const last = (row.last_name as string) || ''
    transformed.name = `${first} ${last}`.trim() || 'Unknown'
  } else {
    transformed.name = (row.full_name as string) || 'Unknown'
  }

  // Build computed vehicle field
  if (type === 'trade-ins' || type === 'sell-cars') {
    const year = row.vehicle_year ?? ''
    const make = row.vehicle_make ?? ''
    const model = row.vehicle_model ?? ''
    transformed.vehicle = `${year} ${make} ${model}`.trim() || '\u2014'
  }

  return transformed
}

export default function SubmissionsView({ type, title }: SubmissionsViewProps) {
  const router = useRouter()
  const [data, setData] = useState<Record<string, unknown>[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [loading, setLoading] = useState(true)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1) // reset to first page on new search
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ type, page: String(page) })
    if (status !== 'all') params.set('status', status)
    if (debouncedSearch) params.set('search', debouncedSearch)

    try {
      const res = await fetch(`/api/admin/submissions?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const json = await res.json()
      setData(json.data || [])
      setTotal(json.total || 0)
      setPageSize(json.pageSize || 25)
    } catch {
      setData([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [type, page, status, debouncedSearch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  function handleStatusChange(newStatus: string) {
    setStatus(newStatus)
    setPage(1)
  }

  function handleRowClick(row: Record<string, unknown>) {
    router.push(`/admin/${type}/${row.id}`)
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const transformedData = data.map((row) => transformRow(row, type))
  const columns = COLUMNS[type]

  return (
    <div>
      <h1 className="font-headline text-3xl text-white mb-6">{title}</h1>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="bg-surface-container-high text-on-surface border border-outline-variant rounded px-3 py-2 text-sm font-body min-h-[44px] focus:border-primary focus:outline-none"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'all' ? 'All Statuses' : opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-surface-container-high text-on-surface border border-outline-variant rounded px-3 py-2 text-sm font-body min-h-[44px] focus:border-primary focus:outline-none placeholder:text-on-surface-variant"
        />
      </div>

      {loading ? (
        <div className="text-white/50 text-center py-12 font-body">Loading...</div>
      ) : (
        <>
          {/* Desktop table */}
          <DataTable
            columns={columns}
            data={transformedData}
            onRowClick={handleRowClick}
          />

          {/* Mobile card list */}
          <div className="md:hidden flex flex-col gap-3">
            {transformedData.length === 0 ? (
              <p className="text-on-surface-variant text-center py-12 font-body text-sm">
                No submissions found.
              </p>
            ) : (
              transformedData.map((row) => (
                <SubmissionCard
                  key={row.id as string}
                  submission={row}
                  type={type}
                  onClick={() => handleRowClick(row)}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {total > 0 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="font-body text-sm px-4 py-2 rounded border border-white/10 text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors min-h-[44px]"
              >
                Previous
              </button>
              <span className="font-body text-sm text-on-surface-variant">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="font-body text-sm px-4 py-2 rounded border border-white/10 text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors min-h-[44px]"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
