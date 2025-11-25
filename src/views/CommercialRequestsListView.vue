<script setup>
const requests = [
  { code: 'CR-1042', client: 'Acme Corp', title: 'Evaluación de migración a la nube', status: 'En revisión' },
  { code: 'CR-1043', client: 'Globex', title: 'Propuesta de servicios gestionados', status: 'Borrador' },
]
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Mis solicitudes comerciales</h2>
      <p class="text-gray-600 mt-1">Resumen rápido de la actividad reciente.</p>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Código
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Cliente
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Título
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Estado
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="request in requests" :key="request.code" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ request.code }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ request.client }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ request.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {{ request.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
