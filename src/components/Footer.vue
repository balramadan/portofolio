<template>
  <footer
    class="bg-primary pt-20 pb-10 px-5 sm:px-10 lg:px-20 overflow-hidden relative"
  >
    <!-- Background Elements -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-96 h-96 bg-bright/5 rounded-full blur-3xl -z-10"
    ></div>

    <div class="max-w-7xl mx-auto">
      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
        <!-- CTA Section -->
        <div class="flex flex-col items-start">
          <h2
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-light font-inter mb-6 tracking-tight leading-tight"
          >
            Let's build something
            <span class="text-bright">amazing</span> together.
          </h2>
          <p
            class="text-light/60 text-lg mb-8 max-w-md font-lato leading-relaxed"
          >
            Have a project in mind or just want to say hi? I'm always open to
            discussing new projects, creative ideas or opportunities to be part
            of your visions.
          </p>
          <div class="flex flex-wrap gap-4">
            <a
              href="mailto:mail@helloiqbal.me"
              class="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-primary bg-light rounded-full hover:bg-bright hover:text-white transition-all duration-300 shadow-lg shadow-light/10 hover:shadow-bright/20"
            >
              <span class="font-bold mr-2">Start a Project</span>
              <div
                class="i-carbon-arrow-up-right text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              ></div>
            </a>
            <a
              href="https://iqbalramadan.link/pay"
              target="_blank"
              class="group inline-flex items-center justify-center px-8 py-4 font-mono text-light border border-white/10 rounded-full hover:border-bright/50 hover:text-bright transition-all duration-300"
            >
              <span class="i-iconoir-donate text-xl mr-2"></span>
              <span>Support Me</span>
            </a>
          </div>
        </div>

        <!-- Navigation & Socials -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 lg:pl-20">
          <!-- SITEMAP -->
          <div class="flex flex-col gap-4">
            <h4
              class="text-light font-bold font-inter tracking-wide uppercase text-sm opacity-50"
            >
              Sitemap
            </h4>
            <ul class="flex flex-col gap-3">
              <li v-for="item in navItems" :key="item.id">
                <a
                  :href="item.href"
                  class="text-light/90 hover:text-bright transition-colors duration-300 font-lato"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>

          <!-- SOCIALS -->
          <div class="flex flex-col gap-4">
            <h4
              class="text-light font-bold font-inter tracking-wide uppercase text-sm opacity-50"
            >
              Socials
            </h4>
            <ul class="flex flex-col gap-3">
              <li v-for="social in sosialMedia" :key="social.name">
                <a
                  :href="social.url"
                  target="_blank"
                  class="text-light/70 hover:text-bright transition-colors duration-300 font-lato flex items-center gap-2 group"
                >
                  <span>{{ social.name }}</span>
                  <span
                    class="i-carbon-arrow-up-right text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  ></span>
                </a>
              </li>
            </ul>
          </div>

          <!-- CONTACT -->
          <div class="flex flex-col gap-4 col-span-2 sm:col-span-1">
            <h4
              class="text-light font-bold font-inter tracking-wide uppercase text-sm opacity-50"
            >
              Contact
            </h4>
            <ul class="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:mail@helloiqbal.me"
                  class="text-light/70 hover:text-bright transition-colors duration-300 font-lato"
                >
                  mail@helloiqbal.me
                </a>
              </li>
              <li class="text-light/40 font-lato text-sm">
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div
        class="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full overflow-hidden border border-white/10"
          >
            <img
              src="/logo.webp"
              alt="Iqbal"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="text-light font-bold font-inter tracking-tight"
            >Iqbal Ramadan</span
          >
        </div>

        <p class="text-light/40 text-sm font-lato text-center sm:text-right">
          &copy; {{ year }} Iqbal Ramadan. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { navStore } from "@/stores/nav";

const navItems = navStore().navItems;
const year = new Date().getFullYear();

const sosialMedia = [
  { name: "Instagram", url: "https://instagram.com/balramadan" },
  { name: "LinkedIn", url: "https://linkedin.com/in/balramadan" },
  { name: "GitHub", url: "https://github.com/balramadan" },
  { name: "GitLab", url: "https://gitlab.com/balramadan" },
];
</script>

<style scoped>
/* Scoped styles if needed */
</style>
