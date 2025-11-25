import { createRouter, createWebHistory } from 'vue-router'
import CommercialRequestsListView from '../views/CommercialRequestsListView.vue'
import NewCommercialRequestView from '../views/NewCommercialRequestView.vue'
import CommercialRequestDetailView from '../views/CommercialRequestDetailView.vue'
import TemplatesListView from '../views/TemplatesListView.vue'
import CommercialKpiDashboardView from '../views/CommercialKpiDashboardView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/commercial/requests',
    },
    {
      path: '/commercial/requests',
      name: 'commercial-requests-list',
      component: CommercialRequestsListView,
    },
    {
      path: '/commercial/requests/new',
      name: 'commercial-request-new',
      component: NewCommercialRequestView,
    },
    {
      path: '/commercial/requests/:id',
      name: 'commercial-request-detail',
      component: CommercialRequestDetailView,
    },
    {
      path: '/commercial/templates',
      name: 'commercial-templates-list',
      component: TemplatesListView,
    },
    {
      path: '/commercial/kpis',
      name: 'commercial-kpi-dashboard',
      component: CommercialKpiDashboardView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
