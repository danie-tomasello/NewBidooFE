
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
        console.log("success login components")
        window.location.href = "http://localhost:4200/home";
      },
      error => {
        this.msgService.clear();
        this.msgService.addError(error.error.cause);
      }
    )  
  }


}
