import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { routes } from '../routes/routes';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { ApiConfig } from '../interfaces/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  environment: any;

  constructor(@Inject(APP_SERVICE_CONFIG) environment: ApiConfig , private http : HttpClient ) {
    this.environment = environment;
  }

  getUserData() {
    return this.http.get(`${this.environment.baseUrl}${routes.registration}`);
  }

  addUserData( userData: any ) {
    return this.http.post(`${this.environment.baseUrl}${routes.registration}`,userData);
  }
}
