<template>
  <div class="bg-primary px-5 sm:px-30 py-10 h-full">
    <h2 class="text-center text-light font-bold">Some Things I’ve Built</h2>
    <div v-if="isLoading" class="mt-5">
      <span>Loading...</span>
    </div>
    <div v-else class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div
        class="w-full h-auto flex flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start gap-3 px-5 py-5 transition ease-linear duration-300 group"
        hover="cursor-pointer bg-secondary/40 backdrop-blur-lg rounded border border-solid border-light/40"
        v-for="(item, index) in projects"
        @click="toGithub(item.project_github)"
        :key="index"
      >
        <img
          :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/project/${item.project_img}`"
          id="imageProject"
          w="full sm:2/5"
          h="38 sm:25 lg:30"
          class="object-cover rounded-lg brightness-70 transition ease-linear duration-300"
          alt=""
        />
        <div class="" w="sm:3/5">
          <div class="flex flex-row gap-2 items-center">
            <h3
              class="projectName m-0 transition ease-linear duration-300 text-light"
              group-hover="text-bright tracking-0.2"
              text="4"
            >
              {{ item.project_name }}
            </h3>
            <svg
              id="arrowUpRight"
              xmlns="http://www.w3.org/2000/svg"
              class="size-3 transition-all duration-300 ease-in-out text-light"
              group-hover="size-5"
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
            {{
              item.project_desc.split(" ").length > 20
                ? item.project_desc.split(" ").slice(0, 20).join(" ") + "..."
                : item.project_desc
            }}
          </p>
          <ul class="flex flex-row flex-wrap gap-2 m-0 p-0 mt-1.5">
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
    <div class="flex justify-center mt-5">
      <router-link
        to="/projects#top"
        class="text-center text-xs sm:text-sm bg-light text-primary font-semibold border-none rounded-full cursor-pointer transition-all duration-300 ease-in-out"
        p="x-5 y-2"
        hover="bg-bright text-light"
        >See All</router-link
      >
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import supabase from "@/utils/supabase";

const isLoading = ref(false);
const projects = ref([]);

// Function to fetch projects from Supabase
async function fetchProjects() {
  try {
    isLoading.value = true;

    const { data: project, error } = await supabase
      .from("projects")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    if (project) {
      projects.value = project
        .sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
        .slice(0, 6);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

// Function to open Github link
function toGithub(link) {
  window.open(link, "_blank");
}

onMounted(async () => {
  await fetchProjects();
});
</script>
<style></style>
