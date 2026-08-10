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
          <span class="section-label mb-3">Credentials & Accreditation</span>
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-light font-jakarta mb-4 tracking-tight"
          >
            Certifications Archive
          </h1>
          <div class="section-divider mb-4">
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
            class="text-light/70 text-center max-w-2xl font-lato text-base sm:text-lg"
          >
            A comprehensive record of accredited certificates, course
            completions, and professional skills verification.
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
              placeholder="Search certifications by title or issuer..."
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

          <!-- Issuer Filter Badges -->
          <div
            v-if="issuerCategories.length > 1"
            class="flex flex-wrap items-center justify-center gap-2"
          >
            <button
              v-for="issuer in issuerCategories"
              :key="issuer"
              @click="selectedIssuer = issuer"
              class="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border"
              :class="[
                selectedIssuer === issuer
                  ? 'bg-bright text-white border-bright shadow-[0_0_12px_rgba(249,115,0,0.3)] font-bold'
                  : 'text-light/60 border-white/10 hover:border-white/20 hover:text-light bg-white/5',
              ]"
            >
              {{ issuer }}
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
          v-else-if="filteredCertifications.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          <div
            v-for="(item, index) in filteredCertifications"
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
            <div
              class="p-6 relative z-20 flex-1 flex flex-col justify-between"
            >
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
              <div
                class="flex items-center gap-3 pt-4 border-t border-white/10"
              >
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

        <!-- Empty Filtered Result -->
        <div
          v-else-if="!isLoading && filteredCertifications.length === 0"
          class="text-center py-20 text-light/50 font-mono text-sm"
        >
          No certifications match your current filter.
        </div>

        <!-- Infinite Scroll Load Trigger -->
        <div ref="trigger" class="py-12 flex justify-center">
          <div v-if="isFetchingMore" class="flex flex-col items-center gap-3">
            <div
              class="w-8 h-8 border-2 border-bright/30 border-t-bright rounded-full animate-spin"
            ></div>
            <span class="text-xs text-light/50 font-mono"
              >Loading more certifications...</span
            >
          </div>
          <div
            v-else-if="!hasMoreData && certifications.length > 0"
            class="text-center text-light/30 font-mono text-xs"
          >
            ── End of certifications archive ──
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
const certifications = ref([]);
const page = ref(0);
const limit = 9;
const hasMoreData = ref(true);
const trigger = ref(null);
let observer = null;

const searchQuery = ref("");
const selectedIssuer = ref("All");

const issuerCategories = computed(() => {
  const set = new Set();
  certifications.value.forEach((item) => {
    if (item.issuer) {
      set.add(item.issuer.trim());
    }
  });
  return ["All", ...Array.from(set)];
});

const filteredCertifications = computed(() => {
  return certifications.value.filter((item) => {
    const matchesSearch =
      !searchQuery.value ||
      (item.title &&
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (item.issuer &&
        item.issuer.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (item.description &&
        item.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()));

    const matchesIssuer =
      selectedIssuer.value === "All" ||
      (item.issuer &&
        item.issuer.toLowerCase() === selectedIssuer.value.toLowerCase());

    return matchesSearch && matchesIssuer;
  });
});

async function fetchCertifications(loadMore = false) {
  if (!hasMoreData.value || (isFetchingMore.value && loadMore)) return;

  try {
    if (!loadMore) {
      isLoading.value = true;
    } else {
      isFetchingMore.value = true;
    }

    const from = page.value * limit;
    const to = from + limit - 1;

    const { data: certData, error } = await supabase
      .from("certifications")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    if (certData && certData.length > 0) {
      if (loadMore) await new Promise((resolve) => setTimeout(resolve, 300));

      const newCerts = certData;
      certifications.value = [...certifications.value, ...newCerts];
      page.value++;

      if (certData.length < limit) {
        hasMoreData.value = false;
      }

      nextTick(() => {
        animateNewItems(newCerts.length);
      });
    } else {
      hasMoreData.value = false;
    }
  } catch (error) {
    console.error("Error fetching certifications:", error);
  } finally {
    isLoading.value = false;
    isFetchingMore.value = false;
  }
}

function animateNewItems(count) {
  const cards = document.querySelectorAll(".cert-card");
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
    },
  );
}

onMounted(async () => {
  gsap.fromTo(
    "#archive-header",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
  );

  await fetchCertifications();

  observer = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        hasMoreData.value &&
        !isLoading.value &&
        !isFetchingMore.value
      ) {
        fetchCertifications(true);
      }
    },
    { rootMargin: "0px 0px 200px 0px" },
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
    { rel: "canonical", href: "https://codebyiqbal.dev/certifications" },
  ],
});

useSeoMeta({
  title: "Certifications Archive | Iqbal Ramadan",
  description:
    "Comprehensive archive of accredited certifications, course completions, and skills verification earned by Iqbal Ramadan.",
  keywords:
    "Iqbal Ramadan, Certifications, Credentials, Accreditations, Dicoding, Udemy, Fullstack Web Development",
  author: "Iqbal Ramadan",
  ogTitle: "Certifications Archive | Iqbal Ramadan",
  ogDescription:
    "Comprehensive archive of accredited certifications earned by Iqbal Ramadan.",
  ogSiteName: "Iqbal Ramadan Portfolio",
  ogType: "website",
  ogUrl: "https://codebyiqbal.dev/certifications",
  ogImage: "https://codebyiqbal.dev/IMG-20260305-WA0199.jpg",
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped></style>
