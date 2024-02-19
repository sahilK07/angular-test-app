import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from './store/product.state';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private modalSubject = new Subject<boolean>();
  modalState = this.modalSubject.asObservable();

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://dummyjson.com/products')
  }

  openModal() {
    this.modalSubject.next(true);
  }

  closeModal() {
    this.modalSubject.next(false);
  }
}
