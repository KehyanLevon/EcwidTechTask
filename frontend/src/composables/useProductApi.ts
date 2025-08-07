import { ref } from "vue";
import type { EcwidProduct, ProductCardData } from "../types/ecwid";

export function useProductApi() {
  const products = ref<ProductCardData[]>([]);




  const fetchProducts = async (limit: number = 0) => {
    try {
      const storeId = import.meta.env.VITE_ECWID_STORE_ID;
      const token = import.meta.env.VITE_ECWID_PUBLIC_KEY;

      const responseFields = encodeURIComponent("total,items(id,name,defaultDisplayedPriceFormatted,sku,media)");
      const url = `https://app.ecwid.com/api/v3/${storeId}/products?sortBy=UPDATED_TIME_DESC&${limit?`limit=${limit}&`:""}responseFields=${responseFields}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data: { items: EcwidProduct[] } = await res.json();

      products.value = data.items.map((p): ProductCardData => ({
        id: p.id,
        name: p.name,
        imageUrl:
          p.media?.images?.[0]?.imageOriginalUrl ||
          p.originalImage?.url ||
          "",
        price: p.defaultDisplayedPriceFormatted,
        sku: p.sku,
      }));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  return { products, fetchProducts };
}
