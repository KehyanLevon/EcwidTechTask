<template></template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useProductApi } from "../../composables/useProductApi";
import { useCartUtils } from "../../composables/useCartUtils";
const defaultLimit = parseInt(
  localStorage.getItem("ecwid-recently-widget-default-count") || "5"
);
const limit = ref(defaultLimit);
const { products, fetchProducts } = useProductApi();
const { addToCart, initExtraFieldInjection } = useCartUtils();

const injectWidgetRow = () => {
  const ecCartSection = document.querySelector(".ec-cart");  
  if (!ecCartSection || document.querySelector(".recent-products-widget")) return;
  
  const widget = document.createElement("div");
  widget.className = "recent-products-widget";

  widget.innerHTML = `
    <div class="widget-header">
      <h2 class="ec-text-medium">Recently Updated Products</h2>
      <label class="ec-text">
        Show last
        <select id="recent-limit" class="ec-select">
          ${[3, 5, 8, 10]
            .map((n) => `<option value="${n}">${n}</option>`)
            .join("")}
        </select>
        products
      </label>
    </div>
    <div id="recent-product-grid" class="product-grid" style="margin-top: 1rem;"></div>
  `;
  
  ecCartSection.appendChild(widget);

  const select = widget.querySelector("#recent-limit") as HTMLSelectElement;
  select.value = limit.value.toString();
  select.addEventListener("change", () => {
    limit.value = parseInt(select.value);
  });

  renderProductCards();
};

const renderProductCards = () => {
  const grid = document.getElementById("recent-product-grid");
  if (!grid) return;

  grid.innerHTML = products.value
    .map((p) => {
      return `
        <div class="product-card">
          <a href="#" data-id="${p.id}" class="product-link">
            <img src="${p.imageUrl}" alt="${p.name}" class="product-link" />
          </a>
          <a href="#" data-id="${p.id}" class="product-link">
            <h3 class="product-link">${p.name}</h3>
          </a>
          <p>${p.price}</p>
          <button data-id="${p.id}" id="buy-now">Buy now</button>
        </div>
      `;
    })
    .join("");

  grid.querySelectorAll(".product-link").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const id = (el as HTMLElement).dataset.id;
      if (id) {
        window.Ecwid?.openPage("product", { id: Number(id) });
      }
    });
  });

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
  if (!isWidgetEnabled) return;

  
  const interval = setInterval(() => {    
    if (window.Ecwid?.OnPageLoaded && document.querySelector(".ec-cart")) {
      clearInterval(interval);
      window.Ecwid.OnCartChanged.add(()=>{
        setTimeout(()=>{
          const ecCart = document.querySelector(".ec-cart");
          const widget = document.querySelector(".recent-products-widget");
          if(widget && !ecCart?.querySelector(".recent-products-widget")) {
            widget.remove();
          }
          if(!widget) {
            fetchProducts(limit.value).then(() => {
              injectWidgetRow();
            });
          }
        }, 300)
      })
      window.Ecwid.OnPageLoaded.add((page) => {
        if (page.type === "CART" || page.type === "CHECKOUT") {
          if(page.type === "CART") {
            if(!document.querySelector(".recent-products-widget")) {
              fetchProducts(limit.value).then(() => {
                injectWidgetRow();
              });
            }
          }
          initExtraFieldInjection();
        }
      });
    }
  }, 200);
});


watch(limit, async () => {
  await fetchProducts(limit.value);
  renderProductCards();
});
</script>
