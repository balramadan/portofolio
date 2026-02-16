<template>
  <div
    id="experience"
    class="relative z-0 bg-primary py-24 px-6 sm:px-12 lg:px-24 overflow-hidden"
  >
    <!-- Premium Background Effects -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div
        class="absolute top-[30%] -left-[10%] w-[60%] h-[60%] bg-bright/10 blur-[150px] rounded-full mix-blend-screen animate-float"
      ></div>
      <div
        class="absolute bottom-[20%] -right-[5%] w-[50%] h-[50%] bg-grass/5 blur-[120px] rounded-full mix-blend-screen"
      ></div>
      <!-- Subtle Grid Overlay -->
      <div
        class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"
      ></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <!-- Section Header -->
      <div
        id="experience-header"
        class="flex flex-col items-center mb-16 sm:mb-20 opacity-0 translate-y-12"
      >
        <span
          class="text-bright text-xs font-mono tracking-[0.3em] uppercase mb-4"
          >My Journey</span
        >
        <h2
          class="text-3xl sm:text-5xl lg:text-6xl font-black text-light font-inter mb-6 tracking-tight text-center"
        >
          Work Experience
        </h2>
        <div class="flex items-center gap-3">
          <div
            class="h-[2px] w-12 bg-gradient-to-r from-transparent to-bright"
          ></div>
          <div
            class="w-2 h-2 rounded-full bg-bright shadow-[0_0_10px_#00ffff]"
          ></div>
          <div
            class="h-[2px] w-12 bg-gradient-to-l from-transparent to-bright"
          ></div>
        </div>
      </div>

      <!-- Compact Modern Timeline -->
      <div class="relative">
        <!-- Connecting Line with Glow -->
        <div
          class="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-bright/80 via-grass/50 to-transparent sm:transform sm:-translate-x-1/2 opacity-20"
        ></div>

        <!-- Animated Scroll Line -->
        <div
          id="scroll-line"
          class="absolute left-6 sm:left-1/2 top-0 w-[2px] bg-bright shadow-[0_0_15px_#00ffff] sm:transform sm:-translate-x-1/2 opacity-40 z-20 origin-top h-0"
        ></div>

        <div class="space-y-4 sm:space-y-4">
          <div
            v-for="(job, index) in experiences"
            :key="index"
            :class="[
              'experience-item group relative flex flex-col sm:flex-row items-center justify-between opacity-0',
              index % 2 === 0 ? 'sm:flex-row-reverse' : '',
            ]"
          >
            <!-- Timeline Node Indicator -->
            <div
              class="absolute left-6 sm:left-1/2 w-3 h-3 rounded-full bg-primary border border-bright/50 z-30 transform -translate-x-1/2 shadow-[0_0_8px_rgba(0,255,255,0.3)] group-hover:bg-bright group-hover:scale-150 group-hover:shadow-[0_0_15px_#00ffff] transition-all duration-500"
            ></div>

            <!-- Content Card: Ultra Modern Glass -->
            <div class="w-full sm:w-[46%] pl-12 sm:pl-0">
              <div
                class="experience-card group relative bg-secondary/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-secondary/20 hover:border-bright/40 transition-all duration-500 hover:-translate-y-2"
              >
                <!-- Highlight Glow -->
                <div
                  class="absolute -top-px -left-px w-20 h-20 bg-gradient-to-br from-bright/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                <div class="flex flex-col gap-6">
                  <!-- Top Row: Logo & Date -->
                  <div class="flex items-center justify-between gap-4">
                    <div
                      class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-bright/20 transition-all duration-500"
                    >
                      <div
                        :class="[
                          job.icon,
                          'text-xl sm:text-2xl text-bright/80 group-hover:text-bright',
                        ]"
                      ></div>
                    </div>
                    <div
                      class="text-[10px] sm:text-xs font-mono text-light/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 whitespace-nowrap"
                    >
                      {{ job.period }}
                    </div>
                  </div>

                  <!-- Info Row -->
                  <div>
                    <h3
                      class="text-xl sm:text-2xl font-bold text-light font-inter tracking-tight mb-2 group-hover:text-white"
                    >
                      {{ job.role }}
                    </h3>
                    <p
                      class="text-bright font-medium text-xs sm:text-sm tracking-wide"
                    >
                      {{ job.company }}
                      <span class="text-light/20 mx-2">|</span> {{ job.type }}
                    </p>
                  </div>

                  <!-- Tasks List -->
                  <div class="space-y-3 py-4 border-y border-white/5">
                    <div
                      v-for="(desc, i) in job.description"
                      :key="i"
                      class="flex items-start gap-3"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-bright/40 mt-1.5 shrink-0 group-hover:bg-bright transition-colors"
                      ></span>
                      <p
                        class="text-light/60 text-xs sm:text-sm leading-relaxed group-hover:text-light/80"
                      >
                        {{ desc }}
                      </p>
                    </div>
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="skill in job.skills"
                      :key="skill"
                      class="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded-md bg-black/40 text-light/50 border border-white/5 hover:border-bright/30 hover:text-bright transition-all duration-300"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Spacer for Desktop -->
            <div class="hidden sm:block w-[46%]"></div>
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

const experiences = [
  {
    role: "Assist HPIT in Internal Development",
    company: "PT Kereta Cepat Indonesia China",
    type: "Internship",
    period: "Dec 2025 - Present",
    icon: "i-carbon-api",
    description: [
      "Orchestrated a Frequent User System, automating critical internal workflows.",
      "Architected high-performance backend layers with Elysia JS & Bun.",
      "Optimized data architectures using Prisma ORM and PostgreSQL clusters.",
    ],
    skills: ["Elysia JS", "Bun", "PostgreSQL", "System Arch"],
  },
  {
    role: "Volunteer Staff",
    company: "MNC GROUP",
    type: "Freelance",
    period: "Dec 2024 - May 2025",
    icon: "i-carbon-flash",
    description: [
      "Precision management of studio audio infrastructures.",
      "Operational control of complex lighting and electrical field systems.",
    ],
    skills: ["AV Eng", "Hardware", "Live Operations"],
  },
  {
    role: "SEO & CMS Management",
    company: "PT Media Wanita Gemilang",
    type: "Internship",
    period: "Sep 2024 - Dec 2024",
    icon: "i-carbon-chart-win-loss",
    description: [
      "Deployed strategic SEO frameworks generating measurable rank improvements.",
      "Customized and maintained high-traffic Wordpress ecosystems.",
    ],
    skills: ["SEO", "Conversion", "CMS Ops"],
  },
  {
    role: "Graphic Designer",
    company: "Jakarta Printer Jaya",
    type: "Internship",
    period: "Oct 2019 - Dec 2019",
    icon: "i-carbon-pen-fountain",
    description: [
      "Produced premium visual assets for cross-platform printing production.",
      "Mastered end-to-end technical print manufacturing workflows.",
    ],
    skills: ["Visual Design", "Pre-press", "Technical Print"],
  },
];

onMounted(() => {
  // Line Draw Animation
  gsap.to("#scroll-line", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: "#experience",
      start: "top 20%",
      end: "bottom 80%",
      scrub: 1,
    },
  });

  // Header Animation
  gsap.to("#experience-header", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#experience-header",
      start: "top 90%",
    },
  });

  // Items Animation
  experiences.forEach((_, index) => {
    gsap.fromTo(
      `.experience-item:nth-child(${index + 1})`,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: `.experience-item:nth-child(${index + 1})`,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.05);
  }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.font-inter {
  font-family: "Inter", sans-serif;
}
.font-lato {
  font-family: "Lato", sans-serif;
}
</style>
