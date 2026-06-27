import { supabase } from '@/config/supabase'

/**
 * @typedef {Object} CompanyFilters
 * @property {string} [search]
 * @property {string} [status]
 * @property {string} [industry]
 * @property {number} [page]
 * @property {number} [pageSize]
 */

export const companyService = {
  /**
   * Fetch a paginated, filtered list of companies.
   * @param {CompanyFilters} params
   */
  async getCompanies({ search = '', status = null, industry = null, page = 1, pageSize = 20 } = {}) {
    let query = supabase
      .from('companies')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,city.ilike.%${search}%`)
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (industry) {
      query = query.eq('industry', industry)
    }

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    return query
  },

  /**
   * Fetch a single company by ID.
   * @param {string} id
   */
  async getCompanyById(id) {
    return supabase.from('companies').select('*').eq('id', id).single()
  },

  /**
   * Create a new company.
   * @param {Object} payload
   */
  async createCompany(payload) {
    const { data, error } = await supabase
      .from('companies')
      .insert([{ ...payload, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
      .select()
      .single()
    return { data, error }
  },

  /**
   * Update an existing company.
   * @param {string} id
   * @param {Object} payload
   */
  async updateCompany(id, payload) {
    const { data, error } = await supabase
      .from('companies')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  /**
   * Delete a company by ID.
   * @param {string} id
   */
  async deleteCompany(id) {
    return supabase.from('companies').delete().eq('id', id)
  },

  /**
   * Fetch aggregated stats for a single company (project count, open tickets, etc.).
   * @param {string} id
   */
  async getCompanyStats(id) {
    const [projectsRes, ticketsRes, invoicesRes] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }).eq('company_id', id),
      supabase.from('support_tickets').select('id', { count: 'exact', head: true }).eq('company_id', id).eq('status', 'open'),
      supabase.from('invoices').select('total_amount').eq('company_id', id).eq('status', 'paid'),
    ])

    const totalRevenue = (invoicesRes.data ?? []).reduce((sum, inv) => sum + (inv.total_amount ?? 0), 0)

    return {
      projectCount: projectsRes.count ?? 0,
      openTickets: ticketsRes.count ?? 0,
      totalRevenue,
    }
  },
}
