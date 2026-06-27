<template>
  <div class="card revenue-chart">
    <div class="card-header">
      <div>
        <div class="card-title">Revenue Overview</div>
        <div class="chart-subtitle">Last 6 months</div>
      </div>
      <div class="chart-legend">
        <span class="legend-dot legend-dot--revenue" />
        <span class="legend-label">Revenue</span>
      </div>
    </div>
    <Chart type="line" :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const isDark = ref(false)

const chartData = computed(() => ({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Revenue',
      data: [8400, 7200, 9100, 11200, 10800, 12500],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: true,
      borderWidth: 2,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#0f172a',
      titleColor: '#94a3b8',
      bodyColor: '#f1f5f9',
      borderColor: '#1e293b',
      borderWidth: 1,
      padding: 12,
      callbacks: {
        label: (ctx) => ` $${ctx.parsed.y.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: '#94a3b8',
        font: { size: 12, family: 'Inter' },
      },
    },
    y: {
      border: {
        display: false,
        dash: [4, 4],
      },
      grid: {
        color: '#f1f5f9',
      },
      ticks: {
        color: '#94a3b8',
        font: { size: 12, family: 'Inter' },
        callback: (val) => `$${(val / 1000).toFixed(0)}k`,
      },
    },
  },
}))
</script>

<style scoped>
.revenue-chart {
  display: flex;
  flex-direction: column;
}

.chart-subtitle {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
}

.chart-legend {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-dot--revenue {
  background: var(--color-primary);
}

.legend-label {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  font-weight: var(--font-medium);
}

.chart {
  height: 240px;
  margin-top: 8px;
}
</style>
