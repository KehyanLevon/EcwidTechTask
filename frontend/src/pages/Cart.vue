<template>
  <div id="cart"></div>
  <div class="cart-page">
    <div id="ecwid-cart-container"></div>
  </div>
  <div id="recently-updated-products-widget"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const storeId = "101560752";
const defaultLimit = parseInt(
  localStorage.getItem("ecwid-recently-widget-default-count") || "5"
);
const limit = ref(defaultLimit);

const products = ref<any[]>([]);
let ecwidScript: HTMLScriptElement | null = null;

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

const addToCart = (id: number) => {
  window.Ecwid?.Cart?.addProduct(id);

  const key = "recentlyUpdatedProducts";
  const current = JSON.parse(localStorage.getItem(key) || "[]");

  if (!current.includes(id)) {
    current.push(id);
    localStorage.setItem(key, JSON.stringify(current));
  }

  window.Ecwid?.OnAPILoaded.add(() => {
    window.Ecwid?.OnPageLoaded.add((page: any) => {
      if (page.type === "CART" || page.type === "CHECKOUT") {
        window.ec = window.ec || {};
        window.ec.order = window.ec.order || {};
        window.ec.order.extraFields = window.ec.order.extraFields || {};

        const key = "recentlyUpdatedProducts";
        const value = localStorage.getItem(key) || "";

        window.ec.order.extraFields[key] = {
          title: "Recently updated products",
          type: "text",
          value,
          orderDetailsDisplaySection: "shipping_info",
          showInNotifications: false,
          showInInvoice: false,
          required: false,
        };

        window.Ecwid?.refreshConfig();
      }
    });
  });
};

const moveEcWrapperToCart = () => {
  const ecWrapper = document.querySelector(
    ".ecwid-popup-content"
  ) as HTMLElement | null;

  const cart = document.getElementById("cart");

  if (ecWrapper && cart) {
    cart.appendChild(ecWrapper);
  }
};

const backToCart = () => {
  window.Ecwid?.OnPageLoaded.add((page) => {
    if (page.type === "ORDER_CONFIRMATION") {
      const interval = setInterval(() => {
        const btn = document.querySelector(
          ".ec-confirmation__continue .form-control__button"
        ) as HTMLElement | null;

        if (btn) {
          const span = btn.querySelector("span");
          if (span) span.textContent = "Back to cart";

          btn.addEventListener("click", (e) => {
            e.preventDefault();
            window.Ecwid?.openPage("cart");
          });

          clearInterval(interval);
        }
      }, 200);
    }
  });
};

const initEcwid = () => {
  const container = document.getElementById("ecwid-cart-container");
  if (!container) return;
  container.innerHTML = "";

  ecwidScript = document.createElement("script");
  ecwidScript.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=${new Date()
    .toISOString()
    .slice(0, 10)}`;
  ecwidScript.async = true;
  ecwidScript.id = "initEcwidScript";

  ecwidScript.onload = () => {
    window.Ecwid?.OnAPILoaded.add(() => {
      window.Ecwid?.openPage("cart");
      moveEcWrapperToCart();
      backToCart();
    });
  };

  document.body.appendChild(ecwidScript);
};

const injectWidgetRow = () => {
  const interval = setInterval(() => {
    const recentlyUpdatedProductsWidget = document.querySelector(
      "#recently-updated-products-widget"
    );
    if (!recentlyUpdatedProductsWidget) return;
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

    recentlyUpdatedProductsWidget.appendChild(widget);
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
  initEcwid();

  const isWidgetEnabled =
    localStorage.getItem("ecwid-recently-widget-enabled") !== "false";
  if (isWidgetEnabled) {
    setTimeout(() => injectWidgetRow(), 600);
    fetchProducts();
  }
});

watch(limit, async () => {
  await fetchProducts();
  renderProductCards();
});
</script>
