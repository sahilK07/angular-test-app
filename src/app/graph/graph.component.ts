import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductState } from '../store/product.state';
import { Store } from '@ngrx/store';
import { selectFilteredProducts } from '../store/product.selectors';
import { loadProducts } from '../store/product.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {

  filteredProducts$: Observable<Product[]>;
  productList: any;
  bars: any[] = [];

  constructor(private store: Store<ProductState>) {
    this.filteredProducts$ = this.store.select(selectFilteredProducts);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.filteredProducts$.subscribe((response: any) => {
      if (response) {
        this.productList = response;
        const maxPrice = this.getMaxPrice();

        this.bars = this.productList.map((product: any) => ({
          ...product,
          barHeight: (product.price / maxPrice) * 100 + '%'
        }));
      }
    })
  }

  getMaxPrice(): number {
    return Math.max(...this.productList.map((product: any) => product.price));
  }

}
