import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { routes } from '../routes/routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http : HttpClient ) {}

  getUserData() {
    return this.http.get(`${environment.baseUrl}${routes.registration}`);
  }

  addUserData( userData: any ) {
    return this.http.post(`${environment.baseUrl}${routes.registration}`,userData);
  }
}
