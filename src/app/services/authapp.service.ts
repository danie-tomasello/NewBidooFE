import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiMsg, Credencial } from '../login/login.component';



@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  server = 'localhost';
  port = '9090';

  constructor(private httpClient:HttpClient) { }
  
  
  loggedUser = () => {

      let utente = sessionStorage.getItem("Utente");

      return (sessionStorage.getItem("Utente") != null) ? utente : "";
  }

  isLogged = () => (sessionStorage.getItem("Utente") != null) ? true : false;


  clearAll = () => sessionStorage.removeItem("Utente");

  

  signin(credencial: Credencial) {
    
    return this.httpClient.post<ApiMsg>(`http://${this.server}:${this.port}/api/auth/signin`, credencial); //ALT + 0096 | ALT GR + '

  }

  refresh() {
    return this.httpClient.get<ApiMsg>(`http://${this.server}:${this.port}/api/auth/refresh`);

  }

  logout() {
    return this.httpClient.get<ApiMsg>(`http://${this.server}:${this.port}/api/auth/logout`);
  }
}

