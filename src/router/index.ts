import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id',
      name: 'starship',
      component: () => import('../views/StarshipView.vue'),
    },
    {
      path: '/',
      name: 'starships',
      component: () => import('../views/StarshipsView.vue'),
    },
  ],
})

export default router
