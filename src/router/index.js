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
      name: "blog",
      path: "/blog",
      component: () => import("@/views/Blog.vue"),
      meta: {
        title: "Blog",
      },
    },
    {
      name: "blog-post",
      path: "/blog/:permalink",
      component: () => import("@/views/BlogPost.vue"),
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
    {
      name: "addpost",
      path: "/_addpost",
      component: () => import("@/views/AddPost.vue"),
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0, left: 0 };
  },
});

router.afterEach((to, from) => {
  // Menggunakan `nextTick` untuk memastikan bahwa ini dipanggil
  // setelah `beforeRouteEnter` dan `beforeRouteUpdate` hooks
  nextTick(() => {
    if (to.meta?.title) {
      document.title = `${to.meta.title} | Iqbal Ramadan`;
    } else {
      document.title =
        "Iqbal Ramadan - Fullstack Developer & Software Engineer";
    }
  });
});

export default router;
