export function useCartUtils() {
  const EXTRA_KEY = "recentlyUpdatedProducts";

  const addToCart = (id: number) => {
    window.Ecwid?.Cart?.addProduct(id);

    const current = JSON.parse(localStorage.getItem(EXTRA_KEY) || "[]");
    if (!current.includes(id)) {
      current.push(id);
      localStorage.setItem(EXTRA_KEY, JSON.stringify(current));
    }

    window.Ecwid?.OnAPILoaded.add(() => {
      window.Ecwid?.OnPageLoaded.add((page: any) => {
        if (page.type === "CART" || page.type === "CHECKOUT") {
          window.ec = window.ec || {};
          window.ec.order = window.ec.order || {};
          window.ec.order.extraFields = window.ec.order.extraFields || {};

          const value = localStorage.getItem(EXTRA_KEY) || "";

          window.ec.order.extraFields[EXTRA_KEY] = {
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

  return { addToCart };
}
