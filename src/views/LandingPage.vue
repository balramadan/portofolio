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
import { defineAsyncComponent, onMounted, onUnmounted, nextTick } from "vue";
import { navStore } from "@/stores/nav";
import { useHead, useSeoMeta } from "@unhead/vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import First from "@/components/Hero/First.vue";
import { useSmoothScroll } from "@/composables/useSmoothScroll";

// Dynamic Import
const Second = defineAsyncComponent(
  () => import("@/components/Hero/Second.vue"),
);
const TechStack = defineAsyncComponent(
  () => import("@/components/Hero/TechStack.vue"),
);
const Experience = defineAsyncComponent(
  () => import("@/components/Hero/Experience.vue"),
);
const Project = defineAsyncComponent(
  () => import("@/components/Hero/Project.vue"),
);
const Certification = defineAsyncComponent(
  () => import("@/components/Hero/Certification.vue"),
);
const Fourth = defineAsyncComponent(
  () => import("@/components/Hero/Fourth.vue"),
);

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
  title: "Iqbal Ramadan - Fullstack Developer & Software Engineer",
  description:
    "Portfolio of Iqbal Ramadan, a Fullstack Developer based in Indonesia specializing in modern web & mobile applications built with Vue 3, Next.js, Bun, Elysia, and PostgreSQL.",
  keywords:
    "Iqbal Ramadan, Fullstack Developer, Software Engineer, Portfolio, Vue 3, Bun, Elysia, PostgreSQL, TypeScript, Indonesia",
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
  twitterDescription:
    "Specializing in building exceptional digital experiences.",
  twitterImage: "https://codebyiqbal.dev/IMG-20260305-WA0199.jpg",
});

// Cached section geometric bounds to completely eliminate Forced Reflow (0ms)
let cachedBounds = {
  firstTop: 0,
  secondTop: Infinity,
  experienceTop: Infinity,
  thirdTop: Infinity,
  fourthTop: Infinity,
  fourthBottom: Infinity,
};

function calculateSectionBounds() {
  const targetOffset = window.innerHeight * 0.35;

  const first = document.getElementById("first");
  const second = document.getElementById("second");
  const experience = document.getElementById("experience");
  const third = document.getElementById("third");
  const fourth = document.getElementById("fourth");

  if (!first) return;

  cachedBounds = {
    firstTop: first.offsetTop - targetOffset,
    secondTop: second ? second.offsetTop - targetOffset : Infinity,
    experienceTop: experience ? experience.offsetTop - targetOffset : Infinity,
    thirdTop: third ? third.offsetTop - targetOffset : Infinity,
    fourthTop: fourth ? fourth.offsetTop - targetOffset : Infinity,
    fourthBottom: fourth
      ? fourth.offsetTop + fourth.offsetHeight - targetOffset
      : Infinity,
  };
}

let isTicking = false;

function handleScroll() {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const nav = navStore();

      if (scrollPosition < cachedBounds.firstTop) {
        nav.clearActive();
      } else if (
        scrollPosition >= cachedBounds.firstTop &&
        scrollPosition < cachedBounds.secondTop
      ) {
        nav.setActive(1); // Home
      } else if (
        scrollPosition >= cachedBounds.secondTop &&
        scrollPosition < cachedBounds.experienceTop
      ) {
        nav.setActive(2); // About
      } else if (
        scrollPosition >= cachedBounds.experienceTop &&
        scrollPosition < cachedBounds.thirdTop
      ) {
        nav.setActive(3); // Experience
      } else if (
        scrollPosition >= cachedBounds.thirdTop &&
        scrollPosition < cachedBounds.fourthTop
      ) {
        nav.setActive(4); // Projects
      } else if (
        scrollPosition >= cachedBounds.fourthTop &&
        scrollPosition < cachedBounds.fourthBottom
      ) {
        nav.setActive(5); // Blog
      } else {
        nav.clearActive(); // Below Blog (Certifications / Footer)
      }

      isTicking = false;
    });

    isTicking = true;
  }
}

function handleResize() {
  calculateSectionBounds();
  handleScroll();
}

let lenisUnsub = null;

onMounted(() => {
  nextTick(() => {
    calculateSectionBounds();
    handleScroll();
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  const lenis = smoothScroll.getLenis();
  if (lenis) {
    lenis.on("scroll", handleScroll);
    lenisUnsub = lenis;
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
  if (lenisUnsub) {
    lenisUnsub.off("scroll", handleScroll);
  }
});
</script>

<style scoped></style>
