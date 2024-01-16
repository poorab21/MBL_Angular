import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { constants } from '../../assets/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor( private authService: AuthService , private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const token = sessionStorage.getItem("token");

      if(token) {
        this.authService.hasTokenExpired(token) ? this.authService.logOut(constants.toastrSessionEndMsg,'expired') : null;
      }
      else {
        this.router.navigateByUrl("");
      }

      return true;
  }
}
