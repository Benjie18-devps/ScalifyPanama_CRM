<template>
  <div v-if="companyStore.loading && !company" class="profile-loading">
    <div class="profile-header-skeleton card">
      <Skeleton width="64px" height="64px" border-radius="50%" />
      <div style="flex: 1">
        <Skeleton width="240px" height="28px" />
        <Skeleton width="180px" height="18px" class="mt-2" />
      </div>
    </div>
  </div>

  <div v-else-if="!company" class="empty-state" style="padding: 80px">
    <i class="pi pi-building empty-state__icon" />
    <p class="empty-state__title">Client not found</p>
    <p class="empty-state__description">This client may have been deleted or does not exist.</p>
    <Button label="Back to Clients" icon="pi pi-arrow-left" outlined @click="router.push('/clients')" />
  </div>

  <div v-else class="client-profile">
    <!-- Profile Header -->
    <div class="profile-header card">
      <div class="profile-header__left">
        <Avatar
          :label="getInitials(company.name)"
          shape="circle"
          size="xlarge"
          class="profile-avatar"
          :style="{ background: getAvatarColor(company.name), color: 'white' }"
        />
        <div class="profile-info">
          <div class="profile-info__top">
            <h1 class="profile-name">{{ company.name }}</h1>
            <Tag
              :value="getCompanyStatusLabel(company.status)"
              :severity="getCompanyStatusSeverity(company.status)"
            />
          </div>
          <div class="profile-meta">
            <span v-if="company.industry" class="profile-meta__item">
              <i class="pi pi-tag" /> {{ company.industry }}
            </span>
            <span v-if="company.city || company.country" class="profile-meta__item">
              <i class="pi pi-map-marker" />
              {{ [company.city, company.country].filter(Boolean).join(', ') }}
            </span>
            <span class="profile-meta__item">
              <i class="pi pi-calendar" /> Client since {{ formatDate(company.created_at) }}
            </span>
          </div>
          <div class="profile-contacts">
            <a v-if="company.email" :href="`mailto:${company.email}`" class="profile-contact">
              <i class="pi pi-envelope" /> {{ company.email }}
            </a>
            <a v-if="company.phone" :href="`tel:${company.phone}`" class="profile-contact">
              <i class="pi pi-phone" /> {{ company.phone }}
            </a>
            <a v-if="company.website" :href="company.website" target="_blank" class="profile-contact">
              <i class="pi pi-globe" /> {{ company.website }}
            </a>
          </div>
        </div>
      </div>

      <div class="profile-header__actions">
        <Button
          label="Edit"
          icon="pi pi-pen-to-square"
          severity="secondary"
          outlined
          @click="openEditDialog"
        />
        <Button label="New Project" icon="pi pi-plus" @click="router.push('/projects')" />
        <Button
          icon="pi pi-ellipsis-v"
          severity="secondary"
          outlined
          @click="moreMenu.toggle($event)"
        />
        <Menu ref="moreMenu" :model="moreMenuItems" :popup="true" />
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="profile-stats-bar">
      <div class="profile-stat">
        <span class="profile-stat__value">{{ stats.projectCount }}</span>
        <span class="profile-stat__label">Projects</span>
      </div>
      <div class="profile-stat-divider" />
      <div class="profile-stat">
        <span class="profile-stat__value">{{ stats.openTickets }}</span>
        <span class="profile-stat__label">Open Tickets</span>
      </div>
      <div class="profile-stat-divider" />
      <div class="profile-stat">
        <span class="profile-stat__value">{{ formatCurrency(stats.totalRevenue) }}</span>
        <span class="profile-stat__label">Total Revenue</span>
      </div>
      <div class="profile-stat-divider" />
      <div class="profile-stat">
        <span class="profile-stat__value">0</span>
        <span class="profile-stat__label">Open Invoices</span>
      </div>
    </div>

    <!-- Tabs -->
    <div class="profile-tabs-container card" style="padding: 0; overflow: hidden">
      <Tabs v-model:value="activeTab">
        <TabList class="profile-tablist">
          <Tab v-for="tab in tabs" :key="tab.key" :value="tab.key" class="profile-tab">
            <i :class="['pi', tab.icon]" />
            {{ tab.label }}
          </Tab>
        </TabList>

        <TabPanels>
          <!-- Overview -->
          <TabPanel value="overview">
            <div class="tab-content">
              <div class="overview-grid">
                <div class="overview-section card-inner">
                  <h3 class="overview-section__title">Contact Information</h3>
                  <div class="info-list">
                    <div class="info-row">
                      <span class="info-label">Email</span>
                      <span class="info-value">{{ company.email || '—' }}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Phone</span>
                      <span class="info-value">{{ company.phone || '—' }}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Website</span>
                      <a v-if="company.website" :href="company.website" target="_blank" class="info-value info-link">
                        {{ company.website }}
                      </a>
                      <span v-else class="info-value">—</span>
                    </div>
                  </div>
                </div>

                <div class="overview-section card-inner">
                  <h3 class="overview-section__title">Company Details</h3>
                  <div class="info-list">
                    <div class="info-row">
                      <span class="info-label">Industry</span>
                      <span class="info-value">{{ company.industry || '—' }}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Status</span>
                      <Tag :value="getCompanyStatusLabel(company.status)" :severity="getCompanyStatusSeverity(company.status)" />
                    </div>
                    <div class="info-row">
                      <span class="info-label">Address</span>
                      <span class="info-value">{{ company.address || '—' }}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">City</span>
                      <span class="info-value">{{ company.city || '—' }}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Country</span>
                      <span class="info-value">{{ company.country || '—' }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="company.notes" class="overview-section card-inner overview-section--full">
                  <h3 class="overview-section__title">Internal Notes</h3>
                  <p class="overview-notes">{{ company.notes }}</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Remaining tabs — module placeholders -->
          <TabPanel v-for="tab in placeholderTabs" :key="tab.key" :value="tab.key">
            <div class="tab-content">
              <div class="tab-placeholder">
                <i :class="['pi', tab.icon, 'tab-placeholder__icon']" />
                <h3 class="tab-placeholder__title">{{ tab.label }}</h3>
                <p class="tab-placeholder__description">
                  This section will be available when the {{ tab.label }} module is built.
                </p>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>

  <!-- Edit Dialog -->
  <ClientForm
    v-model:visible="formVisible"
    :client="company"
    :saving="saving"
    @submit="handleUpdate"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCompanyStore } from '@/stores/useCompanyStore'
import { companyService } from '@/services/companyService'
import { useToast } from '@/composables/useToast'
import { getInitials, formatDate, formatCurrency } from '@/utils/formatters'
import { getCompanyStatusLabel, getCompanyStatusSeverity } from '@/constants/statuses'
import ClientForm from '@/components/clients/ClientForm.vue'

const route = useRoute()
const router = useRouter()
const companyStore = useCompanyStore()
const toast = useToast()

const company = computed(() => companyStore.currentCompany)
const activeTab = ref('overview')
const formVisible = ref(false)
const saving = ref(false)
const moreMenu = ref()

const stats = ref({ projectCount: 0, openTickets: 0, totalRevenue: 0 })

const tabs = [
  { key: 'overview', label: 'Overview', icon: 'pi-info-circle' },
  { key: 'contacts', label: 'Contacts', icon: 'pi-users' },
  { key: 'projects', label: 'Projects', icon: 'pi-briefcase' },
  { key: 'files', label: 'Files', icon: 'pi-folder' },
  { key: 'invoices', label: 'Invoices', icon: 'pi-file-pdf' },
  { key: 'payments', label: 'Payments', icon: 'pi-credit-card' },
  { key: 'tickets', label: 'Tickets', icon: 'pi-ticket' },
  { key: 'activity', label: 'Activity', icon: 'pi-history' },
  { key: 'notes', label: 'Notes', icon: 'pi-pencil' },
]

const placeholderTabs = computed(() => tabs.filter((t) => t.key !== 'overview'))

const moreMenuItems = [
  { label: 'New Invoice', icon: 'pi pi-file-pdf', command: () => router.push('/invoices') },
  { label: 'New Ticket', icon: 'pi pi-ticket', command: () => router.push('/tickets') },
  { separator: true },
  { label: 'Delete Client', icon: 'pi pi-trash', class: 'text-danger', command: () => {} },
]

function getAvatarColor(name) {
  const colors = ['#2563eb', '#7c3aed', '#db2777', '#dc2626', '#d97706', '#16a34a', '#0891b2']
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function openEditDialog() {
  formVisible.value = true
}

async function handleUpdate(payload) {
  saving.value = true
  try {
    await companyStore.updateCompany(company.value.id, payload)
    toast.success(`${payload.name} has been updated.`)
    formVisible.value = false
  } catch (err) {
    toast.error(err.message || 'Failed to update client.')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  const id = route.params.id
  await companyStore.fetchCompanyById(id)

  if (company.value) {
    try {
      stats.value = await companyService.getCompanyStats(id)
    } catch {}
  }
})
</script>

<style scoped>
/* ─── Profile Header ────────────────────────────── */
.profile-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.profile-header__left {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
  min-width: 0;
}

.profile-avatar {
  width: 64px !important;
  height: 64px !important;
  font-size: 1.25rem !important;
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-info__top {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.1;
}

.profile-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 10px;
}

.profile-meta__item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.profile-meta__item .pi {
  font-size: 0.75rem;
}

.profile-contacts {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.profile-contact {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.profile-contact:hover {
  opacity: 0.75;
}

.profile-contact .pi {
  font-size: 0.8rem;
}

.profile-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* ─── Stats Bar ─────────────────────────────────── */
.profile-stats-bar {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px 32px;
  box-shadow: var(--shadow-xs);
  gap: 0;
}

.profile-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-stat__value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
}

.profile-stat__label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  margin-top: 6px;
}

.profile-stat-divider {
  width: 1px;
  height: 40px;
  background: var(--color-border);
  margin: 0 8px;
}

/* ─── Tabs ──────────────────────────────────────── */
.profile-tablist {
  padding: 0 20px;
  overflow-x: auto;
}

.profile-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  padding: 14px 16px !important;
}

.profile-tab .pi {
  font-size: 0.85rem;
}

.tab-content {
  padding: 24px;
}

/* ─── Overview ──────────────────────────────────── */
.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.overview-section {
  background: var(--color-surface-hover);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
}

.overview-section--full {
  grid-column: 1 / -1;
}

.overview-section__title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.info-label {
  width: 100px;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  flex-shrink: 0;
  padding-top: 2px;
}

.info-value {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  word-break: break-word;
}

.info-link {
  color: var(--color-primary);
}

.overview-notes {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.7;
  white-space: pre-wrap;
}

/* ─── Tab Placeholder ───────────────────────────── */
.tab-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 24px;
}

.tab-placeholder__icon {
  font-size: 2.5rem;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.tab-placeholder__title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.tab-placeholder__description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  max-width: 340px;
}

/* ─── Loading ───────────────────────────────────── */
.profile-loading {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.profile-header-skeleton {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
}

/* ─── Responsive ────────────────────────────────── */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
  }

  .profile-header__actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .profile-stats-bar {
    padding: 16px;
    gap: 0;
    overflow-x: auto;
  }

  .profile-stat {
    min-width: 100px;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
