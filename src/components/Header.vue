<template>
  <!-- Mobile Menu Overlay -->
  <div
    @click="closeNavBar"
    class="fixed inset-0 bg-primary/80 backdrop-blur-md z-[998] transition-opacity duration-300 lg:hidden"
    :class="
      navIsOpen
        ? 'opacity-100 visible'
        : 'opacity-0 invisible pointer-events-none'
    "
  ></div>

  <!-- Header Container -->
  <header
    class="fixed top-0 left-0 right-0 z-[999] transition-all duration-300"
    :class="[isScrolled ? 'py-3' : 'py-5', 'px-4 sm:px-8 lg:px-16']"
  >
    <nav
      class="mx-auto max-w-7xl flex items-center justify-between p-2 rounded-full transition-all duration-300 border border-white/10"
      :class="[
        isScrolled || navIsOpen
          ? 'bg-surface/85 backdrop-blur-xl shadow-xl shadow-black/20 border-white/15'
          : 'bg-primary/40 backdrop-blur-md border-white/5',
      ]"
    >
      <!-- Logo & Name -->
      <div class="flex items-center pl-3">
        <router-link
          to="/"
          class="flex items-center gap-3 group"
          @click="closeNavBar"
        >
          <div
            class="relative w-9 h-9 p-0.8 rounded-full overflow-hidden border border-white/15 group-hover:border-bright transition-colors duration-300 shadow-[0_0_10px_rgba(249,115,0,0.2)]"
          >
            <img
              src="/logo.webp"
              alt="Iqbal Ramadan"
              class="w-full h-full object-cover"
              width="36"
              height="36"
            />
          </div>
          <span
            class="font-bold text-light font-jakarta tracking-tight text-sm sm:text-base group-hover:text-bright transition-colors duration-300"
          >
            Iqbal Ramadan
          </span>
        </router-link>
      </div>

      <!-- Desktop Navigation Links -->
      <div
        class="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          class="px-5 py-2 rounded-full text-xs font-semibold font-jakarta transition-all duration-300 relative group"
          :class="
            item.isActive
              ? 'text-bright bg-bright/10 border border-bright/30 shadow-[0_0_15px_rgba(249,115,0,0.15)]'
              : 'text-light/80 hover:text-light hover:bg-white/10 border border-transparent'
          "
        >
          {{ item.text }}
        </a>
      </div>

      <!-- Desktop Right Actions: Socials & Hire Me -->
      <div class="hidden lg:flex items-center gap-3 pr-2">
        <div class="flex items-center gap-1">
          <a
            v-for="social in sosialMedia"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-full text-light/70 hover:text-bright hover:bg-white/5 transition-all duration-300"
            :aria-label="social.name"
          >
            <div :class="social.icon" class="text-base"></div>
          </a>
        </div>

        <!-- Hire Me Pill Button -->
        <a
          href="mailto:mail@helloiqbal.me"
          class="px-4 py-1.5 rounded-full bg-bright text-white text-xs font-bold font-jakarta hover:bg-bright/90 hover:shadow-[0_0_15px_rgba(249,115,0,0.4)] transition-all duration-300 flex items-center gap-1.5"
        >
          <span>Hire Me</span>
          <div class="i-carbon-arrow-up-right text-xs"></div>
        </a>
      </div>

      <!-- Mobile Menu Hamburger Button -->
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
      class="absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-surface/95 backdrop-blur-xl border border-white/10 shadow-2xl transform transition-all duration-300 origin-top lg:hidden"
      :class="
        navIsOpen
          ? 'opacity-100 scale-y-100 translate-y-0'
          : 'opacity-0 scale-y-95 -translate-y-4 pointer-events-none'
      "
    >
      <ul class="flex flex-col gap-2">
        <li
          v-for="(item, index) in navItems"
          :key="item.id"
          class="transition-all duration-300"
          :style="{ transitionDelay: `${index * 50}ms` }"
          :class="
            navIsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          "
        >
          <a
            :href="item.href"
            class="block px-4 py-2.5 rounded-xl text-center font-medium font-jakarta text-sm transition-all duration-300"
            :class="
              item.isActive
                ? 'bg-bright text-white font-bold shadow-lg shadow-bright/20'
                : 'text-light/80 hover:bg-white/5 hover:text-light'
            "
            @click="closeNavBar"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>

      <div class="h-[1px] w-full bg-white/10 my-3"></div>

      <div class="flex items-center justify-between gap-3">
        <div class="flex gap-2">
          <a
            v-for="social in sosialMedia"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2.5 rounded-full bg-white/5 text-light hover:bg-bright hover:text-white transition-all duration-300"
          >
            <div :class="social.icon" class="text-base"></div>
          </a>
        </div>

        <a
          href="mailto:mail@helloiqbal.me"
          class="px-4 py-2 rounded-full bg-bright text-white text-xs font-bold font-jakarta hover:bg-bright/90 shadow-md shadow-bright/20 transition-all duration-300 flex items-center gap-1"
        >
          <span>Hire Me</span>
          <div class="i-carbon-arrow-up-right text-xs"></div>
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
  isScrolled.value = window.scrollY > 40;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped></style>
