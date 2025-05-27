import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/DashboardView.vue'
import Stats from '../views/StatsView.vue'
import About from '../views/AboutView.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/stats', name: 'Stats', component: Stats },
  { path: '/about', name: 'About', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
