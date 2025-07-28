<template>
  <div id="product-detail"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const storeId = import.meta.env.VITE_ECWID_STORE_ID;
let ecwidScript: HTMLScriptElement | null = null;

function initEcwid(id: string) {
  ecwidScript = document.createElement("script");
  ecwidScript.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=${new Date()
    .toISOString()
    .slice(0, 10)}`;
  ecwidScript.async = true;
  ecwidScript.id = "ecwid-product-detail-ecwid";

  ecwidScript.onload = () => {
    window.Ecwid?.OnAPILoaded.add(() => {
      window.Ecwid?.openPage("product", { id: Number(id) });
      moveEcWrapperToProductDetail();
      setTimeout(() => refactorEcwidComponent(), 200);
    });
  };
  document.body.appendChild(ecwidScript);
}

const moveEcWrapperToProductDetail = () => {
  const ecWrapper = document.querySelector(
    ".ecwid-popup-content"
  ) as HTMLElement | null;
  const productDetail = document.getElementById("product-detail");
  if (ecWrapper && productDetail) {
    productDetail.appendChild(ecWrapper);
  }
};

const refactorEcwidComponent = () => {
  document.querySelector(".product-details__navigation")?.remove();
  document.querySelector(".ec-footer")?.remove();
  const link = document.querySelector(".ec-breadcrumbs")?.querySelector("a");

  if (link) {
    link.textContent = "Back to cart";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/cart#!/~/cart";
    });
  }
};

onMounted(() => {
  const match = window.location.pathname.match(/product\/(\d+)/);
  const id = match?.[1];
  if (id) initEcwid(id);
  else console.warn("Product ID Not found in URL");
});
</script>
