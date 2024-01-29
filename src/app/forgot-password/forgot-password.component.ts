import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  form: any;
  usernameFocused: any;

  constructor( fb : FormBuilder , private router: Router ) {
    this.form = fb.group({
      username: ["",[
        Validators.minLength(3) ,
        Validators.required
      ]]
    });

    this.usernameFocused = false;
  }

  get Username() {
    return this.form.get("username");
  }

  onSubmit() {
    this.router.navigateByUrl("/resetPassword");
  }
}
