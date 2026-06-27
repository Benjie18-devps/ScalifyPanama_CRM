<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">Quick Actions</div>
    </div>
    <div class="quick-actions-grid">
      <button
        v-for="action in actions"
        :key="action.label"
        class="quick-action"
        @click="router.push(action.to)"
      >
        <div class="quick-action__icon" :class="`quick-action__icon--${action.color}`">
          <i :class="['pi', action.icon]" />
        </div>
        <span class="quick-action__label">{{ action.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const actions = [
  { label: 'New Client', icon: 'pi-building-columns', color: 'primary', to: '/clients' },
  { label: 'New Project', icon: 'pi-briefcase', color: 'success', to: '/projects' },
  { label: 'New Ticket', icon: 'pi-ticket', color: 'warning', to: '/tickets' },
  { label: 'New Invoice', icon: 'pi-file-pdf', color: 'info', to: '/invoices' },
  { label: 'Upload File', icon: 'pi-upload', color: 'secondary', to: '/files' },
  { label: 'View Reports', icon: 'pi-chart-bar', color: 'secondary', to: '/reports' },
]
</script>

<style scoped>
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.quick-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  background: var(--color-surface-hover);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.quick-action:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.quick-action__icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-action__icon .pi {
  font-size: 1.1rem;
}

.quick-action__icon--primary { background: var(--color-primary-muted); color: var(--color-primary); }
.quick-action__icon--success { background: var(--color-success-muted); color: var(--color-success); }
.quick-action__icon--warning { background: var(--color-warning-muted); color: var(--color-warning); }
.quick-action__icon--info { background: var(--color-info-muted); color: var(--color-info); }
.quick-action__icon--secondary { background: var(--color-border); color: var(--color-text-secondary); }

.quick-action__label {
  font-size: 0.75rem;
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
}
</style>
