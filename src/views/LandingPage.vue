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
import { onMounted, onUnmounted } from "vue";
import { navStore } from "@/stores/nav";
import { useHead, useSeoMeta } from "@unhead/vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import First from "@/components/Hero/First.vue";
import Second from "@/components/Hero/Second.vue";
import TechStack from "@/components/Hero/TechStack.vue";
import Experience from "@/components/Hero/Experience.vue";
import Project from "@/components/Hero/Project.vue";
import Certification from "@/components/Hero/Certification.vue";
import Fourth from "@/components/Hero/Fourth.vue";
import { useSmoothScroll } from "@/composables/useSmoothScroll";

const smoothScroll = useSmoothScroll();

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

function handleScroll() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const targetOffset = window.innerHeight * 0.35; // Focal point 35% from top of screen

  const first = document.getElementById("first");
  const second = document.getElementById("second");
  const experience = document.getElementById("experience");
  const third = document.getElementById("third");
  const fourth = document.getElementById("fourth");

  if (!first) return;

  const firstTop = first.offsetTop - targetOffset;
  const secondTop = second ? second.offsetTop - targetOffset : Infinity;
  const experienceTop = experience ? experience.offsetTop - targetOffset : Infinity;
  const thirdTop = third ? third.offsetTop - targetOffset : Infinity;
  const fourthTop = fourth ? fourth.offsetTop - targetOffset : Infinity;
  const fourthBottom = fourth ? fourth.offsetTop + fourth.offsetHeight - targetOffset : Infinity;

  const nav = navStore();

  if (scrollPosition < firstTop) {
    nav.clearActive();
  } else if (scrollPosition >= firstTop && scrollPosition < secondTop) {
    nav.setActive(1); // Home
  } else if (scrollPosition >= secondTop && scrollPosition < experienceTop) {
    nav.setActive(2); // About
  } else if (scrollPosition >= experienceTop && scrollPosition < thirdTop) {
    nav.setActive(3); // Experience
  } else if (scrollPosition >= thirdTop && scrollPosition < fourthTop) {
    nav.setActive(4); // Projects
  } else if (scrollPosition >= fourthTop && scrollPosition < fourthBottom) {
    nav.setActive(5); // Blog
  } else {
    nav.clearActive(); // Below Blog (Certifications / Footer)
  }
}

let lenisUnsub = null;

onMounted(() => {
  // Listen to both native scroll and Lenis scroll
  window.addEventListener("scroll", handleScroll, { passive: true });

  const lenis = smoothScroll.getLenis();
  if (lenis) {
    lenis.on("scroll", handleScroll);
    lenisUnsub = lenis;
  }

  // Initial check on mount
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (lenisUnsub) {
    lenisUnsub.off("scroll", handleScroll);
  }
});
</script>

<style scoped></style>
