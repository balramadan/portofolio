<template>
  <DetailLayout>
    <template #default>
      <div
        class="bg-primary min-h-screen px-5 sm:px-10 py-24 flex flex-col justify-center items-center relative overflow-hidden"
      >
        <!-- Background Orbs -->
        <div
          class="absolute top-1/4 left-1/4 w-96 h-96 bg-bright/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-grass/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"
        ></div>

        <!-- Glassmorphic Card -->
        <div
          class="relative z-10 glass-card p-8 sm:p-14 rounded-3xl border border-white/10 max-w-lg text-center shadow-2xl space-y-6"
        >
          <div
            class="w-16 h-16 mx-auto rounded-2xl bg-bright/10 border border-bright/20 flex items-center justify-center text-bright"
          >
            <div class="i-carbon-tools text-3xl animate-bounce"></div>
          </div>

          <div>
            <h1
              class="text-3xl sm:text-5xl font-bold text-light font-jakarta tracking-tight mb-3"
            >
              Under Construction
            </h1>
            <p class="text-light/70 font-lato text-sm sm:text-base leading-relaxed">
              This feature or page is currently undergoing maintenance and improvements.
              Check back soon for updates!
            </p>
          </div>

          <div class="pt-4">
            <RouterLink
              to="/"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bright text-white font-jakarta font-bold text-sm hover:bg-bright/90 hover:shadow-[0_0_25px_rgba(249,115,0,0.4)] transition-all duration-300 shadow-lg shadow-bright/20"
            >
              <div class="i-carbon-arrow-left text-lg"></div>
              <span>Return to Portfolio</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </template>
  </DetailLayout>
</template>

<script setup>
import DetailLayout from "@/layouts/DetailLayout.vue";
import { useHead, useSeoMeta } from "@unhead/vue";

useHead({
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "shortcut icon", href: "/favicon.ico" },
  ],
});

useSeoMeta({
  title: "Coming Soon | Iqbal Ramadan",
  description: "Page under maintenance - Iqbal Ramadan Portfolio",
  robots: "noindex, nofollow",
});
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
