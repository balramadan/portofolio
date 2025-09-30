<template>
  <div id="third" class="bg-primary px-5 sm:px-30 pt-10 h-full">
    <h3 class="text-white text-sm text-center">Tech Stack</h3>
    <div
      id="techstack"
      class="mt-5 flex inline-flex flex-nowrap text-white bg-primary w-full border border-[#333] p-2 lg:p-3 rounded-xl overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"
    >
      <div
        id="container"
        class="flex items-center justify-start mx-1 lg:mx-1.5 gap-2 lg:gap-3"
      >
        <div
          id="skill"
          v-for="skill in skills"
          :key="skill"
          class="bg-[#333] p-2 rounded shrink-0"
        >
          <div :class="`${skill.icon} w-1.5rem lg:w-3rem h-1.5rem lg:h-3rem`" />
        </div>
      </div>
      <div
        id="container"
        class="flex items-center justify-start mx-1 lg:mx-1.5 gap-2 lg:gap-3"
        aria-hidden="true"
      >
        <div
          id="skill" 
          v-for="skill in skills"
          :key="skill"
          class="bg-[#333] p-2 rounded shrink-0"
        >
          <div :class="`${skill.icon} w-1.5rem lg:w-3rem h-1.5rem lg:h-3rem`" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const skills = ref([
  {
    nama: "HTML",
    icon: "i-devicon:html5",
  },
  {
    nama: "CSS",
    icon: "i-devicon:css3",
  },
  {
    nama: "TailwindCSS",
    icon: "i-devicon:tailwindcss",
  },
  {
    nama: "Bootstrap",
    icon: "i-devicon:bootstrap"
  },
  {
    nama: "Javascript",
    icon: "i-devicon:javascript",
  },
  {
    nama: "Typescript",
    icon: "i-devicon:typescript",
  },
  {
    nama: "Python",
    icon: "i-devicon:python",
  },
  {
    nama: "PHP",
    icon: "i-devicon:php",
  },
  {
    nama: "Node",
    icon: "i-devicon:nodejs",
  },
  {
    nama: "Express",
    icon: "i-devicon:express text-light",
  },
  { nama: "Vite", icon: "i-devicon:vitejs" },
  { nama: "Vue", icon: "i-devicon:vuejs" },
  { nama: "React", icon: "i-devicon:react" },
  { nama: "Nuxt", icon: "i-devicon:nuxt" },
  { nama: "Next", icon: "i-devicon:nextjs" },
  {
    nama: "Prisma",
    icon: "i-devicon:prisma"
  },
  {
    nama: "Passport",
    icon: "i-devicon:passport"
  },
  {
    nama: "MySQL",
    icon: "i-devicon:mysql",
  },
  {
    nama: "PostgreSQL",
    icon: "i-devicon:postgresql",
  },
  {
    nama: "MongoDB",
    icon: "i-devicon:mongodb",
  },
  {
    nama: "Supabase",
    icon: "i-devicon:supabase",
  },
  {
    nama: "Figma",
    icon: "i-devicon:figma",
  },
]);
</script>
<style scoped>
@keyframes moveHorizontal {
  from {
    transform: translateX(0.8%);
  }
  to {
    transform: translateX(-100%);
  }
}

#techstack #container {
  animation: moveHorizontal 45s linear infinite;
}

#techstack::-webkit-scrollbar {
  display: none;
}
</style>
