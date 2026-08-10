<template>
  <footer
    id="footer"
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
        <div id="footer-cta" class="flex flex-col items-start">
          <!-- Availability Badge -->
          <div
            class="flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
          >
            <span class="relative flex h-2.5 w-2.5">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"
              ></span>
            </span>
            <span
              class="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase"
            >
              Available for Freelance & Roles
            </span>
          </div>

          <h2
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-light font-jakarta mb-6 tracking-tight leading-tight"
          >
            Let's build something
            <span class="text-bright">amazing</span> together.
          </h2>
          <p
            class="text-light/70 text-base sm:text-lg mb-8 max-w-md font-lato leading-relaxed"
          >
            Have a project in mind or just want to say hi? I'm always open to
            discussing new projects, creative ideas or opportunities to be part
            of your visions.
          </p>
          <div class="flex flex-wrap gap-4">
            <a
              href="mailto:mail@helloiqbal.me"
              class="group relative inline-flex items-center justify-center px-8 py-4 font-jakarta font-bold text-primary bg-light rounded-full hover:bg-bright hover:text-white transition-all duration-300 shadow-lg shadow-light/10 hover:shadow-bright/25"
            >
              <span class="mr-2">Start a Project</span>
              <div
                class="i-carbon-arrow-up-right text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              ></div>
            </a>
            <a
              href="https://github.com/sponsors/balramadan"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center justify-center px-8 py-4 font-mono text-light border border-white/10 rounded-full hover:border-bright/50 hover:text-bright transition-all duration-300"
            >
              <span class="i-iconoir-donate text-xl mr-2"></span>
              <span>Support Me</span>
            </a>
          </div>
        </div>

        <!-- Navigation & Socials -->
        <div
          id="footer-links"
          class="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 lg:pl-20"
        >
          <!-- SITEMAP -->
          <div class="flex flex-col gap-4">
            <h4
              class="text-light font-bold font-jakarta tracking-wider uppercase text-xs opacity-50"
            >
              Sitemap
            </h4>
            <ul class="flex flex-col gap-3">
              <li v-for="item in navItems" :key="item.id">
                <a
                  :href="item.href"
                  class="text-light/80 hover:text-bright transition-colors duration-300 font-lato text-sm"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>

          <!-- SOCIALS -->
          <div class="flex flex-col gap-4">
            <h4
              class="text-light font-bold font-jakarta tracking-wider uppercase text-xs opacity-50"
            >
              Socials
            </h4>
            <ul class="flex flex-col gap-3">
              <li v-for="social in sosialMedia" :key="social.name">
                <a
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-light/80 hover:text-bright transition-colors duration-300 font-lato text-sm flex items-center gap-2 group"
                >
                  <span
                    :class="social.icon"
                    class="text-base text-light/50 group-hover:text-bright transition-colors"
                  ></span>
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
              class="text-light font-bold font-jakarta tracking-wider uppercase text-xs opacity-50"
            >
              Contact
            </h4>
            <ul class="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:mail@helloiqbal.me"
                  class="text-light/80 hover:text-bright transition-colors duration-300 font-lato text-sm break-all"
                >
                  mail@helloiqbal.me
                </a>
              </li>
              <li
                class="text-light/50 font-lato text-sm flex items-center gap-1.5"
              >
                <span class="i-carbon-location text-bright"></span>
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div
        class="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 p-0.8 rounded-full overflow-hidden border border-white/10"
          >
            <img
              src="/logo.webp"
              alt="Iqbal Ramadan"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="text-light font-bold font-jakarta tracking-tight text-sm"
            >Iqbal Ramadan</span
          >
        </div>

        <p class="text-light/40 text-xs font-lato text-center sm:text-right">
          &copy; {{ year }} Iqbal Ramadan. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted } from "vue";
import { navStore } from "@/stores/nav";
import { useScrollReveal } from "@/composables/useScrollReveal";

const navItems = navStore().navItems;
const year = new Date().getFullYear();
const { reveal } = useScrollReveal();

const sosialMedia = [
  {
    name: "Instagram",
    url: "https://instagram.com/balramadan",
    icon: "i-carbon-logo-instagram",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/balramadan",
    icon: "i-carbon-logo-linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/balramadan",
    icon: "i-carbon-logo-github",
  },
  {
    name: "GitLab",
    url: "https://gitlab.com/balramadan",
    icon: "i-carbon-logo-gitlab",
  },
];

onMounted(() => {
  reveal("#footer-cta", { y: 30, duration: 0.8 });
  reveal("#footer-links", { y: 30, duration: 0.8, delay: 0.2 });
});
</script>

<style scoped></style>
