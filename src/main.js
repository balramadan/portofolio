import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./assets/preflight.css";
import App from "./App.vue";
import router from "@/router";
import "virtual:uno.css";

// Prevent browser from restoring old scroll positions under the loader on page refresh
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Support Back/Forward Cache (bfcache) restoration
if (typeof window !== "undefined") {
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      ScrollTrigger.refresh();
    }
  });
}

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

const app = createApp(App);
const head = createHead();

app.use(createPinia());
app.use(head);
app.use(router);

app.mount("#app");
