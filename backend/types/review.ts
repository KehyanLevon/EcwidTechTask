export interface Review {
  id: number;
  product: string;
  rating: number;
  review: string;
  reviewerInfo: {
    name: string;
  };
  createDate: string;
}