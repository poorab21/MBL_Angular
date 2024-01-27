import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import { environment } from '../environment/environment';
import { routes } from '../routes/routes';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor( private http: HttpClient ) { }

  addMessage( message: Message ) {
    return this.http.post(`${environment.baseUrl}${routes.messages}`,message);
  }
}
