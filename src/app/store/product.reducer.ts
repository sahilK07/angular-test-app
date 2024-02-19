import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from './product.state';

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  filters: { price: number, rating: number };
  sortBy: any,
  sortField: any
}

export const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  filters: { price: 0, rating: 0 },
  sortBy: '',
  sortField: '',
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    filteredProducts: products,
  })),
  on(ProductActions.applyFilters, (state, { sortBy , sortField}) => ({
    ...state,
    sortBy,
    sortField,
    filteredProducts: sortProducts(state.filteredProducts, sortBy, sortField),
  })),
  on(ProductActions.clearFilters, state => ({
    ...state,
    sortBy: '',
    sortField: '',
    filteredProducts: [...state.products]
  })),
);

function sortProducts(products: Product[], sortBy: string, sortField: string): Product[] {
  return [...products].sort((a, b) => {
    if (sortField === 'price') {
      if (sortBy === 'asc') {
        return a.price - b.price;
      } else if (sortBy === 'desc') {
        return b.price - a.price;
      }
    } else if (sortField === 'rating') {
      if (sortBy === 'asc') {
        return a.rating - b.rating;
      } else if (sortBy === 'desc') {
        return b.rating - a.rating;
      }
    }
    return 0;
  });
}