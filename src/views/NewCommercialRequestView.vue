
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '../components/FormField.vue'
import AiAssistPanel from '@/components/AiAssistPanel.vue'

const router = useRouter()

const form = reactive({
  client: '',
  opportunity: '',
  title: '',
  shortDescription: '',
  requestType: '',
  serviceType: '',
  detailedDescription: '',
  desiredStartDate: '',
  estimationDueDate: '',
  priority: '',
  isStrategic: false,
})

const errors = reactive({
  client: '',
  opportunity: '',
  title: '',
  shortDescription: '',
  requestType: '',
  serviceType: '',
  detailedDescription: '',
  desiredStartDate: '',
  estimationDueDate: '',
  priority: '',
  isStrategic: '',
})

const isSubmitting = ref(false)

const clients = ['TechCorp S.A.', 'Global Solutions LLC', 'Startup Innova']
const requestTypes = ['Proyecto', 'Servicio', 'Servicio gestionado']
const serviceTypes = ['Migración S/4HANA', 'SAP Basis', 'SAP Seguridad', 'SAP FI', 'SAP BW']
const priorities = ['Baja', 'Media', 'Alta', 'Urgente']

const submitLabel = computed(() => (isSubmitting.value ? 'Enviando...' : 'Enviar a revisión'))

const baseInputClasses =
  'w-full rounded-md border px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none'

const fieldClass = (field) => [
  baseInputClasses,
  errors[field]
    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
    : 'border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500',
]

const aiContext = computed(() => ({
  client: form.client,
  title: form.title,
  shortDescription: form.shortDescription,
  requestType: form.requestType,
  serviceType: form.serviceType,
  priority: form.priority,
  isStrategic: form.isStrategic,
}))

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const validateForm = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })

  const requiredFields = ['client', 'title', 'requestType', 'serviceType', 'detailedDescription', 'priority']

  requiredFields.forEach((field) => {
    if (!form[field]) {
      errors[field] = 'Este campo es obligatorio.'
    }
  })

  return requiredFields.every((field) => !errors[field])
}

const handleSaveDraft = () => {
  console.log('Guardar borrador', { ...form })
}

const handleSendToReview = () => {
  const isValid = validateForm()
  if (!isValid) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  isSubmitting.value = true
  console.log('Enviar a revisión', { ...form })
  setTimeout(() => {
    isSubmitting.value = false
    alert('Formulario válido. (Mock) Enviado a revisión.')
  }, 600)
}

const handleCancel = () => {
  router.push('/commercial/requests')
}

const handleApplySuggestion = (text) => {
  form.detailedDescription = text
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Nueva solicitud comercial</h2>
      <p class="text-gray-600 mt-1 text-sm">
        Completa la información para crear una nueva solicitud comercial y enviarla a revisión.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">1) Cliente y oportunidad</h3>
            <p class="text-sm text-gray-600">Selecciona el cliente y, si aplica, la oportunidad relacionada.</p>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Cliente" :required="true" :error="errors.client" for-id="client">
                <select
                  id="client"
                  v-model="form.client"
                  :class="fieldClass('client')"
                >
                  <option value="">Selecciona un cliente</option>
                  <option v-for="option in clients" :key="option" :value="option">{{ option }}</option>
                </select>
              </FormField>
              <FormField label="Oportunidad (opcional)" :error="errors.opportunity" for-id="opportunity">
                <input
                  id="opportunity"
                  v-model="form.opportunity"
                  type="text"
                  :class="fieldClass('opportunity')"
                  placeholder="Ej: OPP-2041"
                />
              </FormField>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-900">2) Información de la solicitud</h3>
            <p class="text-sm text-gray-600">Describe brevemente el alcance y tipo de solicitud.</p>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Título" :required="true" :error="errors.title" for-id="title">
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  :class="fieldClass('title')"
                  placeholder="Ej: Modernización de infraestructura SAP"
                />
              </FormField>
              <FormField
                label="Descripción corta (opcional)"
                :error="errors.shortDescription"
                for-id="shortDescription"
              >
                <input
                  id="shortDescription"
                  v-model="form.shortDescription"
                  type="text"
                  :class="fieldClass('shortDescription')"
                  placeholder="Resumen breve de la solicitud"
                />
              </FormField>
              <FormField label="Tipo de solicitud" :required="true" :error="errors.requestType" for-id="requestType">
                <select
                  id="requestType"
                  v-model="form.requestType"
                  :class="fieldClass('requestType')"
                >
                  <option value="">Selecciona un tipo</option>
                  <option v-for="option in requestTypes" :key="option" :value="option">{{ option }}</option>
                </select>
              </FormField>
              <FormField label="Tipo de servicio" :required="true" :error="errors.serviceType" for-id="serviceType">
                <select
                  id="serviceType"
                  v-model="form.serviceType"
                  :class="fieldClass('serviceType')"
                >
                  <option value="">Selecciona un servicio</option>
                  <option v-for="option in serviceTypes" :key="option" :value="option">{{ option }}</option>
                </select>
              </FormField>
            </div>
            <FormField label="Descripción detallada" :required="true" :error="errors.detailedDescription" for-id="detailedDescription">
              <textarea
                id="detailedDescription"
                v-model="form.detailedDescription"
                rows="4"
                :class="fieldClass('detailedDescription')"
                placeholder="Incluye contexto, requerimientos y expectativas del cliente"
              ></textarea>
            </FormField>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-900">3) Fechas y prioridad</h3>
            <p class="text-sm text-gray-600">Define plazos estimados y el nivel de prioridad.</p>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Fecha deseada de inicio (opcional)"
                :error="errors.desiredStartDate"
                for-id="desiredStartDate"
              >
                <input
                  id="desiredStartDate"
                  v-model="form.desiredStartDate"
                  type="date"
                  :class="fieldClass('desiredStartDate')"
                />
              </FormField>
              <FormField
                label="Fecha límite para estimación (opcional)"
                :error="errors.estimationDueDate"
                for-id="estimationDueDate"
              >
                <input
                  id="estimationDueDate"
                  v-model="form.estimationDueDate"
                  type="date"
                  :class="fieldClass('estimationDueDate')"
                />
              </FormField>
              <FormField label="Prioridad" :required="true" :error="errors.priority" for-id="priority">
                <select
                  id="priority"
                  v-model="form.priority"
                  :class="fieldClass('priority')"
                >
                  <option value="">Selecciona prioridad</option>
                  <option v-for="option in priorities" :key="option" :value="option">{{ option }}</option>
                </select>
              </FormField>
            </div>
            <div class="mt-2 flex items-center gap-2">
              <input
                id="isStrategic"
                v-model="form.isStrategic"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500"
              />
              <label for="isStrategic" class="text-sm text-gray-800">¿Es estratégica?</label>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              class="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
              @click="handleCancel"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              @click="handleSaveDraft"
            >
              Guardar borrador
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 disabled:opacity-60 transition-colors"
              :disabled="isSubmitting"
              @click="handleSendToReview"
            >
              {{ submitLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <AiAssistPanel
          :context="aiContext"
          :disabled="isSubmitting"
          @apply="handleApplySuggestion"
        />
      </div>
    </div>
  </div>
</template>
