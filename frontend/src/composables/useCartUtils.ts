export function useCartUtils() {
  const EXTRA_KEY = "recentlyUpdatedProducts";
  const addToCart = (id: number) => {
    try {
      window.Ecwid?.Cart?.addProduct(id);
    } catch (err) {
      console.error("Error calling addProduct:", err);
    }

    const current = JSON.parse(localStorage.getItem(EXTRA_KEY) || "[]");
    if (!current.includes(id)) {
      current.push(id);
      localStorage.setItem(EXTRA_KEY, JSON.stringify(current));
    }
  };

  const initExtraFieldInjection = () => {    
    const value = localStorage.getItem(EXTRA_KEY) || "";

    window.ec = window.ec || {};
    window.ec.order = window.ec.order || {};
    window.ec.order.extraFields = window.ec.order.extraFields || {};

    window.ec.order.extraFields[EXTRA_KEY] = {
      title: "Recently updated products",
      type: "text",
      value,
      orderDetailsDisplaySection: "shipping_info",
      showInNotifications: false,
      showInInvoice: false,
      required: false,
    };

    window.Ecwid?.refreshConfig?.();
  };

  return { addToCart, initExtraFieldInjection };
}
