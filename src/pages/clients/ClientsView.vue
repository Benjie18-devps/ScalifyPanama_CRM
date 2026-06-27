<template>
  <div class="clients-view">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header__left">
        <h1 class="page-title">Clients</h1>
        <p class="page-subtitle">{{ totalLabel }}</p>
      </div>
      <div class="page-header__actions">
        <Button
          label="Export"
          icon="pi pi-download"
          severity="secondary"
          outlined
          size="small"
        />
        <Button
          label="New Client"
          icon="pi pi-plus"
          @click="openCreateDialog"
        />
      </div>
    </div>

    <!-- Main Card -->
    <div class="card clients-card">
      <!-- Filters -->
      <div class="clients-toolbar">
        <ClientFilters v-model="activeFilters" />
        <div class="clients-toolbar__right">
          <span class="view-toggle">
            <button
              class="view-btn"
              :class="{ active: viewMode === 'table' }"
              @click="viewMode = 'table'"
              v-tooltip.bottom="'Table view'"
            >
              <i class="pi pi-list" />
            </button>
            <button
              class="view-btn"
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
              v-tooltip.bottom="'Grid view'"
            >
              <i class="pi pi-th-large" />
            </button>
          </span>
        </div>
      </div>

      <Divider style="margin: 0" />

      <!-- Table View -->
      <template v-if="viewMode === 'table'">
        <DataTable
          :value="companyStore.companies"
          :loading="companyStore.loading"
          responsive-layout="scroll"
          striped-rows
          :row-hover="true"
          @row-click="(e) => navigateToClient(e.data.id)"
          style="cursor: pointer"
        >
          <!-- Empty state -->
          <template #empty>
            <div class="empty-state">
              <i class="pi pi-building empty-state__icon" />
              <p class="empty-state__title">No clients found</p>
              <p class="empty-state__description">
                {{ hasFilters ? 'Try adjusting your search or filters.' : 'Get started by adding your first client.' }}
              </p>
              <Button
                v-if="!hasFilters"
                label="Add First Client"
                icon="pi pi-plus"
                @click="openCreateDialog"
              />
            </div>
          </template>

          <!-- Loading skeleton -->
          <template #loadingicon>
            <div class="table-loading">
              <i class="pi pi-spinner pi-spin" style="font-size: 1.5rem; color: var(--color-primary)" />
            </div>
          </template>

          <!-- Company Name -->
          <Column field="name" header="Company" :sortable="true" style="min-width: 200px">
            <template #body="{ data }">
              <div class="company-cell">
                <Avatar
                  :label="getInitials(data.name)"
                  shape="circle"
                  class="company-avatar"
                  :style="{ background: getAvatarColor(data.name), color: 'white' }"
                />
                <div class="company-info">
                  <span class="company-name">{{ data.name }}</span>
                  <span v-if="data.city || data.country" class="company-location">
                    <i class="pi pi-map-marker" />
                    {{ [data.city, data.country].filter(Boolean).join(', ') }}
                  </span>
                </div>
              </div>
            </template>
          </Column>

          <!-- Email -->
          <Column field="email" header="Email" :sortable="true" style="min-width: 180px">
            <template #body="{ data }">
              <span v-if="data.email" class="cell-email">{{ data.email }}</span>
              <span v-else class="cell-empty">—</span>
            </template>
          </Column>

          <!-- Phone -->
          <Column field="phone" header="Phone" style="min-width: 140px">
            <template #body="{ data }">
              <span v-if="data.phone">{{ data.phone }}</span>
              <span v-else class="cell-empty">—</span>
            </template>
          </Column>

          <!-- Industry -->
          <Column field="industry" header="Industry" :sortable="true" style="min-width: 140px">
            <template #body="{ data }">
              <span v-if="data.industry" class="cell-industry">{{ data.industry }}</span>
              <span v-else class="cell-empty">—</span>
            </template>
          </Column>

          <!-- Status -->
          <Column field="status" header="Status" :sortable="true" style="min-width: 110px">
            <template #body="{ data }">
              <Tag
                :value="getStatusLabel(data.status)"
                :severity="getStatusSeverity(data.status)"
              />
            </template>
          </Column>

          <!-- Created -->
          <Column field="created_at" header="Added" :sortable="true" style="min-width: 120px">
            <template #body="{ data }">
              <span class="cell-date">{{ formatDate(data.created_at) }}</span>
            </template>
          </Column>

          <!-- Actions -->
          <Column header="" style="width: 100px; text-align: right" :frozen="true" alignFrozen="right">
            <template #body="{ data }">
              <div class="row-actions" @click.stop>
                <Button
                  icon="pi pi-eye"
                  severity="secondary"
                  text
                  rounded
                  size="small"
                  v-tooltip.top="'View profile'"
                  @click="navigateToClient(data.id)"
                />
                <Button
                  icon="pi pi-pen-to-square"
                  severity="secondary"
                  text
                  rounded
                  size="small"
                  v-tooltip.top="'Edit'"
                  @click="openEditDialog(data)"
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  rounded
                  size="small"
                  v-tooltip.top="'Delete'"
                  @click="handleDelete(data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <!-- Pagination -->
        <div v-if="companyStore.totalCount > companyStore.pagination.pageSize" class="pagination-bar">
          <Paginator
            :rows="companyStore.pagination.pageSize"
            :total-records="companyStore.totalCount"
            :first="(companyStore.pagination.page - 1) * companyStore.pagination.pageSize"
            @page="handlePageChange"
            :rows-per-page-options="[10, 20, 50]"
          />
        </div>
      </template>

      <!-- Grid View -->
      <template v-else>
        <div v-if="companyStore.loading" class="clients-grid">
          <Skeleton v-for="n in 8" :key="n" height="180px" border-radius="12px" />
        </div>
        <div v-else-if="companyStore.companies.length === 0" class="empty-state" style="padding: 64px">
          <i class="pi pi-building empty-state__icon" />
          <p class="empty-state__title">No clients found</p>
          <p class="empty-state__description">
            {{ hasFilters ? 'Try adjusting your filters.' : 'Add your first client to get started.' }}
          </p>
          <Button v-if="!hasFilters" label="Add First Client" icon="pi pi-plus" @click="openCreateDialog" />
        </div>
        <div v-else class="clients-grid">
          <div
            v-for="company in companyStore.companies"
            :key="company.id"
            class="client-grid-card"
            @click="navigateToClient(company.id)"
          >
            <div class="client-grid-card__header">
              <Avatar
                :label="getInitials(company.name)"
                shape="circle"
                size="large"
                :style="{ background: getAvatarColor(company.name), color: 'white' }"
              />
              <Tag
                :value="getStatusLabel(company.status)"
                :severity="getStatusSeverity(company.status)"
              />
            </div>
            <div class="client-grid-card__body">
              <h3 class="client-grid-name">{{ company.name }}</h3>
              <p v-if="company.industry" class="client-grid-industry">{{ company.industry }}</p>
              <p v-if="company.email" class="client-grid-email">
                <i class="pi pi-envelope" /> {{ company.email }}
              </p>
              <p v-if="company.city || company.country" class="client-grid-location">
                <i class="pi pi-map-marker" />
                {{ [company.city, company.country].filter(Boolean).join(', ') }}
              </p>
            </div>
            <div class="client-grid-card__footer" @click.stop>
              <Button
                icon="pi pi-pen-to-square"
                severity="secondary"
                text
                rounded
                size="small"
                v-tooltip.top="'Edit'"
                @click="openEditDialog(company)"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                size="small"
                v-tooltip.top="'Delete'"
                @click="handleDelete(company)"
              />
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Create / Edit Dialog -->
    <ClientForm
      v-model:visible="formVisible"
      :client="selectedClient"
      :saving="saving"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCompanyStore } from '@/stores/useCompanyStore'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { getInitials, formatDate } from '@/utils/formatters'
import { getCompanyStatusLabel, getCompanyStatusSeverity } from '@/constants/statuses'
import ClientFilters from '@/components/clients/ClientFilters.vue'
import ClientForm from '@/components/clients/ClientForm.vue'

const router = useRouter()
const companyStore = useCompanyStore()
const toast = useToast()
const { confirmDelete } = useConfirm()

const viewMode = ref('table')
const formVisible = ref(false)
const selectedClient = ref(null)
const saving = ref(false)

const activeFilters = ref({
  search: companyStore.filters.search,
  status: companyStore.filters.status,
  industry: companyStore.filters.industry,
})

const hasFilters = computed(
  () => !!activeFilters.value.search || !!activeFilters.value.status || !!activeFilters.value.industry,
)

const totalLabel = computed(() => {
  const count = companyStore.totalCount
  return count === 0 ? 'No clients yet' : `${count} client${count === 1 ? '' : 's'}`
})

// Debounce filter syncing
let filterTimer = null
watch(
  activeFilters,
  (val) => {
    clearTimeout(filterTimer)
    filterTimer = setTimeout(() => {
      companyStore.setFilter('search', val.search)
      companyStore.setFilter('status', val.status)
      companyStore.setFilter('industry', val.industry)
      companyStore.fetchCompanies()
    }, 300)
  },
  { deep: true },
)

onMounted(() => companyStore.fetchCompanies())

// Avatar color from name hash
function getAvatarColor(name) {
  const colors = ['#2563eb', '#7c3aed', '#db2777', '#dc2626', '#d97706', '#16a34a', '#0891b2']
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function getStatusLabel(status) { return getCompanyStatusLabel(status) }
function getStatusSeverity(status) { return getCompanyStatusSeverity(status) }

function navigateToClient(id) {
  router.push({ name: 'client-profile', params: { id } })
}

function openCreateDialog() {
  selectedClient.value = null
  formVisible.value = true
}

function openEditDialog(client) {
  selectedClient.value = client
  formVisible.value = true
}

async function handleFormSubmit(payload) {
  saving.value = true
  try {
    if (selectedClient.value) {
      await companyStore.updateCompany(selectedClient.value.id, payload)
      toast.success(`${payload.name} has been updated.`)
    } else {
      await companyStore.createCompany(payload)
      toast.success(`${payload.name} has been created.`)
    }
    formVisible.value = false
  } catch (err) {
    toast.error(err.message || 'An error occurred. Please try again.')
  } finally {
    saving.value = false
  }
}

async function handleDelete(client) {
  const confirmed = await confirmDelete(
    `Are you sure you want to delete "${client.name}"? This action cannot be undone and will remove all associated data.`,
  )
  if (!confirmed) return

  try {
    await companyStore.deleteCompany(client.id)
    toast.success(`${client.name} has been deleted.`)
  } catch (err) {
    toast.error(err.message || 'Failed to delete client.')
  }
}

function handlePageChange(event) {
  companyStore.setPage(event.page + 1)
  companyStore.fetchCompanies()
}
</script>

<style scoped>
.clients-card {
  padding: 0;
  overflow: hidden;
}

.clients-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  gap: var(--space-3);
  flex-wrap: wrap;
}

.clients-toolbar__right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* View toggle */
.view-toggle {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.view-btn.active {
  background: var(--color-primary);
  color: white;
}

.view-btn:not(.active):hover {
  background: var(--color-surface-hover);
  color: var(--color-text-primary);
}

/* Table cells */
.company-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.company-avatar {
  width: 36px !important;
  height: 36px !important;
  font-size: 0.8rem !important;
  flex-shrink: 0;
}

.company-name {
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  display: block;
  line-height: 1.2;
}

.company-location {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 2px;
}

.company-location .pi {
  font-size: 0.65rem;
}

.cell-email {
  color: var(--color-primary);
  font-size: var(--text-sm);
}

.cell-industry {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.cell-date {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.cell-empty {
  color: var(--color-text-muted);
}

.row-actions {
  display: flex;
  justify-content: flex-end;
  gap: 2px;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

:deep(tr:hover) .row-actions {
  opacity: 1;
}

.table-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

/* Pagination */
.pagination-bar {
  padding: 8px 20px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
}

/* Grid view */
.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  padding: 20px;
}

.client-grid-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.client-grid-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.client-grid-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.client-grid-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.client-grid-name {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  line-height: 1.2;
}

.client-grid-industry,
.client-grid-email,
.client-grid-location {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.client-grid-card__footer {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
  margin-top: auto;
}
</style>
