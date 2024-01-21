import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductGuardService implements CanActivate {

  constructor( private router: Router , private productService: ProductService ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise((resolve,reject) => {

      this.productService.getProducts().subscribe((products: any) => {
        const result = products.find((product: any) => product.id == route.params['id']);

        if(result == undefined) { this.router.navigate(['productNotFound']); resolve(true); }
        resolve(true)
      })
    });
  }
}
