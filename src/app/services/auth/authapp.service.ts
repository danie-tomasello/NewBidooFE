import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credencial } from '../../login/login.component';
import { port, server,accToken, refToken, userLog } from 'src/app/app.constants';
import { catchError, mapTo, tap } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Ruoli } from 'src/models/Ruoli';



@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  

  constructor(private httpClient:HttpClient) { }
  
  
  loggedUser = () => {

      return localStorage.getItem(userLog);
  }

  isLogged = () => {
    let islog=(localStorage.getItem(userLog) !== null && localStorage.getItem(accToken)!==null) ? true : false;
    if(islog===false){
      this.clearAll();
    }
    return islog;
  }

  isAdmin = () => {
    if(this.isLogged()){
    
      let acctoken = this.getAuthToken()
      let token = acctoken===null?undefined:acctoken;
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let rolesToken: string[] = decodedToken["roles"];
      
      return rolesToken.includes(Ruoli.admin);
    }
    return false;
  }



  doLogUser(username:string , token: string | null, refreshToken: string | null){
    if(username!==null){
      localStorage.setItem(userLog,username);
    }
    

    this.storageToken(token,refreshToken);
  }

  storageToken( token: string | null, refreshToken: string | null): void {
    if(token!==null&&refreshToken!==null){      
      localStorage.setItem(accToken, token);
      localStorage.setItem(refToken, refreshToken);
    }
  }

  clearAll = () => {
    localStorage.removeItem(userLog);
    localStorage.removeItem(accToken);
    localStorage.removeItem(refToken);
};

getAuthToken(){ 
    return localStorage.getItem(accToken);
}
getRefreshToken() {
    return localStorage.getItem(refToken);
}

  signin(credencial: Credencial) {
    
    return this.httpClient.post(`http://${server}:${port}/api/auth/signin`, credencial,{ observe: 'response'}).pipe(
      tap(res => {
        this.doLogUser(credencial.username, res.headers.get("X-Auth"),res.headers.get("X-Refresh"));
        console.log("success signin")
      }),
      mapTo(true),
      catchError(error => {
        console.log("error signin");
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

