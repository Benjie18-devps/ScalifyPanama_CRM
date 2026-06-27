import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { companyService } from '@/services/companyService'

export const useCompanyStore = defineStore('company', () => {
  const companies = ref([])
  const currentCompany = ref(null)
  const loading = ref(false)
  const totalCount = ref(0)

  const filters = ref({
    search: '',
    status: null,
    industry: null,
  })

  const pagination = ref({
    page: 1,
    pageSize: 20,
  })

  const hasCompanies = computed(() => companies.value.length > 0)

  async function fetchCompanies() {
    loading.value = true
    try {
      const { data, count, error } = await companyService.getCompanies({
        search: filters.value.search,
        status: filters.value.status,
        industry: filters.value.industry,
        page: pagination.value.page,
        pageSize: pagination.value.pageSize,
      })
      if (error) throw error
      companies.value = data ?? []
      totalCount.value = count ?? 0
    } catch (error) {
      console.error('[CompanyStore] fetchCompanies error:', error)
      companies.value = []
      totalCount.value = 0
    } finally {
      loading.value = false
    }
  }

  async function fetchCompanyById(id) {
    loading.value = true
    try {
      const { data, error } = await companyService.getCompanyById(id)
      if (error) throw error
      currentCompany.value = data
      return data
    } catch (error) {
      console.error('[CompanyStore] fetchCompanyById error:', error)
      currentCompany.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  async function createCompany(payload) {
    const { data, error } = await companyService.createCompany(payload)
    if (error) throw error
    companies.value.unshift(data)
    totalCount.value++
    return data
  }

  async function updateCompany(id, payload) {
    const { data, error } = await companyService.updateCompany(id, payload)
    if (error) throw error
    const index = companies.value.findIndex((c) => c.id === id)
    if (index !== -1) companies.value[index] = data
    if (currentCompany.value?.id === id) currentCompany.value = data
    return data
  }

  async function deleteCompany(id) {
    const { error } = await companyService.deleteCompany(id)
    if (error) throw error
    companies.value = companies.value.filter((c) => c.id !== id)
    totalCount.value--
    if (currentCompany.value?.id === id) currentCompany.value = null
  }

  function setFilter(key, value) {
    filters.value[key] = value
    pagination.value.page = 1
  }

  function resetFilters() {
    filters.value = { search: '', status: null, industry: null }
    pagination.value.page = 1
  }

  function setPage(page) {
    pagination.value.page = page
  }

  return {
    companies,
    currentCompany,
    loading,
    totalCount,
    filters,
    pagination,
    hasCompanies,
    fetchCompanies,
    fetchCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
    setFilter,
    resetFilters,
    setPage,
  }
})
