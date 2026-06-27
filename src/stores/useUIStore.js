import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const sidebarCollapsed = ref(false)
  const mobileMenuOpen = ref(false)
  const theme = ref('light')

  const isMobile = computed(() => window.innerWidth < 1024)

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false
  }

  function setTheme(newTheme) {
    theme.value = newTheme
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
    localStorage.setItem('scalify-theme', newTheme)
  }

  function initTheme() {
    const saved = localStorage.getItem('scalify-theme')
    if (saved) setTheme(saved)
  }

  return {
    sidebarCollapsed,
    mobileMenuOpen,
    theme,
    isMobile,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
    setTheme,
    initTheme,
  }
})
