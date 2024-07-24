import { createRouter, createWebHistory } from 'vue-router'
import ViewBooks from '@/views/ViewBooks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewBooks
    },
    {
      path: '/api/books',
      name: 'add',
      component: () => import('../views/AddBook.vue')
    }
  ]
})

export default router
