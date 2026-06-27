import { supabase } from '@/config/supabase'

export const authService = {
  async getSession() {
    return supabase.auth.getSession()
  },

  async signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password })
  },

  async signOut() {
    return supabase.auth.signOut()
  },

  async resetPassword(email) {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
  },

  async updatePassword(newPassword) {
    return supabase.auth.updateUser({ password: newPassword })
  },

  async updateProfile(updates) {
    return supabase.auth.updateUser({ data: updates })
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },
}
