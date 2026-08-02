<template>
  <DetailLayout>
    <template #default>
      <div
        id="top"
        class="bg-primary min-h-screen pt-28 pb-20 px-5 sm:px-10 lg:px-20"
      >
        <!-- Header -->
        <div
          id="archive-header"
          class="flex flex-col items-center mb-12 text-center"
        >
          <span class="section-label mb-3">Archive</span>
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-light font-jakarta mb-4 tracking-tight"
          >
            Project Archive
          </h1>
          <div class="section-divider mb-4">
            <div class="h-[2px] w-12 bg-gradient-to-r from-transparent to-bright"></div>
            <div class="w-2 h-2 rounded-full bg-bright shadow-[0_0_10px_#F97300]"></div>
            <div class="h-[2px] w-12 bg-gradient-to-l from-transparent to-bright"></div>
          </div>
          <p class="text-light/70 text-center max-w-2xl font-lato text-base sm:text-lg">
            A comprehensive collection of applications, open-source projects, and systems I've built.
          </p>
        </div>

        <!-- Search & Filter Controls -->
        <div class="max-w-4xl mx-auto mb-12 space-y-6">
          <!-- Search Bar -->
          <div class="relative max-w-md mx-auto">
            <span
              class="i-carbon-search absolute left-4 top-1/2 -translate-y-1/2 text-light/40 text-lg"
            ></span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search projects by name or keyword..."
              class="w-full bg-surface/80 border border-white/10 rounded-full py-3 pl-11 pr-4 text-sm text-light font-mono placeholder:text-light/40 outline-none focus:border-bright/50 focus:shadow-[0_0_20px_rgba(249,115,0,0.2)] transition-all duration-300"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-light/40 hover:text-light"
            >
              <div class="i-carbon-close text-sm"></div>
            </button>
          </div>

          <!-- Tech Filter Badges -->
          <div class="flex flex-wrap items-center justify-center gap-2">
            <button
              v-for="tech in techCategories"
              :key="tech"
              @click="selectedTech = tech"
              class="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border"
              :class="[
                selectedTech === tech
                  ? 'bg-bright text-white border-bright shadow-[0_0_12px_rgba(249,115,0,0.3)] font-bold'
                  : 'text-light/60 border-white/10 hover:border-white/20 hover:text-light bg-white/5',
              ]"
            >
              {{ tech }}
            </button>
          </div>
        </div>

        <!-- Skeleton Loading State -->
        <div
          v-if="isLoading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="glass-card overflow-hidden border border-white/5 animate-pulse"
          >
            <div class="h-56 bg-white/5"></div>
            <div class="p-6 space-y-3">
              <div class="h-6 bg-white/10 rounded w-3/4"></div>
              <div class="h-3 bg-white/5 rounded w-full"></div>
              <div class="h-3 bg-white/5 rounded w-4/5"></div>
              <div class="flex gap-2 pt-2">
                <div class="h-5 w-16 bg-white/5 rounded-full"></div>
                <div class="h-5 w-20 bg-white/5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div
          v-else-if="filteredProjects.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          <div
            v-for="(item, index) in filteredProjects"
            :key="item.id || index"
            class="project-card group relative bg-secondary/15 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(249,115,0,0.15)] hover:border-bright/40 transition-all duration-300 flex flex-col justify-between"
          >
            <!-- Image -->
            <div class="relative h-56 overflow-hidden bg-secondary/30">
              <div
                class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10"
              ></div>
              <img
                :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/project/${item.project_img}?width=600&format=webp&quality=80`"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                :alt="item.project_name"
                loading="lazy"
                width="600"
                height="400"
              />

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

            <!-- Content -->
            <div class="p-6 relative z-20 -mt-10 flex-1 flex flex-col justify-between">
              <div
                class="bg-surface/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-between"
              >
                <div>
                  <div class="flex justify-between items-start mb-2 gap-2">
                    <h3
                      class="text-lg font-bold text-light font-jakarta group-hover:text-bright transition-colors line-clamp-1"
                    >
                      {{ item.project_name }}
                    </h3>
                    <span class="text-xs font-mono text-bright/80 shrink-0">
                      {{ new Date(item.created_at).getFullYear() }}
                    </span>
                  </div>

                  <p
                    class="text-xs sm:text-sm text-light/70 font-lato leading-relaxed mb-4 line-clamp-3"
                  >
                    {{ item.project_desc }}
                  </p>
                </div>

                <!-- Tech Stack Tags -->
                <div class="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
                  <span
                    v-for="tech in item.project_tech"
                    :key="tech"
                    class="px-2 py-0.5 text-[10px] font-mono text-bright bg-bright/10 rounded-md border border-bright/20"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty Filtered Result -->
        <div
          v-else-if="!isLoading && filteredProjects.length === 0"
          class="text-center py-20 text-light/50 font-mono text-sm"
        >
          No projects match your current filter.
        </div>

        <!-- Infinite Scroll Load Trigger -->
        <div ref="trigger" class="py-12 flex justify-center">
          <div
            v-if="isFetchingMore"
            class="flex flex-col items-center gap-3"
          >
            <div
              class="w-8 h-8 border-2 border-bright/30 border-t-bright rounded-full animate-spin"
            ></div>
            <span class="text-xs text-light/50 font-mono"
              >Loading more projects...</span
            >
          </div>
          <div
            v-else-if="!hasMoreData && projects.length > 0"
            class="text-center text-light/30 font-mono text-xs"
          >
            ── End of project archive ──
          </div>
        </div>
      </div>
    </template>
  </DetailLayout>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, nextTick } from "vue";
import { useHead, useSeoMeta } from "@unhead/vue";
import DetailLayout from "@/layouts/DetailLayout.vue";
import supabase from "@/utils/supabase";
import gsap from "gsap";

const isLoading = ref(false);
const isFetchingMore = ref(false);
const projects = ref([]);
const page = ref(0);
const limit = 9;
const hasMoreData = ref(true);
const trigger = ref(null);
let observer = null;

const searchQuery = ref("");
const selectedTech = ref("All");
const techCategories = [
  "All",
  "Vue",
  "React",
  "TypeScript",
  "Bun",
  "Elysia",
  "Node",
  "PostgreSQL",
  "Wordpress",
];

const filteredProjects = computed(() => {
  return projects.value.filter((item) => {
    const matchesSearch =
      !searchQuery.value ||
      item.project_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.project_desc && item.project_desc.toLowerCase().includes(searchQuery.value.toLowerCase()));

    const matchesTech =
      selectedTech.value === "All" ||
      (item.project_tech &&
        item.project_tech.some(
          (t) => t.toLowerCase() === selectedTech.value.toLowerCase()
        ));

    return matchesSearch && matchesTech;
  });
});

async function fetchProjects(loadMore = false) {
  if (!hasMoreData.value || (isFetchingMore.value && loadMore)) return;

  try {
    if (!loadMore) {
      isLoading.value = true;
    } else {
      isFetchingMore.value = true;
    }

    const from = page.value * limit;
    const to = from + limit - 1;

    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    if (project && project.length > 0) {
      if (loadMore) await new Promise((resolve) => setTimeout(resolve, 300));

      const newProjects = project;
      projects.value = [...projects.value, ...newProjects];
      page.value++;

      if (project.length < limit) {
        hasMoreData.value = false;
      }

      nextTick(() => {
        animateNewItems(newProjects.length);
      });
    } else {
      hasMoreData.value = false;
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  } finally {
    isLoading.value = false;
    isFetchingMore.value = false;
  }
}

function animateNewItems(count) {
  const cards = document.querySelectorAll(".project-card");
  const startIndex = Math.max(0, cards.length - count);
  const newCards = Array.from(cards).slice(startIndex);

  gsap.fromTo(
    newCards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    }
  );
}

onMounted(async () => {
  gsap.fromTo(
    "#archive-header",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
  );

  await fetchProjects();

  observer = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        hasMoreData.value &&
        !isLoading.value &&
        !isFetchingMore.value
      ) {
        fetchProjects(true);
      }
    },
    { rootMargin: "0px 0px 200px 0px" }
  );

  if (trigger.value) {
    observer.observe(trigger.value);
  }
});

useHead({
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "icon", href: "/logo.svg" },
    { rel: "canonical", href: "https://v2.iqbalramadan.me/projects" },
  ],
});

useSeoMeta({
  title: "Project Archive | Iqbal Ramadan",
  description: "Comprehensive archive of fullstack web applications, open-source tools, and software projects built by Iqbal Ramadan.",
  keywords: "Iqbal Ramadan, Project Archive, Portfolio, Fullstack Web Applications, Vue.js, Node.js, Bun, PostgreSQL",
  author: "Iqbal Ramadan",
  ogTitle: "Project Archive | Iqbal Ramadan",
  ogDescription: "Comprehensive archive of web applications & software projects built by Iqbal Ramadan.",
  ogSiteName: "Iqbal Ramadan Portfolio",
  ogType: "website",
  ogUrl: "https://v2.iqbalramadan.me/projects",
  ogImage: "https://v2.iqbalramadan.me/IMG-20260305-WA0199.jpg",
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped></style>
