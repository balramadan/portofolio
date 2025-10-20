<template>
  <DetailLayout>
    <template #default>
      <div id="top" class="bg-primary min-h-[90vh] px-5 sm:px-30 py-5">
        <h2 class="text-center text-white text-xl font-bold mb-10">Projects</h2>
        <div v-if="isLoading" class="text-white">Loading...</div>
        <div v-else class="flex flex-col gap-5">
          <div
            v-for="(item, index) in projects"
            :key="index"
            class="flex flex-col w-full group cursor-pointer"
          >
            <div v-if="index % 2 == 0" class="grid grid-cols-1 md:grid-cols-5">
              <div
                v-if="isLoading"
                class="col-span-0 md:col-span-2 w-full h-45 sm:h-50 md:h-60 object-cover rounded-t-xl md:rounded-t-0 md:!rounded-l-xl"
              />
              <img
                v-else
                loading="lazy"
                class="col-span-0 md:col-span-2 w-full h-45 sm:h-50 md:h-60 object-cover rounded-t-xl md:rounded-t-0 md:!rounded-l-xl"
                :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/project/${item.project_img}`"
                :alt="item.project_name"
              />
              <div
                class="col-span-0 md:col-span-3 flex flex-col justify-between gap-2 bg-white/5 border-0.5 border-white/10 rounded-b-xl md:rounded-b-0 md:rounded-r-xl px-5 py-5 transition-all ease-in-out"
                group-hover="bg-white/10 border-white/20"
              >
                <h3
                  class="text-white tracking-widest font-semibold mb-5 group-hover:tracking-1 transition-all ease-in-out"
                >
                  {{ item.project_name }}
                </h3>
                <p class="text-white/60">{{ item.project_desc }}</p>
                <ul class="flex flex-row flex-wrap gap-2 m-0 p-0 mt-1.5">
                  <li
                    class="m-0 bg-light/10 rounded-full px-3 py-1 text-light"
                    text="3"
                    v-for="tech in item.project_tech"
                    :key="tech"
                  >
                    {{ tech }}
                  </li>
                </ul>
                <div
                  class="flex flex-row gap-5 justify-end md:justify-between items-center"
                >
                  <div class="hidden md:flex flex-row items-center gap-2">
                    <a :href="item.project_github" target="_blank">
                      <div
                        i-carbon:logo-github
                        class="size-6 text-white/60 hover:text-white transition-all ease-in-out duration-300"
                      />
                    </a>
                    <a
                      v-if="item.project_demo"
                      class="text-white/60 hover:text-white"
                      target="_blank"
                      :href="item.project_demo"
                    >
                      <div
                        i-carbon:link
                        class="size-6 text-white/60 hover:text-white transition-all ease-in-out duration-300"
                      />
                    </a>
                  </div>
                  <div class="text-sm text-white/60">
                    {{ dateLocal(item.created_at) }}
                  </div>
                </div>
                <div
                  class="grid md:hidden justify-center items-center gap-2"
                  :class="item.project_demo ? 'grid-cols-2' : 'grid-cols-1'"
                >
                  <a
                    class="border border-white/10 flex justify-center items-center py-2 rounded-xl"
                    :href="item.project_github"
                    target="_blank"
                  >
                    <div
                      i-carbon:logo-github
                      class="size-6 text-center text-white/60 hover:text-white transition-all ease-in-out duration-300"
                    />
                  </a>
                  <a
                    v-if="item.project_demo"
                    class="border border-white/10 flex justify-center items-center py-2 rounded-xl"
                    target="_blank"
                    :href="item.project_demo"
                  >
                    <div
                      i-carbon:link
                      class="size-6 text-center text-white/60 hover:text-white transition-all ease-in-out duration-300"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-5">
              <div
                class="col-span-0 md:col-span-3 flex flex-col justify-between gap-2 bg-white/5 border-0.5 border-white/10 rounded-b-xl md:rounded-b-0 md:rounded-l-xl px-5 py-5 transition-all ease-in-out"
                group-hover="bg-white/10 border-white/20"
              >
                <h3
                  class="text-white tracking-widest font-semibold mb-5 group-hover:tracking-1 transition-all ease-in-out"
                >
                  {{ item.project_name }}
                </h3>
                <p class="text-white/60">{{ item.project_desc }}</p>
                <ul class="flex flex-row flex-wrap gap-2 m-0 p-0 mt-1.5">
                  <li
                    class="m-0 bg-light/10 rounded-full px-3 py-1 text-light"
                    text="3"
                    v-for="tech in item.project_tech"
                    :key="tech"
                  >
                    {{ tech }}
                  </li>
                </ul>
                <div
                  class="flex flex-row gap-5 justify-end md:justify-between items-center"
                >
                  <div class="hidden md:flex flex-row items-center gap-2">
                    <a :href="item.project_github" target="_blank">
                      <div
                        i-carbon:logo-github
                        class="size-6 text-white/60 hover:text-white transition-all ease-in-out duration-300"
                      />
                    </a>
                    <a
                      v-if="item.project_demo"
                      class="text-white/60 hover:text-white"
                      target="_blank"
                      :href="item.project_demo"
                    >
                      <div
                        i-carbon:link
                        class="size-6 text-white/60 hover:text-white transition-all ease-in-out duration-300"
                      />
                    </a>
                  </div>
                  <div class="text-sm text-white/60">
                    {{ dateLocal(item.created_at) }}
                  </div>
                </div>
                <div
                  class="grid md:hidden justify-center items-center gap-2"
                  :class="item.project_demo ? 'grid-cols-2' : 'grid-cols-1'"
                >
                  <a
                    class="border border-white/10 flex justify-center items-center py-2 rounded-xl"
                    :href="item.project_github"
                    target="_blank"
                  >
                    <div
                      i-carbon:logo-github
                      class="size-6 text-center text-white/60 hover:text-white transition-all ease-in-out duration-300"
                    />
                  </a>
                  <a
                    v-if="item.project_demo"
                    class="border border-white/10 flex justify-center items-center py-2 rounded-xl"
                    target="_blank"
                    :href="item.project_demo"
                  >
                    <div
                      i-carbon:link
                      class="size-6 text-center text-white/60 hover:text-white transition-all ease-in-out duration-300"
                    />
                  </a>
                </div>
              </div>
              <div
                v-if="isLoading"
                class="col-span-0 md:col-span-2 w-full h-45 sm:h-50 md:h-60 object-cover order-first md:order-last rounded-t-xl md:rounded-t-0 md:!rounded-r-xl"
              />
              <img
                v-else
                loading="lazy"
                class="col-span-0 md:col-span-2 w-full h-45 sm:h-50 md:h-60 object-cover order-first md:order-last rounded-t-xl md:rounded-t-0 md:!rounded-r-xl"
                :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/project/${item.project_img}`"
                :alt="item.project_name"
              />
            </div>
          </div>
        </div>
        <!-- Elemen penanda (sentinel) untuk IntersectionObserver -->
        <div v-if="hasMoreData" ref="trigger" class="h-10"></div>

        <div v-if="isFetchingMore" class="text-center text-white/80 py-5">
          Loading more projects...
        </div>
        <div
          v-if="!hasMoreData && projects.length > 0"
          class="text-center text-white/40 py-5"
        >
          You've reached the end.
        </div>
      </div>
    </template>
  </DetailLayout>
</template>
<script setup lang="js">
import { onMounted, onUnmounted, ref } from 'vue';
import DetailLayout from '@/layouts/DetailLayout.vue';
import supabase from '@/utils/supabase';

const isLoading = ref(false);
const isFetchingMore = ref(false);
const projects = ref([]);
const page = ref(0);
const limit = 5; // Ambil 5 data per halaman
const hasMoreData = ref(true);
const trigger = ref(null); // Ref untuk elemen penanda
let observer = null;

async function fetchProjects(loadMore = false) {
  if (!hasMoreData.value || isFetchingMore.value) return;

  try {
    if (!loadMore) {
      isLoading.value = true;
    } else {
      isFetchingMore.value = true;
    }

    const from = page.value * limit;
    const to = from + limit - 1;

    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error);
      return;
    }

    if (project && project.length > 0) {
      projects.value = [...projects.value, ...project];
      page.value++;
      if (project.length < limit) {
        hasMoreData.value = false;
      }
    } else {
      hasMoreData.value = false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
    isFetchingMore.value = false;
  }
}

function dateLocal(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

onMounted(async () => {
  await fetchProjects();

  // Buat instance IntersectionObserver
  observer = new IntersectionObserver(
    (entries) => {
      // Jika elemen penanda terlihat di layar
      if (entries[0].isIntersecting) {
        fetchProjects(true); // Ambil data selanjutnya
      }
    },
    { rootMargin: "0px 0px 200px 0px" } // Trigger 200px sebelum elemen masuk viewport
  );

  // Mulai amati elemen penanda
  if (trigger.value) {
    observer.observe(trigger.value);
  }
});

onUnmounted(() => {
  // Hentikan pengamatan saat komponen dihancurkan
  if (observer) {
    observer.disconnect();
  }
});
</script>
<style></style>
