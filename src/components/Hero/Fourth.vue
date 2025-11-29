<template>
  <div
    id="fourth"
    class="bg-primary py-20 px-5 sm:px-10 lg:px-20 overflow-hidden"
  >
    <!-- Section Header -->
    <div
      id="blog-header"
      class="flex flex-col items-center mb-16 opacity-0 translate-y-10"
    >
      <h2
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-light font-inter mb-4 tracking-tight text-center"
      >
        Latest Articles
      </h2>
      <div
        class="h-1 w-20 bg-gradient-to-r from-bright to-grass rounded-full"
      ></div>
      <p class="text-light/60 mt-4 text-center max-w-2xl font-lato">
        Thoughts, tutorials, and insights on web development.
      </p>
    </div>

    <!-- Blog Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
    >
      <div
        v-for="(item, index) in posts"
        :key="item.id || index"
        @click="toPost(item.permalink)"
        class="blog-card group relative bg-secondary/20 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-bright/10 hover:border-bright/30 transition-all duration-300 cursor-pointer opacity-0 translate-y-10"
      >
        <!-- Thumbnail -->
        <div class="relative h-56 overflow-hidden bg-secondary/30">
          <div
            class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10"
          ></div>
          <img
            :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/post/${item.image}?width=600&format=webp`"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            :alt="item.title"
            loading="lazy"
            width="600"
            height="400"
          />
          <!-- Tag Badge -->
          <div class="absolute top-4 left-4 z-20">
            <span
              class="px-3 py-1 text-xs font-mono font-medium text-bright bg-black/50 backdrop-blur-md border border-bright/20 rounded-full"
            >
              {{ item.tag }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 relative z-20 -mt-12">
          <div
            class="bg-primary/80 backdrop-blur-md border border-white/5 rounded-xl p-5 shadow-lg"
          >
            <!-- Metadata -->
            <div
              class="flex items-center gap-4 text-xs text-light/50 font-mono mb-3"
            >
              <div class="flex items-center gap-1.5">
                <span class="i-carbon-calendar"></span>
                <span>{{
                  new Date(item.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="i-carbon-user"></span>
                <span>{{ item.author }}</span>
              </div>
            </div>

            <!-- Title -->
            <h3
              class="text-lg font-bold text-light font-inter mb-3 group-hover:text-bright transition-colors line-clamp-2"
            >
              {{ item.title }}
            </h3>

            <!-- Read More -->
            <div
              class="flex items-center gap-2 text-sm text-bright font-medium mt-4 group/link"
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

    <!-- See All Button -->
    <div
      id="blog-cta"
      class="flex justify-center mt-16 opacity-0 translate-y-8"
    >
      <button
        @click="seeAll"
        class="group relative inline-flex items-center justify-center px-8 py-3 font-mono text-bright border border-bright rounded hover:bg-bright/10 transition-all duration-300"
      >
        <span>Visit Blog</span>
        <div
          class="i-carbon-arrow-up-right ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
        ></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, nextTick } from "vue";
import { postStore } from "@/stores/post";
import supabase from "@/utils/supabase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const posts = ref([]);
const post = postStore();

function seeAll() {
  window.open("https://inspire.iqbalramadan.me", "_blank");
}

function toPost(link) {
  window.open(`https://inspire.iqbalramadan.me/post/${link}`, "_blank");
}

function initAnimations() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#blog",
      start: "top 80%",
    },
  });

  tl.to("#blog-header", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  })
    .to(
      ".blog-card",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .to(
      "#blog-cta",
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.2"
    );
}

onBeforeMount(async () => {
  try {
    let { data: postan, error } = await supabase.from("post").select("*");
    if (error) throw new Error(error.message);

    postan.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    posts.value = postan.slice(0, 3);
    post.setPosts(postan);

    nextTick(() => {
      initAnimations();
    });
  } catch (e) {
    console.error(e.message);
  }
});
</script>

<style scoped>
/* Scoped styles if needed */
</style>
