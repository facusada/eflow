
<script setup>
import { ref, reactive, computed, watch, toRaw } from 'vue'

const props = defineProps({
  estimation: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update'])

const localEstimation = reactive({
  currency: props.estimation?.currency || 'USD',
  phases: props.estimation?.phases ? props.estimation.phases.map((p) => ({ ...p })) : [],
})

const errors = reactive({})

watch(
  () => props.estimation,
  (val) => {
    localEstimation.currency = val?.currency || 'USD'
    localEstimation.phases = val?.phases ? val.phases.map((p) => ({ ...p })) : []
    Object.keys(errors).forEach((key) => {
      delete errors[key]
    })
  },
  { deep: true }
)

const phasesWithAmount = computed(() =>
  localEstimation.phases.map((phase) => {
    const amount = Number(phase.rate || 0) * Number(phase.hours || 0)
    return { ...phase, amount }
  })
)

const totalHours = computed(() =>
  phasesWithAmount.value.reduce((sum, phase) => sum + Number(phase.hours || 0), 0)
)

const totalAmount = computed(() =>
  phasesWithAmount.value.reduce((sum, phase) => sum + Number(phase.amount || 0), 0)
)

const validate = () => {
  Object.keys(errors).forEach((key) => delete errors[key])
  let valid = true

  phasesWithAmount.value.forEach((phase) => {
    const phaseErrors = {}
    if (!phase.role || !phase.role.trim()) {
      phaseErrors.role = 'El rol es obligatorio.'
    }
    if (phase.rate === '' || phase.rate === null || Number(phase.rate) < 0) {
      phaseErrors.rate = 'La tarifa debe ser mayor o igual a 0.'
    }
    if (phase.hours === '' || phase.hours === null || Number(phase.hours) <= 0) {
      phaseErrors.hours = 'Las horas deben ser mayores a 0.'
    }
    if (Object.keys(phaseErrors).length) {
      errors[phase.id] = phaseErrors
      valid = false
    }
  })

  return valid
}

const handleSave = () => {
  if (props.disabled) return
  const isValid = validate()
  if (!isValid) return
  const cleanPhases = phasesWithAmount.value.map((p) => ({ ...toRaw(p) }))
  const newEstimation = {
    currency: localEstimation.currency,
    totalHours: totalHours.value,
    totalAmount: totalAmount.value,
    phases: cleanPhases,
  }
  emit('update', newEstimation)
  console.log('Estimation updated', newEstimation)
}

const handleCancel = () => {
  if (props.estimation) {
    localEstimation.currency = props.estimation.currency || 'USD'
    localEstimation.phases = props.estimation.phases ? props.estimation.phases.map((p) => ({ ...p })) : []
    Object.keys(errors).forEach((key) => delete errors[key])
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <p class="text-base font-semibold text-gray-900">Estimación (editable)</p>
        <p class="text-sm text-gray-600">Ajusta roles, tarifas y horas para recalcular el total.</p>
      </div>
      <div class="text-gray-700 text-sm">
        Moneda: <span class="font-semibold">{{ localEstimation.currency }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="rounded-lg border border-gray-200 p-4 bg-gray-50">
        <p class="text-gray-500 text-sm">Horas totales</p>
        <p class="text-2xl font-semibold text-gray-900">{{ totalHours }}</p>
      </div>
      <div class="rounded-lg border border-gray-200 p-4 bg-gray-50">
        <p class="text-gray-500 text-sm">Monto total</p>
        <p class="text-2xl font-semibold text-gray-900">
          {{ localEstimation.currency }} {{ totalAmount.toLocaleString() }}
        </p>
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full table-auto divide-y divide-gray-200 text-left">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Fase</th>
            <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Rol</th>
            <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Tarifa</th>
            <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Horas</th>
            <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Monto</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white text-sm">
          <tr v-for="phase in localEstimation.phases" :key="phase.id" class="align-top hover:bg-gray-50">
            <td class="px-4 py-3 text-gray-900 font-medium">{{ phase.name }}</td>
            <td class="px-4 py-3">
              <input
                v-model="phase.role"
                type="text"
                class="w-full rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                :class="errors[phase.id]?.role ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-500'"
                :disabled="disabled"
              />
              <p v-if="errors[phase.id]?.role" class="text-xs text-red-500 mt-1">{{ errors[phase.id].role }}</p>
            </td>
            <td class="px-4 py-3">
              <input
                v-model.number="phase.rate"
                type="number"
                step="1"
                min="0"
                class="w-full rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                :class="errors[phase.id]?.rate ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-500'"
                :disabled="disabled"
              />
              <p v-if="errors[phase.id]?.rate" class="text-xs text-red-500 mt-1">{{ errors[phase.id].rate }}</p>
            </td>
            <td class="px-4 py-3">
              <input
                v-model.number="phase.hours"
                type="number"
                step="1"
                min="0"
                class="w-full rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                :class="errors[phase.id]?.hours ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-500'"
                :disabled="disabled"
              />
              <p v-if="errors[phase.id]?.hours" class="text-xs text-red-500 mt-1">{{ errors[phase.id].hours }}</p>
            </td>
            <td class="px-4 py-3 text-gray-900 font-semibold">
              {{ localEstimation.currency }} {{ (Number(phase.rate || 0) * Number(phase.hours || 0)).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end gap-3">
      <button
        type="button"
        class="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-60"
        :disabled="disabled"
        @click="handleCancel"
      >
        Cancelar cambios
      </button>
      <button
        type="button"
        class="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 disabled:opacity-60 transition-colors"
        :disabled="disabled"
        @click="handleSave"
      >
        Guardar cambios
      </button>
    </div>
  </div>
</template>
