export function moveEcWrapperTo(targetId: string) {
  const ecWrapper = document.querySelector(
    ".ecwid-popup-content"
  ) as HTMLElement | null;
  const target = document.getElementById(targetId);
  if (ecWrapper && target) {
    target.appendChild(ecWrapper);
  }
}

export function setupBackLinkToCart() {
  document.querySelector(".product-details__navigation")?.remove();
  document.querySelector(".ec-footer")?.remove();

  const link = document.querySelector(".ec-breadcrumbs")?.querySelector("a");
  if (link) {
    link.textContent = "Back to cart";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/cart#!/~/cart";
    });
  }
}
