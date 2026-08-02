<template>
  <TerminalOverlay />
  <TerminalToggleBtn />
  <ScrollProgress />
  <CustomCursor />
  <Loading v-if="!isLoaderDone" @done="handleLoaderDone" />
  <Header />
  <main class="font-jakarta">
    <slot></slot>
  </main>
  <Footer />
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/components/Loading.vue";
import CustomCursor from "@/components/ui/CustomCursor.vue";
import ScrollProgress from "@/components/ui/ScrollProgress.vue";
import TerminalOverlay from "@/components/ui/TerminalOverlay.vue";
import TerminalToggleBtn from "@/components/ui/TerminalToggleBtn.vue";
import { useTerminalStore } from "@/stores/terminal";
import { useSmoothScroll } from "@/composables/useSmoothScroll";

const isLoaderDone = ref(false);
const terminal = useTerminalStore();

// Inisialisasi Lenis Smooth Scroll
const smoothScroll = useSmoothScroll();

function handleLoaderDone() {
  isLoaderDone.value = true;
  window.scrollTo(0, 0);

  const lenis = smoothScroll.getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }
}

function handleGlobalKeydown(e) {
  if (e.ctrlKey && e.key === "`") {
    e.preventDefault();
    terminal.toggle();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
});
</script>

<style></style>
