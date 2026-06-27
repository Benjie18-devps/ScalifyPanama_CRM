<template>
  <div class="login-page">
    <div class="login-header">
      <h2 class="login-title">Welcome back</h2>
      <p class="login-subtitle">Sign in to your ScalifyPanama account</p>
    </div>

    <form class="login-form" @submit.prevent="handleSubmit" novalidate>
      <!-- Error Message -->
      <Message v-if="errorMessage" severity="error" :closable="false" class="login-error">
        {{ errorMessage }}
      </Message>

      <!-- Email -->
      <div class="form-field">
        <label for="email" class="form-label">Email address</label>
        <IconField>
          <InputIcon class="pi pi-envelope" />
          <InputText
            id="email"
            v-model.trim="form.email"
            type="email"
            placeholder="you@company.com"
            class="w-full"
            :class="{ 'p-invalid': errors.email }"
            autocomplete="email"
            :disabled="authStore.loading"
          />
        </IconField>
        <small v-if="errors.email" class="form-error">{{ errors.email }}</small>
      </div>

      <!-- Password -->
      <div class="form-field">
        <div class="form-label-row">
          <label for="password" class="form-label">Password</label>
          <button type="button" class="forgot-link" @click="handleForgotPassword">
            Forgot password?
          </button>
        </div>
        <Password
          id="password"
          v-model="form.password"
          placeholder="Enter your password"
          :feedback="false"
          :toggleMask="true"
          class="w-full"
          :class="{ 'p-invalid': errors.password }"
          :disabled="authStore.loading"
          inputClass="w-full"
        />
        <small v-if="errors.password" class="form-error">{{ errors.password }}</small>
      </div>

      <!-- Submit -->
      <Button
        type="submit"
        label="Sign In"
        icon="pi pi-sign-in"
        class="w-full login-submit-btn"
        :loading="authStore.loading"
        :disabled="authStore.loading"
        size="large"
      />
    </form>

    <p class="login-footer">
      Need help?
      <a href="mailto:support@scalifypanama.com" class="login-footer__link">
        Contact support
      </a>
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast } from '@/composables/useToast'
import { isValidEmail, isRequired } from '@/utils/validators'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })
const errorMessage = ref('')

function validate() {
  errors.email = ''
  errors.password = ''
  let valid = true

  if (!isRequired(form.email)) {
    errors.email = 'Email is required.'
    valid = false
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address.'
    valid = false
  }

  if (!isRequired(form.password)) {
    errors.password = 'Password is required.'
    valid = false
  }

  return valid
}

async function handleSubmit() {
  errorMessage.value = ''
  if (!validate()) return

  const result = await authStore.signIn(form.email, form.password)

  if (result.success) {
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } else {
    errorMessage.value = result.error === 'Invalid login credentials'
      ? 'The email or password you entered is incorrect.'
      : result.error
  }
}

async function handleForgotPassword() {
  if (!isValidEmail(form.email)) {
    errors.email = 'Enter your email address above, then click "Forgot password?"'
    return
  }

  const result = await authStore.sendPasswordReset(form.email)
  if (result.success) {
    toast.success(`Password reset email sent to ${form.email}. Check your inbox.`)
  } else {
    toast.error(result.error)
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
}

.login-header {
  margin-bottom: 32px;
}

.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.login-subtitle {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-top: 8px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-error {
  border-radius: var(--radius-md);
}

/* Form fields */
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.form-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-error {
  color: var(--color-danger);
  font-size: 0.8rem;
}

.forgot-link {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.825rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color var(--transition-fast);
}

.forgot-link:hover {
  color: var(--color-primary-hover);
}

.login-submit-btn {
  margin-top: 4px;
}

.login-footer {
  text-align: center;
  font-size: 0.825rem;
  color: var(--color-text-secondary);
  margin-top: 24px;
}

.login-footer__link {
  color: var(--color-primary);
  font-weight: 500;
}
</style>
