import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../assets/Services/product.service';
import { constants } from '../../../assets/constant/constant';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: any[];

  constructor( private toastrService: ToastrService , private route: ActivatedRoute , private router: Router , private productService: ProductService ) {
    this.products = [];
  }

  getProducts() {
    this.productService.getProducts().subscribe((products: any) => {
        this.products = products;
    })
  }

  ngOnInit(): void {
      this.getProducts();
  }

  deleteProduct( id: number ) {
    this.productService.deleteProduct(id).subscribe((success) => {
      this.toastrService.success(constants.toastrRemoveProductMsg);
      console.log(success);
      this.getProducts();
    },(error) => {
      console.log(error);
    })
  }

  editProduct( prodId: number ) {
    this.router.navigate(['../edit',prodId],{ 
      relativeTo: this.route ,  
    });
  }
}
