export interface EcwidProduct {
  id: number;
  name: string;
  defaultDisplayedPriceFormatted: string;
  sku?: string;
  media?: {
    images?: {
      imageOriginalUrl?: string;
    }[];
  };
  originalImage?: {
    url: string;
  };
}

export interface ProductCardData {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  sku?: string;
}
