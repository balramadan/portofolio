import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue/client";
import "./assets/preflight.css";
import App from "./App.vue";
import router from "@/router";
import "virtual:uno.css";

const app = createApp(App);

app.use(createPinia());
app.use(createHead());
app.use(router);

app.mount("#app");
