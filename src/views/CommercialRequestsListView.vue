
<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FilterBar from '../components/FilterBar.vue'
import DataTable from '../components/DataTable.vue'
import { useCommercialRequestsStore } from '../stores/commercialRequestsStore'

const router = useRouter()
const store = useCommercialRequestsStore()

const columns = [
  { key: 'code', label: 'Código' },
  { key: 'client', label: 'Cliente' },
  { key: 'title', label: 'Título' },
  { key: 'requestType', label: 'Tipo' },
  { key: 'priority', label: 'Prioridad' },
  { key: 'status', label: 'Estado' },
  { key: 'dueDate', label: 'Fecha de vencimiento' },
]

const displayedRequests = computed(() => store.filtered)

onMounted(() => {
  store.fetchRequests()
})

const handleFiltersChange = (updatedFilters) => {
  store.filters = updatedFilters
  store.applyFilters()
}

const handleRowClick = (row) => {
  router.push(`/commercial/requests/${row.id}`)
}

const goToNewRequest = () => {
  router.push('/commercial/requests/new')
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-semibold text-gray-900">Mis solicitudes comerciales</h2>
        <p class="text-gray-600 mt-1">Resumen rápido de la actividad reciente.</p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        @click="goToNewRequest"
      >
        Nueva solicitud
      </button>
    </div>

    <FilterBar :filters="store.filters" @update:filters="handleFiltersChange" />

    <div v-if="store.loading" class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-gray-700">
      Cargando solicitudes...
    </div>
    <div v-else-if="store.error" class="bg-white border border-red-200 rounded-lg shadow-sm p-6 text-red-700">
      {{ store.error }}
    </div>
    <div
      v-else-if="!displayedRequests.length"
      class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-gray-700"
    >
      No se encontraron solicitudes comerciales
    </div>
    <DataTable
      v-else
      :items="displayedRequests"
      :columns="columns"
      @row-click="handleRowClick"
    />
  </section>
</template>
