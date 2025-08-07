<template>
  <div class="settings-page cf">
    <div class="settings-page__header">
      <div class="settings-page__titles settings-page__titles--left">
        <h1 class="settings-page__title">
          Recently Updated Products — Settings
        </h1>
        <div class="settings-page__subtitle">
          Widget that shows recently updated products on the cart page.
        </div>
      </div>
    </div>

    <div class="settings-page__body">
      <NamedArea
        title="Feature Summary"
        description="This widget shows N of the most recently updated products on the
          cart page. Customers can add them directly to the cart or view
          product details."
      />
      <NamedArea
        title="Widget Settings"
        description="Enable or disable the widget and configure how many products to show."
      >
        <div class="a-card a-card--normal">
          <div class="a-card__paddings">
            <EnableToggle v-model="enabled" />
            <DefaultCountSelect v-model="defaultCount" :options="[3, 5, 8, 10]" />
          </div>
        </div>
      </NamedArea>
      <NamedArea
        title="Export Store Catalog"
        description="Choose which products to export to an XLSX file."
      >
        <div class="a-card a-card--normal">
          <div class="a-card__paddings">
            <ProductExportTable :storeId="storeId" :token="token" />
          </div>
        </div>
      </NamedArea>
    </div>
  </div>
</template>

<script setup lang="ts">
import NamedArea from "../components/settings/NamedArea.vue";
import EnableToggle from "../components/settings/EnableToggle.vue";
import DefaultCountSelect from "../components/settings/DefaultCountSelect.vue";
import ProductExportTable from "../components/settings/ProductExportTable.vue";
import { useSettings } from "../composables/useSettings";

const storeId = import.meta.env.VITE_ECWID_STORE_ID;
const token = import.meta.env.VITE_ECWID_PUBLIC_KEY;

const { enabled, defaultCount } = useSettings();
</script>

<style scoped>
.settings-page__header {
  margin-top: 50px;
}
</style>
