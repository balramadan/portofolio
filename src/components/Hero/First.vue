<template lang="">
  <div id="first" class="bg-primary h-screen z-0">
    <div
      class="relative pt-20 lg:pt-30 m-0 px-5 lg:px-30 flex flex-col justify-between items-center text-center h-screen"
    >
      <div class="">
        <div
          id="hello"
          class="text-base text-white mx-auto px-5 py-2 border border-light rounded"
        >
          Hello
        </div>
        <div class="text-6xl font-semibold text-white">
          <p class="m-0" id="textHero">
            I'm <span text="[#F97300]">Iqbal</span>,<br />Frontend Developer
          </p>
        </div>
      </div>
      <div class="flex flex-col items-center bottom-0 pb-0 z-0">
        <svg
          id="circleHero"
          size="350px lg:500px"
          class="mt-10 stroke-[#F97300] opacity-50 z-0"
          fill="#F97300"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke=""
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M22,12c0,4.971-4.477,9-10,9S2,16.971,2,12,6.477,3,12,3,22,7.029,22,12Z"
            ></path>
          </g>
        </svg>
        <img
          id="profileImage"
          w="85 sm:90 2xl:120"
          class="object-cover absolute inset-0 mb-0 mx-auto mt-auto z-0"
          src="/polo-shirt-profile-crop.png"
          alt=""
        />
        <svg
          id="arrowDown"
          class="absolute inset-0 mb-0 mx-auto mt-auto cursor-pointer z-0"
          xmlns="http://www.w3.org/2000/svg"
          width="4em"
          height="4em"
          viewBox="0 0 24 24"
          @click="scrollTo"
        >
          <path
            fill="none"
            stroke="#F97300"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m6 13l6 6l6-6M6 5l6 6l6-6"
          />
        </svg>
      </div>
    </div>
    <div
      class="fixed hidden sm:flex flex-row items-center gap-2 bottom-30 -right-15 z-99 rotate-90"
    >
      <a
        href="mailto:hello@iqbalramadan.me"
        class="text-light"
        hover="text-bright"
        >hello@iqbalramadan.me</a
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          class="fill-light"
          fill=""
          d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
        />
      </svg>
    </div>
  </div>
</template>
<script setup>
import gsap from "gsap";
import { onMounted } from "vue";

function scrollTo() {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  });
}

onMounted(() => {
  gsap.from("#hello", {
    duration: 1,
    y: -200,
    ease: "expo.out",
  });
  gsap.from("#textHero", {
    duration: 2,
    delay: 0.8,
    y: -500,
    ease: "expo.out",
  });
  gsap.from("#profileImage", {
    duration: 2,
    delay: 1.2,
    y: 200,
    scale: 0,
    ease: "expo.out",
  });
  gsap.from("#circleHero", {
    duration: 2,
    delay: 1.3,
    scale: 0,
    ease: "circ.out",
  });
  gsap.from("#arrowDown", {
    duration: 2,
    y: -20,
    repeat: -1,
    yoyo: true,
  });
});
</script>
<style lang=""></style>
