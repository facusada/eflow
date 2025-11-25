import { defineStore } from 'pinia'
import { msalInstance } from '../auth/msalInstance'
import { loginRequest } from '../auth/msalConfig'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
  }),
  actions: {
    setUser(account) {
      if (!account) {
        this.user = null
        this.isAuthenticated = false
        return
      }
      this.user = {
        name: account.name,
        email: account.username,
        id: account.localAccountId,
      }
      this.isAuthenticated = true
    },
    initializeAuth() {
      const accounts = msalInstance.getAllAccounts()
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0])
        this.setUser(accounts[0])
      }
    },
    login() {
      msalInstance.loginRedirect(loginRequest)
    },
    async handleRedirectCallback() {
      this.loading = true
      try {
        const result = await msalInstance.handleRedirectPromise()
        if (result && result.account) {
          msalInstance.setActiveAccount(result.account)
          this.setUser(result.account)
          return
        }
        const activeAccount = msalInstance.getActiveAccount()
        if (activeAccount) {
          this.setUser(activeAccount)
        }
      } finally {
        this.loading = false
      }
    },
    logout() {
      msalInstance.logoutRedirect()
    },
  },
})
