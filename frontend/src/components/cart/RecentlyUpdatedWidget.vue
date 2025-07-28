<template>
  <div id="recently-updated-products-widget"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useProductApi } from "../../composables/useProductApi";
import { useCartUtils } from "../../composables/useCartUtils";

const defaultLimit = parseInt(
  localStorage.getItem("ecwid-recently-widget-default-count") || "5"
);
const limit = ref(defaultLimit);
const { products, fetchProducts } = useProductApi();
const { addToCart } = useCartUtils();

const injectWidgetRow = () => {
  const interval = setInterval(() => {
    const container = document.querySelector(
      "#recently-updated-products-widget"
    );
    if (!container) return;
    if (document.getElementById("recent-products-wrapper")) {
      clearInterval(interval);
      return;
    }

    const widget = document.createElement("div");
    widget.id = "recent-products-wrapper";
    widget.innerHTML = `
      <div class="recent-products-widget">
        <h2>Recently Updated Products</h2>
        <label>
          Show last
          <select id="recent-limit">
            ${[3, 5, 8, 10]
              .map((n) => `<option value="${n}">${n}</option>`)
              .join("")}
          </select>
          products
        </label>
        <div id="recent-product-grid" class="product-grid" style="margin-top: 1rem;"></div>
      </div>
    `;

    container.appendChild(widget);
    clearInterval(interval);

    const select = widget.querySelector("#recent-limit") as HTMLSelectElement;
    select.value = limit.value.toString();
    select.addEventListener("change", () => {
      limit.value = parseInt(select.value);
    });

    renderProductCards();
  }, 200);
};

const renderProductCards = () => {
  const grid = document.getElementById("recent-product-grid");
  if (!grid) return;

  grid.innerHTML = products.value
    .map((p) => {
      const cleanName = encodeURIComponent(p.name.replace(/\s+/g, "-"));
      const href = `/product/${p.id}#!/${cleanName}/p/${p.id}`;
      return `
        <div class="product-card">
          <a href="${href}">
            <img src="${p.imageUrl}" alt="${p.name}" data-id="${p.id}" class="product-link" />
          </a>
          <a href="${href}">
            <h3 class="product-link" data-id="${p.id}">${p.name}</h3>
          </a>
          <p>${p.price}</p>
          <button data-id="${p.id}" id="buy-now">Buy now</button>
        </div>
      `;
    })
    .join("");

  grid.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = (btn as HTMLElement).dataset.id;
      if (id) addToCart(Number(id));
    });
  });
};

onMounted(() => {
  const isWidgetEnabled =
    localStorage.getItem("ecwid-recently-widget-enabled") !== "false";
  if (isWidgetEnabled) {
    setTimeout(() => injectWidgetRow(), 600);
    fetchProducts(limit.value);
  }
});

watch(limit, async () => {
  await fetchProducts(limit.value);
  renderProductCards();
});
</script>
