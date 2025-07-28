import { ref } from "vue";

export function useProductApi() {
  const products = ref<any[]>([]);

  const fetchProducts = async (limit = 5) => {
    try {
      const res = await fetch(
        `https://app.ecwid.com/api/v3/${
          import.meta.env.VITE_ECWID_STORE_ID
        }/products?sortBy=UPDATED_TIME_DESC&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ECWID_PUBLIC_KEY}`,
          },
        }
      );
      const data = await res.json();
      products.value = data.items.map((p: any) => ({
        id: p.id,
        name: p.name,
        imageUrl: p.imageUrl || p.media?.images?.[0]?.url || "",
        price: p.defaultDisplayedPriceFormatted,
        sku: p.sku,
      }));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  return { products, fetchProducts };
}
