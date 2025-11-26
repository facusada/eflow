
<script setup>
import { ref } from 'vue'
import { generateDescription, refineDescription } from '@/services/aiAssistService.js'

const props = defineProps({
  context: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['apply'])

const suggestion = ref('')
const loading = ref(false)
const error = ref('')

const handleGenerate = async () => {
  if (props.disabled) return
  error.value = ''
  loading.value = true
  try {
    const result = await generateDescription(props.context)
    suggestion.value = result
  } catch (e) {
    error.value = 'No se pudo generar la sugerencia.'
  } finally {
    loading.value = false
  }
}

const handleRefine = async () => {
  if (props.disabled || !suggestion.value) {
    error.value = suggestion.value ? '' : 'Genera una descripción antes de refinar.'
    return
  }
  error.value = ''
  loading.value = true
  try {
    const result = await refineDescription(suggestion.value)
    suggestion.value = result
  } catch (e) {
    error.value = 'No se pudo refinar la sugerencia.'
  } finally {
    loading.value = false
  }
}

const handleApply = () => {
  if (!suggestion.value || props.disabled) return
  emit('apply', suggestion.value)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-5 flex flex-col h-full">
    <div class="mb-3">
      <p class="text-base font-semibold text-gray-900">Asistente IA – Descripción detallada</p>
      <p class="text-sm text-gray-600">Genera o refina la descripción técnica y comercial de la solicitud.</p>
    </div>

    <div class="flex flex-col gap-2 mb-3">
      <button
        type="button"
        class="px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60 transition-colors"
        :disabled="loading || props.disabled"
        @click="handleGenerate"
      >
        {{ loading ? 'Generando...' : 'Generar sugerencia' }}
      </button>
      <button
        type="button"
        class="px-3 py-2 text-sm font-semibold text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-60 transition-colors"
        :disabled="loading || props.disabled"
        @click="handleRefine"
      >
        Refinar (más técnico)
      </button>
      <button
        type="button"
        class="px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-60 transition-colors"
        :disabled="loading || props.disabled || !suggestion"
        @click="handleApply"
      >
        Usar esta descripción
      </button>
    </div>

    <div class="flex-1">
      <label class="text-sm font-medium text-gray-700 mb-1 block">Sugerencia generada</label>
      <textarea
        class="w-full min-h-[200px] max-h-[420px] rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        :value="suggestion"
        readonly
      />
      <p v-if="error" class="text-xs text-red-500 mt-2">{{ error }}</p>
    </div>
  </div>
</template>
