<template>
  <div class="user-menu">
    <button class="user-menu__trigger" @click="toggle">
      <Avatar
        :label="authStore.userInitials"
        shape="circle"
        class="user-avatar"
      />
      <div class="user-info">
        <span class="user-info__name">{{ authStore.userDisplayName }}</span>
        <span class="user-info__role">Administrator</span>
      </div>
      <i class="pi pi-chevron-down user-menu__chevron" />
    </button>

    <Menu ref="menu" :model="menuItems" :popup="true" class="user-dropdown">
      <template #item="{ item }">
        <button
          class="user-dropdown-item"
          :class="{ 'user-dropdown-item--danger': item.danger }"
          @click="item.command"
        >
          <i :class="['pi', item.icon, 'user-dropdown-item__icon']" />
          <span>{{ item.label }}</span>
        </button>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
const router = useRouter()
const menu = ref()

function toggle(event) {
  menu.value.toggle(event)
}

const menuItems = [
  {
    label: 'My Profile',
    icon: 'pi-user',
    command: () => router.push('/settings'),
  },
  {
    label: 'Settings',
    icon: 'pi-cog',
    command: () => router.push('/settings'),
  },
  {
    separator: true,
  },
  {
    label: 'Sign Out',
    icon: 'pi-sign-out',
    danger: true,
    command: async () => {
      await authStore.signOut()
      router.push({ name: 'login' })
    },
  },
]
</script>

<style scoped>
.user-menu {
  position: relative;
}

.user-menu__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px 4px 4px;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.user-menu__trigger:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-border-strong);
}

.user-avatar {
  width: 30px !important;
  height: 30px !important;
  font-size: 0.75rem !important;
  background: var(--color-primary) !important;
  color: white !important;
}

.user-info {
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 1.2;
}

.user-info__name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-primary);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-info__role {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.user-menu__chevron {
  font-size: 0.65rem;
  color: var(--color-text-muted);
}

.user-dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  transition: background var(--transition-fast);
  border-radius: var(--radius-sm);
}

.user-dropdown-item:hover {
  background: var(--color-surface-hover);
}

.user-dropdown-item--danger {
  color: var(--color-danger);
}

.user-dropdown-item--danger:hover {
  background: var(--color-danger-light);
}

.user-dropdown-item__icon {
  font-size: 0.9rem;
  width: 16px;
  text-align: center;
}

@media (max-width: 640px) {
  .user-info {
    display: none;
  }

  .user-menu__chevron {
    display: none;
  }
}
</style>
