<template>
  <header class="bg-primary px-5 sm:px-30 py-5">
    <RouterLink to="/" class="text-white flex items-center gap-2"
      ><div
        class="i-carbon:chevron-left size-5 text-white/60 hover:text-white transition-all ease-in-out duration-300"
      />
      Kembali</RouterLink
    >
  </header>
  <main class="font-inter">
    <slot></slot>
  </main>
  <Footer />
</template>
<script setup lang="js">
import Footer from '@/components/Footer.vue';
</script>
<style></style>
