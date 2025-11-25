import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import CommercialRequestsListView from '../views/CommercialRequestsListView.vue'
import NewCommercialRequestView from '../views/NewCommercialRequestView.vue'
import CommercialRequestDetailView from '../views/CommercialRequestDetailView.vue'
import TemplatesListView from '../views/TemplatesListView.vue'
import CommercialKpiDashboardView from '../views/CommercialKpiDashboardView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: '/commercial/requests',
        },
        {
          path: 'commercial/requests',
          name: 'commercial-requests-list',
          component: CommercialRequestsListView,
        },
        {
          path: 'commercial/requests/new',
          name: 'commercial-request-new',
          component: NewCommercialRequestView,
        },
        {
          path: 'commercial/requests/:id',
          name: 'commercial-request-detail',
          component: CommercialRequestDetailView,
        },
        {
          path: 'commercial/templates',
          name: 'commercial-templates-list',
          component: TemplatesListView,
        },
        {
          path: 'commercial/kpis',
          name: 'commercial-kpi-dashboard',
          component: CommercialKpiDashboardView,
        },
        {
          path: 'not-found',
          name: 'not-found',
          component: NotFoundView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/not-found',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isPublic = to.name === 'login'
  const skipAuth = import.meta.env.DEV

  if (skipAuth) {
    return next()
  }

  if (!isPublic && !auth.isAuthenticated) {
    return next({ name: 'login' })
  }

  if (isPublic && auth.isAuthenticated) {
    return next({ name: 'commercial-requests-list' })
  }

  return next()
})

export default router
