import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/registration/registration.component';
import { port, server } from 'src/app/app.constants';

export class ApiMsg{
  constructor(
    public data: string,
    public code: string,
    public msg: string
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class GuestUserService {

  constructor(private httpClient:HttpClient) { }


  postRegistration(user: User) {
    
    return this.httpClient.post<ApiMsg>(`http://${server}:${port}/api/registration/service/emailsend`, user); //ALT + 0096 | ALT GR + '

  }

  verify(cod: string,username: string) {
    
    return this.httpClient.get<ApiMsg>(`http://${server}:${port}/api/registration/service/verify?username=${username}&code=${cod}`); //ALT + 0096 | ALT GR + '

  }

}
