<template>
  <div class="app-layout">
    <AppSidebar />

    <!-- Mobile overlay -->
    <Transition name="fade">
      <div
        v-if="uiStore.mobileMenuOpen"
        class="mobile-overlay"
        @click="uiStore.closeMobileMenu()"
      />
    </Transition>

    <div class="app-main" :class="{ 'sidebar-collapsed': uiStore.sidebarCollapsed }">
      <AppHeader />
      <main class="app-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useUIStore } from '@/stores/useUIStore'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

const uiStore = useUIStore()

function handleResize() {
  if (window.innerWidth >= 1024) {
    uiStore.closeMobileMenu()
  }
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<style scoped>
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-overlay);
  backdrop-filter: blur(2px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-normal);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
