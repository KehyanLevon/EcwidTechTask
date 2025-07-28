export function injectEcwidScript(
  page: "cart" | "product",
  onReady: () => void
) {
  const storeId = import.meta.env.VITE_ECWID_STORE_ID;

  const existingScript = document.getElementById(`ecwid-script-${page}`);
  if (existingScript) {
    onReady();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=${new Date()
    .toISOString()
    .slice(0, 10)}`;
  script.async = true;
  script.id = `ecwid-script-${page}`;

  script.onload = () => {
    window.Ecwid?.OnAPILoaded.add(() => {
      window.Ecwid?.openPage(page);
      onReady();
    });
  };

  document.body.appendChild(script);
}

export function onOrderConfirmationPage(callback: () => void) {
  window.Ecwid?.OnPageLoaded.add((page) => {
    if (page.type === "ORDER_CONFIRMATION") {
      callback();
    }
  });
}
