<template>
  <div id="product-detail"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { injectEcwidScript } from "../utils/ecwidScript";
import { moveEcWrapperTo } from "../utils/ecwidDomUtils";
import { setupBackLinkToCart } from "../utils/ecwidDomUtils";

onMounted(() => {
  const match = window.location.pathname.match(/product\/(\d+)/);
  const id = match?.[1];
  if (!id) return;

  injectEcwidScript("product", () => {
    window.Ecwid?.openPage("product", { id: Number(id) });
    moveEcWrapperTo("product-detail");
    setTimeout(() => setupBackLinkToCart(), 200);
  });
});
</script>
