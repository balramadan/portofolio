<template>
  <div class="py-5 px-5 sm:px-10">
    <h1 class="font-bold text-2xl">Add Project</h1>
    <form @submit.prevent="postProject" class="mt-5" method="post">
      <div class="my-2">
        <label for="projectName" class="mr-4">Nama Projek: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="text"
          id="projectName"
          name="projectName"
          required
          v-model.lazy="projectName"
        />
      </div>
      <div class="my-2">
        <label for="projectTech" class="mr-4">Teknologi: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="text"
          id="projectTech"
          name="projectTech"
          required
          v-model.lazy="projectTech"
        />
      </div>
      <div class="my-2">
        <label for="projectDesc" class="mr-4">Deskripsi: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="text"
          id="projectDesc"
          name="projectDesc"
          required
          v-model.lazy="projectDesc"
        />
      </div>
      <div class="my-2">
        <label for="projectImg" class="mr-4">Image URL: </label>
        <input
          class="py-2 w-full file:border-1 file:px-5 file:py-2.5 file:rounded"
          type="file"
          id="projectImg"
          name="projectImg"
          accept="image/*"
          required
          @change="handleFileUpload"
        />
      </div>
      <div class="my-2">
        <label for="projectDemo" class="mr-4">Demo URL: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="url"
          id="projectDemo"
          name="projectDemo"
          v-model.lazy="projectDemo"
        />
      </div>
      <div class="my-2">
        <label for="projectGithub" class="mr-4">Github URL</label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="url"
          id="projectGithub"
          name="projectGithub"
          required
          v-model.lazy="projectGithub"
        />
      </div>
      <div class="my-2">
        <label for="projectCreatedAt" class="mr-4">Tanggal: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="date"
          id="projectCreatedAt"
          name="projectCreatedAt"
          v-model.lazy="projectCreatedAt"
        />
      </div>
      <input
        class="rounded text-white bg-black px-5 py-2.5 mt-5"
        type="submit"
        value="Submit"
      />
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import supabase from "@/utils/supabase";

const projectName = ref();
const projectTech = ref();
const projectDesc = ref();
const projectImg = ref(null);
const projectDemo = ref();
const projectGithub = ref();
const projectCreatedAt = ref();

function handleFileUpload(e) {
  projectImg.value = e.target.files[0];
}

async function postProject() {
  if (!projectImg.value) {
    console.error("Please upload an image");
    return;
  }

  const filePath = `${projectImg.value.name.replace(/\s/g, "_")}`;
  const { data: dataStorage, error: uploadError } = await supabase.storage
    .from("project")
    .upload(filePath, projectImg.value, {
      upsert: true,
    });

  if (uploadError) {
    console.error("Error uploading image", uploadError);
    return;
  }

  const { data, error } = await supabase.from("projects").insert([
    {
      project_name: projectName.value,
      project_tech: projectTech.value,
      project_desc: projectDesc.value,
      project_img: filePath,
      project_demo: projectDemo.value,
      project_github: projectGithub.value,
      created_at: projectCreatedAt.value,
    },
  ]);

  if (!data) {
    console.error("Error inserting data", error);
    return;
  }

  console.log("Berhasil");
}
</script>
<style lang=""></style>
