<template>
  <div id="my-store-101560752" style="padding-top: 2rem;"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const script = document.createElement("script");
  script.src =
    "https://app.ecwid.com/script.js?101560752&data_platform=code&data_date=2025-08-06";
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    // storefront-режим вместо popup
    window.xProductBrowser?.(
      "categoriesPerRow=3",
      "views=grid(20,3) list(60) table(60)",
      "categoryView=grid",
      "searchView=list",
      "id=my-store-101560752"
    );
  };
});
</script>
