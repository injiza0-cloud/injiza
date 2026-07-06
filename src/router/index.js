import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/activate',
    name: 'Activation',
    component: () => import('../views/Activation.vue')
  },
  {
    path: '/verify',
    name: 'Verification',
    component: () => import('../views/Verification.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true, requiresActivation: true }
  },
  {
    path: '/videos',
    name: 'Videos',
    component: () => import('../views/Videos.vue'),
    meta: { requiresAuth: true, requiresActivation: true }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue'),
    meta: { requiresAuth: true, requiresActivation: true }
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue'),
    meta: { requiresAuth: true, requiresActivation: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true, requiresActivation: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/app',
    name: 'DownloadApp',
    component: () => import('../views/Download.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/Privacy.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/Terms.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/AdminDashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('../views/admin/AdminUsers.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/videos',
    name: 'AdminVideos',
    component: () => import('../views/admin/AdminVideos.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/tasks',
    name: 'AdminTasks',
    component: () => import('../views/admin/AdminTasks.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/withdrawals',
    name: 'AdminWithdrawals',
    component: () => import('../views/admin/AdminWithdrawals.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('../views/Games.vue'),
    meta: { requiresAuth: true, requiresActivation: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  const isActivated = localStorage.getItem('isActivated') === 'true'
  const activationRoutes = ['/activate', '/verify']

  if (isLoggedIn && (to.path === '/' || to.path === '/login' || to.path === '/register')) {
    next(isActivated ? '/dashboard' : '/activate')
  } else if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/dashboard')
  } else if (to.meta.requiresActivation && !isActivated && !activationRoutes.includes(to.path)) {
    next('/activate')
  } else {
    next()
  }
})

export default router