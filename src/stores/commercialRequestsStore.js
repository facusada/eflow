// File: src/stores/commercialRequestsStore.js

import { defineStore } from 'pinia'
import { getCommercialRequests } from '../services/commercialRequestsService'

export const useCommercialRequestsStore = defineStore('commercialRequests', {
  state: () => ({
    requests: [],
    filtered: [],
    loading: false,
    error: null,
    filters: {
      client: '',
      requestType: '',
      priority: '',
      status: '',
    },
  }),
  actions: {
    async fetchRequests() {
      this.loading = true
      this.error = null
      try {
        const data = await getCommercialRequests()
        this.requests = data
        this.filtered = data
      } catch (err) {
        this.error = err?.message || 'No se pudieron cargar las solicitudes'
      } finally {
        this.loading = false
      }
    },
    applyFilters() {
      const { client, requestType, priority, status } = this.filters
      this.filtered = this.requests.filter((item) => {
        const matchesClient = client ? item.client === client : true
        const matchesRequestType = requestType ? item.requestType === requestType : true
        const matchesPriority = priority ? item.priority === priority : true
        const matchesStatus = status ? item.status === status : true
        return matchesClient && matchesRequestType && matchesPriority && matchesStatus
      })
    },
    resetFilters() {
      this.filters = {
        client: '',
        requestType: '',
        priority: '',
        status: '',
      }
      this.filtered = this.requests
    },
  },
})
