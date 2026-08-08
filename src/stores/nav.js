import { defineStore } from "pinia";
import { reactive } from "vue";

export const navStore = defineStore("nav", () => {
  const navItems = reactive([
    {
      id: 1,
      text: "Home",
      isActive: true,
      href: "/#first",
    },
    {
      id: 2,
      text: "About",
      isActive: false,
      href: "/#second",
    },
    {
      id: 3,
      text: "Experience",
      isActive: false,
      href: "/#experience",
    },
    {
      id: 4,
      text: "Projects",
      isActive: false,
      href: "/#third",
    },
    {
      id: 5,
      text: "Blog",
      isActive: false,
      href: "/#fourth",
    },
  ]);

  function setActive(id) {
    navItems.forEach((item) => {
      item.isActive = item.id === id;
    });
  }

  function clearActive() {
    navItems.forEach((item) => {
      item.isActive = false;
    });
  }

  return {
    navItems,
    setActive,
    clearActive,
  };
});
