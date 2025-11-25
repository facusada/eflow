<script setup>
import { RouterLink, RouterView } from 'vue-router'

const commercialLinks = [
  { label: 'Solicitudes Comerciales', to: '/commercial/requests' },
  { label: 'Nueva Solicitud', to: '/commercial/requests/new' },
  { label: 'Plantillas de Servicio', to: '/commercial/templates' },
  { label: 'Tablero de KPIs', to: '/commercial/kpis' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex">
    <aside class="w-64 bg-gray-900 text-gray-100 flex flex-col md:sticky md:top-0 md:h-screen">
      <div class="px-6 py-5 border-b border-gray-800">
        <p class="text-2xl font-semibold tracking-tight">eFlow</p>
        <p class="text-sm text-gray-400 mt-1">Suite Comercial</p>
      </div>
      <nav class="flex-1 px-3 py-4 space-y-3">
        <div>
          <p class="px-2 text-xs uppercase tracking-wide text-gray-400 mb-2">Comercial</p>
          <div class="space-y-1">
            <RouterLink
              v-for="link in commercialLinks"
              :key="link.to"
              :to="link.to"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click.prevent="navigate"
                class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
                :class="[
                  isActive
                    ? 'bg-gray-800 font-semibold text-white'
                    : 'text-gray-200 hover:bg-gray-800 hover:text-white',
                ]"
              >
                <span class="text-sm">{{ link.label }}</span>
              </a>
            </RouterLink>
          </div>
        </div>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4">
        <div>
          <p class="text-sm text-gray-500">Módulo Comercial</p>
          <h1 class="text-xl font-semibold text-gray-900">eFlow – Módulo Comercial</h1>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-semibold text-gray-900">Usuario</p>
            <p class="text-xs text-gray-500">Invitado</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-600 font-semibold">
            US
          </div>
        </div>
      </header>

      <main class="flex-1 p-6">
        <div class="max-w-7xl mx-auto">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
