import { createRouter, createWebHistory } from "vue-router";
import Store from "../pages/Store.vue";
import Settings from "../pages/Settings.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/store", component: Store },
    { path: "/settings", component: Settings },
  ],
});
