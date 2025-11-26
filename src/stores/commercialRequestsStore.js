
import { defineStore } from 'pinia'
import { getCommercialRequests, getCommercialRequestById } from '../services/commercialRequestsService'

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
    selectedRequest: null,
    detailLoading: false,
    detailError: null,
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
    async fetchRequestById(id) {
      this.detailLoading = true
      this.detailError = null
      this.selectedRequest = null
      try {
        const data = await getCommercialRequestById(id)
        this.selectedRequest = data
      } catch (err) {
        this.detailError = err?.message || 'No se pudo cargar la solicitud'
      } finally {
        this.detailLoading = false
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
