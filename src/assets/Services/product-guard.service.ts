import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductGuardService implements CanActivate {

  constructor( private toastrService: ToastrService , private router: Router , private productService: ProductService ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise((resolve,reject) => {

      this.productService.getProducts().subscribe((products: any) => {
        const result = products.find((product: any) => product.id == route.params['id']);

        if(result == undefined) {
          this.toastrService.error("Product with specified ID not found");
          this.router.navigate(['onboarding/product/list']); 
          resolve(true); 
        }

        resolve(true)
      })
    });
  }
}
