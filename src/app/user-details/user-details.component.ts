import { Component, OnInit } from '@angular/core';
import { UserService } from '../../assets/Services/user.service';
import { AuthService } from '../../assets/Services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  userProfiles: Array<any>;

  constructor(
    private userService: UserService ,
    private authService: AuthService
  ) {
    this.userProfiles = [];
  }

  ngOnInit(): void {
    
    if( this.authService.hasValidToken() ) {

      this.userService.getUserData().subscribe((users: any) => {
        this.userProfiles = users;
      });
    }
  }
}
