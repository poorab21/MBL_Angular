import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { specialPasswordValidation } from '../../validators/specialPassword.validator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { constants } from '../../assets/constant/constant';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  form: any;
  passwordFocused: boolean;
  confirmFocused: boolean;

  constructor(private toastrService: ToastrService , fb : FormBuilder , private router : Router ) {
    this.form = fb.group({
      password: ["",[
        Validators.required ,
        specialPasswordValidation.specialPassword
      ]] ,
      confirmed: ["",Validators.required]
    });

    this.passwordFocused = false;
    this.confirmFocused = false;
  }

  get Password() {
    return this.form.get("password");
  }

  get Confirmed() {
    return this.form.get("confirmed");
  }

  formSubmitted() {
    this.toastrService.success(constants.toastrResetPassMsg);
    this.router.navigateByUrl("/");    
  }
}
