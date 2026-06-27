<template>
  <div class="client-filters">
    <!-- Search -->
    <IconField class="filters-search">
      <InputIcon class="pi pi-search" />
      <InputText
        :value="modelValue.search"
        @input="$emit('update:modelValue', { ...modelValue, search: $event.target.value })"
        placeholder="Search clients…"
        class="filters-search__input"
      />
    </IconField>

    <!-- Status filter -->
    <Select
      :model-value="modelValue.status"
      @update:model-value="$emit('update:modelValue', { ...modelValue, status: $event })"
      :options="statusOptions"
      option-label="label"
      option-value="value"
      placeholder="All Statuses"
      class="filters-select"
      show-clear
    />

    <!-- Industry filter -->
    <Select
      :model-value="modelValue.industry"
      @update:model-value="$emit('update:modelValue', { ...modelValue, industry: $event })"
      :options="INDUSTRIES"
      placeholder="All Industries"
      class="filters-select"
      show-clear
      filter
    />

    <!-- Clear filters -->
    <Button
      v-if="hasActiveFilters"
      label="Clear"
      icon="pi pi-times"
      severity="secondary"
      outlined
      size="small"
      @click="clearFilters"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { COMPANY_STATUSES, INDUSTRIES } from '@/constants/statuses'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'clear'])

const statusOptions = COMPANY_STATUSES

const hasActiveFilters = computed(
  () => !!props.modelValue.search || !!props.modelValue.status || !!props.modelValue.industry,
)

function clearFilters() {
  emit('update:modelValue', { search: '', status: null, industry: null })
}
</script>

<style scoped>
.client-filters {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filters-search__input {
  width: 240px;
}

.filters-select {
  width: 170px;
}

@media (max-width: 768px) {
  .filters-search__input {
    width: 100%;
  }

  .filters-select {
    width: calc(50% - 4px);
  }
}
</style>
