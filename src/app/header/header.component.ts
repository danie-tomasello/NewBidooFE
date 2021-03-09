import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthappService } from '../services/auth/authapp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth=this.auth.isLogged();
  userLogged=this.auth.loggedUser();
  constructor(private route: Router, private auth: AuthappService) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.auth.logout().subscribe(
      response => {
        this.auth.clearAll();
        window.location.reload();
      },
      error => {
        console.log(error.error)
      }
    )
  }

 

}
