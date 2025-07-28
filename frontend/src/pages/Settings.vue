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
      <div class="named-area">
        <div class="named-area__header">
          <div class="named-area__titles">
            <div class="named-area__title">Feature Summary</div>
          </div>
          <div class="named-area__description">
            This widget shows N of the most recently updated products on the
            cart page. Customers can add them directly to the cart or view
            product details.
          </div>
        </div>
      </div>

      <div class="named-area">
        <div class="named-area__header">
          <div class="named-area__titles">
            <div class="named-area__title">Widget Settings</div>
          </div>
          <div class="named-area__description">
            Enable or disable the widget and configure how many products to
            show.
          </div>
        </div>
        <div class="named-area__body">
          <div class="a-card a-card--normal">
            <div class="a-card__paddings">
              <div class="ec-form">
                <div class="ec-form__group">
                  <label class="ec-switch">
                    <input type="checkbox" v-model="enabled" />
                    <span class="ec-switch__track"></span>
                    Enable Recently Updated Products Widget
                  </label>
                </div>

                <div class="ec-form__group">
                  <label for="defaultCount" class="ec-label">
                    Number of products shown by default:
                  </label>
                  <select
                    id="defaultCount"
                    v-model="defaultCount"
                    class="ec-select"
                  >
                    <option v-for="n in [3, 5, 8, 10]" :key="n" :value="n">
                      {{ n }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="named-area">
        <div class="named-area__header">
          <div class="named-area__titles">
            <div class="named-area__title">Export Store Catalog</div>
          </div>
          <div class="named-area__description">
            Choose which products to export to an XLSX file.
          </div>
        </div>
        <div class="named-area__body">
          <div class="a-card a-card--normal">
            <div class="a-card__paddings">
              <div v-if="products.length === 0">Loading products...</div>
              <table v-else class="ec-table" style="margin-top: 1rem">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        v-model="selectAll"
                        @change="toggleAll"
                      />
                    </th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>SKU</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">
                    <td>
                      <input
                        type="checkbox"
                        v-model="selected"
                        :value="product"
                      />
                    </td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.sku || "—" }}</td>
                  </tr>
                </tbody>
              </table>

              <button
                class="btn btn-primary"
                style="margin-top: 1rem"
                @click="exportSelected"
              >
                Export selected products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { utils, writeFile } from "xlsx";

const storeId = import.meta.env.VITE_ECWID_STORE_ID;
const token = import.meta.env.VITE_ECWID_PUBLIC_KEY;

const ENABLE_KEY = "ecwid-recently-widget-enabled";
const DEFAULT_COUNT_KEY = "ecwid-recently-widget-default-count";
const enabled = ref(localStorage.getItem(ENABLE_KEY) !== "false");
const defaultCount = ref(
  localStorage.getItem(DEFAULT_COUNT_KEY)
    ? localStorage.getItem(DEFAULT_COUNT_KEY)
    : 5
);

const products = ref<any[]>([]);
const selected = ref<any[]>([]);
const selectAll = ref(false);

const toggleAll = () => {
  if (selectAll.value) {
    selected.value = [...products.value];
  } else {
    selected.value = [];
  }
};

const fetchProducts = async () => {
  const res = await fetch(`https://app.ecwid.com/api/v3/${storeId}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  products.value = data.items;
};

const exportSelected = () => {
  if (selected.value.length === 0) {
    alert("No products selected");
    return;
  }

  const ws = utils.json_to_sheet(
    selected.value.map((p) => ({
      ID: p.id,
      Name: p.name,
      Price: p.defaultDisplayedPriceFormatted,
      SKU: p.sku,
    }))
  );

  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Products");

  writeFile(wb, "selected-products.xlsx");
};

watch(enabled, (val) => {
  localStorage.setItem(ENABLE_KEY, String(val));
});

watch(defaultCount, (val) => {
  localStorage.setItem(DEFAULT_COUNT_KEY, String(val));
});

onMounted(fetchProducts);
</script>

<style scoped>
.settings-page__header {
  margin-top: 50px;
}

.named-area__header {
  margin-top: 20px;
}
</style>
