<template>
  <div>
    <div v-if="products.length === 0">Loading products...</div>
    <table v-else class="ec-table" style="margin-top: 1rem">
      <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="selectAll" @change="toggleAll" />
          </th>
          <th>Name</th>
          <th>Price</th>
          <th>SKU</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <input type="checkbox" v-model="selected" :value="product" />
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
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { utils, writeFile } from "xlsx";

const products = ref<any[]>([]);
const selected = ref<any[]>([]);
const selectAll = ref(false);

const toggleAll = () => {
  if (selectAll.value) selected.value = [...products.value];
  else selected.value = [];
};

const fetchProducts = async () => {
  const res = await fetch(
    `https://app.ecwid.com/api/v3/${
      import.meta.env.VITE_ECWID_STORE_ID
    }/products`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ECWID_PUBLIC_KEY}`,
      },
    }
  );
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

onMounted(fetchProducts);
</script>
