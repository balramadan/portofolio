<template>
  <div
    id="fourth"
    class="bg-primary py-24 px-5 sm:px-10 lg:px-20 overflow-hidden relative z-0"
  >
    <div class="container mx-auto max-w-7xl relative z-10">
      <!-- Section Header -->
      <div
        id="blog-header"
        class="flex flex-col items-center mb-16 text-center"
      >
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
          Thoughts, tutorials, and insights on web development and architecture.
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
          <div class="h-52 bg-white/5"></div>
          <div class="p-6 space-y-3">
            <div class="h-4 bg-white/10 rounded w-1/2"></div>
            <div class="h-6 bg-white/10 rounded w-3/4"></div>
            <div class="h-3 bg-white/5 rounded w-full"></div>
            <div class="h-3 bg-white/5 rounded w-4/5"></div>
          </div>
        </div>
      </div>

      <!-- Blog Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6 max-w-7xl mx-auto"
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
              width="600"
              height="400"
            />
            <!-- Tag Badge -->
            <div class="absolute top-4 left-4 z-20" v-if="item.tag">
              <span
                class="px-3 py-1 text-xs font-mono font-medium text-bright bg-black/60 backdrop-blur-md border border-bright/20 rounded-full"
              >
                {{ item.tag }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div
            class="p-6 relative z-20 -mt-10 flex-1 flex flex-col justify-between"
          >
            <div
              class="bg-surface/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl flex-1 flex flex-col justify-between"
            >
              <div>
                <!-- Metadata Row -->
                <div
                  class="flex items-center justify-between text-xs text-light/50 font-mono mb-3"
                >
                  <div class="flex items-center gap-1.5">
                    <span class="i-carbon-calendar text-bright/70"></span>
                    <span>{{ formatDate(item.created_at) }}</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-light/40">
                    <span class="i-carbon-time text-bright/70"></span>
                    <span>{{
                      getReadTime(item.content || item.description)
                    }}</span>
                  </div>
                </div>

                <!-- Title -->
                <h3
                  class="text-lg font-bold text-light font-jakarta mb-3 group-hover:text-bright transition-colors line-clamp-2 leading-snug"
                >
                  {{ item.title }}
                </h3>

                <!-- Excerpt / Preview Paragraph -->
                <p
                  class="text-xs sm:text-sm text-light/65 font-lato leading-relaxed mb-4 line-clamp-3"
                >
                  {{ getExcerpt(item) }}
                </p>
              </div>

              <!-- Footer Row -->
              <div
                class="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono"
              >
                <span
                  v-if="item.author"
                  class="text-light/40 flex items-center gap-1"
                >
                  <span class="i-carbon-user text-bright/60"></span>
                  {{ item.author }}
                </span>
                <div
                  class="flex items-center gap-1 text-bright font-bold ml-auto group/link"
                >
                  <span>Read Article</span>
                  <span
                    class="i-carbon-arrow-right transition-transform duration-300 group-hover/link:translate-x-1"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Visit Blog CTA -->
      <div id="blog-cta" class="flex justify-center mt-16">
        <button
          @click="seeAll"
          class="group relative inline-flex items-center justify-center px-8 py-3.5 font-jakarta font-bold text-bright border border-bright/50 rounded-full hover:bg-bright/10 hover:border-bright transition-all duration-300"
        >
          <span>Visit Inspire</span>
          <div
            class="i-carbon-arrow-up-right ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
          ></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { postStore } from "@/stores/post";
import supabase from "@/utils/supabase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const isLoading = ref(false);
const posts = ref([]);
const post = postStore();

function stripHtml(html) {
  if (!html) return "";

  if (Array.isArray(html)) {
    html = html
      .map((block) => `${block.sub || ""} ${block.text || ""}`)
      .join(" ");
  } else if (typeof html === "object") {
    html = JSON.stringify(html);
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

function seeAll() {
  window.open("https://inspire.codebyiqbal.dev", "_blank");
}

function toPost(link) {
  if (link) {
    window.open(`https://inspire.codebyiqbal.dev/post/${link}`, "_blank");
  }
}

function initAnimations() {
  gsap.fromTo(
    "#blog-header",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#fourth",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    ".blog-card",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#fourth",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    "#blog-cta",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#fourth",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );
}

onMounted(async () => {
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
    nextTick(() => {
      initAnimations();
    });
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<style scoped></style>
