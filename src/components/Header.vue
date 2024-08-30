<template>
  <div
    @click="closeNavBar()"
    aria-hidden="true"
    class="sticky bg-gray-8/40 inset-0 z-999"
    :class="navIsOpen ? 'flex lg-hidden' : 'hidden'"
  ></div>
  <header
    fixed
    left-0
    right-0
    top-0
    lg:mx-30
    lg:mt-5
    lg:rounded-full
    flex
    items-center
    h20
    bg="primary lg:white/25 dark:gray-950"
    border-b="~ white/50 lg:white/20 dark:gray-7"
    z99
    shadow-sm
    lg:backdrop-blur-sm
  >
    <nav
      relative
      max-w-screen
      px-5
      w-full
      px="5 sm:10 md:12 lg:5"
      flex
      gap-x-5
      justify-between
      items-center
    >
      <div aria-hidden="true" class="w-full flex items-center lg-hidden">
        <button
          @click="toggleNavBar()"
          aria-label="toggle navbar"
          outline-none
          border-none
          bg-transparent
          relative
          py3
          pr3
          cursor-pointer
        >
          <div
            aria-hidden="true"
            h0.5
            w6
            rd
            transition
            duration-300
            bg="light"
            :class="navIsOpen ? 'rotate-45 translate-y-1.5' : ''"
          ></div>
          <div
            aria-hidden="true"
            mt2
            h0.5
            w6
            rd
            transition
            duration-300
            bg="light"
            :class="navIsOpen ? '-rotate-45 -translate-y-1.5' : ''"
          ></div>
        </button>
      </div>
      <div
        absolute
        lg-relative
        lg-flex
        w-full
        top-full
        lg-top-0
        left-0
        mt="5 lg:0"
        bg="white dark:gray-950 lg:transparent dark:lg:transparent"
        border-b="~ gray-2 dark:gray-8 lg:0"
        ease-linear
        duration-300
        :class="
          navIsOpen ? 'visible op100' : 'invisible op0 lg-visible lg-op-100'
        "
      >
        <ul
          px="5 sm:10 md:12 lg:0"
          flex
          flex-col
          lg:flex-row
          lg:items-center
          py="4 lg:0"
          gap="y-6 lg:x-8"
          text="gray-7 dark:gray-3"
        >
          <li v-for="navItem in navItems" :key="navItem.id">
            <a
              v-if="navItem.isActive"
              :href="navItem.href"
              class="relative py3 transition-all duration-300 ease-linear lg:after-hidden after-absolute after-content-empty after-bg-primary after-w-full after-left-0 after-bottom-0 after-h-px after-rd-md after-duration-300 after-ease-linear lg:bg-light lg:rounded-full lg:px-5 text-primary"
            >
              {{ navItem.text }}
            </a>
            <a
              v-else
              :href="navItem.href"
              class="relative py3 transition-all duration-300 ease-linear lg:after-hidden after-absolute after-content-empty after-bg-primary after-w-full after-left-0 after-bottom-0 after-h-px after-rd-md after-duration-300 after-ease-linear after-scale-x-0 hover-after-scale-x-100 text-primary lg:text-light"
              hover="lg:bg-light/40 lg:px-5 lg:rounded-full"
            >
              {{ navItem.text }}
            </a>
          </li>
        </ul>
      </div>
      <div class="flex items-center flex-1">
        <router-link
          to="/"
          class="text-gray-8 dark-text-gray-2 flex items-center gap-x-0.5"
        >
          <img src="/logo.webp" alt="Iqbal" class="h-10" />
        </router-link>
      </div>
      <div flex justify-end items-center gap-x="1.5 sm:5" w-full text="light">
        <a href="https://instagram.com/balramadan" target="_blank" duration-200 ease-linear>
          <span class="sr-only">Instagram</span>
          <span
            i-carbon:logo-instagram
            flex
            p3
            sm-p3.5
            duration-300
            ease-linear
            bg="light dark:gray-2"
            hover=" bg-[#F97300] text-light"
          ></span>
        </a>
        <a
          href="https://linkedin.com/in/balramadan"
          target="_blank"
          duration-200
          ease-linear
          hover="text-gray-8 dark:text-gray-2"
        >
          <span class="sr-only">Linkedin</span>
          <span
            i-carbon-logo-linkedin
            flex
            p3
            sm-p3.5
            duration-300
            ease-linear
            bg="light dark:gray-2"
            hover="bg-[#F97300] text-light"
          ></span>
        </a>
        <a
          href="https://github.com/balramadan"
          target="_blank"
          duration-200
          ease-linear
          hover="text-gray-8 dark:text-gray-2"
        >
          <span class="sr-only">Github</span>
          <span
            i-carbon-logo-github
            flex
            p3
            sm-p3.5
            duration-300
            ease-linear
            bg="light dark:gray-2"
            hover="bg-[#F97300] text-light"
          ></span>
        </a>
        <a
          href="https://gitlab.com/balramadan"
          target="_blank"
          duration-200
          ease-linear
          hover="text-gray-8 dark:text-gray-2"
        >
          <span class="sr-only">gitlab</span>
          <span
            i-carbon-logo-gitlab
            flex
            p3
            sm-p3.5
            duration-300
            ease-linear
            bg="light dark:gray-2"
            hover=" bg-[#F97300] text-light"
          ></span>
        </a>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { navStore } from "@/stores/nav";

const navIsOpen = ref(false);

const navItems = navStore().navItems;

function toggleNavBar() {
  navIsOpen.value = !navIsOpen.value;
  document.body.classList.toggle("overflow-y-auto");
}

function closeNavBar() {
  navIsOpen.value = false;
  document.body.classList.add("overflow-y-auto");
}

// function navLink(id) {
//   const element = ref[id];
//   const top = element.offsetTop;
//   window.scrollTo(0, top);
// }
</script>
<style lang=""></style>
