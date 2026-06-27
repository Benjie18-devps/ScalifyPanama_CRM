<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">Recent Activity</div>
      <Button label="View all" icon="pi pi-arrow-right" iconPos="right" text size="small" />
    </div>

    <Timeline :value="activities" class="activity-timeline">
      <template #marker="{ item }">
        <div class="activity-marker" :class="`activity-marker--${item.color}`">
          <i :class="['pi', item.icon]" />
        </div>
      </template>
      <template #content="{ item }">
        <div class="activity-item">
          <div class="activity-item__text">
            <span class="activity-item__actor">{{ item.actor }}</span>
            {{ item.action }}
            <span class="activity-item__subject">{{ item.subject }}</span>
          </div>
          <span class="activity-item__time">{{ item.time }}</span>
        </div>
      </template>
    </Timeline>
  </div>
</template>

<script setup>
const activities = [
  {
    icon: 'pi-building',
    color: 'primary',
    actor: 'You',
    action: 'created client',
    subject: 'TechCorp Panama',
    time: '2m ago',
  },
  {
    icon: 'pi-briefcase',
    color: 'success',
    actor: 'Maria L.',
    action: 'completed project',
    subject: 'Website Redesign',
    time: '1h ago',
  },
  {
    icon: 'pi-ticket',
    color: 'warning',
    actor: 'Carlos R.',
    action: 'opened ticket',
    subject: 'VPN configuration issue',
    time: '3h ago',
  },
  {
    icon: 'pi-file-pdf',
    color: 'info',
    actor: 'You',
    action: 'sent invoice',
    subject: 'INV-2024-041',
    time: '5h ago',
  },
  {
    icon: 'pi-check-circle',
    color: 'success',
    actor: 'System',
    action: 'payment received for',
    subject: 'INV-2024-038',
    time: '1d ago',
  },
]
</script>

<style scoped>
.activity-timeline {
  margin-top: 4px;
}

.activity-marker {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-marker .pi {
  font-size: 0.8rem;
}

.activity-marker--primary {
  background: var(--color-primary-muted);
  color: var(--color-primary);
}

.activity-marker--success {
  background: var(--color-success-muted);
  color: var(--color-success);
}

.activity-marker--warning {
  background: var(--color-warning-muted);
  color: var(--color-warning);
}

.activity-marker--danger {
  background: var(--color-danger-muted);
  color: var(--color-danger);
}

.activity-marker--info {
  background: var(--color-info-muted);
  color: var(--color-info);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 16px;
}

.activity-item__text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.activity-item__actor {
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.activity-item__subject {
  font-weight: var(--font-medium);
  color: var(--color-primary);
}

.activity-item__time {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  margin-top: 2px;
}
</style>
