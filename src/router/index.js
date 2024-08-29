import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/LandingPage.vue')
    },
    {
      name: 'post',
      path: '/post/:id',
      component: () => import('@/views/Post.vue')
    }
  ],
});

export default router;
