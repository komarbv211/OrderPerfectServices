export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  provider: string;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
  categoryId?: number;
}
