import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newbidoo',
  templateUrl: './newbidoo.component.html',
  styleUrls: ['./newbidoo.component.css']
})
export class NewbidooComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("Utente")+" Saluti da newbidoo");
  }

}
