import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, ProductState } from '../store/product.state';
import { selectFilteredProducts } from './../store/product.selectors';
import { loadProducts, applyFilters, clearFilters } from './../store/product.actions'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule,ProductDetailsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  
  filteredProducts$: Observable<Product[]>;
  productList: Product[] = [];
  originalList = [];
  visibleProducts: number = 6;
  selectedPriceSort: string = 'please select';
  selectedRatingSort: string = 'please select';
  isModalOpen: boolean = false;
  selectedProduct: any;

  constructor(private store: Store<ProductState>,
    private productService: ProductService) {
    this.filteredProducts$ = this.store.select(selectFilteredProducts);
    this.productService.modalState.subscribe((state) => {
      this.isModalOpen = state;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());

    if (this.filteredProducts$) {
      this.filteredProducts$.subscribe((response: any) => {
        if(response) {
          this.originalList = response;
          this.productList = this.originalList.slice(0, this.visibleProducts);
        }
      }) 
    }
    
  }

  applyFilters(event:any, sortField: string): void {
    let sortBy = event.target.value
    console.log(sortBy);
    
    this.store.dispatch(applyFilters({ sortBy, sortField}));
  }

  clearFilters(): void {
    this.selectedPriceSort = 'please select';
    this.selectedRatingSort = 'please select';
    this.store.dispatch(clearFilters());
  }

  buyNow(product: any) {
    this.productService.openModal();
    this.selectedProduct = product;
    }

  onLoadMore() {
    this.visibleProducts += 6;
    this.productList = this.originalList.slice(0, this.visibleProducts);
    }
}
