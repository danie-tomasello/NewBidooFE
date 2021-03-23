import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credencial } from '../../login/login.component';
import { port, server } from 'src/app/app.constants';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

export class User{
  constructor(
    public username: string,
    public authorities: string[]
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  

  constructor(private httpClient:HttpClient) { }
  
  
  loggedUser = () => {

      return localStorage.getItem("Utente");
  }

  storageToken( token: string | null, refreshToken: string | null): void {
    if(token!==null&&refreshToken!==null){      
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", refreshToken);
    }
  }

  doLogUser(user:User | null, token: string | null, refreshToken: string | null){
    if(user!==null){
      localStorage.setItem("Utente", user.username);
      
      if(user.authorities.includes("ROLE_USER")){
        localStorage.setItem("Role", "ROLE_USER");
      }
      if(user.authorities.includes("ROLE_ADMIN")){
        localStorage.setItem("Role", "ROLE_ADMIN");
      }
    }
    

    this.storageToken(token,refreshToken);
  }

  isLogged = () => {
    let islog=(localStorage.getItem("Utente") !== null && localStorage.getItem("access_token")!==null) ? true : false;
    if(islog===false){
      this.clearAll();
    }
    return islog;
  }


  clearAll = () => {
    localStorage.removeItem("Utente");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

getAuthToken() { 
    return localStorage.getItem("access_token");
}
getRefreshToken() {
    return localStorage.getItem("refresh_token");
}

  signin(credencial: Credencial) {
    
    return this.httpClient.post<User>(`http://${server}:${port}/api/auth/signin`, credencial,{ observe: 'response'}).pipe(
      tap(res => {
        this.doLogUser(res.body, res.headers.get("X-Auth"),res.headers.get("X-Refresh"));
        console.log("success signin")
      }),
      mapTo(true),
      catchError(error => {
        console.log("error signin")
        return throwError(error);
        
      })); //ALT + 0096 | ALT GR + '; //ALT + 0096 | ALT GR + '

  }

  refresh() {
    return this.httpClient.get(`http://${server}:${port}/api/auth/refresh`,{ observe: 'response'}).pipe(
      tap(res => {
        console.log("success refresh");
      this.storageToken(res.headers.get("X-Auth"),res.headers.get("X-Refresh"));
    }),
    catchError(error => {
      console.log("error refresh");
      return throwError(error);
    }));

  }

  logout() {
    
    return this.httpClient.get(`http://${server}:${port}/api/auth/logout`).pipe(
      tap(() => {
        console.log("success logout");
        this.clearAll()
      }),
      mapTo(true),
      catchError(error => {
        console.log("error logout");
        return throwError(error);
      }));
  }



  

}

