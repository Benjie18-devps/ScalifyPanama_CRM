<template>
  <aside
    class="sidebar"
    :class="{
      'sidebar--collapsed': uiStore.sidebarCollapsed,
      'sidebar--mobile-open': uiStore.mobileMenuOpen,
    }"
  >
    <!-- Header -->
    <div class="sidebar__header">
      <AppLogo :icon-only="uiStore.sidebarCollapsed" />
      <button class="sidebar__collapse-btn" @click="uiStore.toggleSidebar()" v-tooltip.right="uiStore.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
        <i :class="['pi', uiStore.sidebarCollapsed ? 'pi-angle-right' : 'pi-angle-left']" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="sidebar__nav">
      <!-- Top-level items -->
      <RouterLink
        v-for="item in NAV_ITEMS"
        :key="item.key"
        :to="item.to"
        class="nav-item"
        :class="{ 'nav-item--active': isActive(item.to) }"
        @click="uiStore.closeMobileMenu()"
        v-tooltip.right="uiStore.sidebarCollapsed ? item.label : null"
      >
        <i :class="['nav-item__icon', item.icon]" />
        <span class="nav-item__label">{{ item.label }}</span>
      </RouterLink>

      <div class="nav-divider" />

      <!-- Grouped items -->
      <div v-for="group in NAV_GROUPS" :key="group.key" class="nav-group">
        <span v-if="!uiStore.sidebarCollapsed" class="nav-group__label">
          {{ group.label }}
        </span>
        <div v-else class="nav-group__divider" />

        <RouterLink
          v-for="item in group.items"
          :key="item.key"
          :to="item.to"
          class="nav-item"
          :class="{ 'nav-item--active': isActive(item.to) }"
          @click="uiStore.closeMobileMenu()"
          v-tooltip.right="uiStore.sidebarCollapsed ? item.label : null"
        >
          <i :class="['nav-item__icon', item.icon]" />
          <span class="nav-item__label">{{ item.label }}</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Footer -->
    <div class="sidebar__footer">
      <button
        class="sidebar-footer-btn"
        v-tooltip.right="uiStore.sidebarCollapsed ? 'Notifications' : null"
      >
        <i class="pi pi-bell sidebar-footer-btn__icon" />
        <span class="sidebar-footer-btn__label">Notifications</span>
        <span class="notification-dot" />
      </button>

      <button
        class="sidebar-footer-btn sidebar-footer-btn--logout"
        @click="handleLogout"
        v-tooltip.right="uiStore.sidebarCollapsed ? 'Sign out' : null"
        :disabled="authStore.loading"
      >
        <i class="pi pi-sign-out sidebar-footer-btn__icon" />
        <span class="sidebar-footer-btn__label">Sign Out</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUIStore } from '@/stores/useUIStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { NAV_ITEMS, NAV_GROUPS } from '@/constants/navigation'
import AppLogo from '@/components/common/AppLogo.vue'

const route = useRoute()
const router = useRouter()
const uiStore = useUIStore()
const authStore = useAuthStore()

function isActive(to) {
  if (to === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(to)
}

async function handleLogout() {
  await authStore.signOut()
  router.push({ name: 'login' })
}
</script>

<style scoped>
/* ─── Base ──────────────────────────────────────── */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  display: flex;
  flex-direction: column;
  z-index: var(--z-sticky);
  transition: width var(--transition-slow), transform var(--transition-slow);
  overflow: hidden;
}

.sidebar--collapsed {
  width: var(--sidebar-width-collapsed);
}

/* ─── Header ────────────────────────────────────── */
.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  border-bottom: 1px solid var(--sidebar-border);
  flex-shrink: 0;
  min-height: 72px;
}

.sidebar--collapsed .sidebar__header {
  justify-content: center;
  padding: 20px 0;
}

.sidebar__collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--sidebar-item-hover);
  border: 1px solid var(--sidebar-border);
  border-radius: var(--radius-sm);
  color: var(--sidebar-text);
  cursor: pointer;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.sidebar__collapse-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--sidebar-text-active);
}

.sidebar--collapsed .sidebar__collapse-btn {
  display: none;
}

/* ─── Navigation ────────────────────────────────── */
.sidebar__nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar__nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar__nav::-webkit-scrollbar-thumb {
  background: var(--sidebar-border);
  border-radius: 4px;
}

.nav-divider {
  height: 1px;
  background: var(--sidebar-border);
  margin: 8px 0;
}

/* ─── Nav Group ─────────────────────────────────── */
.nav-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 4px;
}

.nav-group__label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sidebar-text);
  padding: 12px 8px 4px;
  opacity: 0.6;
  white-space: nowrap;
}

.nav-group__divider {
  height: 1px;
  background: var(--sidebar-border);
  margin: 6px 0;
}

/* ─── Nav Item ──────────────────────────────────── */
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  color: var(--sidebar-text);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all var(--transition-fast);
  position: relative;
}

.nav-item:hover {
  background: var(--sidebar-item-hover);
  color: var(--sidebar-text-hover);
}

.nav-item--active {
  background: var(--sidebar-item-active-bg);
  color: var(--sidebar-text-active);
}

.nav-item--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: var(--sidebar-item-active-border);
  border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
}

.nav-item__icon {
  font-size: 1rem;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.nav-item__label {
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity var(--transition-normal), width var(--transition-normal);
}

.sidebar--collapsed .nav-item {
  justify-content: center;
  padding: 10px;
}

.sidebar--collapsed .nav-item__label {
  display: none;
}

.sidebar--collapsed .nav-item--active::before {
  display: none;
}

/* ─── Footer ────────────────────────────────────── */
.sidebar__footer {
  border-top: 1px solid var(--sidebar-border);
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
}

.sidebar-footer-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  background: none;
  border: none;
  color: var(--sidebar-text);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  position: relative;
  transition: all var(--transition-fast);
}

.sidebar-footer-btn:hover {
  background: var(--sidebar-item-hover);
  color: var(--sidebar-text-hover);
}

.sidebar-footer-btn--logout:hover {
  background: rgba(220, 38, 38, 0.12);
  color: #fca5a5;
}

.sidebar-footer-btn__icon {
  font-size: 1rem;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.sidebar-footer-btn__label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.notification-dot {
  width: 7px;
  height: 7px;
  background: #ef4444;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 22px;
}

.sidebar--collapsed .sidebar-footer-btn {
  justify-content: center;
  padding: 10px;
}

.sidebar--collapsed .sidebar-footer-btn__label {
  display: none;
}

.sidebar--collapsed .notification-dot {
  top: 6px;
  left: auto;
  right: 8px;
}

/* ─── Mobile ────────────────────────────────────── */
@media (max-width: 1023px) {
  .sidebar {
    transform: translateX(-100%);
    width: var(--sidebar-width) !important;
  }

  .sidebar--mobile-open {
    transform: translateX(0);
    box-shadow: var(--shadow-xl);
  }
}
</style>
