<template>
  <div class="dashboard">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header__left">
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">
          Welcome back, {{ authStore.userDisplayName || 'there' }}. Here's what's happening.
        </p>
      </div>
      <div class="page-header__actions">
        <Button
          label="New Client"
          icon="pi pi-plus"
          @click="router.push('/clients')"
        />
      </div>
    </div>

    <!-- KPI Stats Row -->
    <div class="stats-grid">
      <StatCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
        :change-unit="stat.changeUnit"
        :icon="stat.icon"
        :color="stat.color"
      />
    </div>

    <!-- Charts Row -->
    <div class="charts-grid">
      <RevenueChart />
      <ProjectStatusChart />
    </div>

    <!-- Bottom Row -->
    <div class="bottom-grid">
      <RecentActivity />
      <div class="bottom-right-grid">
        <QuickActions />
        <UpcomingDeadlines />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import StatCard from '@/components/dashboard/StatCard.vue'
import RevenueChart from '@/components/dashboard/RevenueChart.vue'
import ProjectStatusChart from '@/components/dashboard/ProjectStatusChart.vue'
import RecentActivity from '@/components/dashboard/RecentActivity.vue'
import QuickActions from '@/components/dashboard/QuickActions.vue'
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines.vue'

const authStore = useAuthStore()
const router = useRouter()

const stats = [
  {
    title: 'Total Revenue',
    value: '$48,250',
    change: 12.5,
    changeUnit: '%',
    icon: 'pi-dollar',
    color: 'success',
  },
  {
    title: 'Active Clients',
    value: '24',
    change: 3,
    changeUnit: ' new',
    icon: 'pi-building',
    color: 'primary',
  },
  {
    title: 'Active Projects',
    value: '18',
    change: -1,
    changeUnit: '',
    icon: 'pi-briefcase',
    color: 'warning',
  },
  {
    title: 'Open Tickets',
    value: '7',
    change: -2,
    changeUnit: '',
    icon: 'pi-ticket',
    color: 'danger',
  },
]
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* KPI Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: var(--space-4);
}

/* Bottom Grid */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--space-4);
}

.bottom-right-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ─── Responsive ──────────────────────────────────── */
@media (max-width: 1280px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .bottom-right-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .bottom-right-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
