import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { routes } from '../routes/routes';
import { product } from '../interfaces/product';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { ApiConfig } from '../interfaces/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  environment: any;

  constructor(@Inject(APP_SERVICE_CONFIG) environment: ApiConfig , private http: HttpClient ) {
    this.environment = environment;
  }

  getProducts() {
    return this.http.get(`${this.environment.baseUrl}${routes.product}`);
  }

  addProduct(productDetails: product) {
    return this.http.post<product>(`${this.environment.baseUrl}${routes.product}`,productDetails);
  }

  deleteProduct( id: number ) {
    return this.http.delete(`${this.environment.baseUrl}${routes.product}/${id}`);
  }

  editProduct( id: number , product: product ) {
    return this.http.put(`${this.environment.baseUrl}${routes.product}/${id}`,{
      ...product
    });
  }

  getProduct( id: number ) {
    return this.http.get(`${this.environment.baseUrl}${routes.product}/${id}`);
  }
}
