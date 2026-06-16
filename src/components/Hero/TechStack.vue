<template>
  <div
    id="techstack"
    class="bg-primary px-5 sm:px-10 lg:px-30 pt-10 pb-20 overflow-hidden"
  >
    <div class="flex flex-col items-center mb-10">
      <h3
        class="text-light/50 text-sm font-mono tracking-widest uppercase mb-2"
      >
        Technologies I Use
      </h3>
      <div
        class="h-[1px] w-12 bg-gradient-to-r from-transparent via-bright to-transparent"
      ></div>
    </div>

    <div class="relative w-full mx-auto">
      <!-- Gradient Masks -->
      <div
        class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"
      ></div>
      <div
        class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"
      ></div>

      <!-- Marquee Container -->
      <div class="flex overflow-hidden group">
        <!-- First Loop -->
        <div class="flex animate-marquee gap-8 lg:gap-12 px-4 shrink-0">
          <div
            v-for="skill in skills"
            :key="skill.nama"
            class="flex flex-col items-center gap-3 group/item min-w-[80px]"
          >
            <div
              class="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover/item:border-bright/30 group-hover/item:bg-white/10 transition-all duration-300"
            >
              <div
                :class="`${skill.icon} text-3xl sm:text-4xl transition-transform duration-300 group-hover/item:scale-110`"
              ></div>
            </div>
            <span
              class="text-xs text-light/40 font-mono group-hover/item:text-bright transition-colors duration-300"
              >{{ skill.nama }}</span
            >
          </div>
        </div>

        <!-- Second Loop (Duplicate for seamless scroll) -->
        <div
          class="flex animate-marquee gap-8 lg:gap-12 px-4 shrink-0"
          aria-hidden="true"
        >
          <div
            v-for="skill in skills"
            :key="`${skill.nama}-duplicate`"
            class="flex flex-col items-center gap-3 group/item min-w-[80px]"
          >
            <div
              class="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover/item:border-bright/30 group-hover/item:bg-white/10 transition-all duration-300"
            >
              <div
                :class="`${skill.icon} text-3xl sm:text-4xl transition-transform duration-300 group-hover/item:scale-110`"
              ></div>
            </div>
            <span
              class="text-xs text-light/40 font-mono group-hover/item:text-bright transition-colors duration-300"
              >{{ skill.nama }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const skills = ref([
  { nama: "HTML", icon: "i-devicon:html5" },
  { nama: "CSS", icon: "i-devicon:css3" },
  { nama: "Tailwind", icon: "i-devicon:tailwindcss" },
  { nama: "Bootstrap", icon: "i-devicon:bootstrap" },
  { nama: "Node", icon: "i-devicon:nodejs" },
  { nama: "Bun", icon: "i-devicon:bun" },
  { nama: "JS", icon: "i-devicon:javascript" },
  { nama: "TS", icon: "i-devicon:typescript" },
  { nama: "Python", icon: "i-devicon:python" },
  { nama: "PHP", icon: "i-devicon:php" },
  { nama: "Express", icon: "i-devicon:express text-light" },
  { nama: "Vite", icon: "i-devicon:vitejs" },
  { nama: "Vue", icon: "i-devicon:vuejs" },
  { nama: "React", icon: "i-devicon:react" },
  { nama: "Nuxt", icon: "i-devicon:nuxt" },
  { nama: "Next", icon: "i-devicon:nextjs" },
  { nama: "Astro", icon: "i-devicon:astro" },
  { nama: "Prisma", icon: "i-devicon:prisma" },
  { nama: "MySQL", icon: "i-devicon:mysql" },
  { nama: "Postgres", icon: "i-devicon:postgresql" },
  { nama: "MongoDB", icon: "i-devicon:mongodb" },
  { nama: "Supabase", icon: "i-devicon:supabase" },
  { nama: "Redis", icon: "i-devicon:redis" },
  { nama: "Figma", icon: "i-devicon:figma" },
]);
</script>

<style scoped>
.animate-marquee {
  animation: marquee 40s linear infinite;
}

/* Pause animation on hover */
.group:hover .animate-marquee {
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
