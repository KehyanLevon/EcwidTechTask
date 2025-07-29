# Ecwid Widget — Recently Updated Products

This project is a custom widget for an Ecwid online store that displays recently updated products on the cart page and provides a separate settings page for store owners. The landing page mimics a modern online store layout and includes sections for products, reviews, and newsletter subscriptions.

All functionality is bundled into a single container using **Docker Compose**.

## Customer-Facing Widget

- ✅ Display **recently updated products** on the cart page, below the checkout section.
- ✅ Customers can add products to cart directly from the widget.
- ✅ Clickable product name/image opens the **product details page**.
- ✅ Quantity dropdown lets the user control how many products to show.
- ✅ Responsive, styled to match Ecwid's native catalog grid.

## Admin Settings Page

Accessible at `/settings`, allows the store owner to:

- ✅ Enable or disable the widget.
- ✅ Set the default number of displayed products.
- ✅ Select products and export them to **CSV/XLSX**.

## Order Extra Fields

Products added via the widget are stored in the order's extra fields:

json
"extraFields": {
"recentlyUpdatedProducts": {
"title": "Recently updated products",
"value": "[12345,67890]"
}
}

## Landing Page

The landing page (`/`) simulates a real store:

- ✅ Custom branding and layout
- ✅ Embedded Ecwid product browser
- ✅ Customer reviews (fetched from `/api/reviews`)
- ✅ Newsletter subscription section(not working)

## Getting Started

> Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

### 1. Create `.env` file

Create a `.env` file at the root by copying the example:

```bash
cp .env-example .env
```

### 2. Start the app

```bash
docker-compose up --build
```

> This will:
>
> - Build the frontend (Vue + Vite)
> - Serve the landing page and settings page via Node.js backend
> - Make the full app available at `http://localhost:3000`
