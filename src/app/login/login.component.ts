
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { AuthappService } from '../services/auth/authapp.service';

export class Credencial{
  constructor(
    public username: string,
    public password: string
  ){}
}

export class ApiMsg{
  constructor(
    public code: string,
    public message: string
  ){}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isAuth=this.auth.isLogged();
  credencial= new Credencial('','');

  constructor(private route: Router,private auth: AuthappService,private msgService:MessageService) { }

  ngOnInit(): void {
  }

  gestAuth(){    
    this.auth.signin(this.credencial).subscribe(
      response => {
        
        sessionStorage.setItem("Utente", this.credencial.username);
        if(response.headers.get("X-Auth")!==null){
          sessionStorage.setItem("access_token", response.headers.get("X-Auth")!);
          console.log(sessionStorage.getItem("access_token"));
        }
        window.location.href = "http://localhost:4200/home";
      },
      error => {
        this.msgService.clear();
        this.msgService.addError(error.error);
      }
    )  
  }


}
