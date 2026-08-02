<template>
  <DefaultLayout>
    <template #default>
      <First />
      <Second />
      <TechStack />
      <Experience />
      <Project />
      <Certification />
      <Fourth />
    </template>
  </DefaultLayout>
</template>

<script setup lang="js">
import { onMounted, onUnmounted, defineAsyncComponent } from "vue";
import { navStore } from "@/stores/nav";
import { useHead, useSeoMeta } from "@unhead/vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import First from "@/components/Hero/First.vue";

// Lazy Loaded Components
const Second = defineAsyncComponent(() => import("@/components/Hero/Second.vue"));
const TechStack = defineAsyncComponent(() => import("@/components/Hero/TechStack.vue"));
const Experience = defineAsyncComponent(() => import("@/components/Hero/Experience.vue"));
const Project = defineAsyncComponent(() => import("@/components/Hero/Project.vue"));
const Certification = defineAsyncComponent(() => import("@/components/Hero/Certification.vue"));
const Fourth = defineAsyncComponent(() => import("@/components/Hero/Fourth.vue"));

useHead({
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "icon", href: "/logo.svg" },
    { rel: "canonical", href: "https://v2.iqbalramadan.me" },
  ],
});

useSeoMeta({
  title: "Iqbal Ramadan — Fullstack Developer & Software Engineer",
  description: "Portfolio of Iqbal Ramadan, a Fullstack Developer based in Indonesia specializing in modern web & mobile applications built with Vue 3, Next.js, Bun, Elysia, and PostgreSQL.",
  keywords: "Iqbal Ramadan, Fullstack Developer, Software Engineer, Portfolio, Vue 3, Bun, Elysia, PostgreSQL, TypeScript, Indonesia",
  author: "Iqbal Ramadan",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  ogTitle: "Iqbal Ramadan — Fullstack Developer & Software Engineer",
  ogDescription: "Specializing in building exceptional digital experiences.",
  ogSiteName: "Iqbal Ramadan Portfolio",
  ogType: "website",
  ogUrl: "https://v2.iqbalramadan.me",
  ogImage: "https://v2.iqbalramadan.me/IMG-20260305-WA0199.jpg",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterTitle: "Iqbal Ramadan — Fullstack Developer",
  twitterDescription: "Specializing in building exceptional digital experiences.",
  twitterImage: "https://v2.iqbalramadan.me/IMG-20260305-WA0199.jpg",
});

function handleScroll() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  const fourth = document.getElementById("fourth");
  const third = document.getElementById("third");
  const experience = document.getElementById("experience");
  const second = document.getElementById("second");

  if (fourth && scrollPosition >= fourth.offsetTop - 150) {
    navStore().setActive(5);
  } else if (third && scrollPosition >= third.offsetTop - 150) {
    navStore().setActive(4);
  } else if (experience && scrollPosition >= experience.offsetTop - 150) {
    navStore().setActive(3);
  } else if (second && scrollPosition >= second.offsetTop - 150) {
    navStore().setActive(2);
  } else {
    navStore().setActive(1);
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped></style>
