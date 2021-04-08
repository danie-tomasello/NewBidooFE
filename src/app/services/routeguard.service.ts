import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthappService } from './auth/authapp.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate {

  token?: string;
  rolesToken?: string;

  constructor(private auth: AuthappService, private route: Router, private msgService: MessageService) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) { 
    let acctoken = this.auth.getAuthToken()
    this.token = acctoken===null?undefined:acctoken;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);

    this.rolesToken = decodedToken["roles"];

   if(!this.auth.isLogged()){
     this.route.navigate(["login"]);
     return false;
   }
   else{
     if(!route.data.role){
      return true;
     }
     else if(this.rolesToken?.includes(route.data.role)) {
      return true;
     }
     else {
      this.route.navigate(["home"]);
      this.msgService.clear();
      this.msgService.addError("Non sei autorizzato ad accedere alla schermata selezionata.")
      return false;
     }
     
   }
  }
}
  