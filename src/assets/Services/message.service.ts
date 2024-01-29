import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import { routes } from '../routes/routes';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { ApiConfig } from '../interfaces/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  environment: any;

  constructor(@Inject(APP_SERVICE_CONFIG) environment: ApiConfig , private http: HttpClient ) { 
    this.environment = environment;
  }

  addMessage( message: Message ) {
    return this.http.post(`${this.environment.baseUrl}${routes.messages}`,message);
  }
}
