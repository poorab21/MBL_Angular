import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../assets/Services/message.service';
import { Regex } from '../../assets/regex/regex';
import { AuthService } from '../../assets/Services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form: any;
  messageFocused: boolean;

  constructor(
    private messageService: MessageService , 
    private fb: FormBuilder , 
    private toastrService: ToastrService ,
    private authService: AuthService
  ) {
    this.form = fb.group({
      message: [
        "",
        [
          Validators.required,
          Validators.pattern(Regex.textBoxRegex)
        ]
      ]
    })

    this.messageFocused = false;
  }

  get Message() {
    return this.form.get("message");
  }

  onMessageSubmit() {

    const token = String(sessionStorage.getItem("token"));
    const data = JSON.parse(atob(token));

    const message = {
      username: data.username ,
      email: data.email ,
      message: this.Message.value
    }

    if( this.authService.hasValidToken() ) {
      
      this.messageService.addMessage(message).subscribe((success) => {
        this.toastrService.success("Message successfully recorded");
        this.form.reset();
        console.log(success);
      },(error) => {
        console.log(error);
      })
    }
  }
}
