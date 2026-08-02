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

let sectionObserver = null;

useHead({
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "icon", href: "/logo.svg" },
    { rel: "canonical", href: "https://codebyiqbal.dev" },
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
  ogUrl: "https://codebyiqbal.dev",
  ogImage: "https://codebyiqbal.dev/IMG-20260305-WA0199.jpg",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterTitle: "Iqbal Ramadan — Fullstack Developer",
  twitterDescription: "Specializing in building exceptional digital experiences.",
  twitterImage: "https://codebyiqbal.dev/IMG-20260305-WA0199.jpg",
});

onMounted(() => {
  // Use IntersectionObserver to eliminate synchronous forced reflows on scroll
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "fourth") navStore().setActive(5);
          else if (id === "third") navStore().setActive(4);
          else if (id === "experience") navStore().setActive(3);
          else if (id === "second") navStore().setActive(2);
          else if (id === "first") navStore().setActive(1);
        }
      });
    },
    { threshold: 0.35 }
  );

  const sections = ["first", "second", "experience", "third", "fourth"];
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
});

onUnmounted(() => {
  if (sectionObserver) {
    sectionObserver.disconnect();
  }
});
</script>

<style scoped></style>
