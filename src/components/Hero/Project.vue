<template>
  <div
    id="third"
    class="bg-primary py-20 px-5 sm:px-10 lg:px-30 overflow-hidden z-0"
  >
    <!-- Background Elements -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <div
        class="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-bright/5 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-grass/5 blur-[100px] rounded-full mix-blend-screen"
      ></div>
    </div>

    <div class="container mx-auto relative z-10">
      <!-- Section Header -->
      <div
        id="projects-header"
        class="flex flex-col items-center mb-16 opacity-0 translate-y-8"
      >
        <h2 class="text-3xl sm:text-4xl font-bold text-light font-inter mb-4">
          Some Things I’ve Built
        </h2>
        <div
          class="h-1 w-20 bg-gradient-to-r from-bright to-transparent rounded-full"
        ></div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bright"
        ></div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        <div
          v-for="(item, index) in projects"
          :key="index"
          class="project-card group relative bg-secondary/20 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-bright/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-bright/10 opacity-0 translate-y-8"
          @click="toGithub(item.project_github)"
        >
          <!-- Thumbnail -->
          <div class="relative h-56 overflow-hidden bg-secondary/30">
            <div
              class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10"
            ></div>
            <img
              :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/project/${item.project_img}?width=600&format=webp`"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :alt="item.project_name"
              loading="lazy"
              width="600"
              height="400"
            />
          </div>

          <!-- Content -->
          <div
            class="p-6 sm:p-8 relative z-20 bg-gradient-to-t from-primary via-primary/95 to-transparent -mt-20 pt-24"
          >
            <div class="flex justify-between items-start mb-3">
              <h3
                class="text-2xl font-bold text-light font-inter group-hover:text-bright transition-colors duration-300"
              >
                {{ item.project_name }}
              </h3>
              <div
                class="p-2 rounded-full bg-white/5 text-light group-hover:bg-bright group-hover:text-white transition-all duration-300"
              >
                <div class="i-carbon-arrow-up-right text-lg"></div>
              </div>
            </div>

            <p
              class="text-light/70 mt-5 mb-6 font-lato leading-relaxed line-clamp-3"
            >
              {{ item.project_desc }}
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in item.project_tech"
                :key="tech"
                class="px-3 py-1 text-xs font-mono text-bright bg-bright/10 rounded-full border border-bright/20"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- See All Button -->
      <div
        id="projects-cta"
        class="flex justify-center mt-16 opacity-0 translate-y-8"
      >
        <router-link
          to="/projects#top"
          class="group relative inline-flex items-center justify-center px-8 py-3 font-mono text-bright border border-bright rounded hover:bg-bright/10 transition-all duration-300"
        >
          <span>View Full Project Archive</span>
          <div
            class="i-carbon-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"
          ></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import supabase from "@/utils/supabase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        .slice(0, 4); // Limit to 4 for the preview section
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
    // Wait for DOM update then animate
    nextTick(() => {
      animateProjects();
    });
  }
}

// Function to open Github link
function toGithub(link) {
  if (link) window.open(link, "_blank");
}

function animateProjects() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#projects",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  tl.to("#projects-header", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  })
    .to(
      ".project-card",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .to(
      "#projects-cta",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );
}

onMounted(async () => {
  await fetchProjects();
});
</script>

<style scoped>
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
