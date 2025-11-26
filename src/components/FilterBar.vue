// File: src/components/FilterBar.vue

<script setup>
const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:filters'])

const clients = [
  'Acme Corp',
  'Globex',
  'Innotech',
  'Wayne Enterprises',
  'Stark Industries',
  'Umbrella Corp',
  'Hooli',
  'Vehement Capital',
]

const requestTypes = ['Evaluación', 'Propuesta', 'Consultoría', 'Proyecto']
const priorities = ['Alta', 'Media', 'Baja']
const statuses = ['Abierta', 'En progreso', 'Completada', 'Rechazada']

const onChange = (field, value) => {
  emit('update:filters', { ...props.filters, [field]: value })
}
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <label class="flex flex-col gap-1 text-sm text-gray-700">
        Cliente
        <select
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          :value="props.filters.client"
          @change="onChange('client', $event.target.value)"
        >
          <option value="">Todos</option>
          <option v-for="option in clients" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </label>

      <label class="flex flex-col gap-1 text-sm text-gray-700">
        Tipo de solicitud
        <select
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          :value="props.filters.requestType"
          @change="onChange('requestType', $event.target.value)"
        >
          <option value="">Todos</option>
          <option v-for="option in requestTypes" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </label>

      <label class="flex flex-col gap-1 text-sm text-gray-700">
        Prioridad
        <select
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          :value="props.filters.priority"
          @change="onChange('priority', $event.target.value)"
        >
          <option value="">Todas</option>
          <option v-for="option in priorities" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </label>

      <label class="flex flex-col gap-1 text-sm text-gray-700">
        Estado
        <select
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          :value="props.filters.status"
          @change="onChange('status', $event.target.value)"
        >
          <option value="">Todos</option>
          <option v-for="option in statuses" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>
