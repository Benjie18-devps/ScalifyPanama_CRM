<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__code">404</div>
      <h1 class="not-found__title">Page not found</h1>
      <p class="not-found__description">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="not-found__actions">
        <Button label="Go to Dashboard" icon="pi pi-home" @click="router.push('/dashboard')" />
        <Button label="Go Back" icon="pi pi-arrow-left" severity="secondary" outlined @click="router.back()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  padding: 32px;
}

.not-found__content {
  text-align: center;
  max-width: 400px;
}

.not-found__code {
  font-size: 6rem;
  font-weight: 900;
  color: var(--color-border-strong);
  line-height: 1;
  letter-spacing: -0.05em;
}

.not-found__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: 16px;
}

.not-found__description {
  color: var(--color-text-secondary);
  margin-top: 8px;
  margin-bottom: 32px;
}

.not-found__actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
