<template lang="">
  <div id="first" class="bg-primary h-full sm:h-screen z-0">
    <div
      class="relative pt-25 pb-10 sm:pb-0 lg:pt-40 m-0 px-5 sm:px-10 lg:px-30 flex flex-col text-start sm:h-screen"
    >
      <div class="">
        <div id="hello" class="text-base text-white py-2">Hi, my name is</div>
        <div class="text-4xl lg:text-7xl font-semibold">
          <p class="m-0 font-inter" text="[#F97300]" id="textHero">
            Iqbal Ramadan.
          </p>
          <p class="m-0 font-inter mt-2.5 opacity-60" text="[#F97300]">
            I build things for the web.
          </p>
        </div>
        <div class="">
          <p
            class="text-white opacity-60 mt-5 text-wrap mr-0 lg:mr-100 xl:mr-150"
          >
            I’m a software engineer specializing in building (and occasionally
            designing) exceptional digital experiences. Currently, I am focusing
            on studying mobile development to expand my knowledge.
          </p>
          <a href="#third" class="scroll-smooth">
            <div
              class="mt-5 py-3 px-5 w-52 text-[#F97300] border border-[#F97300] opacity-60 rounded cursor-pointer transition-all duration-500 ease-in-out"
              hover="shadow mt-4 bg-[#C97300] bg-opacity-10 opacity-100"
            >
              Check what I've done
            </div>
          </a>
        </div>
      </div>
      <!-- <div class="flex flex-col items-center bottom-0 pb-0 z-0">
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
      </div> -->
    </div>
    <div
      class="fixed hidden sm:flex flex-row items-center gap-2 bottom-30 -right-18 z-99 rotate-90"
    >
      <a
        href="mailto:hello@iqbalramadan.me"
        class="text-light text-sm font-mono"
        hover="text-bright"
        >hello@iqbalramadan.my.id</a
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
// import gsap from "gsap";
// import { onMounted } from "vue";

// function scrollTo() {
//   window.scrollTo({
//     top: window.innerHeight,
//     behavior: "smooth",
//   });
// }

// onMounted(() => {
//   gsap.from("#hello", {
//     duration: 1,
//     y: -200,
//     ease: "expo.out",
//   });
//   gsap.from("#textHero", {
//     duration: 2,
//     delay: 0.8,
//     y: -500,
//     ease: "expo.out",
//   });
//   gsap.from("#profileImage", {
//     duration: 2,
//     delay: 1.2,
//     y: 200,
//     scale: 0,
//     ease: "expo.out",
//   });
//   gsap.from("#circleHero", {
//     duration: 2,
//     delay: 1.3,
//     scale: 0,
//     ease: "circ.out",
//   });
//   gsap.from("#arrowDown", {
//     duration: 2,
//     y: -20,
//     repeat: -1,
//     yoyo: true,
//   });
// });
</script>
<style lang=""></style>
