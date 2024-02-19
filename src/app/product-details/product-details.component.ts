import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnChanges{

  constructor(private productService : ProductService) {}
  discountAmount:any;
  Totalpayableamount!: number;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.ProductDetails) {
      this.calculateDiscount();
    }
  }
  @Input() ProductDetails: any;

closeModal() {
  this.productService.closeModal();
}

calculateDiscount() {
  this.discountAmount = this.ProductDetails.price * this.ProductDetails.discountPercentage/100
  this.Totalpayableamount = this.ProductDetails.price - this.discountAmount
}

}
