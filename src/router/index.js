import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/warning',
    name: 'warning',
    component: () => import('../views/warning.vue')
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('../views/analysis.vue')
  },
  {
    path: '/assessment',
    name: 'assessment',
    component: () => import('../views/assessment.vue')
  }, 
  {
    path: '/assetsdetails',
    name: 'assetsdetails',
    component: () => import('../views/assetsDetails.vue')
  },
  {
    path: '/worningdetails',
    name: 'worningdetails',
    component: () => import('../views/worningdetails.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/message.vue')
  },
  {
    path: '/',
    name: 'regin',
    component: () => import('../views/regin.vue')
  }
]

const router = new VueRouter({
  /* mode: 'history', */
  base: process.env.BASE_URL,
  routes
})

export default router
