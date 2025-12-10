<template lang="">
  <DefaultLayout>
    <template #default>
      <First />
      <Second />
      <TechStack />
      <Project />
      <Certification />
      <Fourth />
    </template>
  </DefaultLayout>
</template>
<script setup lang="js">
import { onMounted } from "vue";
import { navStore } from "@/stores/nav";
import { useHead, useSeoMeta } from "@unhead/vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import First from "@/components/Hero/First.vue";
import Second from "@/components/Hero/Second.vue";
import TechStack from "@/components/Hero/TechStack.vue";
import Third from "@/components/Hero/Third.vue";
import Project from "@/components/Hero/Project.vue";
import Certification from "@/components/Hero/Certification.vue";
import Fourth from "@/components/Hero/Fourth.vue";

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
      href: "/logo.svg"
    },
  ],
})

useSeoMeta({
  title: "Iqbal Ramadan - Junior Fullstack Developer",
  description: "Portofolio Junior Fullstack Developer",
  keywords: "Iqbal Ramadan, Junior Fullstack Developer, Iqbal Ramadan UBSI",
  author: "Iqbal Ramadan",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle: "Iqbal Ramadan - Junior Fullstack Developer",
  ogDescription: "Portofolio Junior Fullstack Developer",
  ogSiteName: "Iqbal Ramadan",
  ogType: "website",
  ogUrl: "https://iqbalramadan.my.id",
  ogImage: "https://iqbalramadan.my.id/logo.svg",
  ogLocale: "id_ID",
})

onMounted(() => {
  window.addEventListener("scroll", () => {
    const scrollPosition =
      window.scrollY ||
      window.scrollTop ||
      document.getElementsByTagName("html")[0].scrollTop;

    if (scrollPosition >= document.getElementById("fourth").offsetTop) {
      navStore().setActive(4);
    } else if (scrollPosition >= document.getElementById("third").offsetTop) {
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
