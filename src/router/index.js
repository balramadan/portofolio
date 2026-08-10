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
      name: "comingsoon",
      path: "/comingsoon",
      component: () => import("@/views/ComingSoon.vue"),
      meta: {
        title: "Coming Soon",
      },
    },
    {
      name: "projects",
      path: "/projects",
      component: () => import("@/views/Projects.vue"),
      meta: {
        title: "Projects",
      },
    },
    {
      name: "certifications",
      path: "/certifications",
      component: () => import("@/views/Certifications.vue"),
      meta: {
        title: "Certifications",
      },
    },
    {
      name: "addproject",
      path: "/_addproject",
      component: () => import("@/views/AddProject.vue"),
    },
    {
      name: "addcertification",
      path: "/_addcertification",
      component: () => import("@/views/AddCertification.vue"),
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };

      return { top: 0 };
    }
  },
});

router.afterEach((to, from) => {
  // Menggunakan `nextTick` untuk memastikan bahwa ini dipanggil
  // setelah `beforeRouteEnter` dan `beforeRouteUpdate` hooks
  nextTick(() => {
    if (to.meta?.title) {
      document.title = `${to.meta.title} | Iqbal Ramadan`;
    } else {
      document.title = "Iqbal Ramadan";
    }
  });
});

export default router;
