<template>
  <header class="app-header">
    <div class="header__left">
      <!-- Mobile menu toggle -->
      <button class="mobile-menu-btn" @click="uiStore.toggleMobileMenu()">
        <i class="pi pi-bars" />
      </button>

      <!-- Breadcrumb -->
      <Breadcrumb :model="breadcrumbs" class="header-breadcrumb">
        <template #item="{ item }">
          <RouterLink v-if="item.to" :to="item.to" class="breadcrumb-link">
            {{ item.label }}
          </RouterLink>
          <span v-else class="breadcrumb-current">{{ item.label }}</span>
        </template>
        <template #separator>
          <i class="pi pi-chevron-right breadcrumb-sep" />
        </template>
      </Breadcrumb>
    </div>

    <div class="header__right">
      <!-- Global search -->
      <div class="header-search">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Search…" class="header-search__input" size="small" />
        </IconField>
      </div>

      <!-- Notification bell -->
      <button class="header-icon-btn" v-tooltip.bottom="'Notifications'">
        <i class="pi pi-bell" />
        <span class="notif-badge">3</span>
      </button>

      <!-- User Menu -->
      <UserMenu />
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUIStore } from '@/stores/useUIStore'
import UserMenu from './UserMenu.vue'

const route = useRoute()
const uiStore = useUIStore()

const breadcrumbs = computed(() => {
  const crumbs = [{ label: 'Home', to: '/dashboard' }]

  const segments = route.path.split('/').filter(Boolean)
  let path = ''

  for (let i = 0; i < segments.length; i++) {
    path += `/${segments[i]}`
    const isLast = i === segments.length - 1
    const label = route.meta.title && isLast ? route.meta.title : capitalize(segments[i])
    crumbs.push({ label, to: isLast ? null : path })
  }

  return crumbs
})

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ')
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 24px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  z-index: var(--z-raised);
  gap: 16px;
}

.header__left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Mobile menu button */
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.mobile-menu-btn:hover {
  background: var(--color-surface-hover);
  color: var(--color-text-primary);
}

/* Breadcrumb */
.header-breadcrumb {
  font-size: var(--text-sm);
}

.breadcrumb-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--color-primary);
}

.breadcrumb-current {
  color: var(--color-text-primary);
  font-weight: var(--font-medium);
}

.breadcrumb-sep {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  margin: 0 4px;
}

/* Search */
.header-search__input {
  width: 220px;
}

/* Icon buttons */
.header-icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.header-icon-btn:hover {
  background: var(--color-surface-hover);
  color: var(--color-text-primary);
}

.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  background: var(--color-danger);
  color: white;
  border-radius: 50%;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-surface);
}

@media (max-width: 1023px) {
  .mobile-menu-btn {
    display: flex;
  }

  .header-search {
    display: none;
  }
}

@media (max-width: 640px) {
  .app-header {
    padding: 0 16px;
  }
}
</style>
