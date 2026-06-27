import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },

  // ─── Auth ─────────────────────────────────────────
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/LoginView.vue'),
    meta: { layout: 'auth', isAuthPage: true },
  },

  // ─── App (protected) ──────────────────────────────
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/DashboardView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Dashboard' },
  },

  // CRM
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/pages/clients/ClientsView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Clients' },
  },
  {
    path: '/clients/:id',
    name: 'client-profile',
    component: () => import('@/pages/clients/ClientProfileView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Client Profile' },
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Contacts', module: 'Contacts' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Projects', module: 'Projects' },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Tasks', module: 'Tasks' },
  },

  // Support
  {
    path: '/tickets',
    name: 'tickets',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Support Tickets', module: 'Support Tickets' },
  },
  {
    path: '/knowledge',
    name: 'knowledge',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Knowledge Base', module: 'Knowledge Base' },
  },
  {
    path: '/files',
    name: 'files',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Files', module: 'Files' },
  },

  // Finance
  {
    path: '/invoices',
    name: 'invoices',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Invoices', module: 'Invoices' },
  },
  {
    path: '/payments',
    name: 'payments',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Payments', module: 'Payments' },
  },
  {
    path: '/quotes',
    name: 'quotes',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Quotes', module: 'Quotes' },
  },

  // Analytics
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Reports', module: 'Reports' },
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Calendar', module: 'Calendar' },
  },

  // Administration
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Users', module: 'Users' },
  },
  {
    path: '/admin/roles',
    name: 'admin-roles',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Roles & Permissions', module: 'Roles' },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/pages/ComingSoonView.vue'),
    meta: { layout: 'app', requiresAuth: true, title: 'Settings', module: 'Settings' },
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundView.vue'),
    meta: { layout: 'auth' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // Initialize auth on first navigation
  if (!authStore.initialized) {
    await authStore.initialize()
  }

  const requiresAuth = to.meta.requiresAuth === true
  const isAuthPage = to.meta.isAuthPage === true

  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if (isAuthPage && authStore.isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  next()
})

router.afterEach((to) => {
  const base = 'ScalifyPanama'
  document.title = to.meta.title ? `${to.meta.title} — ${base}` : base
})

export default router
