
<script setup>
const props = defineProps({
  status: {
    type: String,
    default: '',
  },
})

const badgeClasses = {
  Abierta: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  'En progreso': 'bg-yellow-50 text-yellow-800 ring-1 ring-yellow-200',
  Completada: 'bg-green-50 text-green-700 ring-1 ring-green-200',
  Rechazada: 'bg-red-50 text-red-700 ring-1 ring-red-200',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
    :class="badgeClasses[props.status] || 'bg-gray-100 text-gray-700 ring-1 ring-gray-200'"
  >
    {{ props.status || 'N/D' }}
  </span>
</template>
