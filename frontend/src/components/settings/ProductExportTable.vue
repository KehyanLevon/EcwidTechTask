<template>
  <div>
    <div v-if="products.length === 0">Loading products...</div>

    <div v-else>
      <EcwidSelect
        id="itemsPerPage"
        label="Items per page"
        :options="[5, 10, 15, 'all']"
        v-model="itemsPerPage"
      />
      <table class="ec-pika-table">
        <thead>
          <tr>
            <th>
              <label>
                <EcwidCheckbox v-model="selectAll" @change="toggleAll" title="Choose all" />
              </label>
            </th>
            <th>Name</th>
            <th>Price</th>
            <th>SKU</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td>
              <label>
                <EcwidCheckbox
                  :modelValue="selected.includes(product)"
                  @update:modelValue="checked => {
                    if (checked) selected.push(product);
                    else selected.splice(selected.indexOf(product), 1);
                  }"
                />
              </label>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.sku || "—" }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="totalPages > 1" class="ec-pagination" style="margin-top: 1rem; display: flex; align-items: center; gap: 12px;">
        <button
          class="btn"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Prev
        </button>
        <span class="ec-text">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>

      <button
        class="btn btn-primary btn-medium"
        style="margin-top: 1rem"
        @click="exportSelected"
      >
        Export selected products
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { ProductCardData  } from "../../types/ecwid";
import { useProductApi } from "../../composables/useProductApi";
import EcwidSelect from "../ecwid/EcwidSelect.vue";
import EcwidCheckbox from "../ecwid/EcwidCheckbox.vue";

const { products, fetchProducts } = useProductApi();

const selected = ref<ProductCardData []>([]);
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref<number | 'all'>('all');

const totalPages = computed(() => {
  if (itemsPerPage.value === "all") return 1;
  return Math.ceil(products.value.length / (itemsPerPage.value as number));
});

const paginatedProducts = computed(() => {
  if (itemsPerPage.value === "all") {
    return products.value;
  }
  const start = (currentPage.value - 1) * (itemsPerPage.value as number);
  return products.value.slice(start, start + (itemsPerPage.value as number));
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const toggleAll = () => {
  if (selectAll.value) {
    selected.value = [...paginatedProducts.value];
  } else {
    selected.value = [];
  }
};

const exportSelected = async () => {
  if (selected.value.length === 0) {
    alert("No products selected");
    return;
  }

  const response = await fetch("/api/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products: selected.value,
    }),
  });

  if (!response.ok) {
    alert("Export failed");
    return;
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "selected-products.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};


onMounted(() => {
  if (products.value.length === 0) {
    fetchProducts();
  }
});

</script>

<style>
.ec-pika-table td {
  text-align: center;
}
tr {
  height: 6vh;
}
.ec-pagination {
  justify-content: center;
}
</style>