import { Component } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { UserService } from '../../assets/Services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Regex } from '../../assets/regex/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: any;
  usernameFocused: boolean;
  emailFocused: boolean;
  phoneFocused: boolean;
  passwordFocused: boolean;
  confirmFocused: boolean;
  matching_credentials: boolean;
  addUserObserve: any;
  getUserObserve: any;

  constructor(private toastrService: ToastrService , fb : FormBuilder , private userService: UserService , private router: Router ) {
    this.form = fb.group({
      email: [
        "",
        [
          Validators.required ,
          Validators.email
        ]
      ],
      username: [
        "",
        [
          Validators.required ,
          Validators.minLength(8)
        ]
      ],
      phoneNumber: [
        "",
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.required
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(Regex.passwordRegex)
        ]
      ],
      confirmPassword: [
        "",
        [
          Validators.required
        ]
      ]
    });

    this.emailFocused = false;
    this.usernameFocused = false;
    this.phoneFocused = false;
    this.passwordFocused = false;
    this.confirmFocused = false;
    this.matching_credentials = false;
  }

  get Email() {
    return this.form.get("email");
  }

  get Username() {
    return this.form.get("username");
  }

  get Phone() {
    return this.form.get("phoneNumber");
  }

  get Password() {
    return this.form.get("password");
  }

  get ConfirmPassword() {
    return this.form.get("confirmPassword")
  }

  async onSubmit() {
    let result: any;

    const userDataPromise = new Promise((resolve,reject) => {
      this.userService.getUserData().subscribe((response) => {
        resolve({ users: response })
      }, (error) => {
        reject({ error }) 
      });
    })

    result = await userDataPromise;
    
    if(result.users) {
      this.matching_credentials = result.users.filter(
        (val: any) => val.email == this.Email.value || this.Password.value == val.password || val.phone == ("0" + this.Phone.value)
      )?.length > 0 ;
    }

    
    if(!this.matching_credentials) {
      this.addUserObserve = this.userService.addUserData({
        username: this.Username.value.toLowerCase() ,
        phone: "0" + this.Phone.value ,
        email: this.Email.value ,
        password: this.Password.value 
      }).subscribe((response)=> {
        this.matching_credentials = false;
        this.form.reset("");
        this.toastrService.success("You have been successfully registered");
        this.router.navigateByUrl("");
      },(error) => {
        console.log(error);
      });

    }
  }
}
