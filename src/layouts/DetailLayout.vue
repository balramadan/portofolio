<template>
  <ScrollProgress />
  <CustomCursor />
  <TerminalOverlay />
  <TerminalToggleBtn />

  <!-- Modern Floating Back Button -->
  <header class="fixed top-6 left-6 z-50">
    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface/90 backdrop-blur-md border border-white/15 text-light/80 hover:text-bright hover:border-bright/50 hover:shadow-[0_0_20px_rgba(249,115,0,0.2)] transition-all duration-300 font-mono text-xs shadow-xl group"
      aria-label="Back to Home"
    >
      <div
        class="i-carbon-arrow-left text-base group-hover:-translate-x-1 transition-transform"
      ></div>
      <span class="font-bold">Back to Home</span>
    </RouterLink>
  </header>

  <main class="font-jakarta">
    <slot></slot>
  </main>
  <Footer />
</template>

<script setup lang="js">
import Footer from "@/components/Footer.vue";
import CustomCursor from "@/components/ui/CustomCursor.vue";
import ScrollProgress from "@/components/ui/ScrollProgress.vue";
import TerminalOverlay from "@/components/ui/TerminalOverlay.vue";
import TerminalToggleBtn from "@/components/ui/TerminalToggleBtn.vue";
import { useSmoothScroll } from "@/composables/useSmoothScroll";

// Inisialisasi Lenis Smooth Scroll untuk sub-pages
useSmoothScroll();
</script>

<style scoped></style>
