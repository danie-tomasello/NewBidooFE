import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiMsg, Credencial } from '../../login/login.component';
import { port, server } from 'src/app/app.constants';



@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  

  constructor(private httpClient:HttpClient) { }
  
  
  loggedUser = () => {

      let utente = sessionStorage.getItem("Utente");

      return (sessionStorage.getItem("Utente") !== null) ? utente : "";
  }

  isLogged = () => {
    let islog=(sessionStorage.getItem("Utente") !== null || sessionStorage.getItem("session_token")!==null) ? true : false;
    if(islog===false){
      sessionStorage.removeItem("Utente");
      sessionStorage.removeItem("access_token");
    }
    return islog;
  }


  clearAll = () => {
    sessionStorage.removeItem("Utente");
    sessionStorage.removeItem("access_token");
};

getAuthToken() {

  if (this.loggedUser())
    return sessionStorage.getItem("access_token");
  else
    return "";
}

  signin(credencial: Credencial) {
    
    return this.httpClient.post<ApiMsg>(`http://${server}:${port}/api/auth/signin`, credencial,{ observe: 'response'}); //ALT + 0096 | ALT GR + '

  }

  refresh() {
    return this.httpClient.get<ApiMsg>(`http://${server}:${port}/api/auth/refresh`);

  }

  logout() {
    
    return this.httpClient.get(`http://${server}:${port}/api/auth/logout`);
  }



  

}

