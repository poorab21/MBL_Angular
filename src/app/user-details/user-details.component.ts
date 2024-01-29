import { Component, OnInit } from '@angular/core';
import { UserService } from '../../assets/Services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  userProfiles: Array<any>;

  constructor(private userService: UserService) {
    this.userProfiles = [];
  }

  ngOnInit(): void {
      this.userService.getUserData().subscribe((users: any) => {
        this.userProfiles = users;
      });
  }
}
