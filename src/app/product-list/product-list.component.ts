import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[];

  constructor(private router: Router , private productService: ProductService) {
    this.products = [];
  }

  ngOnInit(): void {
      this.productService.getProducts().subscribe((products) => {
        this.products = products;
      })
  }
}
