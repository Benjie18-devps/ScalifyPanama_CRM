<template>
  <div class="page-header">
    <div class="page-header__left">
      <h1 class="page-title">{{ route.meta.module || route.meta.title }}</h1>
      <p class="page-subtitle">This module is coming soon.</p>
    </div>
  </div>

  <div class="coming-soon-card card">
    <div class="coming-soon__icon">
      <i class="pi pi-wrench" />
    </div>
    <h2 class="coming-soon__title">Under Development</h2>
    <p class="coming-soon__description">
      The <strong>{{ route.meta.module || route.meta.title }}</strong> module is currently being built.
      It will be available in an upcoming phase. The architecture is in place and ready to connect.
    </p>
    <div class="coming-soon__pills">
      <span class="coming-soon__pill">
        <i class="pi pi-check" /> Database schema ready
      </span>
      <span class="coming-soon__pill">
        <i class="pi pi-check" /> Service layer scaffolded
      </span>
      <span class="coming-soon__pill coming-soon__pill--pending">
        <i class="pi pi-clock" /> UI in queue
      </span>
    </div>
    <Button
      label="Return to Dashboard"
      icon="pi pi-home"
      outlined
      @click="router.push('/dashboard')"
      class="mt-6"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
</script>

<style scoped>
.coming-soon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 64px 48px;
  max-width: 560px;
}

.coming-soon__icon {
  width: 72px;
  height: 72px;
  background: var(--color-primary-light);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.coming-soon__icon .pi {
  font-size: 2rem;
  color: var(--color-primary);
}

.coming-soon__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 12px;
}

.coming-soon__description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 380px;
  margin-bottom: 24px;
}

.coming-soon__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.coming-soon__pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: var(--color-success-light);
  color: var(--color-success);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
}

.coming-soon__pill--pending {
  background: var(--color-warning-light);
  color: #92400e;
}
</style>
