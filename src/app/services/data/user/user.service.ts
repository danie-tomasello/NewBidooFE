import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { port, server } from 'src/app/app.constants';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  save(user: User) {
    
    return this.httpClient.post(`http://${server}:${port}/api/guestUser/service/save`, user); //ALT + 0096 | ALT GR + '

  }

  update(user: User) {
    
    return this.httpClient.post(`http://${server}:${port}/api/guestUser/service/update`, user); //ALT + 0096 | ALT GR + '

  }

  delete(id: number) {
    
    return this.httpClient.delete(`http://${server}:${port}/api/guestUser/service/delete/`+id); //ALT + 0096 | ALT GR + '

  }

  search(username: string) {
    
    return this.httpClient.get(`http://${server}:${port}/api/guestUser/search/`+username ); 

  }
}
