import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { productReducer } from '../store/product.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
product: productReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
