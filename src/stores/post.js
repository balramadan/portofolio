import { defineStore } from "pinia";

export const postStore = defineStore("post", {
  state: () => ({
    posts: [],
  }),
  actions: {
    setPosts(posts) {
      this.posts = posts;
    }
  },
});
