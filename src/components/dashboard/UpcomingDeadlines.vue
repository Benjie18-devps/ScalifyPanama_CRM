<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">Upcoming Deadlines</div>
      <Button label="View calendar" icon="pi pi-calendar" iconPos="right" text size="small" @click="router.push('/calendar')" />
    </div>

    <div class="deadlines-list">
      <div v-if="deadlines.length === 0" class="empty-state" style="padding: 24px 0">
        <i class="pi pi-calendar empty-state__icon" style="font-size: 2rem" />
        <p class="empty-state__description">No upcoming deadlines.</p>
      </div>

      <div
        v-for="item in deadlines"
        :key="item.id"
        class="deadline-item"
        :class="{ 'deadline-item--overdue': item.overdue }"
      >
        <div class="deadline-item__date">
          <span class="deadline-item__day">{{ item.day }}</span>
          <span class="deadline-item__month">{{ item.month }}</span>
        </div>
        <div class="deadline-item__info">
          <div class="deadline-item__title">{{ item.title }}</div>
          <div class="deadline-item__meta">
            <Tag :severity="item.severity" :value="item.type" class="deadline-tag" />
            <span class="deadline-item__client">{{ item.client }}</span>
          </div>
        </div>
        <div class="deadline-item__status">
          <i
            :class="['pi', item.overdue ? 'pi-exclamation-circle' : 'pi-clock']"
            :style="{ color: item.overdue ? 'var(--color-danger)' : 'var(--color-text-muted)' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const deadlines = [
  { id: 1, day: '28', month: 'Jun', title: 'Website Launch', client: 'TechCorp Panama', type: 'Project', severity: 'success', overdue: false },
  { id: 2, day: '30', month: 'Jun', title: 'Invoice INV-041 Due', client: 'Global Finance', type: 'Invoice', severity: 'warn', overdue: false },
  { id: 3, day: '02', month: 'Jul', title: 'SEO Report Delivery', client: 'Retail Plus', type: 'Project', severity: 'success', overdue: false },
  { id: 4, day: '05', month: 'Jul', title: 'Hosting Renewal', client: 'Legal Associates', type: 'Invoice', severity: 'danger', overdue: false },
]
</script>

<style scoped>
.deadlines-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.deadline-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface-hover);
  transition: border-color var(--transition-fast);
}

.deadline-item:hover {
  border-color: var(--color-border-strong);
}

.deadline-item--overdue {
  border-color: var(--color-danger-muted);
  background: var(--color-danger-light);
}

.deadline-item__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 44px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.deadline-item__day {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
}

.deadline-item__month {
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.deadline-item__info {
  flex: 1;
  min-width: 0;
}

.deadline-item__title {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.deadline-item__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.deadline-tag {
  font-size: 0.65rem !important;
  padding: 1px 6px !important;
}

.deadline-item__client {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.deadline-item__status .pi {
  font-size: 1rem;
}
</style>
