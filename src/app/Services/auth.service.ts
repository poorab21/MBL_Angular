import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

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

  logOut( msg: string ) {
    sessionStorage.removeItem("token");
    this.toastrService.success(msg);
    this.router.navigateByUrl("");
  }
}
