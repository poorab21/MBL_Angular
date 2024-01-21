import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { routes } from '../routes/routes';
import { product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient ) {}

  getProducts() {
    return this.http.get(`${environment.baseUrl}${routes.product}`);
  }

  addProduct(productDetails: product) {
    return this.http.post<product>(`${environment.baseUrl}${routes.product}`,productDetails);
  }

  deleteProduct( id: number ) {
    return this.http.delete(`${environment.baseUrl}${routes.product}/${id}`);
  }

  editProduct( id: number , product: product ) {
    return this.http.put(`${environment.baseUrl}${routes.product}/${id}`,{
      ...product
    });
  }

  getProduct( id: number ) {
    return this.http.get(`${environment.baseUrl}${routes.product}/${id}`);
  }
}
