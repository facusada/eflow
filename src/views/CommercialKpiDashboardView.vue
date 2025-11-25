<script setup>
const kpis = [
  { label: 'Solicitudes abiertas', value: '28', trend: '+3 esta semana' },
  { label: 'Tiempo de ciclo promedio', value: '12d', trend: 'Estable' },
  { label: 'Tasa de cierre', value: '42%', trend: '+5% vs mes anterior' },
]
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Tablero de KPIs comerciales</h2>
      <p class="text-gray-600 mt-1">Indicadores rápidos para el pipeline comercial.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="kpi in kpis"
        :key="kpi.label"
        class="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-2"
      >
        <p class="text-sm text-gray-500">{{ kpi.label }}</p>
        <p class="text-3xl font-semibold text-gray-900">{{ kpi.value }}</p>
        <p class="text-sm text-blue-600">{{ kpi.trend }}</p>
      </div>
    </div>
  </section>
</template>
