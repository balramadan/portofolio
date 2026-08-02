<template>
  <div class="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none">
    <div
      class="h-full bg-gradient-to-r from-bright via-grass to-bright origin-left transition-transform duration-75 ease-out"
      :style="{ transform: `scaleX(${progress})` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useWindowScroll, useWindowSize } from "@vueuse/core";

const { y: scrollY } = useWindowScroll();
const { height: windowHeight } = useWindowSize();
const docHeight = ref(0);

function updateDocHeight() {
  if (typeof document !== "undefined") {
    docHeight.value = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }
}

let resizeObserver = null;

onMounted(() => {
  updateDocHeight();
  window.addEventListener("scroll", updateDocHeight, { passive: true });
  window.addEventListener("resize", updateDocHeight, { passive: true });

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(updateDocHeight);
    resizeObserver.observe(document.body);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateDocHeight);
  window.removeEventListener("resize", updateDocHeight);
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

const progress = computed(() => {
  const scrollable = docHeight.value - windowHeight.value;
  if (scrollable <= 0) return 0;
  return Math.min(Math.max(scrollY.value / scrollable, 0), 1);
});
</script>

<style scoped></style>
