import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {  map, catchError, exhaustMap } from 'rxjs/operators';
import { ProductService } from './../product.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        exhaustMap(() => this.productService.getProducts().pipe(
            map((products: any) => ProductActions.loadProductsSuccess( products)),
            catchError(() => of({ type: 'Error loading products' }))
        ))
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}