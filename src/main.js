import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { msalInstance } from './auth/msalInstance'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const authStore = useAuthStore(pinia)

await msalInstance.initialize()
await authStore.handleRedirectCallback()
authStore.initializeAuth()

await router.isReady()

app.mount('#app')
