<template>
  <div class="cart-page">
    <div id="ecwid-cart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

declare global {
  interface Window {
    Ecwid?: {
      OnAPILoaded: { add: (cb: () => void) => void };
      openPage: (page: string) => void;
      Cart?: {
        addProduct: (id: number) => void;
      };
    };
  }
}

const storeId = "101560752";
const limit = ref(5);
const products = ref<any[]>([]);

const fetchProducts = async () => {
  const res = await fetch(
    `https://app.ecwid.com/api/v3/${storeId}/products?sortBy=UPDATED_TIME_DESC&limit=${limit.value}`,
    {
      headers: {
        Authorization: "Bearer public_ie55a1cQU472c1GBmeBqAVpL1ks3LFpu",
      },
    }
  );

  const data = await res.json();

  products.value = data.items.map((p: any) => ({
    id: p.id,
    name: p.name,
    imageUrl: p.imageUrl || p.media?.images?.[0]?.url || "",
    price: p.defaultDisplayedPriceFormatted,
  }));
};

const openProduct = (id: number) => {
  window.Ecwid?.openPage?.(`product/${id}`);
};

const addToCart = (id: number) => {
  window.Ecwid?.Cart?.addProduct(id);
};

const stripPopupStyles = () => {
  const overlay = document.querySelector(
    ".ecwid-overlay"
  ) as HTMLElement | null;
  if (overlay) {
    overlay.removeAttribute("style");
    overlay.className = "";
  }

  const popup = document.querySelector(
    ".ecwid-popup.ecwid-ProductBrowserPopup"
  ) as HTMLElement | null;
  if (popup) {
    popup.removeAttribute("style");
    popup.className = "";
  }

  const popupCloseButton = document.querySelector(
    ".ecwid-popup-closeButton"
  ) as HTMLElement | null;
  popupCloseButton?.remove();
};

const initEcwid = () => {
  const container = document.getElementById("ecwid-cart-container");
  if (!container) return;
  container.innerHTML = "";

  const s = document.createElement("script");
  s.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=${new Date()
    .toISOString()
    .slice(0, 10)}`;
  s.async = true;
  s.onload = () => {
    window.Ecwid?.OnAPILoaded.add(() => {
      window.Ecwid?.openPage("cart");
      setTimeout(stripPopupStyles, 150);
    });
  };
  document.body.appendChild(s);
};

const injectWidgetRow = () => {
  const interval = setInterval(() => {
    const tbody = document.querySelector(".ecwid-popup-touchLimiter tbody");
    if (!tbody) return;

    // не вставляем повторно
    if (document.getElementById("recent-products-wrapper")) {
      clearInterval(interval);
      return;
    }

    const tr = document.createElement("tr");
    tr.id = "recent-products-wrapper";
    tr.innerHTML = `
      <td colspan="100%">
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
      </td>
    `;

    tbody.appendChild(tr);
    clearInterval(interval);

    // добавить обработчик выбора количества
    const select = tr.querySelector("#recent-limit") as HTMLSelectElement;
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
    .map(
      (p) => `
    <div class="product-card">
      <img src="${p.imageUrl}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <button data-id="${p.id}">Buy now</button>
    </div>
  `
    )
    .join("");

  grid.querySelectorAll("img, h3").forEach((el, i) => {
    el.addEventListener("click", () => openProduct(products.value[i].id));
  });

  grid.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt((btn as HTMLElement).dataset.id!);
      addToCart(id);
    });
  });
};

onMounted(() => {
  setTimeout(() => {
    stripPopupStyles();
    injectWidgetRow();
  }, 200);
  initEcwid();

  fetchProducts();
});

watch(limit, async () => {
  await fetchProducts();
  renderProductCards();
});
</script>

<style>
.cart-page {
  padding: 2rem;
}

.recent-products-widget {
  margin-top: 3rem;
  border-top: 1px solid #ccc;
  padding-top: 2rem;
}

.recent-products-widget select {
  margin: 0 0.5rem;
  padding: 0.25rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
  transition: box-shadow 0.2s ease;
}

.product-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card img {
  max-width: 100%;
  height: auto;
  cursor: pointer;
  margin-bottom: 0.5rem;
}

.product-card h3 {
  cursor: pointer;
  margin: 0.5rem 0;
}

.product-card button {
  background-color: #007aff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.product-card button:hover {
  background-color: #005ec4;
}
</style>
