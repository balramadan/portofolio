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

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import First from "@/components/Hero/First.vue";
import Second from "@/components/Hero/Second.vue";
import TechStack from "@/components/Hero/TechStack.vue";
import Third from "@/components/Hero/Third.vue";
import Project from "@/components/Hero/Project.vue";
import Certification from "@/components/Hero/Certification.vue";
import Fourth from "@/components/Hero/Fourth.vue";

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
