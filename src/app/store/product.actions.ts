import { createAction, props } from '@ngrx/store';
import { Product } from './product.state';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ products: Product[] }>());
export const applyFilters = createAction('[Product] Apply Filters', props<{ sortBy: string ,sortField: string}>());
export const clearFilters = createAction('[Product] Clear Filters');