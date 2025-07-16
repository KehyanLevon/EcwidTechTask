<template>
  <div class="cart-page">
    <div id="ecwid-cart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

declare global {
  interface Window {
    Ecwid?: {
      OnAPILoaded: { add: (cb: () => void) => void };
      openPage: (page: string) => void;
    };
  }
}

onMounted(() => {
  const storeId = "101560752";
  const container = document.getElementById("ecwid-cart-container");
  if (!container) return;

  container.innerHTML = "";

  const stripPopupStyles = () => {
    const overlay = document.querySelector(
      ".ecwid-overlay"
    ) as HTMLElement | null;
    if (overlay) {
      overlay.removeAttribute("style");
      overlay.className = "";
    }

    const popup = document.querySelector(
      ".ecwid-popup.ecwid-ProductBrowserPopup"
    ) as HTMLElement | null;
    if (popup) {
      popup.removeAttribute("style");
      popup.className = "";
    }

    const popupCloseButton = document.querySelector(
      ".ecwid-popup-closeButton"
    ) as HTMLElement | null;
    popupCloseButton?.remove();
  };

  const loadAndInit = () => {
    const s = document.createElement("script");
    s.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=${new Date()
      .toISOString()
      .slice(0, 10)}`;
    s.async = true;
    s.onload = () => {
      window.Ecwid?.OnAPILoaded.add(() => {
        window.Ecwid?.openPage("cart");
        setTimeout(stripPopupStyles, 150);
      });
    };
    document.body.appendChild(s);
  };

  if (window.Ecwid && window.Ecwid.openPage) {
    window.Ecwid.openPage("cart");
    setTimeout(stripPopupStyles, 150);
  } else {
    loadAndInit();
  }
});
</script>

<style scoped>
.cart-page {
  padding: 2rem;
}
</style>
