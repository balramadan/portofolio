<template>
  <div
    id="certificate"
    class="bg-primary py-20 px-5 sm:px-10 lg:px-30 overflow-hidden"
  >
    <!-- Section Header -->
    <div
      id="cert-header"
      class="flex flex-col items-center mb-16 opacity-0 translate-y-10"
    >
      <h2
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-light font-inter mb-4 tracking-tight text-center"
      >
        Certifications
      </h2>
      <div
        class="h-1 w-20 bg-gradient-to-r from-bright to-grass rounded-full"
      ></div>
      <p class="text-light/60 mt-4 text-center max-w-2xl font-lato">
        Continuous learning and professional development.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-bright/30 border-t-bright rounded-full animate-spin"
      ></div>
    </div>

    <!-- Certifications Grid -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-7xl mx-auto"
    >
      <div
        v-for="(item, index) in certifications"
        :key="index"
        class="cert-card group relative bg-secondary/20 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-bright/10 hover:border-bright/30 transition-all duration-300 opacity-0 translate-y-10"
      >
        <!-- Thumbnail -->
        <div class="relative h-48 sm:h-56 overflow-hidden bg-secondary/30">
          <div
            class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"
          ></div>
          <img
            :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/certifications/thumbnail/${item.thumbnail}?width=600&format=webp`"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            :alt="item.title"
            loading="lazy"
            width="600"
            height="400"
          />
          <!-- Date Badge -->
          <div
            class="absolute top-4 right-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10"
          >
            <span class="text-xs font-mono text-bright">
              {{
                new Date(item.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 relative z-20">
          <div class="mb-4">
            <h4
              class="text-xl font-bold text-light font-inter mb-2 group-hover:text-bright transition-colors line-clamp-2"
            >
              {{ item.title }}
            </h4>
            <div
              class="flex items-center gap-2 text-sm text-light/60 font-lato"
            >
              <span class="i-carbon-certificate text-bright"></span>
              <span>{{ item.issuer }}</span>
            </div>
          </div>

          <p
            class="text-sm text-light/50 font-lato leading-relaxed mb-6 line-clamp-3"
          >
            {{ item.description }}
          </p>

          <!-- Actions -->
          <div class="flex items-center gap-3 pt-4 border-t border-white/5">
            <a
              :href="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/certifications/file/${item.pdf}`"
              target="_blank"
              class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-bright hover:text-white text-sm font-medium text-light transition-all duration-300 group/btn"
            >
              <span>View PDF</span>
              <span
                class="i-carbon-document-pdf group-hover/btn:scale-110 transition-transform"
              ></span>
            </a>
            <a
              v-if="item.verifyUrl"
              :href="item.verifyUrl"
              target="_blank"
              class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-bright/50 hover:text-bright text-sm font-medium text-light/70 transition-all duration-300"
            >
              <span>Verify</span>
              <span class="i-carbon-launch"></span>
            </a>
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
        aria-label="See all certifications and projects"
      >
        <span>See All</span>
        <div
          class="i-carbon-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"
        ></div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import supabase from "@/utils/supabase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isLoading = ref(false);
const certifications = ref([]);

async function fetchCertifications() {
  try {
    isLoading.value = true;
    const { data: certification, error } = await supabase
      .from("certifications")
      .select("*");

    if (error) throw error;

    if (certification) {
      certifications.value = certification
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6);
    }
  } catch (error) {
    console.error("Error fetching certifications:", error);
  } finally {
    isLoading.value = false;
    // Initialize animations after data is loaded and DOM is updated
    nextTick(() => {
      initAnimations();
    });
  }
}

function initAnimations() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#certificate",
      start: "top 80%",
    },
  });

  tl.to("#cert-header", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  }).to(
    ".cert-card",
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    },
    "-=0.4"
  );
}

onMounted(async () => {
  await fetchCertifications();
});
</script>

<style scoped>
/* Scoped styles if needed, mostly handled by UnoCSS */
</style>
