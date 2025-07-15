<template>
  <div style="padding: 1rem; margin-top: 2rem">
    <h3>🕘 Recently Updated Products</h3>
    <label for="productCount">Show:</label>
    <select id="productCount" v-model="limit" @change="fetchProducts">
      <option v-for="n in [3, 5, 10, 20]" :key="n" :value="n">{{ n }}</option>
    </select>

    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li
        v-for="product in products"
        :key="product.id"
        style="list-style-type: none"
      >
        <strong>{{ product.name }}</strong
        ><br />
        <img :src="product.imageUrl" width="100" /><br />
        Price: {{ product.price }}<br />
        <button @click="addToCart(product.id)">Buy now</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const products = ref<any[]>([]);
const loading = ref(true);
const limit = ref(5);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await fetch(
      `https://app.ecwid.com/api/v3/101560752/products?limit=100`,
      {
        headers: {
          Authorization: "Bearer public_ie55a1cQU472c1GBmeBqAVpL1ks3LFpu",
        },
      }
    );
    const data = await res.json();

    const sorted = (data.items || [])
      .sort((a: any, b: any) => b.updateDate - a.updateDate)
      .slice(0, limit.value);

    products.value = sorted.map((p: any) => ({
      id: p.id,
      name: p.name,
      imageUrl: p.imageUrl,
      price: p.price,
    }));
  } catch (err) {
    console.error("Failed to fetch products:", err);
    products.value = [];
  } finally {
    loading.value = false;
  }
};

const addToCart = (productId: number) => {
  const ecwid = (window as any).Ecwid;
  if (ecwid?.Cart?.addProduct) {
    ecwid.Cart.addProduct(productId);
  } else {
    alert("Cart not available (Ecwid not loaded)");
  }
};

onMounted(fetchProducts);
</script>
