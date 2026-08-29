<template>
  <DetailLayout>
    <template #default>
      <!-- Interactive Top Reading Scroll Progress Bar -->
      <div class="fixed top-0 left-0 right-0 h-1 bg-transparent z-[1000] pointer-events-none">
        <div
          class="h-full bg-gradient-to-r from-bright via-orange-400 to-grass transition-all duration-150"
          :style="{ width: `${readingProgress}%` }"
        ></div>
      </div>

      <article
        id="top"
        class="bg-primary min-h-screen pt-28 pb-24 px-5 sm:px-10 lg:px-20 relative overflow-hidden"
      >
        <!-- Background Ambient Glow -->
        <div class="absolute inset-0 pointer-events-none z-0">
          <div
            class="absolute top-[5%] -right-[10%] w-[50%] h-[50%] bg-bright/5 blur-[150px] rounded-full mix-blend-screen"
          ></div>
          <div
            class="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-grass/5 blur-[120px] rounded-full mix-blend-screen"
          ></div>
        </div>

        <div class="max-w-4xl mx-auto relative z-10">
          <!-- Back Link -->
          <div class="mb-8">
            <router-link
              to="/blog"
              class="inline-flex items-center gap-2 text-xs font-mono text-light/60 hover:text-bright transition-colors group"
            >
              <div
                class="i-carbon-arrow-left text-sm group-hover:-translate-x-1 transition-transform"
              ></div>
              <span>Back to all articles</span>
            </router-link>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="space-y-6 animate-pulse">
            <div class="h-6 bg-white/10 rounded w-28"></div>
            <div class="h-12 bg-white/10 rounded w-full"></div>
            <div class="h-4 bg-white/5 rounded w-1/3"></div>
            <div class="h-80 bg-white/5 rounded-3xl"></div>
            <div class="space-y-3 pt-6">
              <div class="h-4 bg-white/5 rounded w-full"></div>
              <div class="h-4 bg-white/5 rounded w-5/6"></div>
              <div class="h-4 bg-white/5 rounded w-4/5"></div>
            </div>
          </div>

          <!-- Post Not Found -->
          <div
            v-else-if="!isLoading && !currentPost"
            class="text-center py-24 glass-card p-10 max-w-xl mx-auto rounded-3xl"
          >
            <div class="i-carbon-warning-alt text-5xl text-bright mb-4 mx-auto"></div>
            <h1 class="text-2xl font-bold text-light font-jakarta mb-2">
              Article Not Found
            </h1>
            <p class="text-sm text-light/60 font-lato mb-6">
              The article you are looking for might have been moved, renamed, or deleted.
            </p>
            <router-link
              to="/blog"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-bright text-white text-xs font-mono font-bold"
            >
              <span>Explore other articles</span>
            </router-link>
          </div>

          <!-- Article Content -->
          <div v-else-if="currentPost" class="space-y-10">
            <!-- Article Header -->
            <header id="article-header" class="space-y-4 text-left">
              <!-- Category & Read Time -->
              <div class="flex flex-wrap items-center gap-3">
                <span
                  class="px-3 py-1 bg-bright/10 text-bright border border-bright/30 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
                >
                  {{ currentPost.tag || "Engineering" }}
                </span>
                <span class="text-xs font-mono text-light/40">•</span>
                <span class="text-xs font-mono text-light/60">
                  {{ getReadTime(currentPost.content || currentPost.description) }}
                </span>
              </div>

              <!-- Title -->
              <h1
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-light font-jakarta tracking-tight leading-tight"
              >
                {{ currentPost.title }}
              </h1>

              <!-- Author & Date Meta Bar -->
              <div
                class="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10"
              >
                <div class="flex items-center gap-3">
                  <img
                    src="/potrait.jpeg"
                    alt="Iqbal Ramadan"
                    class="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
                  />
                  <div>
                    <div class="text-sm font-bold text-light font-jakarta">
                      Iqbal Ramadan
                    </div>
                    <div class="text-xs text-light/50 font-mono">
                      Fullstack Software Engineer
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-4 text-xs font-mono text-light/50">
                  <div class="flex items-center gap-1.5">
                    <span class="i-carbon-calendar text-bright"></span>
                    <span>{{ formatDate(currentPost.created_at) }}</span>
                  </div>
                </div>
              </div>
            </header>

            <!-- Featured Cover Image -->
            <div
              v-if="currentPost.image"
              class="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-secondary/30"
            >
              <img
                :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/post/${currentPost.image}?width=1200&format=webp&quality=85`"
                :alt="currentPost.title"
                class="w-full max-h-[480px] object-cover"
                loading="eager"
              />
            </div>

            <!-- Article Body Typography -->
            <div
              class="prose-custom text-light/90 text-base sm:text-lg leading-relaxed font-lato"
              v-html="renderedContent"
            ></div>

            <!-- Social Share Bar & Actions -->
            <div
              class="flex flex-wrap items-center justify-between gap-4 pt-8 mt-12 border-t border-white/10"
            >
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono text-light/50 uppercase tracking-wider mr-2"
                  >Share Article:</span
                >
                <button
                  @click="shareTwitter"
                  class="p-2.5 rounded-full bg-white/5 hover:bg-bright text-light/70 hover:text-white border border-white/10 transition-all"
                  title="Share on X / Twitter"
                  aria-label="Share on X"
                >
                  <div class="i-carbon-logo-x text-sm"></div>
                </button>
                <button
                  @click="shareLinkedIn"
                  class="p-2.5 rounded-full bg-white/5 hover:bg-bright text-light/70 hover:text-white border border-white/10 transition-all"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <div class="i-carbon-logo-linkedin text-sm"></div>
                </button>
                <button
                  @click="copyArticleLink"
                  class="p-2.5 rounded-full bg-white/5 hover:bg-bright text-light/70 hover:text-white border border-white/10 transition-all"
                  :title="copied ? 'Link Copied!' : 'Copy Link'"
                  aria-label="Copy Article Link"
                >
                  <div
                    :class="[
                      copied ? 'i-carbon-checkmark text-emerald-400' : 'i-carbon-link text-sm',
                    ]"
                  ></div>
                </button>
              </div>

              <!-- Back to Blog Button -->
              <router-link
                to="/blog"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bright/40 text-bright hover:bg-bright/10 text-xs font-mono font-bold transition-all"
              >
                <span>Read More Articles</span>
                <div class="i-carbon-arrow-right text-xs"></div>
              </router-link>
            </div>
          </div>
        </div>
      </article>
    </template>
  </DetailLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useHead, useSeoMeta } from "@unhead/vue";
import DetailLayout from "@/layouts/DetailLayout.vue";
import supabase from "@/utils/supabase";
import gsap from "gsap";

const route = useRoute();
const isLoading = ref(true);
const currentPost = ref(null);
const readingProgress = ref(0);
const copied = ref(false);

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
    return JSON.stringify(block);
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
    // If it's a JSON string representing blocks or array
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

function getReadTime(contentOrDesc) {
  const text = stripHtml(contentOrDesc);
  if (!text) return "~3 min read";
  const words = text.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `~${mins} min read`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function renderSingleBlock(block) {
  if (!block) return "";
  if (typeof block === "string") {
    return parseMarkdownString(block);
  }

  const type = (block.type || "").toLowerCase();
  const data = block.data || block;

  switch (type) {
    case "header":
    case "heading": {
      const level = data.level || 2;
      const text = data.text || "";
      if (level === 1) {
        return `<h1 class="text-3xl sm:text-4xl font-bold text-light font-jakarta mt-12 mb-6 tracking-tight">${text}</h1>`;
      } else if (level === 2) {
        return `<h2 class="text-2xl sm:text-3xl font-bold text-light font-jakarta mt-10 mb-5 tracking-tight border-b border-white/10 pb-2">${text}</h2>`;
      } else if (level === 3) {
        return `<h3 class="text-xl sm:text-2xl font-bold text-light font-jakarta mt-8 mb-4 tracking-tight">${text}</h3>`;
      } else {
        return `<h4 class="text-lg sm:text-xl font-bold text-light font-jakarta mt-6 mb-3 tracking-tight">${text}</h4>`;
      }
    }

    case "paragraph": {
      const text = data.text || "";
      if (!text) return "";
      return `<p class="mb-6 text-light/80 leading-relaxed text-base sm:text-lg">${text}</p>`;
    }

    case "list": {
      const style = data.style || "unordered";
      const items = Array.isArray(data.items) ? data.items : [];
      const listItems = items
        .map((item) => {
          const itemText = typeof item === "object" ? (item.content || item.text || JSON.stringify(item)) : String(item);
          return `<li class="mb-2 text-light/80 leading-relaxed">${itemText}</li>`;
        })
        .join("");

      if (style === "ordered") {
        return `<ol class="list-decimal pl-6 mb-6 space-y-1 text-light/80">${listItems}</ol>`;
      }
      return `<ul class="list-disc pl-6 mb-6 space-y-1 text-light/80">${listItems}</ul>`;
    }

    case "code": {
      const code = data.code || "";
      const language = data.language || "";
      return `<div class="my-6 rounded-2xl overflow-hidden border border-white/10 bg-surface/90 shadow-xl">
        ${language ? `<div class="px-4 py-2 border-b border-white/10 bg-white/5 text-xs font-mono text-light/50 flex justify-between items-center"><span>${language}</span><span class="i-carbon-code text-bright"></span></div>` : ''}
        <pre class="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-bright/90 leading-relaxed"><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
      </div>`;
    }

    case "quote":
    case "blockquote": {
      const text = data.text || "";
      const caption = data.caption ? `<cite class="block mt-2 text-xs font-mono text-bright/80 not-italic">— ${data.caption}</cite>` : "";
      return `<blockquote class="border-l border-bright/40 bg-white/5 px-5 py-4 rounded-r-2xl my-6 text-light/90 italic leading-relaxed font-lato">
        ${text}
        ${caption}
      </blockquote>`;
    }

    case "image": {
      const url = data.file?.url || data.url || "";
      const caption = data.caption || "";
      if (!url) return "";
      return `<figure class="my-8 rounded-3xl overflow-hidden border border-white/10 bg-secondary/20 shadow-2xl">
        <img src="${url}" alt="${caption || 'Article image'}" class="w-full object-cover max-h-[500px]" loading="lazy" />
        ${caption ? `<figcaption class="p-3 text-center text-xs font-mono text-light/50 bg-white/5 border-t border-white/5">${caption}</figcaption>` : ''}
      </figure>`;
    }

    case "delimiter":
    case "hr": {
      return `<div class="my-10 flex items-center justify-center gap-2">
        <span class="w-2 h-2 rounded-full bg-bright/40"></span>
        <span class="w-2 h-2 rounded-full bg-bright"></span>
        <span class="w-2 h-2 rounded-full bg-bright/40"></span>
      </div>`;
    }

    case "table": {
      const content = Array.isArray(data.content) ? data.content : [];
      if (!content.length) return "";
      const rows = content.map((row, rIdx) => {
        const isHeader = rIdx === 0 && data.withHeadings;
        const cellTag = isHeader ? "th" : "td";
        const cellClass = isHeader
          ? "px-4 py-3 bg-white/10 font-bold text-light text-left border border-white/10"
          : "px-4 py-3 border border-white/10 text-light/80";
        const cells = (Array.isArray(row) ? row : []).map(c => `<${cellTag} class="${cellClass}">${c}</${cellTag}>`).join("");
        return `<tr>${cells}</tr>`;
      }).join("");
      return `<div class="overflow-x-auto my-8 border border-white/10 rounded-2xl">
        <table class="w-full text-left text-sm border-collapse bg-surface/50">${rows}</table>
      </div>`;
    }

    case "raw": {
      return data.html || "";
    }

    default: {
      const fallbackText = data.text || data.content || data.body || "";
      if (fallbackText) {
        return `<p class="mb-6 text-light/80 leading-relaxed">${fallbackText}</p>`;
      }
      return "";
    }
  }
}

function parseMarkdownString(text) {
  if (!text) return "";
  let str = String(text);

  // If already full HTML with multiple block tags, return directly
  if (/<p|<div|<h1|<h2|<h3|<h4|<ul|<ol|<pre/i.test(str)) {
    return str;
  }

  // Basic Markdown headings
  str = str.replace(/^### (.*$)/gim, '<h3 class="text-xl sm:text-2xl font-bold text-light font-jakarta mt-8 mb-4 tracking-tight">$1</h3>');
  str = str.replace(/^## (.*$)/gim, '<h2 class="text-2xl sm:text-3xl font-bold text-light font-jakarta mt-10 mb-5 tracking-tight border-b border-white/10 pb-2">$1</h2>');
  str = str.replace(/^# (.*$)/gim, '<h1 class="text-3xl sm:text-4xl font-bold text-light font-jakarta mt-12 mb-6 tracking-tight">$1</h1>');

  // Bold & Italic
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  str = str.replace(/\*(.*?)\*/g, '<em class="italic text-light/90">$1</em>');

  // Code blocks
  str = str.replace(/```([\s\S]*?)```/g, '<pre class="bg-surface/90 border border-white/10 rounded-2xl p-5 my-6 overflow-x-auto text-xs sm:text-sm font-mono text-bright/90"><code>$1</code></pre>');
  str = str.replace(/`([^`]+)`/g, '<code class="bg-white/10 text-bright px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');

  // Paragraphs
  const paragraphs = str.split(/\n\n+/);
  return paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h") || trimmed.startsWith("<pre") || trimmed.startsWith("<blockquote")) return trimmed;
      return `<p class="mb-6 text-light/80 leading-relaxed text-base sm:text-lg">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}

function parseUniversalContent(content) {
  if (!content) return "";

  // 1. Direct Array of Blocks (e.g. Editor.js / Block Array)
  if (Array.isArray(content)) {
    return content.map(renderSingleBlock).filter(Boolean).join("");
  }

  // 2. Object with blocks property (e.g. { blocks: [...] } or single block)
  if (typeof content === "object") {
    if (Array.isArray(content.blocks)) {
      return content.blocks.map(renderSingleBlock).filter(Boolean).join("");
    }
    return renderSingleBlock(content);
  }

  // 3. String representation (could be JSON string or Markdown / HTML string)
  const trimmed = String(content).trim();
  if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(renderSingleBlock).filter(Boolean).join("");
      }
      if (parsed && typeof parsed === "object" && Array.isArray(parsed.blocks)) {
        return parsed.blocks.map(renderSingleBlock).filter(Boolean).join("");
      }
      if (parsed && typeof parsed === "object") {
        return renderSingleBlock(parsed);
      }
    } catch (e) {
      // Fall through to markdown parsing if JSON.parse fails
    }
  }

  return parseMarkdownString(trimmed);
}

const renderedContent = computed(() => {
  if (!currentPost.value) return "";
  const raw = currentPost.value.content || currentPost.value.description || "";
  return parseUniversalContent(raw);
});

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight > 0) {
    readingProgress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
  }
}

function shareTwitter() {
  const url = window.location.href;
  const text = encodeURIComponent(`Check out "${currentPost.value?.title}" by @balramadan`);
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`, "_blank");
}

function shareLinkedIn() {
  const url = window.location.href;
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
}

function copyArticleLink() {
  navigator.clipboard.writeText(window.location.href);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2500);
}

async function fetchPostDetail() {
  const permalink = route.params.permalink;
  if (!permalink) return;

  try {
    isLoading.value = true;
    const { data: post, error } = await supabase
      .from("post")
      .select("*")
      .eq("permalink", permalink)
      .maybeSingle();

    if (error) throw error;
    currentPost.value = post;

    if (post) {
      // Dynamic Head Updates
      useHead({
        title: `${post.title} | Iqbal Ramadan Blog`,
        link: [
          { rel: "canonical", href: `https://codebyiqbal.dev/blog/${post.permalink}` },
        ],
      });

      useSeoMeta({
        title: `${post.title} | Iqbal Ramadan`,
        description: stripHtml(post.description || post.content).slice(0, 160),
        ogTitle: post.title,
        ogDescription: stripHtml(post.description || post.content).slice(0, 160),
        ogType: "article",
        ogUrl: `https://codebyiqbal.dev/blog/${post.permalink}`,
        ogImage: post.image
          ? `https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/post/${post.image}`
          : "https://codebyiqbal.dev/IMG-20260305-WA0199.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: post.title,
        twitterDescription: stripHtml(post.description || post.content).slice(0, 160),
      });

      gsap.fromTo(
        "#article-header",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  } catch (err) {
    console.error("Error loading blog post:", err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  window.addEventListener("scroll", handleScroll, { passive: true });
  fetchPostDetail();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
:deep(.prose-custom) {
  max-width: 100%;
}
:deep(.prose-custom a) {
  color: #f97300;
  text-decoration: underline;
  text-underline-offset: 4px;
}
:deep(.prose-custom a:hover) {
  color: #ff9436;
}
:deep(.prose-custom ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}
:deep(.prose-custom ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}
:deep(.prose-custom li) {
  margin-bottom: 0.5rem;
}
:deep(.prose-custom blockquote) {
  border-left: 1px solid rgba(249, 115, 0, 0.4);
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem 1.25rem;
  border-radius: 0 0.75rem 0.75rem 0;
  font-style: italic;
  color: rgba(226, 223, 208, 0.85);
  margin: 1.75rem 0;
}
</style>
