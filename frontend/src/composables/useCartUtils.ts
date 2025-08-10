export function useCartUtils() {
  const EXTRA_KEY = "recentlyUpdatedProducts";


  // TODO:
  // DONE - Тут можно уточнить какие поля конкретно нам нужны, чтобы не гонять лишнюю информацию по сети: https://ecwid.d.pr/i/NXtygM
  // DONE - NamedArea в Settings.vue не вынесены в компоненты (стоит прочекать и другие Vue файлы на это тоже)
  // DONE - В целом, в коде маловато типизации. Стоит добавить её везде, особенно стоит убрать `any`
  // DONE - Стоит улучшить дизайн списка, чекбоксов и дропдауна с помощью соответствующих компонентов Ecwid CSS Framework: https://ecwid.d.pr/i/g7NFZ0 у списка так же стоит добавить пагинацию
  // DONE - Есть проблемы с мобилкой: https://ecwid.d.pr/i/gEO7OP
  // DONE - server.js переписать на TypeScript с соотв. типами и интерфейсами
  // DONE - Хотелось бы увидеть экспорт товаров через Node.js, чтобы не нагружать браузер



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
