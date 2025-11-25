<script setup>
const templates = ['Servicios Gestionados Estándar', 'Evaluación de Preparación en la Nube']
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Plantillas de servicio</h2>
      <p class="text-gray-600 mt-1">Modelos reutilizables para acelerar propuestas.</p>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <ul class="space-y-3">
        <li
          v-for="template in templates"
          :key="template"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-200"
        >
          <span class="text-gray-800 font-medium">{{ template }}</span>
          <span class="text-sm text-gray-500">Acciones de ejemplo</span>
        </li>
      </ul>
    </div>
  </section>
</template>
