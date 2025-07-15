import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Cart from "../pages/Cart.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/cart", component: Cart },
  ],
});
