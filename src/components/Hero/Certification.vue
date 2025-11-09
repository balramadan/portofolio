<template>
  <div class="h-full bg-primary px-5 sm:px-30 py-5">
    <hr class="mb-5" />
    <h2 class="text-center text-light font-bold">Certification</h2>
    <div v-if="isLoading" class="mt-5">
      <span>Loading...</span>
    </div>
    <div v-else class="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div
        v-for="(item, index) in certifications"
        class="flex flex-col border-light/10 border-1 py-5 px-5"
        :key="index"
      >
        <img
          :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/certifications/thumbnail/${item.thumbnail}`"
          id="imageProject"
          w="full"
          h="35 sm:25 lg:40"
          class="object-cover rounded-lg transition ease-linear duration-300 mb-2.5"
          alt=""
        />
        <div class="flex flex-col gap-2">
          <h4 class="text-white">{{ item.title }}</h4>
          <p class="text-xs text-white/60">{{ item.description }}</p>
          <p class="text-xs text-white/60">Issuer: {{ item.issuer }}</p>
          <p class="text-xs text-white/60">
            Date: {{ new Date(item.created_at).toLocaleDateString("id-ID") }}
          </p>
          <div class="flex flex-row gap-4 py-2">
            <a
              :href="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/certifications/file/${item.pdf}`"
              class="text-[#F97300]/60"
              target="_blank"
              >Detail</a
            >
            <a
              v-if="item.verifyUrl"
              :href="item.verifyUrl"
              class="text-[#F97300]/60"
              target="_blank"
              >Verify</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import supabase from "@/utils/supabase";

const isLoading = ref(false);
const certifications = ref([]);

async function fetchCertifications() {
  try {
    isLoading.value = true;

    const { data: certification, error } = await supabase
      .from("certifications")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    if (certification) {
      certifications.value = certification
        .sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
        .slice(0, 6);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await fetchCertifications();
});
</script>
<style scoped></style>
