<template lang="">
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
import { onMounted, defineAsyncComponent } from "vue";
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
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "shortcut icon",
      href: "/favicon.ico",
    },
    {
      rel: "icon",
      href: "/logo.svg",
    },
  ],
});

useSeoMeta({
  title: "Iqbal Ramadan - Junior Fullstack Developer",
  description: "Portofolio Junior Fullstack Developer specializing in modern web applications. Expert in Vue.js, Node.js, and Supabase.",
  keywords: "Iqbal Ramadan, Junior Fullstack Developer, Iqbal Ramadan UBSI, Web Developer Portfolio, Fullstack Indonesia",
  author: "Iqbal Ramadan",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  ogTitle: "Iqbal Ramadan - Junior Fullstack Developer",
  ogDescription: "Portofolio Junior Fullstack Developer specializing in modern web applications.",
  ogSiteName: "Iqbal Ramadan Portfolio",
  ogType: "website",
  ogUrl: "https://iqbalramadan.my.id",
  ogImage: "https://iqbalramadan.my.id/logo.png",
  ogLocale: "id_ID",
  twitterCard: "summary_large_image",
  twitterTitle: "Iqbal Ramadan - Junior Fullstack Developer",
  twitterDescription: "Portofolio Junior Fullstack Developer specializing in modern web applications.",
  twitterImage: "https://iqbalramadan.my.id/logo.png",
});

onMounted(() => {
  window.addEventListener("scroll", () => {
    const scrollPosition =
      window.scrollY ||
      window.scrollTop ||
      document.getElementsByTagName("html")[0].scrollTop;

    if (scrollPosition >= document.getElementById("fourth").offsetTop) {
      navStore().setActive(5);
    } else if (scrollPosition >= document.getElementById("third").offsetTop) {
      navStore().setActive(4);
    } else if (
      scrollPosition >= document.getElementById("experience").offsetTop
    ) {
      navStore().setActive(3);
    } else if (scrollPosition >= document.getElementById("second").offsetTop) {
      navStore().setActive(2);
    } else {
      navStore().setActive(1);
    }
  });
});
</script>
<style lang=""></style>
