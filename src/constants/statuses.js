export const COMPANY_STATUSES = [
  { value: 'active', label: 'Active', severity: 'success' },
  { value: 'inactive', label: 'Inactive', severity: 'secondary' },
  { value: 'prospect', label: 'Prospect', severity: 'info' },
  { value: 'lead', label: 'Lead', severity: 'warn' },
]

export const PROJECT_STATUSES = [
  { value: 'planning', label: 'Planning', severity: 'secondary' },
  { value: 'active', label: 'Active', severity: 'success' },
  { value: 'on_hold', label: 'On Hold', severity: 'warn' },
  { value: 'completed', label: 'Completed', severity: 'info' },
  { value: 'cancelled', label: 'Cancelled', severity: 'danger' },
]

export const TICKET_STATUSES = [
  { value: 'open', label: 'Open', severity: 'danger' },
  { value: 'in_progress', label: 'In Progress', severity: 'warn' },
  { value: 'waiting', label: 'Waiting', severity: 'secondary' },
  { value: 'resolved', label: 'Resolved', severity: 'success' },
  { value: 'closed', label: 'Closed', severity: 'secondary' },
]

export const TICKET_PRIORITIES = [
  { value: 'low', label: 'Low', severity: 'secondary', icon: 'pi pi-arrow-down' },
  { value: 'medium', label: 'Medium', severity: 'info', icon: 'pi pi-minus' },
  { value: 'high', label: 'High', severity: 'warn', icon: 'pi pi-arrow-up' },
  { value: 'critical', label: 'Critical', severity: 'danger', icon: 'pi pi-exclamation-triangle' },
]

export const INVOICE_STATUSES = [
  { value: 'draft', label: 'Draft', severity: 'secondary' },
  { value: 'sent', label: 'Sent', severity: 'info' },
  { value: 'paid', label: 'Paid', severity: 'success' },
  { value: 'overdue', label: 'Overdue', severity: 'danger' },
  { value: 'cancelled', label: 'Cancelled', severity: 'secondary' },
]

export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance & Banking',
  'Real Estate',
  'Education',
  'Manufacturing',
  'Retail & E-Commerce',
  'Marketing & Advertising',
  'Legal Services',
  'Consulting',
  'Hospitality & Tourism',
  'Construction',
  'Transportation & Logistics',
  'Non-Profit',
  'Government',
  'Other',
]

export const COUNTRIES = [
  'Panama',
  'United States',
  'Colombia',
  'Mexico',
  'Costa Rica',
  'Guatemala',
  'Honduras',
  'El Salvador',
  'Nicaragua',
  'Dominican Republic',
  'Venezuela',
  'Peru',
  'Chile',
  'Argentina',
  'Brazil',
  'Spain',
  'Canada',
  'Other',
]

/**
 * @param {string} status
 * @param {Array} statusList
 * @returns {{ value: string, label: string, severity: string } | undefined}
 */
export function findStatus(status, statusList) {
  return statusList.find((s) => s.value === status)
}

export function getCompanyStatusSeverity(status) {
  return findStatus(status, COMPANY_STATUSES)?.severity ?? 'secondary'
}

export function getCompanyStatusLabel(status) {
  return findStatus(status, COMPANY_STATUSES)?.label ?? status
}
