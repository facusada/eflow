<script setup>
const tabs = ['Resumen', 'Estimación', 'Asignación', 'Adjuntos', 'Historial', 'Resultado']
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Detalle de solicitud comercial</h2>
      <p class="text-gray-600 mt-1">Vista general de la solicitud seleccionada.</p>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="flex flex-wrap gap-2 border-b border-gray-200 px-4 py-3">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          class="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 bg-gray-50 text-gray-700 hover:bg-white"
        >
          {{ tab }}
        </button>
      </div>
      <div class="p-6 text-gray-700">
        Contenido de ejemplo para la sección seleccionada. Más adelante cargaremos datos, formularios y acciones reales.
      </div>
    </div>
  </section>
</template>
