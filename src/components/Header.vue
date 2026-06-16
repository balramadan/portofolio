<template>
  <!-- Mobile Menu Overlay -->
  <div
    @click="closeNavBar"
    class="fixed inset-0 bg-primary/80 backdrop-blur-sm z-[998] transition-opacity duration-300 lg:hidden"
    :class="
      navIsOpen
        ? 'opacity-100 visible'
        : 'opacity-0 invisible pointer-events-none'
    "
  ></div>

  <!-- Header -->
  <header
    class="fixed top-0 left-0 right-0 z-[999] transition-all duration-300"
    :class="[isScrolled ? 'py-4' : 'py-6', 'px-5 sm:px-10 lg:px-20']"
  >
    <nav
      class="mx-auto max-w-7xl flex items-center justify-between p-2 rounded-full transition-all duration-300 border border-white/5"
      :class="[
        isScrolled || navIsOpen
          ? 'bg-primary/80 backdrop-blur-sm shadow-lg shadow-black/5'
          : 'bg-transparent border-transparent',
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center pl-4">
        <router-link
          to="/"
          class="flex items-center gap-2 group"
          @click="closeNavBar"
        >
          <div
            class="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-bright/50 transition-colors duration-300"
          >
            <img
              src="/logo.webp"
              alt="Iqbal"
              class="w-full h-full object-cover"
              width="40"
              height="40"
            />
          </div>
          <span
            class="font-bold text-light font-inter tracking-tight group-hover:text-bright transition-colors duration-300"
            >Iqbal Ramadan</span
          >
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div
        class="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group"
          :class="
            item.isActive
              ? 'text-primary bg-light'
              : 'text-light/90 hover:text-light hover:bg-white/10'
          "
        >
          {{ item.text }}
        </a>
      </div>

      <!-- Social Icons (Desktop) -->
      <div class="hidden lg:flex items-center gap-2 pr-2">
        <a
          v-for="social in sosialMedia"
          :key="social.name"
          :href="social.url"
          target="_blank"
          class="p-2.5 rounded-full text-light/70 hover:text-white hover:bg-bright hover:shadow-lg hover:shadow-bright/20 transition-all duration-300"
          :aria-label="social.name"
        >
          <div :class="social.icon" class="text-lg"></div>
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleNavBar"
        class="lg:hidden p-2 text-light hover:text-bright transition-colors relative z-[1000]"
        aria-label="Toggle Menu"
      >
        <div class="w-6 h-5 flex flex-col justify-between relative">
          <span
            class="w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center"
            :class="navIsOpen ? 'rotate-45 translate-y-2' : ''"
          ></span>
          <span
            class="w-full h-0.5 bg-current rounded-full transition-all duration-300"
            :class="navIsOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center"
            :class="navIsOpen ? '-rotate-45 -translate-y-2.5' : ''"
          ></span>
        </div>
      </button>
    </nav>

    <!-- Mobile Menu Dropdown -->
    <div
      class="absolute top-full left-5 right-5 mt-2 p-4 rounded-2xl bg-primary/90 backdrop-blur-xl border border-white/10 shadow-2xl transform transition-all duration-300 origin-top lg:hidden"
      :class="
        navIsOpen
          ? 'opacity-100 scale-y-100 translate-y-0'
          : 'opacity-0 scale-y-95 -translate-y-4 pointer-events-none'
      "
    >
      <ul class="flex flex-col gap-2">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="item.href"
            class="block px-4 py-3 rounded-xl text-center font-medium transition-all duration-300"
            :class="
              item.isActive
                ? 'bg-bright text-white shadow-lg shadow-bright/20'
                : 'text-light/80 hover:bg-white/5 hover:text-light'
            "
            @click="closeNavBar"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>

      <div class="h-[1px] w-full bg-white/10 my-4"></div>

      <div class="flex justify-center gap-4">
        <a
          v-for="social in sosialMedia"
          :key="social.name"
          :href="social.url"
          target="_blank"
          class="p-3 rounded-full bg-white/5 text-light hover:bg-bright hover:text-white transition-all duration-300"
        >
          <div :class="social.icon" class="text-xl"></div>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { navStore } from "@/stores/nav";

const navIsOpen = ref(false);
const isScrolled = ref(false);
const navItems = navStore().navItems;

const sosialMedia = [
  {
    name: "Instagram",
    url: "https://instagram.com/balramadan",
    icon: "i-carbon-logo-instagram",
  },
  {
    name: "Linkedin",
    url: "https://linkedin.com/in/balramadan",
    icon: "i-carbon-logo-linkedin",
  },
  {
    name: "Github",
    url: "https://github.com/balramadan",
    icon: "i-carbon-logo-github",
  },
  {
    name: "Gitlab",
    url: "https://gitlab.com/balramadan",
    icon: "i-carbon-logo-gitlab",
  },
];

function toggleNavBar() {
  navIsOpen.value = !navIsOpen.value;
  if (navIsOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeNavBar() {
  navIsOpen.value = false;
  document.body.style.overflow = "";
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Add any specific styles if needed, but Tailwind/UnoCSS should cover most */
</style>
