import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usernameFocused : boolean;
  passwordFocused : boolean;
  userExists: boolean;
  getUserObserve: any;

  constructor( private router: Router,private userService: UserService ) {
    this.usernameFocused = false;
    this.passwordFocused = false;
    this.userExists = true;
  }

  onSubmit(form : NgForm) {

    this.userService.getUserData().subscribe((users: any) => {
      const user = users.find(
        (val: any) => val.username == form.control.get("username")?.value.toLowerCase() && val.password == form.control.get("password")?.value
      );
      
      if(user) {
        const token = btoa( JSON.stringify({ username : user.username , email : user.email , expiryDate: moment().add(1,"minute") }) );
        
        sessionStorage.setItem("token",token);
        form.reset("");
        this.router.navigateByUrl("/dashboard");
      }
      else {
        this.userExists = false;
      }

      },(error) => {
        console.log(error);
      });
  }
}
