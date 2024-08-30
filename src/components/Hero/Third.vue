<template>
  <div
    id="third"
    class="bg-primary flex flex-col lg:flex-row gap-5 px-5 sm:px-30 py-5 h-full"
  >
    <!-- Sidebar -->
    <div
      class=""
      lg="sticky top-30 inline-block float-left mt-30 w-2/5 h-25 mb-35"
      xl="mb-30"
    >
      <h2 class="text-light text-center sm:text-left">Skills</h2>
      <div class="flex flex-row flex-wrap justify-center sm:justify-start">
        <div
          class="text-light text-sm text-center border border-solid border-light m-0 mb-3 mr-3 px-3 py-1 rounded-full cursor-pointer transition-all duration-300 ease-linear flex flex-row items-center gap-1"
          hover="text-bright border-bright"
          v-for="skill in skills"
          :key="skill"
        >
          <div :class="skill.icon"></div>{{ skill.nama }}
      </div>
      </div>
    </div>
    <!-- Main Content -->
    <div
      class="lg:inline-block lg:float-right lg:align-top lg:mt-30 lg:w-3/5 no-scrollbar"
    >
      <!-- Add more content to make scrolling necessary -->
      <h2 class="text-center sm:text-left text-light">
        Some Things I’ve Built
      </h2>
      <div
        class="mb-5 w-full h-auto flex flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start gap-3 px-5 py-5 transition ease-linear duration-300"
        hover="cursor-pointer bg-secondary/40 backdrop-blur-lg rounded border border-solid border-light/40"
        v-for="(item, index) in projects"
        @click="toGithub(item.project_github)"
        @mouseenter="hoverProject(index)"
        @mouseleave="hoverProject(index)"
        :key="index"
      >
        <img
          :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/project/${item.project_img}`"
          id="imageProject"
          w="full sm:2/5"
          h="full sm:25 lg:30"
          class="object-cover rounded-lg brightness-70 transition ease-linear duration-300"
          alt=""
        />
        <div class="" w="sm:3/5">
          <div class="flex flex-row gap-2 items-center">
            <h3
              class="projectName m-0 transition ease-linear duration-300 text-light"
              text="4"
            >
              {{ item.project_name }}
            </h3>
            <svg
              id="arrowUpRight"
              xmlns="http://www.w3.org/2000/svg"
              class="size-3 transition-all duration-300 ease-in-out text-light"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6m0 0H9m9 0v9"
              />
            </svg>
          </div>
          <p id="projectDesc" class="text-light/40" text="3.5">
            {{ item.project_desc }}
          </p>
          <ul class="flex flex-row flex-wrap gap-2 m-0 p-0">
            <li
              class="m-0 bg-light/10 rounded-full px-3 py-1 text-light"
              text="3"
              v-for="tech in item.project_tech"
              :key="tech"
            >
              {{ tech }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import supabase from "@/utils/supabase";

const skills = ref([
  {
    nama: "Javascript",
    icon: 'i-devicon:javascript w-1em h-1em',
  },
  {
    nama: "HTML",
    icon: 'i-devicon:html5 w-1em h-1em',
  },
  {
    nama: "CSS",
    icon: 'i-devicon:css3 w-1em h-1em',
  },
  {
    nama: "MySQL",
    icon: 'i-devicon:mysql w-1em h-1em',
  },
  {
    nama: "PHP",
    icon: 'i-devicon:php w-1em h-1em',
  },
  {
    nama: "Node",
    icon: 'i-devicon:nodejs w-1em h-1em',
  },
  {
    nama: "Express",
    icon: 'i-devicon:express w-1em h-1em text-light',
  },
  { nama: "Vite", icon: 'i-devicon:vitejs w-1em h-1em' },
  { nama: "Vue", icon: 'i-devicon:vuejs w-1em h-1em' },
  { nama: "Nuxt", icon: 'i-devicon:nuxtjs w-1em h-1em' },
  {
    nama: "MongoDB",
    icon: 'i-devicon:mongodb w-1em h-1em',
  },
  {
    nama: "Supabase",
    icon: 'i-devicon:supabase w-1em h-1em',
  },
]);
const projects = ref([]);

// Function to fetch projects from Supabase
async function fetchProjects() {
  const { data: project, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error(error);
    return;
  }

  if (project) {
    projects.value = project.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }
}

// Function to hover over project
function hoverProject(index) {
  const projectImg = document.querySelectorAll("#imageProject");
  const projectName = document.querySelectorAll(".projectName");
  const arrowUpRight = document.querySelectorAll("#arrowUpRight");
  const projectDesc = document.querySelectorAll("#projectDesc");
  projectName[index].classList.toggle("text-light");
  projectName[index].classList.toggle("text-bright");
  projectImg[index].classList.toggle("brightness-100");
  projectImg[index].classList.toggle("brightness-70");
  arrowUpRight[index].classList.toggle("size-3");
  arrowUpRight[index].classList.toggle("size-5");
  projectDesc[index].classList.toggle("text-light/40");
  projectDesc[index].classList.toggle("text-light/80");
}
// Function to open Github link
function toGithub(link) {
  window.open(link, "_blank");
}

onBeforeMount(() => {
  fetchProjects();
});
</script>

<style>
/* Add custom styles if needed */
</style>
