<template>
  <div
    id="experience"
    class="relative z-0 bg-primary py-24 px-6 sm:px-12 lg:px-24 overflow-hidden cv-auto"
  >
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div
        class="absolute top-[30%] -left-[10%] w-[60%] h-[60%] bg-bright/10 blur-[150px] rounded-full mix-blend-screen animate-float"
      ></div>
      <div
        class="absolute bottom-[20%] -right-[5%] w-[50%] h-[50%] bg-grass/5 blur-[120px] rounded-full mix-blend-screen"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div
        id="experience-header"
        class="flex flex-col items-center mb-16 sm:mb-20 opacity-0 translate-y-12"
      >
        <span class="section-label mb-3">My Journey</span>
        <h2
          class="text-3xl sm:text-5xl lg:text-6xl font-bold text-light font-jakarta mb-6 tracking-tight text-center"
        >
          Work Experience
        </h2>
        <div class="section-divider">
          <div class="h-[2px] w-12 bg-gradient-to-r from-transparent to-bright"></div>
          <div class="w-2 h-2 rounded-full bg-bright shadow-[0_0_10px_#F97300]"></div>
          <div class="h-[2px] w-12 bg-gradient-to-l from-transparent to-bright"></div>
        </div>
      </div>

      <!-- Timeline Container -->
      <div class="relative">
        <!-- Connecting Line -->
        <div
          class="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-bright/80 via-grass/50 to-transparent sm:transform sm:-translate-x-1/2 opacity-20"
        ></div>

        <!-- Animated Scroll Line -->
        <div
          id="scroll-line"
          class="absolute left-6 sm:left-1/2 top-0 w-[2px] bg-bright shadow-[0_0_15px_#F97300] sm:transform sm:-translate-x-1/2 opacity-60 z-20 origin-top h-0"
        ></div>

        <div class="space-y-6 sm:space-y-8">
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
              class="absolute left-6 sm:left-1/2 w-3.5 h-3.5 rounded-full bg-primary border-2 border-bright z-30 transform -translate-x-1/2 shadow-[0_0_10px_rgba(249,115,0,0.4)] group-hover:bg-bright group-hover:scale-150 group-hover:shadow-[0_0_20px_#F97300] transition-all duration-500"
            ></div>

            <!-- Content Card -->
            <div class="w-full sm:w-[46%] pl-12 sm:pl-0">
              <div
                class="experience-card group relative bg-secondary/15 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-secondary/25 hover:border-bright/40 hover:shadow-[0_0_30px_rgba(249,115,0,0.15)] transition-all duration-500 hover:-translate-y-1.5"
              >
                <!-- Highlight Top-Left Glow -->
                <div
                  class="absolute -top-px -left-px w-24 h-24 bg-gradient-to-br from-bright/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                ></div>

                <div class="flex flex-col gap-5">
                  <!-- Top Row: Logo & Date -->
                  <div class="flex items-center justify-between gap-4">
                    <div
                      class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-bright/30 transition-all duration-500"
                    >
                      <div
                        :class="[
                          job.icon,
                          'text-xl text-bright/90 group-hover:text-bright',
                        ]"
                      ></div>
                    </div>
                    <div
                      class="text-xs font-mono text-bright/80 bg-bright/10 px-3 py-1 rounded-full border border-bright/20 whitespace-nowrap"
                    >
                      {{ job.period }}
                    </div>
                  </div>

                  <!-- Info Row -->
                  <div>
                    <h3
                      class="text-xl sm:text-2xl font-bold text-light font-jakarta tracking-tight mb-1 group-hover:text-white"
                    >
                      {{ job.role }}
                    </h3>
                    <p
                      class="text-bright font-medium text-xs sm:text-sm tracking-wide font-jakarta"
                    >
                      {{ job.company }}
                      <span class="text-light/20 mx-1.5">|</span> {{ job.type }}
                    </p>
                  </div>

                  <!-- Tasks List -->
                  <div class="space-y-2 py-3 border-y border-white/5">
                    <div
                      v-for="(desc, i) in job.description"
                      :key="i"
                      class="flex items-start gap-2.5"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-bright/50 mt-1.5 shrink-0 group-hover:bg-bright transition-colors"
                      ></span>
                      <p
                        class="text-light/70 text-xs sm:text-sm leading-relaxed group-hover:text-light/90 font-lato"
                      >
                        {{ desc }}
                      </p>
                    </div>
                  </div>

                  <!-- Skills Tags -->
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="skill in job.skills"
                      :key="skill"
                      class="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-black/40 text-light/60 border border-white/5 hover:border-bright/40 hover:text-bright transition-all duration-300"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Spacer for Desktop Alignment -->
            <div class="hidden sm:block w-[46%]"></div>
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

const experiences = [
  {
    role: "Fullstack Developer",
    company: "PT Kereta Cepat Indonesia China",
    type: "Internship",
    period: "Dec 2025 - Jun 2026",
    icon: "i-carbon-api",
    description: [
      "Architected and developed backend services for a KPI and 360-degree performance evaluation system tailored for HR, leveraging a microservices architecture with TypeScript, Bun, Elysia.js, and Drizzle ORM.",
      "Contributed to frontend development using Next.js, collaborating on UI implementation and bridging frontend components with backend endpoints to fulfill business requirements.",
      "Designed and managed relational databases using PostgreSQL, seamlessly adapting to both Prisma ORM and Drizzle ORM, executed complex, safe migrations in production-like environments.",
    ],
    skills: ["Elysia JS", "Bun", "PostgreSQL", "Prisma ORM", "Drizzle ORM"],
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
    skills: ["Hardware", "Live Operations"],
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
    skills: ["SEO", "Wordpress", "Content Writing"],
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

  // Items Stagger Animation
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
      }
    );
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
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
</style>
