<template>
  <DetailLayout>
    <template #default>
      <div
        id="top"
        class="bg-primary min-h-screen pt-28 pb-20 px-5 sm:px-10 lg:px-20 relative overflow-hidden"
      >
        <!-- Background Glow Elements -->
        <div class="absolute inset-0 pointer-events-none z-0">
          <div
            class="absolute top-[10%] -right-[5%] w-[45%] h-[45%] bg-bright/5 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"
          ></div>
          <div
            class="absolute bottom-[20%] -left-[5%] w-[40%] h-[40%] bg-grass/5 blur-[120px] rounded-full mix-blend-screen"
          ></div>
        </div>

        <!-- Header -->
        <div
          id="blog-archive-header"
          class="flex flex-col items-center mb-12 text-center relative z-10"
        >
          <span class="section-label mb-3">Articles & Insights</span>
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-light font-jakarta mb-4 tracking-tight"
          >
            Engineering Blog
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
            Deep dives into modern fullstack engineering, reactive UI architectures, performance optimizations, and backend systems.
          </p>
        </div>

        <!-- Search & Category Filters -->
        <div class="max-w-4xl mx-auto mb-12 space-y-6 relative z-10">
          <!-- Search Bar -->
          <div class="relative max-w-md mx-auto">
            <span
              class="i-carbon-search absolute left-4 top-1/2 -translate-y-1/2 text-light/40 text-lg"
            ></span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search articles by title, topic, or keyword..."
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

          <!-- Category Badges -->
          <div class="flex flex-wrap items-center justify-center gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectedCategory = cat"
              class="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border"
              :class="[
                selectedCategory === cat
                  ? 'bg-bright text-white border-bright shadow-[0_0_12px_rgba(249,115,0,0.3)] font-bold'
                  : 'text-light/60 border-white/10 hover:border-white/20 hover:text-light bg-white/5',
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Skeleton Loading State -->
        <div
          v-if="isLoading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="glass-card overflow-hidden border border-white/5 animate-pulse"
          >
            <div class="h-52 bg-white/5"></div>
            <div class="p-6 space-y-3">
              <div class="h-5 bg-white/10 rounded w-3/4"></div>
              <div class="h-3 bg-white/5 rounded w-1/2"></div>
              <div class="h-3 bg-white/5 rounded w-full"></div>
              <div class="h-3 bg-white/5 rounded w-4/5"></div>
            </div>
          </div>
        </div>

        <!-- Articles Grid with Featured First Card -->
        <div
          v-else-if="filteredPosts.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10"
        >
          <div
            v-for="(item, index) in filteredPosts"
            :key="item.id || index"
            :class="[
              'blog-archive-card group relative bg-secondary/15 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(249,115,0,0.15)] hover:border-bright/40 transition-all duration-300 flex flex-col justify-between cursor-pointer',
              index === 0 && !searchQuery && selectedCategory === 'All'
                ? 'md:col-span-2 lg:col-span-3 lg:flex-row'
                : '',
            ]"
            @click="navigateToPost(item.permalink)"
          >
            <!-- Thumbnail Cover -->
            <div
              :class="[
                'relative overflow-hidden bg-secondary/30',
                index === 0 && !searchQuery && selectedCategory === 'All'
                  ? 'lg:w-1/2 h-64 lg:h-auto min-h-[300px]'
                  : 'h-52',
              ]"
            >
              <div
                class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10"
              ></div>
              <img
                :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/post/${item.image}?width=700&format=webp&quality=80`"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                :alt="item.title"
                loading="lazy"
                decoding="async"
                width="700"
                height="450"
              />

              <!-- Featured Badge on First Item -->
              <div
                v-if="index === 0 && !searchQuery && selectedCategory === 'All'"
                class="absolute top-4 left-4 z-20 px-3.5 py-1 bg-bright text-white text-xs font-bold font-jakarta rounded-full shadow-lg shadow-bright/30 flex items-center gap-1.5"
              >
                <div class="i-carbon-star-filled text-xs"></div>
                <span>Featured Story</span>
              </div>

              <!-- Tag Badge for other items -->
              <div
                v-else
                class="absolute top-4 left-4 z-20 px-3 py-1 bg-bright/90 backdrop-blur-md rounded-full shadow-lg shadow-bright/20"
              >
                <span
                  class="text-xs font-mono font-bold text-white uppercase tracking-wider"
                >
                  {{ item.tag || "Engineering" }}
                </span>
              </div>

              <!-- Read Time Badge -->
              <div
                class="absolute top-4 right-4 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10"
              >
                <span class="text-xs font-mono text-light/80">
                  {{ getReadTime(item.content || item.description) }}
                </span>
              </div>
            </div>

            <!-- Content Details -->
            <div
              :class="[
                'p-6 sm:p-8 relative z-20 flex-1 flex flex-col justify-between',
                index === 0 && !searchQuery && selectedCategory === 'All'
                  ? 'lg:w-1/2'
                  : '',
              ]"
            >
              <div>
                <!-- Date & Author Meta -->
                <div
                  class="flex items-center gap-3 text-xs text-light/50 font-mono mb-3"
                >
                  <div class="flex items-center gap-1.5">
                    <span class="i-carbon-calendar text-bright"></span>
                    <span>{{ formatDate(item.created_at) }}</span>
                  </div>
                  <span>•</span>
                  <div class="flex items-center gap-1.5">
                    <span class="i-carbon-user text-bright"></span>
                    <span>Iqbal Ramadan</span>
                  </div>
                </div>

                <!-- Title -->
                <h2
                  :class="[
                    'font-bold text-light font-jakarta mb-3 group-hover:text-bright transition-colors line-clamp-2',
                    index === 0 && !searchQuery && selectedCategory === 'All'
                      ? 'text-2xl sm:text-3xl'
                      : 'text-xl',
                  ]"
                >
                  {{ item.title }}
                </h2>

                <!-- Excerpt -->
                <p
                  class="text-xs sm:text-sm text-light/70 font-lato leading-relaxed mb-6 line-clamp-3"
                >
                  {{ getExcerpt(item) }}
                </p>
              </div>

              <!-- Footer Action Link -->
              <div
                class="flex items-center justify-between pt-4 border-t border-white/10"
              >
                <span
                  class="text-xs font-mono font-semibold text-bright group-hover:underline flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <span
                    class="i-carbon-arrow-right text-xs group-hover:translate-x-1 transition-transform"
                  ></span>
                </span>
                <span
                  class="i-carbon-launch text-sm text-light/40 group-hover:text-bright transition-colors"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty Filtered Result -->
        <div
          v-else-if="!isLoading && filteredPosts.length === 0"
          class="text-center py-20 text-light/50 font-mono text-sm relative z-10"
        >
          No articles match your current search query.
        </div>

        <!-- Infinite Scroll Load Trigger -->
        <div ref="trigger" class="py-12 flex justify-center relative z-10">
          <div v-if="isFetchingMore" class="flex flex-col items-center gap-3">
            <div
              class="w-8 h-8 border-2 border-bright/30 border-t-bright rounded-full animate-spin"
            ></div>
            <span class="text-xs text-light/50 font-mono"
              >Loading more articles...</span
            >
          </div>
          <div
            v-else-if="!hasMoreData && posts.length > 0"
            class="text-center text-light/30 font-mono text-xs"
          >
            ── End of engineering articles ──
          </div>
        </div>
      </div>
    </template>
  </DetailLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useHead, useSeoMeta } from "@unhead/vue";
import DetailLayout from "@/layouts/DetailLayout.vue";
import supabase from "@/utils/supabase";
import { postStore } from "@/stores/post";
import gsap from "gsap";

const router = useRouter();
const postStoreState = postStore();

const isLoading = ref(false);
const isFetchingMore = ref(false);
const posts = ref([]);
const page = ref(0);
const limit = 9;
const hasMoreData = ref(true);
const trigger = ref(null);
let observer = null;

const searchQuery = ref("");
const selectedCategory = ref("All");
const categories = ref(["All", "Engineering", "Tutorial", "Architecture", "Career"]);

function extractTextFromBlock(block) {
  if (!block) return "";
  if (typeof block === "string") return block;
  if (typeof block === "object") {
    if (block.data) {
      if (block.data.text) return block.data.text;
      if (block.data.code) return block.data.code;
      if (Array.isArray(block.data.items)) {
        return block.data.items.map(extractTextFromBlock).join(" ");
      }
      if (block.data.caption) return block.data.caption;
      if (block.data.message) return block.data.message;
    }
    if (block.text) return block.text;
    if (block.body) return block.body;
    if (block.content) return extractTextFromBlock(block.content);
    if (Array.isArray(block.children)) {
      return block.children.map(extractTextFromBlock).join(" ");
    }
    return "";
  }
  return String(block);
}

function stripHtml(input) {
  if (!input) return "";
  let raw = "";

  if (Array.isArray(input)) {
    raw = input.map(extractTextFromBlock).join(" ");
  } else if (typeof input === "object") {
    raw = extractTextFromBlock(input);
  } else {
    const str = String(input).trim();
    if ((str.startsWith("[") && str.endsWith("]")) || (str.startsWith("{") && str.endsWith("}"))) {
      try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) {
          raw = parsed.map(extractTextFromBlock).join(" ");
        } else if (parsed && typeof parsed === "object") {
          raw = extractTextFromBlock(parsed.blocks || parsed);
        } else {
          raw = str;
        }
      } catch (e) {
        raw = str;
      }
    } else {
      raw = str;
    }
  }

  return String(raw)
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(item) {
  if (item.description) {
    const cleanDesc = stripHtml(item.description);
    if (cleanDesc) return cleanDesc;
  }
  const cleanContent = stripHtml(item.content);
  if (cleanContent) {
    return cleanContent.slice(0, 150) + "...";
  }
  return "Click to read the complete technical article and deep-dive...";
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getReadTime(contentOrDesc) {
  const text = stripHtml(contentOrDesc);
  if (!text) return "~3 min read";
  const words = text.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `~${mins} min read`;
}

function navigateToPost(permalink) {
  if (permalink) {
    router.push(`/blog/${permalink}`);
  }
}

const filteredPosts = computed(() => {
  return posts.value.filter((item) => {
    const matchesSearch =
      !searchQuery.value ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (item.tag && item.tag.toLowerCase().includes(searchQuery.value.toLowerCase()));

    const matchesCategory =
      selectedCategory.value === "All" ||
      (item.tag && item.tag.toLowerCase() === selectedCategory.value.toLowerCase());

    return matchesSearch && matchesCategory;
  });
});

async function fetchPosts(loadMore = false) {
  if (!hasMoreData.value || (isFetchingMore.value && loadMore)) return;

  try {
    if (!loadMore) {
      isLoading.value = true;
    } else {
      isFetchingMore.value = true;
    }

    const from = page.value * limit;
    const to = from + limit - 1;

    const { data: fetchedPosts, error } = await supabase
      .from("post")
      .select("id, title, permalink, image, tag, description, content, created_at")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    if (fetchedPosts && fetchedPosts.length > 0) {
      if (loadMore) await new Promise((resolve) => setTimeout(resolve, 300));

      posts.value = [...posts.value, ...fetchedPosts];
      postStoreState.setPosts(posts.value);
      page.value++;

      // Dynamically extract unique categories
      const dynamicTags = Array.from(
        new Set(posts.value.map((p) => p.tag).filter(Boolean))
      );
      categories.value = ["All", ...dynamicTags];

      if (fetchedPosts.length < limit) {
        hasMoreData.value = false;
      }

      nextTick(() => {
        animateNewItems(fetchedPosts.length);
      });
    } else {
      hasMoreData.value = false;
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  } finally {
    isLoading.value = false;
    isFetchingMore.value = false;
  }
}

function animateNewItems(count) {
  const cards = document.querySelectorAll(".blog-archive-card");
  const startIndex = Math.max(0, cards.length - count);
  const newCards = Array.from(cards).slice(startIndex);

  gsap.fromTo(
    newCards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
    }
  );
}

onMounted(async () => {
  gsap.fromTo(
    "#blog-archive-header",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
  );

  await fetchPosts();

  observer = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        hasMoreData.value &&
        !isLoading.value &&
        !isFetchingMore.value
      ) {
        fetchPosts(true);
      }
    },
    { rootMargin: "0px 0px 300px 0px" }
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

useHead({
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "icon", href: "/logo.svg" },
    { rel: "canonical", href: "https://codebyiqbal.dev/blog" },
  ],
});

useSeoMeta({
  title: "Engineering Blog | Iqbal Ramadan",
  description:
    "Explore technical tutorials, software architecture discussions, fullstack insights, and engineering experiences by Iqbal Ramadan.",
  keywords:
    "Iqbal Ramadan, Engineering Blog, Software Engineer, Fullstack, Vue 3, Bun, Elysia, PostgreSQL, TypeScript, Web Development",
  author: "Iqbal Ramadan",
  ogTitle: "Engineering Blog | Iqbal Ramadan",
  ogDescription:
    "Technical tutorials, software architecture discussions, and engineering insights by Iqbal Ramadan.",
  ogSiteName: "Iqbal Ramadan Portfolio",
  ogType: "website",
  ogUrl: "https://codebyiqbal.dev/blog",
  ogImage: "https://codebyiqbal.dev/IMG-20260305-WA0199.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Engineering Blog | Iqbal Ramadan",
  twitterDescription:
    "Technical tutorials, software architecture discussions, and engineering insights by Iqbal Ramadan.",
});
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.1;
  }
}
</style>
