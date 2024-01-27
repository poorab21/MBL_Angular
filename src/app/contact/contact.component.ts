import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../assets/Services/message.service';
import { Regex } from '../../assets/regex/regex';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form: any;
  usernameFocused: boolean;
  emailFocused: boolean;
  messageFocused: boolean;

  constructor(private messageService: MessageService , private fb: FormBuilder , private toastrService: ToastrService ) {
    this.form = fb.group({
      username: [
        "",
        Validators.required
      ],
      email: [
        "",
        [
          Validators.required ,
          Validators.email
        ]
      ],
      message: [
        "",
        [
          Validators.required,
          Validators.pattern(Regex.textBoxRegex)
        ]
      ]
    })

    this.usernameFocused = false;
    this.emailFocused = false;
    this.messageFocused = false;
  }

    get Username() {
      return this.form.get("username");
    }

    get Email() {
      return this.form.get("email");
    }

    get Message() {
      return this.form.get("message");
    }

    onMessageSubmit() {
      this.messageService.addMessage(this.form.value).subscribe((success) => {
        this.toastrService.success("Message successfully recorded");
        this.form.reset();
        console.log(success);
      },(error) => {
        console.log(error);
      })
    }
}
