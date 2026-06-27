<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
  <Toast position="top-right" :pt="{ root: { style: 'z-index: 9999' } }" />
  <ConfirmDialog />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUIStore } from '@/stores/useUIStore'
import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()
const uiStore = useUIStore()

const layoutComponent = computed(() => {
  return route.meta.layout === 'auth' ? AuthLayout : AppLayout
})

onMounted(() => {
  uiStore.initTheme()
})
</script>
