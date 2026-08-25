<template>
  <div
    id="third"
    class="bg-primary py-24 px-5 sm:px-10 lg:px-20 overflow-hidden relative z-0 cv-auto"
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
        class="flex flex-col items-center mb-16 text-center"
      >
        <span class="section-label mb-3">Portfolio</span>
        <h2
          class="text-3xl sm:text-5xl font-bold text-light font-jakarta tracking-tight mb-4"
        >
          Featured Projects
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
        class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto"
      >
        <div
          v-for="n in 2"
          :key="n"
          class="glass-card overflow-hidden border border-white/5 animate-pulse"
        >
          <div class="h-64 bg-white/5"></div>
          <div class="p-6 space-y-3">
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

      <!-- Projects Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
      >
        <div
          v-for="(item, index) in projects"
          :key="item.id || index"
          :class="[
            'project-card group relative bg-secondary/15 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-bright/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(249,115,0,0.15)] flex flex-col',
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
              decoding="async"
              width="800"
              height="500"
            />

            <!-- Featured Badge on Index 0 -->
            <div
              v-if="index === 0"
              class="absolute top-4 left-4 z-20 px-3 py-1 bg-bright text-white text-xs font-bold font-jakarta rounded-full shadow-lg shadow-bright/30 flex items-center gap-1"
            >
              <div class="i-carbon-star-filled text-xs"></div>
              <span>Featured Project</span>
            </div>

            <!-- Desktop Links Overlay -->
            <div
              class="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <a
                v-if="item.project_github"
                :href="item.project_github"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-bright hover:text-white transition-colors"
                title="View Source Code"
              >
                <div class="i-carbon-logo-github text-lg"></div>
              </a>
              <a
                v-if="item.project_url || item.project_demo"
                :href="item.project_url || item.project_demo"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-bright hover:text-white transition-colors"
                title="Live Demo"
              >
                <div class="i-carbon-launch text-lg"></div>
              </a>
            </div>
          </div>

          <!-- Content Details -->
          <div
            :class="[
              'p-6 sm:p-8 flex flex-col justify-between flex-1',
              index === 0 ? 'lg:w-1/2' : '',
            ]"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-mono text-bright font-semibold">
                  0{{ index + 1 }} // PROJECT
                </span>
                <!-- Mobile Source/Demo Links -->
                <div class="flex items-center gap-3 lg:hidden">
                  <a
                    v-if="item.project_github"
                    :href="item.project_github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-light/70 hover:text-bright"
                  >
                    <div class="i-carbon-logo-github text-lg"></div>
                  </a>
                  <a
                    v-if="item.project_url || item.project_demo"
                    :href="item.project_url || item.project_demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-light/70 hover:text-bright"
                  >
                    <div class="i-carbon-launch text-lg"></div>
                  </a>
                </div>
              </div>

              <h3
                class="text-xl sm:text-2xl font-bold text-light font-jakarta mb-3 group-hover:text-bright transition-colors"
              >
                {{ item.project_name }}
              </h3>

              <p
                class="text-sm text-light/70 font-lato leading-relaxed mb-6 line-clamp-3"
              >
                {{ item.project_desc }}
              </p>
            </div>

            <div>
              <!-- Tech Stack Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in item.project_tech"
                  :key="tech"
                  class="px-2.5 py-1 text-xs font-mono text-light/80 bg-white/5 rounded-md border border-white/5"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Action Links for Featured/Desktop -->
              <div
                class="flex items-center gap-4 pt-4 border-t border-white/10"
              >
                <a
                  v-if="item.project_url || item.project_demo"
                  :href="item.project_url || item.project_demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-bright hover:underline"
                >
                  <span>Live Preview</span>
                  <div class="i-carbon-arrow-up-right text-xs"></div>
                </a>
                <a
                  v-if="item.project_github"
                  :href="item.project_github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-mono text-light/60 hover:text-light"
                >
                  <span>Source Code</span>
                  <div class="i-carbon-logo-github text-xs"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Projects Button -->
      <div class="flex justify-center mt-16">
        <router-link
          to="/projects#top"
          class="group relative inline-flex items-center justify-center px-8 py-3.5 font-jakarta font-bold text-bright border border-bright/50 rounded-full hover:bg-bright/10 hover:border-bright transition-all duration-300"
        >
          <span>View Full Project Archive</span>
          <div
            class="i-carbon-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
          ></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import supabase from "@/utils/supabase";

const isLoading = ref(false);
const projects = ref([]);
let isFetched = false;
let observer = null;

async function fetchProjects() {
  if (isFetched) return;
  isFetched = true;

  try {
    isLoading.value = true;
    const { data: project, error } = await supabase
      .from("projects")
      .select(
        "id, project_name, project_desc, project_tech, project_img, project_demo, project_github, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) throw error;

    if (project) {
      projects.value = project;
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  // Viewport-driven Supabase fetch: Only fetch when user scrolls near #third
  const target = document.getElementById("third");
  if (target) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchProjects();
          if (observer) observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(target);
  } else {
    fetchProjects();
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped></style>
