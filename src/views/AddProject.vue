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

    <div class="w-full max-w-2xl relative z-10">
      <!-- Header -->
      <div
        class="text-center mb-10 opacity-0 translate-y-10 animate-fade-in-up"
      >
        <h1 class="text-3xl sm:text-4xl font-bold text-light font-inter mb-2">
          Add New Project
        </h1>
        <div
          class="h-1 w-20 bg-gradient-to-r from-bright to-grass rounded-full mx-auto"
        ></div>
        <p class="text-light/60 mt-4 font-lato">
          Share your latest creation with the world.
        </p>
      </div>

      <!-- Form Card -->
      <div
        class="bg-secondary/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl opacity-0 translate-y-10 animate-fade-in-up"
        style="animation-delay: 0.2s"
      >
        <form @submit.prevent="postProject" class="space-y-2">
          <!-- Project Name -->
          <div class="space-y-2">
            <label
              for="projectName"
              class="text-sm font-medium text-light/80 ml-1"
              >Project Name</label
            >
            <input
              type="text"
              id="projectName"
              v-model.lazy="projectName"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g. Portfolio Website V2"
            />
          </div>

          <!-- Tech Stack -->
          <div class="space-y-2">
            <label
              for="projectTech"
              class="text-sm font-medium text-light/80 ml-1"
              >Technologies (comma separated)</label
            >
            <input
              type="text"
              id="projectTech"
              v-model.lazy="projectTech"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g. Vue, Tailwind, Supabase"
            />
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <label
              for="projectDesc"
              class="text-sm font-medium text-light/80 ml-1"
              >Description</label
            >
            <textarea
              id="projectDesc"
              v-model.lazy="projectDesc"
              required
              rows="4"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300 resize-none"
              placeholder="Describe the project..."
            ></textarea>
          </div>

          <!-- Image Upload -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-light/80 ml-1"
              >Project Image</label
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
                  Click to upload or drag and drop
                </p>
                <p class="text-light/40 text-xs">
                  SVG, PNG, JPG or GIF (max. 2MB)
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

          <!-- URLs Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label
                for="projectDemo"
                class="text-sm font-medium text-light/80 ml-1"
                >Demo URL</label
              >
              <div class="relative">
                <div
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-light/40 i-carbon-launch"
                ></div>
                <input
                  type="url"
                  id="projectDemo"
                  v-model.lazy="projectDemo"
                  class="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div class="space-y-2">
              <label
                for="projectGithub"
                class="text-sm font-medium text-light/80 ml-1"
                >Github URL</label
              >
              <div class="relative">
                <div
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-light/40 i-carbon-logo-github"
                ></div>
                <input
                  type="url"
                  id="projectGithub"
                  v-model.lazy="projectGithub"
                  required
                  class="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <!-- Date -->
          <div class="space-y-2">
            <label
              for="projectCreatedAt"
              class="text-sm font-medium text-light/80 ml-1"
              >Date Created</label
            >
            <input
              type="date"
              id="projectCreatedAt"
              v-model.lazy="projectCreatedAt"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder-light/30 focus:outline-none focus:border-bright/50 focus:bg-white/10 transition-all duration-300 [color-scheme:dark]"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-bright to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-bright/20 hover:shadow-bright/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
          >
            <div
              v-if="isSubmitting"
              class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
            <span>{{
              isSubmitting ? "Publishing..." : "Publish Project"
            }}</span>
          </button>

          <!-- Status Message -->
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
import { ref, onMounted } from "vue";
import supabase from "@/utils/supabase";
import gsap from "gsap";

const projectName = ref("");
const projectTech = ref("");
const projectDesc = ref("");
const projectImg = ref(null);
const previewUrl = ref(null);
const projectDemo = ref("");
const projectGithub = ref("");
const projectCreatedAt = ref(new Date().toISOString().split("T")[0]);
const isSubmitting = ref(false);
const statusMessage = ref("");
const statusType = ref("");
const fileInput = ref(null);

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
    projectImg.value = file;
    previewUrl.value = URL.createObjectURL(file);
  } else {
    statusMessage.value = "Please upload a valid image file.";
    statusType.value = "error";
  }
}

async function postProject() {
  if (!projectImg.value) {
    statusMessage.value = "Please upload a project image.";
    statusType.value = "error";
    return;
  }

  isSubmitting.value = true;
  statusMessage.value = "";

  try {
    // Upload Image
    const fileExt = projectImg.value.name.split(".").pop();
    const fileName = `${projectName.value
      .replace(/\s+/g, "-")
      .toLowerCase()}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("project")
      .upload(filePath, projectImg.value, {
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Insert Data
    // Convert tech string to array if needed, or keep as string depending on DB schema
    // Assuming DB expects array based on previous code usage (v-for tech in item.project_tech)
    const techArray = projectTech.value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    const { data, error } = await supabase.from("projects").insert([
      {
        project_name: projectName.value,
        project_tech: techArray,
        project_desc: projectDesc.value,
        project_img: filePath,
        project_demo: projectDemo.value || null,
        project_github: projectGithub.value,
        created_at: projectCreatedAt.value,
      },
    ]);

    if (error) throw error;

    statusMessage.value = "Project published successfully!";
    statusType.value = "success";

    // Reset form
    setTimeout(() => {
      resetForm();
    }, 2000);
  } catch (error) {
    console.error("Error:", error);
    statusMessage.value = `Error: ${error.message}`;
    statusType.value = "error";
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  projectName.value = "";
  projectTech.value = "";
  projectDesc.value = "";
  projectImg.value = null;
  previewUrl.value = null;
  projectDemo.value = "";
  projectGithub.value = "";
  projectCreatedAt.value = new Date().toISOString().split("T")[0];
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
