<script setup>
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const handleLogin = () => {
  authStore.login()
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="bg-white shadow-lg rounded-xl border border-gray-200 w-full max-w-md p-8 space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-semibold text-gray-900">Inicia sesión en eFlow</h1>
        <p class="text-gray-600">Usa tu cuenta corporativa de Microsoft</p>
      </div>
      <button
        type="button"
        class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
        @click="handleLogin"
      >
        <span>Iniciar sesión con Microsoft</span>
      </button>
    </div>
  </div>
</template>
