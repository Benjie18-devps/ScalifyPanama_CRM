<template>
  <RouterLink to="/dashboard" class="app-logo" :class="[`app-logo--${variant}`, `app-logo--${size}`]">
    <div class="app-logo__icon">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#2563EB" />
        <path d="M7 22L13 10L18.5 18L22 13.5L26 22H7Z" fill="white" opacity="0.95" />
      </svg>
    </div>
    <div v-if="!iconOnly" class="app-logo__text">
      <span class="app-logo__name">Scalify</span>
      <span class="app-logo__sub">Panama</span>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  variant: {
    type: String,
    default: 'dark',
    validator: (v) => ['dark', 'light'].includes(v),
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.app-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.app-logo__icon {
  flex-shrink: 0;
}

.app-logo--sm .app-logo__icon svg { width: 28px; height: 28px; }
.app-logo--md .app-logo__icon svg { width: 32px; height: 32px; }
.app-logo--lg .app-logo__icon svg { width: 40px; height: 40px; }

.app-logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.app-logo__name {
  font-weight: 700;
  letter-spacing: -0.02em;
}

.app-logo__sub {
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 1px;
}

/* Size variants */
.app-logo--sm .app-logo__name { font-size: 0.9rem; }
.app-logo--sm .app-logo__sub { font-size: 0.55rem; }

.app-logo--md .app-logo__name { font-size: 1rem; }
.app-logo--md .app-logo__sub { font-size: 0.6rem; }

.app-logo--lg .app-logo__name { font-size: 1.2rem; }
.app-logo--lg .app-logo__sub { font-size: 0.65rem; }

/* Color variants */
.app-logo--dark .app-logo__name { color: #f1f5f9; }
.app-logo--dark .app-logo__sub { color: #2563eb; }

.app-logo--light .app-logo__name { color: #f1f5f9; }
.app-logo--light .app-logo__sub { color: #93c5fd; }
</style>
