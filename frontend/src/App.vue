<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
declare global {
  interface Window {
    Ecwid?: {
      OnAPILoaded: { add: (cb: () => void) => void };
      openPage: (page: string, options?: any) => void;
      Cart?: {
        addProduct: (id: number) => void;
      };
      ProductBrowserPopup?: {
        show: (options: { productId: number }) => void;
      };
      init: () => void;
    };
    ecwid_script_defer: boolean;
    ecwid_dynamic_widgets: boolean;
  }
}
import AppHeader from "./components/AppHeader.vue";
</script>
