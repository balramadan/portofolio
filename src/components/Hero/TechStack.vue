<template>
  <div
    id="techstack"
    class="bg-primary px-5 sm:px-10 lg:px-20 pt-16 pb-24 overflow-hidden relative"
  >
    <!-- Section Header -->
    <div id="techstack-header" class="flex flex-col items-center mb-10 text-center">
      <span class="section-label mb-3">Technologies</span>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-light font-jakarta tracking-tight mb-4">
        My Tech Stack
      </h2>
      <div class="section-divider">
        <div class="h-[2px] w-12 bg-gradient-to-r from-transparent to-bright"></div>
        <div class="w-2 h-2 rounded-full bg-bright shadow-[0_0_10px_#F97300]"></div>
        <div class="h-[2px] w-12 bg-gradient-to-l from-transparent to-bright"></div>
      </div>
    </div>

    <!-- Interactive Category Filter Tabs -->
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-5 py-2 rounded-full text-xs font-mono transition-all duration-300 border"
          :class="[
            activeCategory === cat
              ? 'bg-bright text-white border-bright shadow-[0_0_15px_rgba(249,115,0,0.3)] font-bold'
              : 'text-light/60 border-white/10 hover:border-white/20 hover:text-light bg-white/5',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Clean Filtered Grid View -->
      <div
        class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 transition-all duration-300"
      >
        <div
          v-for="skill in filteredSkills"
          :key="skill.nama"
          class="flex flex-col items-center gap-2.5 p-4 glass-card hover:border-bright/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
        >
          <div
            :class="`${skill.icon} text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110`"
          ></div>
          <span
            class="text-xs font-mono text-light/70 group-hover:text-bright transition-colors font-semibold"
          >
            {{ skill.nama }}
          </span>
          <span class="text-[9px] font-mono text-light/30 uppercase tracking-wider">
            {{ skill.category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const activeCategory = ref("All");
const categories = ["All", "Frontend", "Backend", "Database", "Tools"];

const skills = [
  { nama: "HTML", icon: "i-devicon:html5", category: "Frontend" },
  { nama: "CSS", icon: "i-devicon:css3", category: "Frontend" },
  { nama: "Tailwind", icon: "i-devicon:tailwindcss", category: "Frontend" },
  { nama: "Bootstrap", icon: "i-devicon:bootstrap", category: "Frontend" },
  { nama: "Vue", icon: "i-devicon:vuejs", category: "Frontend" },
  { nama: "React", icon: "i-devicon:react", category: "Frontend" },
  { nama: "Nuxt", icon: "i-devicon:nuxt", category: "Frontend" },
  { nama: "Next", icon: "i-devicon:nextjs", category: "Frontend" },
  { nama: "Astro", icon: "i-devicon:astro", category: "Frontend" },

  { nama: "Node", icon: "i-devicon:nodejs", category: "Backend" },
  { nama: "Bun", icon: "i-devicon:bun", category: "Backend" },
  { nama: "Express", icon: "i-devicon:express text-light", category: "Backend" },
  { nama: "Python", icon: "i-devicon:python", category: "Backend" },
  { nama: "PHP", icon: "i-devicon:php", category: "Backend" },

  { nama: "MySQL", icon: "i-devicon:mysql", category: "Database" },
  { nama: "Postgres", icon: "i-devicon:postgresql", category: "Database" },
  { nama: "MongoDB", icon: "i-devicon:mongodb", category: "Database" },
  { nama: "Supabase", icon: "i-devicon:supabase", category: "Database" },
  { nama: "Redis", icon: "i-devicon:redis", category: "Database" },
  { nama: "Prisma", icon: "i-devicon:prisma", category: "Database" },

  { nama: "JS", icon: "i-devicon:javascript", category: "Tools" },
  { nama: "TS", icon: "i-devicon:typescript", category: "Tools" },
  { nama: "Vite", icon: "i-devicon:vitejs", category: "Tools" },
  { nama: "Figma", icon: "i-devicon:figma", category: "Tools" },
];

const filteredSkills = computed(() => {
  if (activeCategory.value === "All") return skills;
  return skills.filter((s) => s.category === activeCategory.value);
});
</script>

<style scoped></style>
