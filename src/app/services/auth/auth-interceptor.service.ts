import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthappService } from './authapp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private auth: AuthappService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    

    let AuthToken = this.auth.getAuthToken();
    let User = this.auth.loggedUser();

    if (AuthToken && User) {
      request = request.clone(
        {
          setHeaders : {"X-Auth": AuthToken }
        });
    }


    return next.handle(request);
  }
}
