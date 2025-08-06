import { createRouter, createWebHistory } from "vue-router";
import Cart from "../pages/Cart.vue";
import Settings from "../pages/Settings.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/cart", component: Cart },
    { path: "/settings", component: Settings },
  ],
});
