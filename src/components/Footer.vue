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
          @mouseenter="hoverLinkHire"
          @mouseleave="hoverLinkHire"
          class="bg-light px-8 py-3 text-sm lg:text-base font-bold rounded-full cursor-pointer transition-all duration-300 ease-in-out flex flex-row gap-1 items-center text-primary"
          hover="bg-bright text-light"
          href="mailto:hello@iqbalramadan.me"
          ><p class="m-0">Hire me</p>
          <svg
            id="arrowLink"
            xmlns="http://www.w3.org/2000/svg"
            class="size-4 transition-all duration-300 ease-in-out text-primary"
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
      <hr class="my-5" />
      <div class="flex flex-col lg:flex-row justify-between items-center gap-2">
        <div class="">
          <p class="m-0 text-14px text-center lg:text-left text-light">
            Copyright &copy; {{ year }} Iqbal Ramadan. All Rights Reserved.
          </p>
        </div>
        <div class="flex flex-row text-light items-center text-14px">
          <a href="" class="text-light" hover="text-bright underline">User Terms & Conditions</a>
          |
          <a href="" class="text-light" hover="text-bright underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { ref } from "vue";

let year = ref(years());

function years() {
  const date = new Date();
  return date.getFullYear();
}

function hoverLinkHire() {
  const arrowLink = document.querySelectorAll("#arrowLink")[0];
  arrowLink.classList.toggle("text-primary");
  arrowLink.classList.toggle("text-light");
}
</script>
<style lang=""></style>
