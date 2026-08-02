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
          class="flex items-center gap-2.5 mb-8 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit opacity-0 translate-y-4"
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
          class="flex items-center gap-3 mb-6 overflow-hidden opacity-0 translate-y-4"
        >
          <div class="h-[1px] w-12 bg-bright"></div>
          <span class="text-bright font-mono text-base sm:text-lg tracking-wide"
            >Hi, my name is</span
          >
        </div>

        <!-- Name -->
        <div class="overflow-hidden mb-2">
          <h1
            id="hero-name"
            class="text-5xl sm:text-7xl lg:text-8xl font-bold text-light font-jakarta tracking-tight leading-tight opacity-0 translate-y-8"
          >
            Iqbal Ramadan.
          </h1>
        </div>

        <!-- Tagline -->
        <div class="mb-8">
          <h2
            id="hero-tagline"
            class="text-3xl sm:text-5xl lg:text-6xl font-bold text-light/40 font-jakarta tracking-tight opacity-0 translate-y-10"
          >
            I build things for the
            <span class="relative text-bright inline-block">
              web.
              <span
                class="absolute bottom-1 left-0 right-0 h-1 bg-bright/80 rounded-full"
              ></span>
            </span>
          </h2>
        </div>

        <!-- Description -->
        <p
          id="hero-desc"
          class="text-light/80 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-lato opacity-0 translate-y-6"
        >
          I'm a software engineer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I am focusing
          on expanding my knowledge in fullstack and mobile application
          development.
        </p>

        <!-- Dual CTA Buttons -->
        <div
          id="hero-cta"
          class="flex flex-wrap items-center gap-4 opacity-0 translate-y-4"
        >
          <a
            href="#third"
            class="group relative inline-flex items-center justify-center px-8 py-3.5 font-jakarta font-bold text-white bg-bright rounded-full hover:bg-bright/90 hover:shadow-[0_0_30px_rgba(249,115,0,0.4)] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-bright/20"
          >
            <span>Explore Projects</span>
            <div
              class="i-carbon-arrow-down ml-2 group-hover:translate-y-1 transition-transform duration-300"
            ></div>
          </a>

          <a
            href="mailto:mail@helloiqbal.me"
            class="group inline-flex items-center justify-center px-8 py-3.5 font-jakarta font-semibold text-light border border-white/15 rounded-full hover:border-bright/50 hover:text-bright hover:bg-white/5 transition-all duration-300 glass-card"
          >
            <span>Let's Connect</span>
            <div
              class="i-carbon-email ml-2 text-lg group-hover:scale-110 transition-transform duration-300"
            ></div>
          </a>
        </div>

        <!-- Stat Counters -->
        <div
          id="hero-stats"
          class="grid grid-cols-3 gap-6 sm:gap-10 mt-14 max-w-md border-t border-white/10 pt-8 opacity-0 translate-y-6"
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

    <!-- Scroll Indicator -->
    <div
      id="scroll-indicator"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 pointer-events-none"
    >
      <span
        class="text-[10px] font-mono text-light/40 tracking-[0.25em] uppercase"
        >Scroll</span
      >
      <div
        class="w-[1px] h-10 bg-gradient-to-b from-bright via-bright/50 to-transparent"
      ></div>
    </div>

    <!-- Social Links (Fixed Left Side Sidebar) -->
    <div
      class="fixed hidden lg:flex flex-col items-center gap-5 bottom-0 left-8 z-[90] after:content-[''] after:w-[1px] after:h-20 after:bg-bright/30 after:mt-4"
    >
      <a
        href="mailto:mail@helloiqbal.me"
        class="p-2 text-light/60 hover:text-bright hover:-translate-y-1 transition-all duration-300"
        aria-label="Email"
      >
        <div class="i-carbon-email text-xl"></div>
      </a>
      <a
        href="https://github.com/balramadan"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2 text-light/60 hover:text-bright hover:-translate-y-1 transition-all duration-300"
        aria-label="GitHub"
      >
        <div class="i-carbon-logo-github text-xl"></div>
      </a>
      <a
        href="https://linkedin.com/in/balramadan"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2 text-light/60 hover:text-bright hover:-translate-y-1 transition-all duration-300"
        aria-label="LinkedIn"
      >
        <div class="i-carbon-logo-linkedin text-xl"></div>
      </a>
    </div>

    <!-- Email (Fixed Right Side Sidebar)
    <div
      class="fixed hidden lg:flex flex-col items-center gap-2 bottom-0 right-8 z-[90] after:content-[''] after:w-[1px] after:h-20 after:bg-bright/30 after:mt-4"
    >
      <a
        href="mailto:mail@helloiqbal.me"
        class="writing-vertical-rl text-light/60 font-mono text-xs tracking-widest hover:text-bright hover:-translate-y-1 transition-all duration-300 py-2"
      >
        mail@helloiqbal.me
      </a>
    </div> -->
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
  years: 0,
  projects: 0,
  certs: 0,
});

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to("#hero-badge", { y: 0, opacity: 1, duration: 0.6, delay: 0.1 })
    .to("#hero-intro", { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
    .to("#hero-name", { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
    .to("#hero-tagline", { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
    .to("#hero-desc", { y: 0, opacity: 1, duration: 0.6 }, "-=0.5")
    .to("#hero-cta", { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
    .to(
      "#hero-stats",
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        onStart: () => {
          gsap.to(stats, {
            years: 1,
            projects: 10,
            certs: 5,
            duration: 1.5,
            ease: "power2.out",
          });
        },
      },
      "-=0.4",
    )
    .to("#scroll-indicator", { opacity: 1, duration: 0.8 }, "-=0.2");
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
