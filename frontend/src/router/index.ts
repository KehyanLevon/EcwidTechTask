import { createRouter, createWebHistory } from "vue-router";
import Cart from "../pages/Cart.vue";
import Settings from "../pages/Settings.vue";
import ProductDetail from "../pages/ProductDetail.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/cart", component: Cart },
    { path: "/settings", component: Settings },
    { path: "/product/:id", component: ProductDetail },
  ],
});
