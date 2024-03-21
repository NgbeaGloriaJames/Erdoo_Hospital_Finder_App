import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HelloWorld from '@/components/HelloWorld.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
  },
    {
      path: '/Login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/Signup',
      name: 'Signup',
      // route level code-splitting
      // this generates a separate chunk (Signup.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/search',
      name: 'Search',
      // route level code-splitting
      // this generates a separate chunk (Signup.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SearchView.vue')
    }
  ]
})

export default router
