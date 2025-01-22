<template>
  <div id="fourth" class="h-full bg-primary px-5 sm:px-30 py-5">
    <hr />
    <div class="flex flex-row justify-between items-center">
      <h2 class="text-light my-auto" m="t-5 lg:t-30">From my blog post</h2>
      <button
        class="bg-light text-primary font-semibold border-none my-auto rounded-full cursor-pointer transition-all duration-300 ease-in-out"
        m="t-5 lg:t-30"
        p="x-5 y-2"
        hover="bg-bright text-light"
      >
        See All
      </button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 py-5">
      <div
        id="cardPost"
        v-for="(item, index) in posts"
        :key="item"
        @mouseenter="hoverPost(index)"
        @mouseleave="hoverPost(index)"
        @click="toPost(item.permalink)"
        class="block px-5 py-5 border transition-all duration-300 linear"
        hover="cursor-pointer"
      >
        <div class="flex">
          <img
            :src="`https://rnjqyqiohdhnlcidizdw.supabase.co/storage/v1/object/public/post/${item.image}`"
            class="mx-auto mb-5 rounded object-cover"
            h="50"
            w="70 lg:50 xl:80"
            alt=""
          />
        </div>
        <div class="flex">
          <p
            class="text-center text-light text-sm font-semibold bg-light/20 rounded-full px-3 py-1 m-0 mx-auto"
            sm="mx-0 mr-auto"
          >
            {{ item.tag }}
          </p>
        </div>
        <div
          class="flex flex-row gap-4 justify-center items-center text-sm"
          sm="justify-left"
        >
          <div class="text-light flex flex-row items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
            <p class="my-3">{{ item.author }}</p>
          </div>
          <div class="text-light flex flex-row items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  stroke="currentColor"
                  stroke-width="1.5"
                  d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  d="M7 4V2.5M17 4V2.5M2.5 9h19"
                  opacity="0.5"
                />
                <path
                  fill="currentColor"
                  d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                />
              </g>
            </svg>
            <p class="my-3">{{ item.created_at }}</p>
          </div>
        </div>
        <div class="">
          <h2
            id="titlePost"
            class="font-rubik text-light text-center sm:text-left transition-all duration-300 linear"
          >
            {{ item.title }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { postStore } from "@/stores/post";
import supabase from "@/utils/supabase";
import router from "@/router";

function hoverPost(index) {
  const cardPost = document.querySelectorAll("#cardPost");
  const titlePost = document.querySelectorAll("#titlePost");
  cardPost[index].classList.toggle("bg-light/10");
  cardPost[index].classList.toggle("border-solid");
  cardPost[index].classList.toggle("border-light");
  titlePost[index].classList.toggle("text-light");
  titlePost[index].classList.toggle("text-bright");
}

function toPost(link) {
  location.href = `https://inspire.iqbalramadan.me/post/${link}`
}

const posts = ref([]);
const post = postStore();

onBeforeMount(async () => {
  try {
    let { data: postan, error } = await supabase.from("post").select("*");
    if (error) {
      throw new Error(error.message);
    }
    postan.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    posts.value = postan.slice(0, 3);
    post.setPosts(postan);
  } catch (e) {
    throw new Error(e.message);
  }
});
</script>
<style lang=""></style>
