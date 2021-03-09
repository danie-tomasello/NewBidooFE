import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.css']
})
export class NotificheComponent implements OnInit {

  constructor(public msgService: MessageService) { }


  ngOnInit(): void {
  }
  

}
