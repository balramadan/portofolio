<template>
  <Teleport to="body">
    <template v-if="isVisible">
      <!-- Cursor Dot -->
      <div
        id="cursor-dot"
        class="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-bright pointer-events-none z-[9998] transition-transform duration-75 shadow-[0_0_10px_#F97300]"
        :style="{
          transform: `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`,
        }"
      ></div>

      <!-- Cursor Ring -->
      <div
        id="cursor-ring"
        class="fixed top-0 left-0 rounded-full border border-bright/60 pointer-events-none z-[9997] transition-all duration-150 ease-out"
        :class="[
          isHovered
            ? 'w-12 h-12 bg-bright/10 border-bright scale-100'
            : 'w-8 h-8 bg-transparent',
        ]"
        :style="{
          transform: `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`,
        }"
      ></div>
    </template>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const isVisible = ref(false);
const isHovered = ref(false);

const dotX = ref(-100);
const dotY = ref(-100);
const ringX = ref(-100);
const ringY = ref(-100);

let mouseX = -100;
let mouseY = -100;
let tickerFunction = null;

function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dotX.value = mouseX;
  dotY.value = mouseY;
}

function handleMouseOver(e) {
  const target = e.target;
  if (
    target &&
    (target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      target.getAttribute("role") === "button" ||
      target.classList.contains("cursor-pointer"))
  ) {
    isHovered.value = true;
  } else {
    isHovered.value = false;
  }
}

onMounted(() => {
  if (window.matchMedia("(pointer: fine)").matches) {
    isVisible.value = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    ringX.value = mouseX;
    ringY.value = mouseY;

    tickerFunction = () => {
      ringX.value += (mouseX - ringX.value) * 0.2;
      ringY.value += (mouseY - ringY.value) * 0.2;
    };

    gsap.ticker.add(tickerFunction);
  }
});

onUnmounted(() => {
  if (isVisible.value) {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseover", handleMouseOver);
    if (tickerFunction) {
      gsap.ticker.remove(tickerFunction);
    }
  }
});
</script>

<style scoped></style>
