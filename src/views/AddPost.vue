<template>
  <div
    class="min-h-screen bg-primary flex items-center justify-center py-20 px-5 sm:px-10 relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div
        class="absolute top-[10%] -right-[5%] w-[40%] h-[40%] bg-bright/10 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow"
      ></div>
      <div
        class="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-grass/10 blur-[100px] rounded-full mix-blend-screen"
      ></div>
    </div>

    <div class="w-full max-w-3xl relative z-10">
      <!-- Header -->
      <div
        class="text-center mb-10 opacity-0 translate-y-10 animate-fade-in-up"
      >
        <h1 class="text-3xl sm:text-4xl font-bold text-light font-jakarta mb-2">
          Create New Article
        </h1>
        <div
          class="h-1 w-20 bg-gradient-to-r from-bright to-grass rounded-full mx-auto"
        ></div>
        <p class="text-light/60 mt-4 font-lato">
          Publish engineering insights and stories directly to your blog.
        </p>
      </div>

      <!-- Form Card -->
      <div
        class="bg-secondary/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl opacity-0 translate-y-10 animate-fade-in-up"
        style="animation-delay: 0.2s"
      >
        <form @submit.prevent="postArticle" class="space-y-5">
          <!-- Article Title -->
          <div class="space-y-2">
            <label
              for="postTitle"
              class="text-sm font-medium text-light/80 ml-1"
              >Article Title</label
            >
            <input
              type="text"
              id="postTitle"
              v-model="postTitle"
              @input="handleTitleInput"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g. Building High-Performance APIs with Bun & Elysia"
            />
          </div>

          <!-- Permalink & Tag in Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Permalink / Slug -->
            <div class="space-y-2">
              <label
                for="postPermalink"
                class="text-sm font-medium text-light/80 ml-1"
                >Permalink / Slug</label
              >
              <div class="relative">
                <input
                  type="text"
                  id="postPermalink"
                  v-model="postPermalink"
                  required
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 font-mono text-xs transition-all duration-300"
                  placeholder="building-apis-with-bun"
                />
              </div>
            </div>

            <!-- Category / Tag -->
            <div class="space-y-2">
              <label
                for="postTag"
                class="text-sm font-medium text-light/80 ml-1"
                >Category / Tag</label
              >
              <input
                type="text"
                id="postTag"
                v-model="postTag"
                required
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300"
                placeholder="e.g. Engineering, Tutorial, Architecture"
              />
            </div>
          </div>

          <!-- Cover Image Upload -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-light/80 ml-1"
              >Cover Image</label
            >
            <div
              class="relative border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-bright/50 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
              @click="$refs.fileInput.click()"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileUpload"
                required
              />
              <div v-if="!previewUrl" class="flex flex-col items-center gap-3">
                <div
                  class="i-carbon-image text-4xl text-light/40 group-hover:text-bright transition-colors"
                ></div>
                <p class="text-light/60 text-sm">
                  Click to upload or drag and drop cover image
                </p>
                <p class="text-light/40 text-xs">
                  SVG, PNG, JPG or WEBP (max. 3MB)
                </p>
              </div>
              <div
                v-else
                class="relative w-full h-48 rounded-lg overflow-hidden group/preview"
              >
                <img :src="previewUrl" class="w-full h-full object-cover" />
                <div
                  class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity"
                >
                  <span class="text-white text-sm">Change Image</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Short Excerpt / Description -->
          <div class="space-y-2">
            <label
              for="postDesc"
              class="text-sm font-medium text-light/80 ml-1"
              >Short Excerpt / Summary</label
            >
            <textarea
              id="postDesc"
              v-model="postDesc"
              required
              rows="3"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300 resize-none font-lato"
              placeholder="A brief summary for cards and search snippets..."
            ></textarea>
          </div>

          <!-- Article Body (Markdown Content) -->
          <div class="space-y-2">
            <div class="flex items-center justify-between ml-1">
              <label for="postContent" class="text-sm font-medium text-light/80"
                >Article Content (Markdown / HTML)</label
              >
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  @click="isPreviewMode = false"
                  :class="[
                    'px-3 py-1 rounded text-xs font-mono transition-colors',
                    !isPreviewMode ? 'bg-bright text-white font-bold' : 'text-light/50 hover:text-light',
                  ]"
                >
                  Write
                </button>
                <button
                  type="button"
                  @click="isPreviewMode = true"
                  :class="[
                    'px-3 py-1 rounded text-xs font-mono transition-colors',
                    isPreviewMode ? 'bg-bright text-white font-bold' : 'text-light/50 hover:text-light',
                  ]"
                >
                  Preview
                </button>
              </div>
            </div>

            <!-- Write Mode -->
            <div v-if="!isPreviewMode">
              <textarea
                id="postContent"
                v-model="postContent"
                required
                rows="12"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300 font-mono text-sm resize-y"
                placeholder="# Introduction&#10;&#10;Write your article using markdown..."
              ></textarea>
            </div>

            <!-- Live Preview Mode -->
            <div
              v-else
              class="w-full min-h-[300px] bg-white/5 border border-white/10 rounded-xl p-6 overflow-y-auto text-light prose-preview"
              v-html="renderedPreview"
            ></div>
          </div>

          <!-- Publish Date -->
          <div class="space-y-2">
            <label
              for="postCreatedAt"
              class="text-sm font-medium text-light/80 ml-1"
              >Publication Date</label
            >
            <input
              type="date"
              id="postCreatedAt"
              v-model="postCreatedAt"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300 [color-scheme:dark]"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-bright to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-bright/20 hover:shadow-bright/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
          >
            <div
              v-if="isSubmitting"
              class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
            <span>{{ isSubmitting ? "Publishing Article..." : "Publish Article to Blog" }}</span>
          </button>

          <!-- Status Feedback -->
          <div
            v-if="statusMessage"
            :class="[
              'text-center text-sm p-3 rounded-lg',
              statusType === 'success'
                ? 'bg-green-500/20 text-green-200'
                : 'bg-red-500/20 text-red-200',
            ]"
          >
            {{ statusMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import supabase from "@/utils/supabase";
import gsap from "gsap";

const postTitle = ref("");
const postPermalink = ref("");
const postTag = ref("");
const postDesc = ref("");
const postContent = ref("");
const postImage = ref(null);
const previewUrl = ref(null);
const postCreatedAt = ref(new Date().toISOString().split("T")[0]);
const isSubmitting = ref(false);
const isPreviewMode = ref(false);
const statusMessage = ref("");
const statusType = ref("");
const fileInput = ref(null);

function handleTitleInput() {
  if (!postPermalink.value || postPermalink.value === slugify(postTitle.value.slice(0, -1))) {
    postPermalink.value = slugify(postTitle.value);
  }
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  processFile(file);
}

function handleDrop(e) {
  const file = e.dataTransfer.files[0];
  processFile(file);
}

function processFile(file) {
  if (file && file.type.startsWith("image/")) {
    postImage.value = file;
    previewUrl.value = URL.createObjectURL(file);
  } else {
    statusMessage.value = "Please upload a valid image file.";
    statusType.value = "error";
  }
}

function formatMarkdownPreview(content) {
  if (!content) return "<p class='text-light/40 italic'>Nothing to preview yet.</p>";
  let text = String(content);

  text = text.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-light mt-6 mb-2">$1</h3>');
  text = text.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-light mt-8 mb-3 border-b border-white/10 pb-2">$1</h2>');
  text = text.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-light mt-10 mb-4">$1</h1>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em class="italic text-light/90">$1</em>');
  text = text.replace(/```([\s\S]*?)```/g, '<pre class="bg-black/50 border border-white/10 rounded-xl p-4 my-4 font-mono text-xs text-bright/90"><code>$1</code></pre>');
  text = text.replace(/`([^`]+)`/g, '<code class="bg-white/10 text-bright px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');

  const paragraphs = text.split(/\n\n+/);
  return paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h") || trimmed.startsWith("<pre")) return trimmed;
      return `<p class="mb-4 text-light/80 leading-relaxed">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}

const renderedPreview = computed(() => {
  return formatMarkdownPreview(postContent.value);
});

async function postArticle() {
  if (!postImage.value) {
    statusMessage.value = "Please upload a cover image.";
    statusType.value = "error";
    return;
  }

  isSubmitting.value = true;
  statusMessage.value = "";

  try {
    // 1. Upload Cover Image to bucket 'post'
    const fileExt = postImage.value.name.split(".").pop();
    const fileName = `${postPermalink.value || "article"}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("post")
      .upload(filePath, postImage.value, { upsert: true });

    if (uploadError) throw uploadError;

    // 2. Insert into 'post' table
    const { data, error } = await supabase.from("post").insert([
      {
        title: postTitle.value,
        permalink: postPermalink.value,
        tag: postTag.value,
        description: postDesc.value,
        content: postContent.value,
        image: filePath,
        created_at: postCreatedAt.value,
      },
    ]);

    if (error) throw error;

    statusMessage.value = "Article published to blog successfully!";
    statusType.value = "success";

    setTimeout(() => {
      resetForm();
    }, 2000);
  } catch (error) {
    console.error("Error publishing article:", error);
    statusMessage.value = `Error: ${error.message}`;
    statusType.value = "error";
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  postTitle.value = "";
  postPermalink.value = "";
  postTag.value = "";
  postDesc.value = "";
  postContent.value = "";
  postImage.value = null;
  previewUrl.value = null;
  postCreatedAt.value = new Date().toISOString().split("T")[0];
  statusMessage.value = "";
  if (fileInput.value) fileInput.value.value = "";
}

onMounted(() => {
  gsap.to(".animate-fade-in-up", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  });
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
