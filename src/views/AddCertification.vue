<template>
  <div
    v-if="isLoading"
    class="flex justify-center items-center w-full h-screen"
  >
    <span>Loading...</span>
  </div>
  <div v-else class="py-5 px-5 sm:px-10">
    <h1 class="font-bold text-2xl">Add Certificate</h1>
    <form @submit.prevent="postCertification" class="mt-5" method="post">
      <div class="my-2">
        <label for="certiName" class="mr-4">Certificate Name: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="text"
          id="certiName"
          name="certiName"
          required
          v-model.lazy="certiName"
        />
      </div>
      <div class="my-2">
        <label for="certiDesc" class="mr-4">Certificate Description: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="text"
          id="certiDesc"
          name="certiDesc"
          required
          v-model.lazy="certiDesc"
        />
      </div>
      <div class="my-2">
        <label for="certiImg" class="mr-4">Certificate Thumbnail: </label>
        <input
          class="py-2 w-full file:border-1 file:px-5 file:py-2.5 file:rounded"
          type="file"
          id="certiImg"
          name="certiImg"
          required
          @change="handleThumbnailUpload"
        />
      </div>
      <div class="my-2">
        <label for="certiFile" class="mr-4">Certificate File: </label>
        <input
          class="py-2 w-full file:border-1 file:px-5 file:py-2.5 file:rounded"
          type="file"
          id="certiFile"
          name="certiFile"
          required
          @change="handleFileUpload"
        />
      </div>
      <div class="my-2">
        <label for="certiIssuer" class="mr-4">Certificate Issuer: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="text"
          id="certiIssuer"
          name="certiIssuer"
          required
          v-model.lazy="certiIssuer"
        />
      </div>
      <div class="my-2">
        <label for="certiUrl" class="mr-4">Certificate Url: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="text"
          id="certiUrl"
          name="certiUrl"
          v-model.lazy="certiUrl"
        />
      </div>
      <div class="my-2">
        <label for="certiCategory" class="mr-4">Category: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="text"
          id="certiCategory"
          name="certiCategory"
          required
          v-model.lazy="certiCategory"
        />
      </div>
      <div class="my-2">
        <label for="certiDate" class="mr-4">Tanggal: </label>
        <input
          class="py-2 px-3 w-full border-1 rounded"
          type="date"
          id="certiDate"
          name="certiDate"
          required
          v-model.lazy="certiDate"
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

const isLoading = ref(false);

const certiName = ref("");
const certiDesc = ref("");
const certiImg = ref(null);
const certiPdf = ref(null);
const certiIssuer = ref("");
const certiUrl = ref("");
const certiCategory = ref("");
const certiDate = ref();

function handleThumbnailUpload(e) {
  certiImg.value = e.target.files[0];
}

function handleFileUpload(e) {
  certiPdf.value = e.target.files[0];
}

async function postCertification() {
  try {
    isLoading.value = true;

    if (!certiImg.value) {
      console.error("Please upload an image");
      return;
    }

    const thumbnailFilePath = `${certiImg.value.name.replace(/\s/g, "_")}`;
    const { data: thumbnail, error: thumbnailError } = await supabase.storage
      .from("certifications/thumbnail")
      .upload(thumbnailFilePath, certiImg.value, {
        upsert: true,
      });

    if (thumbnailError) {
      console.error("Error uploading image", thumbnailError);
      return;
    }

    const filePath = `${certiPdf.value.name.replace(/\s/g, "_")}`;
    const { data: file, error: fileError } = await supabase.storage
      .from("certifications/file")
      .upload(filePath, certiPdf.value, {
        upsert: true,
      });

    if (fileError) {
      console.error("Error uploading image", fileError);
      return;
    }

    const { data, error } = await supabase.from("certifications").insert([
      {
        title: certiName.value,
        description: certiDesc.value,
        thumbnail: thumbnailFilePath,
        issuer: certiIssuer.value,
        pdf: filePath,
        category: certiCategory.value,
        verifyUrl: certiUrl.value,
        created_at: certiDate.value,
      },
    ]);

    consol.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<style></style>
