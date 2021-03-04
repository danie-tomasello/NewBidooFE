import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthappService } from '../services/authapp.service';

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
  
  
  errorMsg="";
  isAuth=this.auth.isLogged();
  credencial= new Credencial('','');

  constructor(private route: Router,private auth: AuthappService) { }

  ngOnInit(): void {
  }

  gestAuth(){    
    this.auth.signin(this.credencial).subscribe(
      response => {
        
        sessionStorage.setItem("Utente", this.credencial.username);
        this.route.navigate(['home']);
      },
      error => {
        this.errorMsg=error.error;
      }
    )  
  }


}
