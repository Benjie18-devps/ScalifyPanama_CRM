<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :header="isEdit ? 'Edit Client' : 'New Client'"
    :modal="true"
    :style="{ width: '640px' }"
    :closable="!saving"
    :draggable="false"
    class="client-form-dialog"
  >
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-grid">
        <!-- Company Name -->
        <div class="form-field form-field--full">
          <label for="cf-name" class="form-label">
            Company Name <span class="form-required">*</span>
          </label>
          <InputText
            id="cf-name"
            v-model.trim="form.name"
            placeholder="e.g. TechCorp Panama"
            class="w-full"
            :class="{ 'p-invalid': errors.name }"
            :disabled="saving"
          />
          <small v-if="errors.name" class="form-error">{{ errors.name }}</small>
        </div>

        <!-- Email -->
        <div class="form-field">
          <label for="cf-email" class="form-label">Email</label>
          <InputText
            id="cf-email"
            v-model.trim="form.email"
            type="email"
            placeholder="contact@company.com"
            class="w-full"
            :class="{ 'p-invalid': errors.email }"
            :disabled="saving"
          />
          <small v-if="errors.email" class="form-error">{{ errors.email }}</small>
        </div>

        <!-- Phone -->
        <div class="form-field">
          <label for="cf-phone" class="form-label">Phone</label>
          <InputText
            id="cf-phone"
            v-model.trim="form.phone"
            placeholder="+507 6000-0000"
            class="w-full"
            :disabled="saving"
          />
        </div>

        <!-- Website -->
        <div class="form-field">
          <label for="cf-website" class="form-label">Website</label>
          <InputText
            id="cf-website"
            v-model.trim="form.website"
            placeholder="https://company.com"
            class="w-full"
            :class="{ 'p-invalid': errors.website }"
            :disabled="saving"
          />
          <small v-if="errors.website" class="form-error">{{ errors.website }}</small>
        </div>

        <!-- Industry -->
        <div class="form-field">
          <label for="cf-industry" class="form-label">Industry</label>
          <Select
            id="cf-industry"
            v-model="form.industry"
            :options="INDUSTRIES"
            placeholder="Select industry"
            class="w-full"
            :disabled="saving"
            filter
            filterPlaceholder="Search industries..."
          />
        </div>

        <!-- Status -->
        <div class="form-field">
          <label for="cf-status" class="form-label">
            Status <span class="form-required">*</span>
          </label>
          <Select
            id="cf-status"
            v-model="form.status"
            :options="COMPANY_STATUSES"
            option-label="label"
            option-value="value"
            placeholder="Select status"
            class="w-full"
            :class="{ 'p-invalid': errors.status }"
            :disabled="saving"
          />
          <small v-if="errors.status" class="form-error">{{ errors.status }}</small>
        </div>

        <!-- City -->
        <div class="form-field">
          <label for="cf-city" class="form-label">City</label>
          <InputText
            id="cf-city"
            v-model.trim="form.city"
            placeholder="Panama City"
            class="w-full"
            :disabled="saving"
          />
        </div>

        <!-- Country -->
        <div class="form-field">
          <label for="cf-country" class="form-label">Country</label>
          <Select
            id="cf-country"
            v-model="form.country"
            :options="COUNTRIES"
            placeholder="Select country"
            class="w-full"
            :disabled="saving"
            filter
            filterPlaceholder="Search countries..."
          />
        </div>

        <!-- Address -->
        <div class="form-field form-field--full">
          <label for="cf-address" class="form-label">Address</label>
          <InputText
            id="cf-address"
            v-model.trim="form.address"
            placeholder="Street address"
            class="w-full"
            :disabled="saving"
          />
        </div>

        <!-- Notes -->
        <div class="form-field form-field--full">
          <label for="cf-notes" class="form-label">Internal Notes</label>
          <Textarea
            id="cf-notes"
            v-model="form.notes"
            rows="3"
            placeholder="Any internal notes about this client..."
            class="w-full"
            :disabled="saving"
            auto-resize
          />
        </div>
      </div>
    </form>

    <template #footer>
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        @click="$emit('update:visible', false)"
        :disabled="saving"
      />
      <Button
        :label="isEdit ? 'Save Changes' : 'Create Client'"
        icon="pi pi-check"
        :loading="saving"
        @click="handleSubmit"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import { INDUSTRIES, COUNTRIES, COMPANY_STATUSES } from '@/constants/statuses'
import { isRequired, isValidEmail, isValidUrl } from '@/utils/validators'

const props = defineProps({
  visible: { type: Boolean, required: true },
  client: { type: Object, default: null },
  saving: { type: Boolean, default: false },
})

const emit = defineEmits(['update:visible', 'submit'])

const isEdit = computed(() => !!props.client)

const defaultForm = () => ({
  name: '',
  email: '',
  phone: '',
  website: '',
  industry: null,
  status: 'prospect',
  city: '',
  country: 'Panama',
  address: '',
  notes: '',
})

const form = reactive(defaultForm())
const errors = reactive({})

watch(
  () => props.visible,
  (val) => {
    if (val) {
      Object.assign(form, defaultForm())
      Object.keys(errors).forEach((k) => delete errors[k])
      if (props.client) {
        Object.assign(form, {
          name: props.client.name ?? '',
          email: props.client.email ?? '',
          phone: props.client.phone ?? '',
          website: props.client.website ?? '',
          industry: props.client.industry ?? null,
          status: props.client.status ?? 'prospect',
          city: props.client.city ?? '',
          country: props.client.country ?? 'Panama',
          address: props.client.address ?? '',
          notes: props.client.notes ?? '',
        })
      }
    }
  },
  { immediate: false },
)

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  let valid = true

  if (!isRequired(form.name)) {
    errors.name = 'Company name is required.'
    valid = false
  }

  if (form.email && !isValidEmail(form.email)) {
    errors.email = 'Enter a valid email address.'
    valid = false
  }

  if (form.website && !isValidUrl(form.website)) {
    errors.website = 'Enter a valid URL (include https://).'
    valid = false
  }

  if (!isRequired(form.status)) {
    errors.status = 'Status is required.'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', { ...form })
}
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field--full {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.form-required {
  color: var(--color-danger);
}

.form-error {
  color: var(--color-danger);
  font-size: 0.8rem;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
