import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("@/views/LandingPage.vue"),
    },
    {
      name: "coming soon",
      path: "/comingsoon",
      component: () => import("@/views/ComingSoon.vue"),
    },
  ],
});

router.afterEach((to, from) => {
  // Menggunakan `nextTick` untuk memastikan bahwa ini dipanggil
  // setelah `beforeRouteEnter` dan `beforeRouteUpdate` hooks
  nextTick(() => {
    document.title = to.meta.title || "Iqbal Ramadan";
  });
});

export default router;
