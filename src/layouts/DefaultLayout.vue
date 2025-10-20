<template>
  <Header />
  <main class="font-inter">
    <slot></slot>
  </main>
  <Footer />
</template>
<script setup lang="js">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>
<style></style>
