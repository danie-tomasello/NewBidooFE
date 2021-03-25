import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../../services/data/registration/registration.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private regService: RegistrationService, private router : Router, private route:ActivatedRoute, private msgService:MessageService) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.regService.verify(params['code'],params['username']).subscribe(
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
    });

    
  }

  

}
