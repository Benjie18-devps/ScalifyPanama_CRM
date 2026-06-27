import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/config/supabase'
import { getInitials } from '@/utils/formatters'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const loading = ref(false)
  const initialized = ref(false)

  const isAuthenticated = computed(() => !!session.value)

  const userInitials = computed(() => {
    if (!user.value) return 'U'
    const name = user.value.user_metadata?.full_name || user.value.email || ''
    return getInitials(name)
  })

  const userDisplayName = computed(() => {
    if (!user.value) return ''
    return user.value.user_metadata?.full_name || user.value.email || ''
  })

  const userEmail = computed(() => user.value?.email ?? '')

  const userRole = computed(() => {
    // Role is stored in app_metadata — never trust user_metadata for authorization
    return user.value?.app_metadata?.role ?? 'client'
  })

  async function initialize() {
    try {
      const { data } = await supabase.auth.getSession()
      session.value = data.session
      user.value = data.session?.user ?? null

      supabase.auth.onAuthStateChange((_event, newSession) => {
        session.value = newSession
        user.value = newSession?.user ?? null
      })
    } finally {
      initialized.value = true
    }
  }

  async function signIn(email, password) {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      session.value = data.session
      user.value = data.user
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    loading.value = true
    try {
      await supabase.auth.signOut()
    } finally {
      session.value = null
      user.value = null
      loading.value = false
    }
  }

  async function updateProfile(updates) {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      })
      if (error) throw error
      user.value = data.user
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  async function sendPasswordReset(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  return {
    user,
    session,
    loading,
    initialized,
    isAuthenticated,
    userInitials,
    userDisplayName,
    userEmail,
    userRole,
    initialize,
    signIn,
    signOut,
    updateProfile,
    sendPasswordReset,
  }
})
