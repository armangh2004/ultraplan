import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface CreditAppData {
  id?: string
  first_name?: string
  last_name?: string
  date_of_birth?: string
  ssn_display?: string
  drivers_license_number?: string
  drivers_license_state?: string
  phone?: string
  email?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  zip_code?: string
  time_at_residence?: string
  housing_status?: string
  monthly_payment?: string | number
  employer_name?: string
  years_at_job?: string | number
  months_at_job?: string | number
  employer_address?: string
  employer_city?: string
  employer_state?: string
  employer_zip?: string
  employer_phone?: string
  job_title?: string
  annual_income?: string | number
  created_at?: string
}

function s(v?: string | number | null): string {
  if (v === null || v === undefined || v === '') return '—'
  return String(v)
}

function formatFullAddress(
  line1?: string,
  line2?: string,
  city?: string,
  state?: string,
  zip?: string
): string {
  const street = [line1, line2].filter(Boolean).join(' ')
  const cityLine = [city, state, zip].filter(Boolean).join(' ')
  return [street, cityLine].filter(Boolean).join(', ') || '—'
}

function formatTimeAtJob(years?: string | number, months?: string | number): string {
  const y = years !== undefined && years !== '' && years !== null
    ? `${years} Year${Number(years) !== 1 ? 's' : ''}`
    : ''
  const m = months !== undefined && months !== '' && months !== null
    ? `${months} Month${Number(months) !== 1 ? 's' : ''}`
    : ''
  return [y, m].filter(Boolean).join(' ') || '—'
}

function formatMoney(val?: string | number | null): string {
  if (val === null || val === undefined || val === '') return '—'
  const num = Number(val)
  if (isNaN(num)) return String(val)
  return `$${num.toLocaleString()}`
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

type DocWithAutoTable = jsPDF & { lastAutoTable: { finalY: number } }

export function generateCreditAppPDF(apps: CreditAppData[]): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' }) as DocWithAutoTable
  const pageW = doc.internal.pageSize.getWidth()
  const margin = 18
  const contentW = pageW - margin * 2
  const labelW = 62

  apps.forEach((app, index) => {
    if (index > 0) doc.addPage()

    let y = 14

    // Header
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(20)
    doc.setTextColor(0, 0, 0)
    doc.text('DREAM      DRIVE      MOTORS', pageW / 2, y, { align: 'center' })
    y += 9

    // Title
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text('CREDIT APPLICATION', pageW / 2, y, { align: 'center' })
    y += 7

    function drawSection(title: string, rows: string[][]): void {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.5)
      doc.setTextColor(0, 0, 0)
      doc.text(title, pageW / 2, y, { align: 'center' })
      y += 3

      autoTable(doc, {
        startY: y,
        margin: { left: margin, right: margin },
        tableWidth: contentW,
        theme: 'grid',
        showHead: 'never',
        body: rows,
        styles: {
          fontSize: 8.5,
          cellPadding: 2.2,
          textColor: [0, 0, 0] as [number, number, number],
          lineColor: [80, 80, 80] as [number, number, number],
          lineWidth: 0.2,
          font: 'helvetica',
          fontStyle: 'normal',
        },
        columnStyles: {
          0: {
            cellWidth: labelW,
            textColor: [40, 40, 40] as [number, number, number],
          },
          1: { cellWidth: contentW - labelW },
        },
      })

      y = doc.lastAutoTable.finalY + 4
    }

    const residenceAddr = formatFullAddress(
      app.address_line1,
      app.address_line2,
      app.city,
      app.state,
      app.zip_code
    )

    const employerAddr = formatFullAddress(
      app.employer_address,
      undefined,
      app.employer_city,
      app.employer_state,
      app.employer_zip
    )

    const licenseStr = app.drivers_license_state
      ? `${s(app.drivers_license_number)} (${app.drivers_license_state})`
      : s(app.drivers_license_number)

    drawSection('Applicant Information', [
      ['First Name', s(app.first_name)],
      ['Last Name', s(app.last_name)],
      ['Date of Birth', s(app.date_of_birth)],
      ['Social Security Number', s(app.ssn_display)],
      ["Driver's License", licenseStr],
    ])

    drawSection('Contact Information', [
      ['Phone Number', s(app.phone)],
      ['Email', s(app.email)],
    ])

    drawSection('Residence Information', [
      ['Address', residenceAddr],
      ['Time at Address', s(app.time_at_residence)],
      ['Rent / Own / Other', s(app.housing_status)],
      ['Monthly Payment (if rent/own)', formatMoney(app.monthly_payment)],
    ])

    drawSection('Employment Information', [
      ['Employer Name', s(app.employer_name)],
      ['Time at Employer', formatTimeAtJob(app.years_at_job, app.months_at_job)],
      ['Employer Address', employerAddr],
      ['Employer Phone Number', s(app.employer_phone)],
      ['Position', s(app.job_title)],
      ['Annual Income', formatMoney(app.annual_income)],
    ])

    const initials = [app.first_name?.[0], app.last_name?.[0]].filter(Boolean).join('.') + '.'

    drawSection('Signature', [
      ['Applicant Signature', initials],
      ['Date', formatDate(app.created_at)],
    ])
  })

  if (apps.length === 1) {
    const name = [apps[0].first_name, apps[0].last_name].filter(Boolean).join('_') || 'Customer'
    doc.save(`Credit_Application_${name}.pdf`)
  } else {
    const dateStr = new Date().toISOString().split('T')[0]
    doc.save(`Credit_Applications_${apps.length}_customers_${dateStr}.pdf`)
  }
}
