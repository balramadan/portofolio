<template>
  <div
    id="certificate"
    class="bg-primary py-24 px-5 sm:px-10 lg:px-20 overflow-hidden relative z-0 cv-auto"
  >
    <div class="container mx-auto max-w-7xl relative z-10">
      <!-- Section Header -->
      <div
        id="cert-header"
        class="flex flex-col items-center mb-16 text-center"
      >
        <span class="section-label mb-3">Credentials</span>
        <h2
          class="text-3xl sm:text-5xl font-bold text-light font-jakarta tracking-tight mb-4"
        >
          Certifications
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
        <p
          class="text-light/60 mt-4 text-center max-w-xl font-lato text-sm sm:text-base"
        >
          Continuous learning, professional development, and accredited skills.
        </p>
      </div>

      <!-- Skeleton Loading State -->
      <div
        v-if="isLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        <div
          v-for="n in 3"
          :key="n"
          class="glass-card overflow-hidden border border-white/5 animate-pulse"
        >
          <div class="h-48 bg-white/5"></div>
          <div class="p-6 space-y-3">
            <div class="h-5 bg-white/10 rounded w-3/4"></div>
            <div class="h-3 bg-white/5 rounded w-1/2"></div>
            <div class="h-3 bg-white/5 rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- Certifications Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        <div
          v-for="(item, index) in certifications"
          :key="item.id || index"
          class="cert-card group relative bg-secondary/15 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(249,115,0,0.15)] hover:border-bright/40 transition-all duration-300 flex flex-col justify-between"
        >
          <!-- Thumbnail -->
          <div class="relative h-48 sm:h-52 overflow-hidden bg-secondary/30">
            <div
              class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"
            ></div>
            <img
              :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/certifications/thumbnail/${item.thumbnail}?width=600&format=webp&quality=80`"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              width="600"
              height="400"
            />
            <!-- Date Badge -->
            <div
              class="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10"
            >
              <span class="text-xs font-mono font-medium text-bright">
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
          <div class="p-6 relative z-20 flex-1 flex flex-col justify-between">
            <div>
              <h3
                class="text-lg font-bold text-light font-jakarta mb-2 group-hover:text-bright transition-colors line-clamp-2"
              >
                {{ item.title }}
              </h3>
              <div
                class="flex items-center gap-2 text-xs text-bright/80 font-mono mb-4"
              >
                <span class="i-carbon-certificate"></span>
                <span>{{ item.issuer }}</span>
              </div>

              <p
                class="text-xs sm:text-sm text-light/60 font-lato leading-relaxed mb-6 line-clamp-3"
              >
                {{ item.description }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3 pt-4 border-t border-white/10">
              <a
                v-if="item.pdf"
                :href="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/certifications/file/${item.pdf}`"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-bright hover:text-white text-xs font-mono text-light transition-all duration-300 group/btn"
              >
                <span>View PDF</span>
                <span
                  class="i-carbon-document-pdf text-sm group-hover/btn:scale-110 transition-transform"
                ></span>
              </a>
              <a
                v-if="item.verifyUrl"
                :href="item.verifyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:border-bright/50 hover:text-bright text-xs font-mono text-light/70 transition-all duration-300"
              >
                <span>Verify</span>
                <span class="i-carbon-launch text-sm"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- See All Link -->
      <div id="cert-cta" class="flex justify-center mt-14">
        <router-link
          to="/certifications#top"
          class="group relative inline-flex items-center justify-center px-8 py-3.5 font-jakarta font-bold text-bright border border-bright/50 rounded-full hover:bg-bright/10 hover:border-bright transition-all duration-300"
          aria-label="See all certifications"
        >
          <span>View All Certifications</span>
          <div
            class="i-carbon-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
const certifications = ref([]);
let isFetched = false;
let observer = null;

async function fetchCertifications() {
  if (isFetched) return;
  isFetched = true;

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
  }
}

onMounted(() => {
  // Viewport-driven Supabase fetch: Only fetch when user scrolls near #certificate
  const target = document.getElementById("certificate");
  if (target) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchCertifications();
          if (observer) observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(target);
  } else {
    fetchCertifications();
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped></style>
