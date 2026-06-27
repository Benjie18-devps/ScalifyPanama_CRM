<template>
  <div class="stat-card" :class="`stat-card--${color}`">
    <div class="stat-card__header">
      <span class="stat-card__title">{{ title }}</span>
      <div class="stat-card__icon-wrap">
        <i :class="['pi', icon]" />
      </div>
    </div>

    <div class="stat-card__value">
      <template v-if="loading">
        <Skeleton width="120px" height="36px" />
      </template>
      <template v-else>{{ value }}</template>
    </div>

    <div class="stat-card__footer">
      <span class="stat-card__change" :class="changeClass">
        <i :class="['pi', change >= 0 ? 'pi-arrow-up' : 'pi-arrow-down']" />
        {{ Math.abs(change) }}{{ changeUnit }}
      </span>
      <span class="stat-card__period">vs last month</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  change: { type: Number, default: 0 },
  changeUnit: { type: String, default: '%' },
  icon: { type: String, required: true },
  color: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'success', 'warning', 'danger', 'info'].includes(v),
  },
  loading: { type: Boolean, default: false },
})

const changeClass = computed(() =>
  props.change >= 0 ? 'stat-card__change--positive' : 'stat-card__change--negative',
)
</script>

<style scoped>
.stat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: box-shadow var(--transition-normal);
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
}

.stat-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.stat-card__title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-card__icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-card__icon-wrap .pi {
  font-size: 1.1rem;
}

.stat-card__value {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
  letter-spacing: -0.02em;
  min-height: 36px;
  display: flex;
  align-items: center;
}

.stat-card__footer {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.stat-card__change {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  padding: 2px 8px;
}

.stat-card__change .pi {
  font-size: 0.65rem;
}

.stat-card__change--positive {
  background: var(--color-success-light);
  color: var(--color-success);
}

.stat-card__change--negative {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

.stat-card__period {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Color variants for icon */
.stat-card--primary .stat-card__icon-wrap {
  background: var(--color-primary-muted);
}
.stat-card--primary .stat-card__icon-wrap .pi {
  color: var(--color-primary);
}

.stat-card--success .stat-card__icon-wrap {
  background: var(--color-success-muted);
}
.stat-card--success .stat-card__icon-wrap .pi {
  color: var(--color-success);
}

.stat-card--warning .stat-card__icon-wrap {
  background: var(--color-warning-muted);
}
.stat-card--warning .stat-card__icon-wrap .pi {
  color: var(--color-warning);
}

.stat-card--danger .stat-card__icon-wrap {
  background: var(--color-danger-muted);
}
.stat-card--danger .stat-card__icon-wrap .pi {
  color: var(--color-danger);
}

.stat-card--info .stat-card__icon-wrap {
  background: var(--color-info-muted);
}
.stat-card--info .stat-card__icon-wrap .pi {
  color: var(--color-info);
}
</style>
