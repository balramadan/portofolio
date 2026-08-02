<template>
  <div
    id="loader-root"
    class="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center overflow-hidden"
  >
    <!-- Background glow -->
    <div
      class="absolute w-96 h-96 bg-bright/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"
    ></div>

    <!-- Center Content -->
    <div class="relative z-10 flex flex-col items-center gap-6">
      <!-- Logo -->
      <div
        id="loader-logo"
        class="w-24 h-24 p-6 rounded-full overflow-hidden p-1 shadow-[0_0_20px_rgba(249,115,0,0.3)]"
      >
        <img
          src="/logo.webp"
          alt="Iqbal Ramadan"
          class="w-full h-full object-cover rounded-full"
        />
      </div>

      <!-- Character Stagger Name -->
      <h1
        class="text-2xl sm:text-4xl font-bold font-jakarta text-light tracking-tight flex overflow-hidden"
      >
        <span
          v-for="(char, index) in nameChars"
          :key="index"
          class="loader-char inline-block"
          :class="char === ' ' ? 'w-2 sm:w-3' : ''"
        >
          {{ char === " " ? "&nbsp;" : char }}
        </span>
      </h1>
    </div>

    <!-- Bottom Progress Bar -->
    <div
      id="loader-progress"
      class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-bright via-grass to-bright w-0"
    ></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

const emit = defineEmits(["done"]);

const nameText = "Iqbal Ramadan";
const nameChars = nameText.split("");

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      emit("done");
    },
  });

  // Logo animation
  tl.from("#loader-logo", {
    scale: 0.6,
    opacity: 0,
    duration: 0.5,
    ease: "back.out(1.7)",
  });

  // Characters stagger animation
  tl.from(
    ".loader-char",
    {
      y: 30,
      opacity: 0,
      duration: 0.05,
      stagger: 0.04,
      ease: "power2.out",
    },
    "-=0.2",
  );

  // Progress bar fill
  tl.to(
    "#loader-progress",
    {
      width: "100%",
      duration: 1.2,
      ease: "power2.inOut",
    },
    "-=0.3",
  );

  // Root exit fade out
  tl.to("#loader-root", {
    opacity: 0,
    scale: 1.05,
    duration: 0.5,
    ease: "power3.inOut",
  });
});
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
