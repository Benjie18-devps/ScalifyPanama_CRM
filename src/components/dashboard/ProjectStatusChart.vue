<template>
  <div class="card project-status-chart">
    <div class="card-header">
      <div>
        <div class="card-title">Project Status</div>
        <div class="chart-subtitle">{{ totalProjects }} total projects</div>
      </div>
    </div>

    <div class="chart-layout">
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="doughnut-chart" />
      <div class="status-list">
        <div
          v-for="(item, index) in statusItems"
          :key="item.label"
          class="status-item"
        >
          <span class="status-dot" :style="{ background: colors[index] }" />
          <span class="status-label">{{ item.label }}</span>
          <span class="status-count">{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const colors = ['#2563eb', '#16a34a', '#f59e0b', '#94a3b8']

const statusItems = [
  { label: 'Active', count: 8 },
  { label: 'Completed', count: 6 },
  { label: 'On Hold', count: 2 },
  { label: 'Planning', count: 4 },
]

const totalProjects = computed(() => statusItems.reduce((s, i) => s + i.count, 0))

const chartData = computed(() => ({
  labels: statusItems.map((i) => i.label),
  datasets: [
    {
      data: statusItems.map((i) => i.count),
      backgroundColor: colors,
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0f172a',
      titleColor: '#94a3b8',
      bodyColor: '#f1f5f9',
      padding: 12,
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.parsed} projects`,
      },
    },
  },
}
</script>

<style scoped>
.chart-subtitle {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
}

.chart-layout {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 16px;
}

.doughnut-chart {
  width: 140px;
  height: 140px;
  flex-shrink: 0;
}

.status-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-label {
  flex: 1;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.status-count {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}
</style>
