import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  thumbnail: string;
  title: string;
  description: string
}

export interface ProductState extends EntityState<Product> {
  filter: {
    price: number | null;
    rating: number | null;
  };
}

export const productAdapter = createEntityAdapter<Product>();