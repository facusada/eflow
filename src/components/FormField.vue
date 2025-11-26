
<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  forId: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div class="mb-4">
    <label
      class="block text-sm font-medium text-gray-700 mb-1"
      :for="props.forId || undefined"
    >
      {{ props.label }}
      <span v-if="props.required" class="text-red-500">*</span>
    </label>
    <slot />
    <p v-if="props.error" class="mt-1 text-xs text-red-500">{{ props.error }}</p>
  </div>
</template>
