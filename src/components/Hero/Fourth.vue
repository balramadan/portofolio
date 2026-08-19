<template>
  <div
    id="fourth"
    class="bg-primary py-24 px-5 sm:px-10 lg:px-20 overflow-hidden relative z-0 cv-auto"
  >
    <div class="container mx-auto max-w-7xl relative z-10">
      <!-- Section Header -->
      <div id="blog-header" class="flex flex-col items-center mb-16 text-center">
        <span class="section-label mb-3">From The Blog</span>
        <h2
          class="text-3xl sm:text-5xl font-bold text-light font-jakarta tracking-tight mb-4"
        >
          Latest Articles
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
          Thoughts, technical tutorials, and insights about software
          engineering and modern tech.
        </p>
      </div>

      <!-- Skeleton Loading State -->
      <div
        v-if="isLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <div
          v-for="n in 3"
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

      <!-- Blog Grid (Modern Editorial Cards) -->
      <div
        v-else-if="posts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <div
          v-for="(item, index) in posts"
          :key="item.id || index"
          @click="toPost(item.permalink)"
          class="blog-card group relative bg-secondary/15 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(249,115,0,0.15)] hover:border-bright/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <!-- Thumbnail -->
          <div class="relative h-52 overflow-hidden bg-secondary/30">
            <div
              class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10"
            ></div>
            <img
              :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/post/${item.image}?width=600&format=webp&quality=80`"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              width="600"
              height="400"
            />
            <!-- Tag Badge -->
            <div
              class="absolute top-4 left-4 z-20 px-3 py-1 bg-bright/90 backdrop-blur-md rounded-full shadow-lg shadow-bright/20"
            >
              <span
                class="text-[10px] font-mono font-bold text-white uppercase tracking-wider"
              >
                {{ item.tag || "Article" }}
              </span>
            </div>

            <!-- Read Time Badge -->
            <div
              class="absolute top-4 right-4 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10"
            >
              <span class="text-[10px] font-mono text-light/80">
                {{ getReadTime(item.content || item.description) }}
              </span>
            </div>
          </div>

          <!-- Content Details -->
          <div class="p-6 relative z-20 flex-1 flex flex-col justify-between">
            <div>
              <!-- Date & Category Meta -->
              <div class="flex items-center gap-3 text-xs text-light/50 font-mono mb-3">
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
              <h3
                class="text-lg font-bold text-light font-jakarta mb-3 group-hover:text-bright transition-colors line-clamp-2"
              >
                {{ item.title }}
              </h3>

              <!-- Excerpt -->
              <p
                class="text-xs sm:text-sm text-light/60 font-lato leading-relaxed mb-6 line-clamp-3"
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
                <span>Read Article</span>
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

      <!-- View All Blog Button -->
      <div id="blog-cta" class="flex justify-center mt-16">
        <a
          href="https://inspire.codebyiqbal.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative inline-flex items-center justify-center px-8 py-3.5 font-jakarta font-bold text-bright border border-bright/50 rounded-full hover:bg-bright/10 hover:border-bright transition-all duration-300"
        >
          <span>Visit Inspire Blog</span>
          <div
            class="i-carbon-arrow-up-right ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          ></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import supabase from "@/utils/supabase";
import { postStore } from "@/stores/post";

const post = postStore();
const isLoading = ref(false);
const posts = ref([]);
let isFetched = false;
let observer = null;

function stripHtml(html) {
  if (!html) return "";

  if (Array.isArray(html)) {
    return html
      .map((block) => (typeof block === "object" && block.text ? block.text : String(block)))
      .join(" ")
      .replace(/<[^>]*>?/gm, "")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  } else if (typeof html === "object") {
    return (html.text || html.body || JSON.stringify(html))
      .replace(/<[^>]*>?/gm, "")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  } else {
    html = String(html);
  }

  return html
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
    return cleanContent.slice(0, 140) + "...";
  }
  return "Click to read the full article on Inspire blog...";
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
  if (!text) return "~2 min read";
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `~${mins} min read`;
}

function toPost(link) {
  if (link) {
    window.open(`https://inspire.codebyiqbal.dev/post/${link}`, "_blank");
  }
}

async function fetchPosts() {
  if (isFetched) return;
  isFetched = true;

  try {
    isLoading.value = true;
    const { data: postan, error } = await supabase.from("post").select("*");
    if (error) throw new Error(error.message);

    if (postan) {
      postan.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      posts.value = postan.slice(0, 3);
      post.setPosts(postan);
    }
  } catch (e) {
    console.error("Error fetching posts:", e.message);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  // Viewport-driven Supabase fetch: Only fetch when user scrolls near #fourth
  const target = document.getElementById("fourth");
  if (target) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts();
          if (observer) observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(target);
  } else {
    fetchPosts();
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped></style>
