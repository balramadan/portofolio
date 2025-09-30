<template>
  <footer class="bg-primary">
    <div class="bg-[#333] py-5 px-5 sm:px-30 rounded-t-5">
      <div
        class="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 pb-5"
      >
        <h3 class="text-light text-xl lg:text-4xl my-auto">
          Let's Connect there
        </h3>
        <a
          class="bg-light px-8 py-3 text-sm lg:text-base font-bold rounded-full cursor-pointer transition-all duration-300 ease-in-out flex flex-row gap-1 items-center text-primary group"
          hover="bg-bright text-light"
          href="mailto:hello@iqbalramadan.me"
          ><p class="m-0">Hire me</p>
          <svg
            id="arrowLink"
            xmlns="http://www.w3.org/2000/svg"
            class="size-4 transition-all duration-300 ease-in-out text-primary"
            group-hover="text-white size-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M6 18L18 6m0 0H9m9 0v9"
            /></svg
        ></a>
      </div>
      <hr class="my-5 text-white" />
      <div class="flex flex-col lg:flex-row justify-between items-center gap-2">
        <div class="">
          <p class="m-0 text-14px text-center lg:text-left text-light">
            Copyright &copy; {{ year }} Iqbal Ramadan. All Rights Reserved.
          </p>
        </div>
        <div class="flex flex-row gap-2 text-light items-center text-14px">
          <a
            v-for="item in sosialMedia"
            :href="item.url"
            target="_blank"
            class="flex gap-2 items-center group"
          >
            <p duration-300 ease-linear group-hover="text-bright">Donate me</p>
            <span class="sr-only">{{ item.name }}</span>
            <div
              :class="item.icon"
              flex
              p3
              sm-p3.5
              duration-300
              ease-linear
              bg="light dark:gray-2"
              group-hover="bg-bright text-light"
            ></div>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { ref } from "vue";

const sosialMedia = ref([
  {
    name: "Instagram",
    url: "https://iqbalramadan.link/pay",
    icon: "i-iconoir:donate",
  },
]);

let year = ref(years());
function years() {
  const date = new Date();
  return date.getFullYear();
}
</script>
<style lang=""></style>
