<template lang="">
  <div class="">
    <Header />
    <First />
    <Second />
    <Third />
    <Fourth />
    <Footer />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { navStore } from "@/stores/nav";

import Header from "@/components/Header.vue";
import First from "@/components/Hero/First.vue";
import Second from "@/components/Hero/Second.vue";
import Third from "@/components/Hero/Third.vue";
import Fourth from "@/components/Hero/Fourth.vue";
import Footer from "@/components/Footer.vue";

onMounted(() => {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;

    if (scrollPosition >= document.getElementById('fourth').offsetTop) {
      navStore().setActive(4);
    } else if (scrollPosition >= document.getElementById('third').offsetTop) {
      navStore().setActive(3);
    } else if (scrollPosition >= document.getElementById('second').offsetTop) {
      navStore().setActive(2);
    } else {
      navStore().setActive(1);
    }
  })
})
</script>
<style lang=""></style>
