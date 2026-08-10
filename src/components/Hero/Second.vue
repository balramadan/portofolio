<template>
  <div
    id="second"
    class="min-h-screen flex items-center justify-center py-20 bg-primary overflow-hidden relative z-0"
  >
    <!-- Background Elements -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <div
        class="absolute top-[10%] -right-[5%] w-[40%] h-[40%] bg-bright/5 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow"
      ></div>
      <div
        class="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-grass/5 blur-[100px] rounded-full mix-blend-screen"
      ></div>
    </div>

    <div class="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Image Column (Right on Desktop) -->
        <div
          class="relative group order-first lg:order-last flex justify-center lg:justify-end"
        >
          <div class="relative w-64 sm:w-80 lg:w-96 aspect-square">
            <!-- Decorative Border/Glow -->
            <div
              class="absolute inset-0 bg-gradient-to-tr from-bright via-grass to-bright rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
            ></div>

            <!-- Image Container -->
            <div
              class="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-bright/40 transition-colors duration-500 shadow-2xl"
            >
              <div
                class="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"
              ></div>
              <img
                src="/potrait.jpeg"
                alt="Iqbal Ramadan"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
                width="400"
                height="400"
              />
            </div>

            <!-- Floating Card 1: Experience (Top Right) -->
            <div
              class="absolute -top-4 -right-4 glass-card px-4 py-3 shadow-xl z-20 hidden sm:flex items-center gap-3 border border-white/15 animate-float-slow"
            >
              <div class="p-2 rounded-xl bg-bright/10 text-bright">
                <div class="i-carbon-code text-xl"></div>
              </div>
              <div>
                <div
                  class="text-[10px] text-light/50 font-mono uppercase tracking-wider"
                >
                  Role
                </div>
                <div class="text-xs text-light font-bold font-jakarta">
                  Fullstack Dev
                </div>
              </div>
            </div>

            <!-- Floating Card 2: Projects (Bottom Left) -->
            <div
              class="absolute -bottom-4 -left-4 glass-card px-4 py-3 shadow-xl z-20 flex items-center gap-3 border border-white/15"
            >
              <div class="p-2 rounded-xl bg-bright/10 text-bright">
                <div class="i-carbon-cube text-xl"></div>
              </div>
              <div>
                <div
                  class="text-[10px] text-light/50 font-mono uppercase tracking-wider"
                >
                  Projects
                </div>
                <div class="text-xs text-light font-bold font-jakarta">
                  10+ Built
                </div>
              </div>
            </div>

            <!-- Floating Card 3: Graduate (Bottom Right) -->
            <!-- <div
              class="absolute -bottom-4 right-6 glass-card px-4 py-3 shadow-xl z-20 hidden sm:flex items-center gap-3 border border-white/15"
            >
              <div class="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <div class="i-carbon-education text-xl"></div>
              </div>
              <div>
                <div class="text-[10px] text-light/50 font-mono uppercase tracking-wider">Education</div>
                <div class="text-xs text-light font-bold font-jakarta">Class of 2026</div>
              </div>
            </div> -->
          </div>
        </div>

        <!-- Text Column (Left on Desktop) -->
        <div class="flex flex-col items-start text-left">
          <!-- Section Header -->
          <div
            id="bio-header"
            class="flex flex-col items-start mb-8 opacity-0 translate-y-8"
          >
            <span class="section-label mb-2">About Me</span>
            <div class="flex items-center gap-4">
              <h2
                class="text-3xl sm:text-5xl font-bold text-light font-jakarta tracking-tight"
              >
                Who I Am
              </h2>
              <div
                class="h-[2px] w-16 bg-gradient-to-r from-bright to-transparent rounded-full"
              ></div>
            </div>
          </div>

          <!-- Bio Content -->
          <div
            id="bio-content"
            class="space-y-4 text-light/80 text-base sm:text-lg leading-relaxed font-lato opacity-0 translate-y-8"
          >
            <p>
              Hello! I'm
              <span class="text-bright font-bold">Iqbal Ramadan</span>, an
              enthusiastic
              <span
                class="bg-bright/10 text-bright font-semibold px-2 py-0.5 rounded border border-bright/20 inline-block"
              >
                Fullstack Developer
              </span>
              based in Indonesia. I recently graduated from
              <span class="text-light font-medium italic"
                >Bina Sarana Informatika University</span
              >
              with a degree in Information Technology.
            </p>

            <p>
              My journey in web development has led me to build various
              projects, from high-converting landing pages to complex
              progressive web applications. I thrive on turning ideas into
              reality through clean, maintainable code and intuitive user
              interfaces.
            </p>

            <p>
              Currently, I'm expanding my horizons into
              <span
                class="bg-grass/15 text-grass font-semibold px-2 py-0.5 rounded border border-grass/30 inline-block"
              >
                mobile development </span
              >. I believe in continuous learning and am always eager to
              collaborate with team members to create impactful digital
              solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#second",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  tl.to("#bio-header", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  }).to(
    "#bio-content",
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    },
    "-=0.5",
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
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
