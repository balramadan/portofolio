<template>
  <div
    id="third"
    class="bg-primary py-24 px-5 sm:px-10 lg:px-20 overflow-hidden relative z-0"
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

    <div class="container mx-auto max-w-7xl relative z-10">
      <!-- Section Header -->
      <div
        id="projects-header"
        class="flex flex-col items-center mb-16 opacity-0 translate-y-8 text-center"
      >
        <span class="section-label mb-3">Portfolio</span>
        <h2
          class="text-3xl sm:text-5xl font-bold text-light font-jakarta tracking-tight mb-4"
        >
          Some Things I've Built
        </h2>
        <div class="section-divider">
          <div
            class="h-[2px] w-12 bg-gradient-to-r from-transparent to-bright"
          ></div>
          <div
            class="w-2 h-2 rounded-full bg-bright shadow-[0_0_10px_#F97300]"
          ></div>
          <div
            class="h-[2px] w-12 bg-gradient-to-l from-transparent to-bright"
          ></div>
        </div>
      </div>

      <!-- Skeleton Loading State -->
      <div
        v-if="isLoading"
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
      >
        <div
          v-for="n in 4"
          :key="n"
          class="glass-card overflow-hidden border border-white/5 animate-pulse"
        >
          <div class="h-56 bg-white/5"></div>
          <div class="p-6 space-y-4">
            <div class="h-6 bg-white/10 rounded w-3/4"></div>
            <div class="h-3 bg-white/5 rounded w-full"></div>
            <div class="h-3 bg-white/5 rounded w-5/6"></div>
            <div class="flex gap-2 pt-2">
              <div class="h-5 w-16 bg-white/5 rounded-full"></div>
              <div class="h-5 w-20 bg-white/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Showcase Layout -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div
          v-for="(item, index) in projects"
          :key="item.id || index"
          :class="[
            'project-card group relative bg-secondary/15 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-bright/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(249,115,0,0.15)] opacity-0 translate-y-8 flex flex-col',
            index === 0 ? 'lg:col-span-2 lg:flex-row' : '',
          ]"
        >
          <!-- Thumbnail -->
          <div
            :class="[
              'relative overflow-hidden bg-secondary/30',
              index === 0 ? 'lg:w-1/2 h-64 lg:h-auto min-h-[300px]' : 'h-56',
            ]"
          >
            <div
              class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent z-10"
            ></div>
            <img
              :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/project/${item.project_img}?width=800&format=webp&quality=80`"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              :alt="item.project_name"
              loading="lazy"
              width="800"
              height="500"
            />

            <!-- Featured Badge on Index 0 -->
            <div v-if="index === 0" class="absolute top-4 left-4 z-20">
              <span
                class="px-3 py-1 text-xs font-mono font-bold text-bright bg-black/60 backdrop-blur-md border border-bright/30 rounded-full"
              >
                Featured Project
              </span>
            </div>
          </div>

          <!-- Content -->
          <div
            :class="[
              'p-6 sm:p-8 relative z-20 flex flex-col justify-between flex-1',
              index === 0
                ? 'lg:w-1/2 bg-primary/40'
                : 'bg-gradient-to-t from-primary via-primary/95 to-transparent -mt-12 pt-16',
            ]"
          >
            <div>
              <div class="flex justify-between items-start mb-3 gap-4">
                <h3
                  class="text-xl sm:text-2xl font-bold text-light font-jakarta group-hover:text-bright transition-colors duration-300"
                >
                  {{ item.project_name }}
                </h3>
              </div>

              <p
                class="text-light/70 text-sm leading-relaxed font-lato mb-6"
                :class="index === 0 ? 'line-clamp-4' : 'line-clamp-3'"
              >
                {{ item.project_desc }}
              </p>
            </div>

            <div>
              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in item.project_tech"
                  :key="tech"
                  class="px-3 py-1 text-xs font-mono text-bright bg-bright/10 rounded-full border border-bright/20"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Links Action Buttons -->
              <div
                class="flex items-center gap-3 pt-4 border-t border-white/10"
              >
                <a
                  v-if="item.project_github"
                  :href="item.project_github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-bright hover:text-white text-xs font-mono text-light transition-all duration-300"
                >
                  <span class="i-carbon-logo-github text-sm"></span>
                  <span>Source Code</span>
                </a>

                <a
                  v-if="item.project_url"
                  :href="item.project_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bright/10 hover:bg-bright border border-bright/30 text-bright hover:text-white text-xs font-mono font-bold transition-all duration-300"
                >
                  <span class="i-carbon-launch text-sm"></span>
                  <span>Live Demo</span>
                </a>
              </div>
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
          class="group relative inline-flex items-center justify-center px-8 py-3.5 font-jakarta font-bold text-bright border border-bright/50 rounded-full hover:bg-bright/10 hover:border-bright transition-all duration-300"
          aria-label="View Full Project Archive"
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
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import supabase from "@/utils/supabase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const isLoading = ref(false);
const projects = ref([]);

async function fetchProjects() {
  try {
    isLoading.value = true;
    const { data: project, error } = await supabase
      .from("projects")
      .select("*");

    if (error) throw error;

    if (project) {
      projects.value = project
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  } finally {
    isLoading.value = false;
    nextTick(() => {
      animateProjects();
    });
  }
}

function animateProjects() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#third",
      start: "top 75%",
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
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      "#projects-cta",
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4",
    );
}

onMounted(async () => {
  await fetchProjects();
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
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
