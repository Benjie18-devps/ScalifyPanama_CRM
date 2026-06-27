<template>
  <div class="auth-layout">
    <div class="auth-layout__brand">
      <div class="auth-brand-content">
        <AppLogo size="lg" variant="light" />
        <h1 class="auth-brand-tagline">
          Your business, centralized.
        </h1>
        <p class="auth-brand-description">
          The all-in-one platform for managing clients, projects, support, and
          finance — built for growth.
        </p>
        <div class="auth-brand-features">
          <div v-for="feature in features" :key="feature.text" class="auth-brand-feature">
            <i :class="['pi', feature.icon, 'auth-brand-feature__icon']" />
            <span>{{ feature.text }}</span>
          </div>
        </div>
      </div>
      <div class="auth-brand-gradient" />
    </div>

    <div class="auth-layout__form">
      <div class="auth-form-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppLogo from '@/components/common/AppLogo.vue'

const features = [
  { icon: 'pi-building', text: 'Client & contact management' },
  { icon: 'pi-briefcase', text: 'Project & task tracking' },
  { icon: 'pi-ticket', text: 'Integrated support ticketing' },
  { icon: 'pi-file-pdf', text: 'Invoicing & payments' },
]
</script>

<style scoped>
.auth-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* ─── Left Brand Panel ──────────────────────────── */
.auth-layout__brand {
  position: relative;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  overflow: hidden;
}

.auth-brand-content {
  position: relative;
  z-index: 2;
  max-width: 420px;
}

.auth-brand-tagline {
  font-size: 2rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-top: 32px;
  line-height: 1.2;
}

.auth-brand-description {
  font-size: 1rem;
  color: #94a3b8;
  margin-top: 16px;
  line-height: 1.7;
}

.auth-brand-features {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
}

.auth-brand-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #cbd5e1;
  font-size: 0.9rem;
}

.auth-brand-feature__icon {
  color: #2563eb;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.auth-brand-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 80%, rgba(37, 99, 235, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 60%);
  z-index: 1;
  pointer-events: none;
}

/* ─── Right Form Panel ──────────────────────────── */
.auth-layout__form {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 48px;
}

.auth-form-wrapper {
  width: 100%;
  max-width: 420px;
}

/* ─── Responsive ────────────────────────────────── */
@media (max-width: 768px) {
  .auth-layout {
    grid-template-columns: 1fr;
  }

  .auth-layout__brand {
    display: none;
  }

  .auth-layout__form {
    padding: 32px 24px;
  }
}
</style>
