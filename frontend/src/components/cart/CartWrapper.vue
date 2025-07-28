<template>
  <div id="cart"></div>
  <div id="ecwid-cart-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { injectEcwidScript } from "../../utils/ecwidScript";

const moveEcWrapperToCart = () => {
  const ecWrapper = document.querySelector(
    ".ecwid-popup-content"
  ) as HTMLElement | null;
  const cart = document.getElementById("cart");
  if (ecWrapper && cart) cart.appendChild(ecWrapper);
};

const backToCart = () => {
  window.Ecwid?.OnPageLoaded.add((page) => {
    if (page.type === "ORDER_CONFIRMATION") {
      const interval = setInterval(() => {
        const btn = document.querySelector(
          ".ec-confirmation__continue .form-control__button"
        ) as HTMLElement | null;
        if (btn) {
          const span = btn.querySelector("span");
          if (span) span.textContent = "Back to cart";
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            window.Ecwid?.openPage("cart");
          });
          clearInterval(interval);
        }
      }, 200);
    }
  });
};

onMounted(() => {
  injectEcwidScript("cart", () => {
    window.Ecwid?.openPage("cart");
    moveEcWrapperToCart();
    backToCart();
  });
});
</script>
