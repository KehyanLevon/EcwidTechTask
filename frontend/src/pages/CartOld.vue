<template>
  <div>
    <h2>Cart Page</h2>

    <div id="ec-cart"></div>

    <RecentlyUpdatedProducts />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import RecentlyUpdatedProducts from "../components/RecentlyUpdatedProducts.vue";

onMounted(() => {
  if (!document.getElementById("ecwid-script")) {
    const script = document.createElement("script");
    script.id = "ecwid-script";
    script.src =
      "https://app.ecwid.com/script.js?101560752&data_platform=code&data_date=2023-07-12";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    script.onload = () => {
      renderEcwidCart();
    };
  } else {
    renderEcwidCart();
  }

  function renderEcwidCart() {
    // Глобально настроим Ecwid на отображение только корзины
    (window as any).Ecwid = (window as any).Ecwid || {};
    (window as any).Ecwid.storefront = {
      settings: {
        productBrowserURL: "/store.html",
        // Отображать только корзину
        productBrowserLayout: "CART",
        show_breadcrumbs: false,
        show_navigation: false,
      },
    };

    // Отрисовать корзину в конкретный div
    const container = document.getElementById("ec-cart");
    if (container) {
      container.innerHTML = `<div itemscope itemtype="http://schema.org/Organization" class="ec-cart-widget">
        <div id="my-store-101560752"></div>
      </div>`;
    }

    // Принудительно переинициализировать
    if ((window as any).Ecwid?.init) {
      (window as any).Ecwid.init();
    }
  }
});
</script>
