<template>
  <div
    id="first"
    ref="sectionRef"
    :style="spotlightStyle"
    class="relative bg-primary min-h-[calc(100vh-5rem)] md:min-h-screen flex items-center justify-center overflow-hidden z-0"
  >
    <!-- Background Glow Elements -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <div
        class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-bright/10 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"
      ></div>
      <div
        class="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-grass/10 blur-[100px] rounded-full mix-blend-screen"
      ></div>
    </div>

    <!-- Main Content Container -->
    <div
      class="container mx-auto px-5 sm:px-12 lg:px-0 relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center h-full"
    >
      <div
        class="flex flex-col items-start justify-center w-full lg:w-3/4 xl:w-2/3 pt-28 lg:pt-24 pb-10"
      >
        <!-- Live Status Badge -->
        <div
          id="hero-badge"
          class="flex items-center gap-2.5 mb-8 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit"
        >
          <span class="relative flex h-2.5 w-2.5">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"
            ></span>
          </span>
          <span
            class="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase"
          >
            Open for Opportunities
          </span>
        </div>

        <!-- Intro line -->
        <div
          id="hero-intro"
          class="flex items-center gap-3 mb-6 overflow-hidden"
        >
          <div class="h-[2px] w-8 bg-bright"></div>
          <span class="text-bright font-mono text-sm sm:text-base font-medium">
            Hi, my name is
          </span>
        </div>

        <!-- Name Title -->
        <div class="mb-4 overflow-hidden">
          <h1
            id="hero-name"
            class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-light font-jakarta tracking-tight"
          >
            Iqbal Ramadan.
          </h1>
        </div>

        <!-- Tagline -->
        <div class="mb-8">
          <h2
            id="hero-tagline"
            class="text-3xl sm:text-5xl lg:text-6xl font-bold text-light/40 font-jakarta tracking-tight"
          >
            I build things for the
            <span class="relative text-bright inline-block">
              web
              <span
                class="absolute bottom-1 left-0 w-full h-2 bg-bright/20 rounded-full blur-[2px]"
              ></span>
            </span>
          </h2>
        </div>

        <!-- Description -->
        <p
          id="hero-desc"
          class="text-light/80 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-lato"
        >
          I'm a software engineer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I am focusing
          on expanding my knowledge in fullstack and mobile application
          development.
        </p>

        <!-- Dual CTA Buttons -->
        <div
          id="hero-cta"
          class="flex flex-wrap items-center gap-4"
        >
          <a
            href="#third"
            class="group relative inline-flex items-center justify-center px-8 py-3.5 font-jakarta font-bold text-white bg-bright rounded-full hover:bg-bright/90 hover:shadow-[0_0_30px_rgba(249,115,0,0.4)] transition-all duration-300 shadow-lg shadow-bright/20"
          >
            <span>Check out my work!</span>
            <div
              class="i-carbon-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
            ></div>
          </a>

          <a
            href="#experience"
            class="inline-flex items-center justify-center px-6 py-3.5 font-jakarta font-semibold text-light/80 hover:text-bright border border-white/10 hover:border-bright/50 rounded-full bg-surface/50 backdrop-blur-md transition-all duration-300"
          >
            <span>View Experience</span>
          </a>
        </div>

        <!-- Stat Counters -->
        <div
          id="hero-stats"
          class="grid grid-cols-3 gap-6 sm:gap-10 mt-14 max-w-md border-t border-white/10 pt-8"
        >
          <div class="flex flex-col">
            <span class="text-2xl sm:text-3xl font-bold text-bright font-mono">
              {{ stats.years.toFixed(0) }}+
            </span>
            <span class="text-xs text-light/50 font-lato mt-1">Years Exp.</span>
          </div>

          <div class="flex flex-col">
            <span class="text-2xl sm:text-3xl font-bold text-bright font-mono">
              {{ stats.projects.toFixed(0) }}+
            </span>
            <span class="text-xs text-light/50 font-lato mt-1"
              >Projects Built</span
            >
          </div>

          <div class="flex flex-col">
            <span class="text-2xl sm:text-3xl font-bold text-bright font-mono">
              {{ stats.certs.toFixed(0) }}+
            </span>
            <span class="text-xs text-light/50 font-lato mt-1"
              >Certifications</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Down Indicator -->
    <div
      id="scroll-indicator"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span
        class="text-[10px] font-mono text-light/40 tracking-[0.25em] uppercase"
        >Scroll</span
      >
      <div
        class="w-5 h-8 rounded-full border-2 border-light/20 flex justify-center p-1"
      >
        <div
          class="w-1 h-2 bg-bright rounded-full animate-pulse-slow mt-0.5"
        ></div>
      </div>
    </div>

    <!-- Social Sidebar (Fixed Left Side Sidebar) -->
    <div
      class="fixed hidden lg:flex flex-col items-center gap-4 bottom-0 left-8 z-[90] after:content-[''] after:w-[1px] after:h-20 after:bg-bright/30 after:mt-4"
    >
      <a
        href="https://github.com/balramadan"
        target="_blank"
        rel="noopener noreferrer"
        class="text-light/60 hover:text-bright hover:-translate-y-1 transition-all duration-300 text-xl"
        aria-label="GitHub"
      >
        <div class="i-carbon-logo-github"></div>
      </a>
      <a
        href="https://linkedin.com/in/balramadan"
        target="_blank"
        rel="noopener noreferrer"
        class="text-light/60 hover:text-bright hover:-translate-y-1 transition-all duration-300 text-xl"
        aria-label="LinkedIn"
      >
        <div class="i-carbon-logo-linkedin"></div>
      </a>
      <a
        href="https://instagram.com/balramadan"
        target="_blank"
        rel="noopener noreferrer"
        class="text-light/60 hover:text-bright hover:-translate-y-1 transition-all duration-300 text-xl"
        aria-label="Instagram"
      >
        <div class="i-carbon-logo-instagram"></div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursorSpotlight } from "@/composables/useCursorSpotlight";

const sectionRef = ref(null);
const { spotlightStyle } = useCursorSpotlight(sectionRef);

const stats = reactive({
  years: 1,
  projects: 10,
  certs: 5,
});

onMounted(() => {
  // Hanya jalankan transisi counter angka ringan tanpa menahan opacity teks Hero
  gsap.from(stats, {
    years: 0,
    projects: 0,
    certs: 0,
    duration: 1.2,
    ease: "power2.out",
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf(stats);
});
</script>

<style scoped>
.writing-vertical-rl {
  writing-mode: vertical-rl;
}

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
