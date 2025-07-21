import { createRouter, createWebHistory } from "vue-router";
import Cart from "../pages/Cart.vue";
import Settings from "../pages/Settings.vue";
import ProductDetail from "../pages/ProductDetail.vue";
import Account from "../pages/Account.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/cart", component: Cart },
    { path: "/settings", component: Settings },
    { path: "/product/:id", component: ProductDetail },
    { path: "/account", component: Account },
  ],
});
