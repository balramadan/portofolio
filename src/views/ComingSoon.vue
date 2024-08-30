<template>
  <div @mousemove="movePointer">
    <Header />
    <div
      class="bg-primary h-screen px-5 sm:px-30 py-20 sm:py-30 flex flex-col justify-center items-center"
    >
      <h2
        id="csText"
        class="m-0 text-light text-center text-2xl sm:text-6xl font-rubik"
      >
        Coming Soon
      </h2>
      <p id="dcText" class="text-light text-center text-sm sm:text-base">
        This page is under maintenance, come back soon
      </p>
    </div>
    <svg
      id="mousepointer"
      xmlns="http://www.w3.org/2000/svg"
      class="mousepointer hidden lg:block fixed top-0 left-0 pointer-events-none"
      w="100px"
      h="100px"
      viewBox="0 0 512 512"
    >
      <defs>
        <linearGradient
          id="meteoconsCodeOrangeFill0"
          x1="163.5"
          x2="296.6"
          y1="185.7"
          y2="416.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#ffc078" />
          <stop offset=".5" stop-color="#ffc078" />
          <stop offset="1" stop-color="#ff922b" />
        </linearGradient>
      </defs>
      <path
        fill="url(#meteoconsCodeOrangeFill0)"
        stroke="#ffa94d"
        stroke-miterlimit="10"
        stroke-width="4"
        d="m381 340.1l-52.8-97.3l-51-94.2a24 24 0 0 0-42.4 0l-51 94.2l-52.8 97.3a24.3 24.3 0 0 0 21.2 35.9h207.7a24.2 24.2 0 0 0 21.1-35.9ZM243 216.6q1.5-1.3 5.5-1.3h15.3c2.7 0 4.5.4 5.6 1.3s1.5 2.4 1.4 4.7l-3 71.8c-.1 2.3-.7 3.8-1.6 4.6s-2.7 1.3-5.4 1.3h-9.4c-2.6 0-4.4-.5-5.3-1.3s-1.5-2.3-1.6-4.6l-2.9-71.9c0-2.2.4-3.8 1.4-4.6Zm29.1 107.6q0 7-3 9.6c-2 1.7-5.7 2.6-11 2.6H254c-5.4 0-9-1-11-2.6s-3-5-3-9.6v-2.9q0-7 3-9.6c2-1.7 5.6-2.5 11-2.5h4c5.4 0 9 .8 11 2.5s3 5 3 9.6Z"
      />
    </svg>
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue";
import gsap from "gsap";

onMounted(() => {
  gsap.set("#mousepointer", { xPercent: -50, yPercent: -50 });
  gsap.from("#csText", {
    duration: 1.2,
    letterSpacing: 10,
    y: -30,
    rotateZ: -10,
    yoyo: true,
    repeat: -1,
    ease: "power4.in",
  });
  gsap.to("#dcText", {
    duration: 1.2,
    delay: 0.6,
    letterSpacing: 10,
    y: 5,
    rotateZ: 10,
    yoyo: true,
    repeat: -1,
    ease: "power4.in",
  });
});

function movePointer(e) {
  let xTo = gsap.quickTo("#mousepointer", "x", {
      duration: 0.6,
      ease: "power3",
    }),
    yTo = gsap.quickTo("#mousepointer", "y", { duration: 0.6, ease: "power3" });
  xTo(e.pageX);
  yTo(e.pageY);
}
</script>
<style lang=""></style>
