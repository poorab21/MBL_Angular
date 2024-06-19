import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { constants } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private toastrService: ToastrService , private router: Router ) { }

  hasTokenExpired( token: string ) {
    const decoded_token = JSON.parse(atob(token));
    const expiryDate = moment(decoded_token.expiryDate).toDate();
    
    if(moment().isSameOrAfter(expiryDate)) {
      return true;
    }

    return false;
  }

  logOut( msg: string , logoutType: string ) {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    document.cookie = "hello=there; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    if(logoutType === 'sign out') {
      this.toastrService.success(msg);
    }
    else {
      this.toastrService.error(msg);
    }

    this.router.navigateByUrl("");
  }

  hasValidToken() {

    const token = localStorage.getItem("token");

    if(token && !this.hasTokenExpired(token) ) {

      return true;
    }

    token ? this.logOut( constants.toastrSessionEndMsg , 'expired' ) : this.logOut( constants.toastrUnauthorizedRequestMsg , 'unauthorized' );

    this.router.navigateByUrl("");

    return false;
  }
}
