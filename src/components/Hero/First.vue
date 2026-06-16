<template>
  <div
    id="first"
    class="relative bg-primary min-h-[calc(100vh-5rem)] md:min-h-screen flex items-center justify-center overflow-hidden z-0"
  >
    <!-- Background Elements -->
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

    <!-- Main Content -->
    <div
      class="container mx-auto px-5 sm:px-12 lg:px-0 relative z-0 flex flex-col lg:flex-row items-center lg:items-start justify-center h-full"
    >
      <div
        class="flex flex-col items-start justify-center w-full lg:w-3/4 xl:w-2/3 pt-20 lg:pt-10"
      >
        <!-- Intro -->
        <div
          id="hero-intro"
          class="flex items-center gap-3 mb-6 overflow-hidden"
        >
          <div class="h-[1px] w-12 bg-bright"></div>
          <span class="text-bright font-mono text-lg tracking-wide"
            >Hi, my name is</span
          >
        </div>

        <!-- Name -->
        <div class="overflow-hidden mb-2">
          <h1
            id="hero-name"
            class="text-5xl sm:text-7xl lg:text-8xl font-bold text-light font-inter tracking-tight leading-tight"
          >
            Iqbal Ramadan.
          </h1>
        </div>

        <!-- Tagline -->
        <div class="mb-10">
          <h2
            id="hero-tagline"
            class="text-4xl sm:text-6xl lg:text-7xl font-bold text-secondary font-inter tracking-tight"
          >
            I build things for the web.
          </h2>
        </div>

        <!-- Description -->
        <p
          id="hero-desc"
          class="text-light/90 text-lg sm:text-xl max-w-2xl leading-relaxed mb-12 font-lato"
        >
          I’m a software engineer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I am focusing
          on studying mobile development to expand my knowledge.
        </p>

        <!-- CTA Button -->
        <div id="hero-cta" class="opacity-0 translate-y-4">
          <a
            href="#third"
            class="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-bright border border-bright rounded hover:bg-bright/10 transition-all duration-300"
          >
            <span>Check what I've done</span>
            <div
              class="absolute inset-0 border border-bright rounded scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"
            ></div>
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      id="scroll-indicator"
      class="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
    >
      <span class="text-xs font-mono text-light/50 tracking-widest uppercase"
        >Scroll</span
      >
      <div
        class="w-[1px] h-12 bg-gradient-to-b from-bright to-transparent"
      ></div>
    </div>

    <!-- Social Links (Fixed Side) -->
    <!-- <div
      class="fixed hidden lg:flex flex-col items-center gap-6 bottom-0 left-12 z-100 after:content-[''] after:w-[1px] after:h-24 after:bg-light/40 after:mt-6"
    >
      <a
        href="mailto:mail@helloiqbal.me"
        class="text-light/60 hover:text-bright hover:-translate-y-1 transition-all duration-300"
      >
        <div class="i-carbon-email text-2xl"></div>
      </a>
      <a
        href="https://github.com/iqbalramadan"
        target="_blank"
        class="text-light/60 hover:text-bright hover:-translate-y-1 transition-all duration-300"
      >
        <div class="i-carbon-logo-github text-2xl"></div>
      </a>
      <a
        href="https://linkedin.com/in/iqbalramadan"
        target="_blank"
        class="text-light/60 hover:text-bright hover:-translate-y-1 transition-all duration-300"
      >
        <div class="i-carbon-logo-linkedin text-2xl"></div>
      </a>
    </div> -->

    <!-- Email (Fixed Side) -->
    <div
      class="fixed z-999 hidden lg:flex flex-col items-center gap-2 bottom-0 right-12 z-100 after:content-[''] after:w-[1px] after:h-24 after:bg-light/40 after:mt-6"
    >
      <a
        href="mailto:mail@helloiqbal.me"
        class="writing-vertical-rl text-light/60 font-mono text-sm tracking-widest hover:text-bright hover:-translate-y-1 transition-all duration-300"
      >
        mail@helloiqbal.me
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from("#hero-intro", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
  })
    .from(
      "#hero-name",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.6",
    )
    .from(
      "#hero-tagline",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.6",
    )
    .from(
      "#hero-desc",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.6",
    )
    .to(
      "#hero-cta",
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
      "-=0.4",
    )
    .to("#scroll-indicator", {
      opacity: 1,
      duration: 1,
      delay: 0.5,
    });
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
