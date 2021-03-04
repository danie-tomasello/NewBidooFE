import { Component, OnInit } from '@angular/core';
import { AuthappService } from '../services/authapp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth=this.auth.isLogged();
  userLogged=this.auth.loggedUser();
  constructor(private auth: AuthappService) { }

  ngOnInit(): void {
  }

}
