// File: src/views/CommercialRequestDetailView.vue

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommercialRequestsStore } from '@/stores/commercialRequestsStore.js'
import StatusBadge from '@/components/StatusBadge.vue'
import EstimationEditor from '@/components/EstimationEditor.vue'

const route = useRoute()
const router = useRouter()
const store = useCommercialRequestsStore()

const activeTab = ref('summary')
const editableEstimation = ref(null)

const request = computed(() => store.selectedRequest)
const loading = computed(() => store.detailLoading)
const error = computed(() => store.detailError)
const estimation = computed(() =>
  request.value && request.value.estimation ? request.value.estimation : null
)

const tabs = [
  { key: 'summary', label: 'Resumen' },
  { key: 'estimation', label: 'Estimación' },
  { key: 'assignment', label: 'Asignación' },
  { key: 'attachments', label: 'Adjuntos' },
  { key: 'history', label: 'Historial' },
  { key: 'result', label: 'Resultado' },
]

onMounted(() => {
  const id = route.params.id
  store.fetchRequestById(id)
})

watch(
  estimation,
  (val) => {
    if (val) {
      editableEstimation.value = {
        currency: val.currency,
        totalHours: val.totalHours,
        totalAmount: val.totalAmount,
        phases: val.phases ? val.phases.map((p) => ({ ...p })) : [],
      }
    } else {
      editableEstimation.value = null
    }
  },
  { immediate: true }
)

const changeTab = (tab) => {
  activeTab.value = tab
}

const goBack = () => {
  router.push('/commercial/requests')
}

const handleEstimationUpdate = (newEstimation) => {
  editableEstimation.value = newEstimation
  if (request.value) {
    request.value.estimation = newEstimation
  }
  console.log('Estimation saved (mock):', newEstimation)
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading" class="flex items-center justify-center py-16">
      <p class="text-gray-600">Cargando solicitud...</p>
    </div>

    <div v-else-if="error" class="bg-white border border-red-200 rounded-lg p-6 shadow-sm space-y-3">
      <p class="text-red-700 font-semibold">No se pudo cargar la solicitud.</p>
      <p class="text-sm text-red-600">{{ error }}</p>
      <button
        type="button"
        class="inline-flex w-fit px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
        @click="goBack"
      >
        Volver a la lista
      </button>
    </div>

    <div v-else-if="!request" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
      <p class="text-gray-800 font-semibold">Solicitud no encontrada.</p>
      <p class="text-sm text-gray-600">Verifica el código o regresa al listado.</p>
      <button
        type="button"
        class="inline-flex w-fit px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
        @click="goBack"
      >
        Volver a la lista
      </button>
    </div>

    <div v-else class="space-y-4">
      <div class="flex items-center justify-between">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
          @click="goBack"
        >
          Volver al listado
        </button>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-sm text-gray-500">Código</p>
            <p class="text-xl font-semibold text-gray-900">{{ request.code }}</p>
            <p class="text-sm text-gray-700 mt-1">{{ request.title }}</p>
          </div>
          <StatusBadge :status="request.status" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p class="text-gray-500">Cliente</p>
            <p class="font-semibold text-gray-900">{{ request.client }}</p>
          </div>
          <div>
            <p class="text-gray-500">Tipo de solicitud</p>
            <p class="font-semibold text-gray-900">{{ request.requestType || 'No definido' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Prioridad</p>
            <p class="font-semibold text-gray-900">{{ request.priority || 'No definida' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Servicio</p>
            <p class="font-semibold text-gray-900">{{ request.serviceType || 'No definido' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Fecha límite</p>
            <p class="font-semibold text-gray-900">{{ request.dueDate || 'Sin fecha' }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm">
        <div class="flex flex-wrap border-b border-gray-200">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="px-4 py-3 text-sm font-semibold transition-colors"
            :class="[
              activeTab === tab.key
                ? 'border-b-2 border-blue-600 text-blue-700 bg-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-b-2 border-transparent',
            ]"
            @click="changeTab(tab.key)"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="p-6 text-gray-800">
          <div v-if="activeTab === 'summary'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-500">Cliente</p>
                <p class="font-semibold text-gray-900">{{ request.client }}</p>
              </div>
              <div>
                <p class="text-gray-500">Código</p>
                <p class="font-semibold text-gray-900">{{ request.code }}</p>
              </div>
              <div>
                <p class="text-gray-500">Título</p>
                <p class="font-semibold text-gray-900">{{ request.title }}</p>
              </div>
              <div>
                <p class="text-gray-500">Estado</p>
                <StatusBadge :status="request.status" />
              </div>
              <div>
                <p class="text-gray-500">Tipo de solicitud</p>
                <p class="font-semibold text-gray-900">{{ request.requestType || 'No definido' }}</p>
              </div>
              <div>
                <p class="text-gray-500">Prioridad</p>
                <p class="font-semibold text-gray-900">{{ request.priority || 'No definida' }}</p>
              </div>
              <div>
                <p class="text-gray-500">Fecha límite</p>
                <p class="font-semibold text-gray-900">{{ request.dueDate || 'Sin fecha' }}</p>
              </div>
            </div>
            <div class="text-sm text-gray-700 leading-relaxed">
              Esta solicitud de {{ request.client }} titulada "{{ request.title }}" corresponde a un
              {{ request.requestType || 'tipo pendiente' }} con prioridad
              {{ request.priority || 'sin definir' }}. El objetivo es preparar y entregar una propuesta alineada con
              las expectativas comerciales y técnicas, considerando el alcance y las dependencias acordadas. La fecha
              límite actual es {{ request.dueDate || 'pendiente' }}, y el estado se encuentra en
              "{{ request.status }}".
            </div>
          </div>

          <div v-else-if="activeTab === 'estimation'" class="space-y-4 text-sm text-gray-800">
            <div v-if="!estimation" class="text-gray-600">
              No hay datos de estimación disponibles para esta solicitud.
            </div>
            <div v-else>
              <EstimationEditor
                v-if="editableEstimation"
                :estimation="editableEstimation"
                :disabled="loading"
                @update="handleEstimationUpdate"
              />
            </div>
          </div>

          <div v-else-if="activeTab === 'assignment'" class="text-sm text-gray-700">
            La asignación de equipo se gestionará aquí.
          </div>
          <div v-else-if="activeTab === 'attachments'" class="text-sm text-gray-700">
            Los adjuntos de la solicitud aparecerán en esta sección.
          </div>
          <div v-else-if="activeTab === 'history'" class="text-sm text-gray-700">
            El historial de cambios y eventos se mostrará aquí.
          </div>
          <div v-else-if="activeTab === 'result'" class="text-sm text-gray-700">
            Los resultados o acuerdos finales se documentarán aquí.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
