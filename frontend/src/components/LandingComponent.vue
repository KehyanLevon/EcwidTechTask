<template>
  <div class="landing">
    <div v-if="loading">Loading products...</div>
    <div v-else class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.imageUrl" alt="Product" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p>{{ formatPrice(product.price) }}</p>
        <button @click="addToCart(product.id)">🛒 Add to Cart</button>
      </div>
    </div>

    <div id="my-cart" class="cart-placeholder" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const products = ref<any[]>([]);
const loading = ref(true);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await fetch("https://app.ecwid.com/api/v3/101560752/products", {
      headers: {
        Authorization: "Bearer public_ie55a1cQU472c1GBmeBqAVpL1ks3LFpu",
      },
    });
    const data = await res.json();
    products.value = data.items.map((p: any) => ({
      id: p.id,
      name: p.name,
      imageUrl: p.imageUrl,
      price: p.price,
    }));
  } catch (err) {
    console.error("Failed to load products", err);
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

onMounted(() => {
  fetchProducts();

  const scriptId = "ecwid-storefront";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.src =
      "https://app.ecwid.com/script.js?101560752&data_platform=code&data_date=2023-07-12";
    script.id = scriptId;
    script.async = true;
    document.body.appendChild(script);
  }
});

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
</script>

<style scoped>
.landing {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}
.title {
  text-align: center;
  font-size: 2rem;
}
.subtitle {
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
}
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
}
.product-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}
.cart-placeholder {
  margin-top: 3rem;
}
</style>
