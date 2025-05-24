import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Projects from '../views/Projects.vue'
import Contacts from '../views/Contacts.vue'
import ServiceDetails from '../views/ServiceDetails.vue'
import ProjectDetails from '../views/ProjectDetails.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import AdminProjects from '../views/admin/Projects.vue'
import AdminServices from '../views/admin/Services.vue'
import AdminApplications from '../views/admin/Applications.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/services',
    name: 'services',
    component: Services
  },
  {
    path: '/services/:id',
    name: 'service-details',
    component: ServiceDetails
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/projects/:id',
    name: 'project-details',
    component: ProjectDetails
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: AdminDashboard
      },
      {
        path: 'projects',
        name: 'admin-projects',
        component: AdminProjects
      },
      {
        path: 'services',
        name: 'admin-services',
        component: AdminServices
      },
      {
        path: 'applications',
        name: 'admin-applications',
        component: AdminApplications
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = localStorage.getItem('admin-token')
    if (!isAuthenticated) {
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 