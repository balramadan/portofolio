<template>
  <div
    id="second"
    class="min-h-screen flex items-center justify-center py-20 bg-primary overflow-hidden z-0"
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

    <div class="container mx-auto px-6 sm:px-12 lg:px-20 relative z-0">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Image Column (Left on Desktop) -->
        <div
          class="relative group order-first lg:order-last flex justify-center lg:justify-end"
        >
          <div class="relative w-64 sm:w-80 lg:w-96 aspect-square">
            <!-- Decorative Border/Glow -->
            <div
              class="absolute inset-0 bg-gradient-to-tr from-bright to-grass rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"
            ></div>

            <!-- Image Container -->
            <div
              class="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-bright/30 transition-colors duration-500"
            >
              <div
                class="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"
              ></div>
              <img
                src="/Foto-Bandung.jpg"
                alt="Iqbal Ramadan"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-out"
                loading="lazy"
                width="400"
                height="400"
              />
            </div>

            <!-- Floating Badge -->
            <div
              class="absolute -bottom-6 -left-6 bg-secondary/90 backdrop-blur border border-white/10 p-4 rounded-xl shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100"
            >
              <div class="flex items-center gap-3">
                <div class="i-carbon-code text-bright text-2xl"></div>
                <div>
                  <div class="text-xs text-light/60 font-mono">Experience</div>
                  <div class="text-sm text-light font-bold">Fullstack Dev</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Column (Right on Desktop) -->
        <div class="flex flex-col items-start text-left">
          <!-- Section Header -->
          <div
            id="bio-header"
            class="flex items-center gap-4 mb-8 opacity-0 translate-y-8"
          >
            <h2 class="text-3xl sm:text-4xl font-bold text-light font-inter">
              About Me
            </h2>
            <div
              class="h-[1px] w-20 bg-gradient-to-r from-bright to-transparent"
            ></div>
          </div>

          <!-- Bio Content -->
          <div
            id="bio-content"
            class="space-y-2 text-light/80 text-lg leading-relaxed font-lato opacity-0 translate-y-8"
          >
            <p>
              Hello! I'm
              <span class="text-bright font-semibold">Iqbal Ramadan</span>, an
              enthusiastic
              <span class="text-bright font-semibold">Fullstack Developer</span>
              based in Indonesia. I recently graduated from Bina Sarana
              Informatika University with a degree in Information Technology.
            </p>
            <p>
              My journey in web development has led me to build various
              projects, from high-converting landing pages to complex
              progressive web applications. I thrive on turning ideas into
              reality through clean, efficient code.
            </p>
            <p>
              Currently, I'm expanding my horizons into
              <span class="text-grass font-semibold">mobile development</span>.
              I believe in continuous learning and am always eager to
              collaborate with others to create impactful digital experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#second",
      start: "top 70%", // Animation starts when top of section hits 70% of viewport
      toggleActions: "play none none reverse",
    },
  });

  tl.to("#bio-header", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  })
    .to(
      "#bio-content",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    )
    .to(
      "#bio-skills",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );
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
