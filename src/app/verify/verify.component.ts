import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { GuestUserService } from '../services/data/guestUser.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private userService: GuestUserService, private router : Router, private route:ActivatedRoute, private msgService:MessageService) { }


  ngOnInit(): void {
    this.userService.verify(this.route.snapshot.params['cod']).subscribe(
      response => {
        console.log(response.msg+" success");
        this.msgService.addSuccess(response.msg);
        this.router.navigate(['login']);

      },
      error => {
        console.log(error.error);
        this.msgService.addError(error.error.msg);
        this.router.navigate(['login']);
      }
    ); 
  }

  

}
