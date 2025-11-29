<template>
  <DetailLayout>
    <template #default>
      <div
        id="top"
        class="bg-primary min-h-screen pt-20 pb-20 px-5 sm:px-10 lg:px-30"
      >
        <!-- Header -->
        <div
          class="flex flex-col items-center mb-16 opacity-0 translate-y-10 animate-fade-in-up"
        >
          <h2
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-light font-inter mb-4 tracking-tight text-center"
          >
            Project Archive
          </h2>
          <div
            class="h-1 w-24 bg-gradient-to-r from-bright to-grass rounded-full"
          ></div>
          <p class="text-light/60 mt-6 text-center max-w-2xl font-lato text-lg">
            A collection of things I've built, from side projects to
            professional work.
          </p>
        </div>

        <!-- Projects Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto"
        >
          <div
            v-for="(item, index) in projects"
            :key="item.id || index"
            class="project-card group relative bg-secondary/20 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-bright/10 hover:border-bright/30 transition-all duration-300 opacity-0 translate-y-10"
          >
            <!-- Image -->
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

              <!-- Links Overlay (Desktop) -->
              <div
                class="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <a
                  :href="item.project_github"
                  target="_blank"
                  class="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-bright hover:text-white transition-colors"
                  title="View Source"
                >
                  <div class="i-carbon-logo-github text-lg"></div>
                </a>
                <a
                  v-if="item.project_demo"
                  :href="item.project_demo"
                  target="_blank"
                  class="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-bright hover:text-white transition-colors"
                  title="Live Demo"
                >
                  <div class="i-carbon-launch text-lg"></div>
                </a>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 relative z-20 -mt-12">
              <div
                class="bg-primary/90 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-lg h-full flex flex-col"
              >
                <div class="flex justify-between items-start mb-3">
                  <h3
                    class="text-xl font-bold text-light font-inter group-hover:text-bright transition-colors"
                  >
                    {{ item.project_name }}
                  </h3>
                  <span class="text-xs font-mono text-light/40 pt-1">
                    {{ new Date(item.created_at).getFullYear() }}
                  </span>
                </div>

                <p
                  class="text-sm text-light/60 font-lato leading-relaxed mb-4 line-clamp-3 flex-grow"
                >
                  {{ item.project_desc }}
                </p>

                <!-- Tech Stack -->
                <div class="flex flex-wrap gap-2 mt-auto">
                  <span
                    v-for="tech in item.project_tech"
                    :key="tech"
                    class="px-2 py-1 text-xs font-mono text-bright bg-bright/10 rounded-md border border-bright/10"
                  >
                    {{ tech }}
                  </span>
                </div>

                <!-- Mobile Links -->
                <div
                  class="flex md:hidden gap-4 mt-4 pt-4 border-t border-white/5"
                >
                  <a
                    :href="item.project_github"
                    target="_blank"
                    class="flex items-center gap-2 text-sm text-light/70 hover:text-bright"
                  >
                    <div class="i-carbon-logo-github"></div>
                    Source
                  </a>
                  <a
                    v-if="item.project_demo"
                    :href="item.project_demo"
                    target="_blank"
                    class="flex items-center gap-2 text-sm text-light/70 hover:text-bright"
                  >
                    <div class="i-carbon-launch"></div>
                    Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State & Infinite Scroll Trigger -->
        <div ref="trigger" class="py-10 flex justify-center">
          <div
            v-if="isLoading || isFetchingMore"
            class="flex flex-col items-center gap-3"
          >
            <div
              class="w-8 h-8 border-2 border-bright/30 border-t-bright rounded-full animate-spin"
            ></div>
            <span class="text-sm text-light/50 font-mono"
              >Loading projects...</span
            >
          </div>
          <div
            v-else-if="!hasMoreData && projects.length > 0"
            class="text-center text-light/30 font-mono text-sm"
          >
            End of archive
          </div>
        </div>
      </div>
    </template>
  </DetailLayout>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import DetailLayout from "@/layouts/DetailLayout.vue";
import supabase from "@/utils/supabase";
import gsap from "gsap";

const isLoading = ref(false);
const isFetchingMore = ref(false);
const projects = ref([]);
const page = ref(0);
const limit = 6;
const hasMoreData = ref(true);
const trigger = ref(null);
let observer = null;

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
      // Add delay for smoother UX if loading more
      if (loadMore) await new Promise((resolve) => setTimeout(resolve, 500));

      const newProjects = project;
      projects.value = [...projects.value, ...newProjects];
      page.value++;

      if (project.length < limit) {
        hasMoreData.value = false;
      }

      // Animate new items
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

  gsap.to(newCards, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out",
  });
}

onMounted(async () => {
  // Initial animation for header
  gsap.to(".animate-fade-in-up", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.2,
  });

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

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
/* Scoped styles if needed */
</style>
