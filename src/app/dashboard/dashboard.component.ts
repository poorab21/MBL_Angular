import { Component } from '@angular/core';
import { users } from '../../../Dummy_data/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userProfiles: Array<any>;

  constructor() {
    this.userProfiles = users;
  }
}
