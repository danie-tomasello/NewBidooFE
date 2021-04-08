import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/data/registration/registration.service';
import { MessageService } from '../services/message.service';


export class User {
  constructor(
    public username: string,
    public email: string,
    public phoneNumber:string,
    public password:string
  ){}
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  errorMsg='';
  successMsg='';
  user = new User("","","","");
  userForm!: FormGroup;

  constructor(private regService: RegistrationService, private router : Router, private msgService:MessageService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      
      username: new FormControl("", [  Validators.required, Validators.minLength(4) ]),
      
      email: new FormControl("", [ Validators.email, Validators.required ]),
      
      prefix: new FormControl("+39",[]),

      phoneNumber: new FormControl("",[ Validators.required, Validators.pattern("^[0-9]*$") ]),
      
      password: new FormControl("", [ Validators.required, Validators.minLength(4) ]),
      
      confirmPassword: new FormControl("", [ Validators.required, Validators.minLength(4) ])
    },
    { 
      validators: this.checkPasswords
  });
}
  get username() { return this.userForm.get('username'); }

  get email() { return this.userForm.get('email'); }

  get prefix() { return this.userForm.get('prefix'); }

  get phoneNumber() { return this.userForm.get('phoneNumber'); }

  get password() { return this.userForm.get('password'); }
 
  get confirmPassword() { return this.userForm.get('confirmPassword'); }
  
  
  
  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const password2 = control.get('confirmPassword');

    return password && password2 && password.value === password2.value ? null : { notSame: true };
  };

  

  registration(){ 
    if (!this.userForm.invalid) { 
      
      this.user = new User(
        this.username?.value,
        this.email?.value,
        this.prefix?.value+this.phoneNumber?.value,
        this.password?.value
      );
      
      this.regService.postRegistration(this.user).subscribe(
        response => {
          this.successMsg=response.msg; 
        },
        error => {
          this.errorMsg=error.error.msg;
        }
      );

    }
    else{
      this.errorMsg="I dati inseriti non sono validi.";
    }
  }
}


