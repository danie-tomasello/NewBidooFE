import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  alertSuccess: string[] = [];
  alertError: string[] = [];

  addSuccess(message: string) {
    this.alertSuccess.push(message);
  }

  addError(message: string) {
    this.alertError.push(message);
  }

  clear() {
    this.alertError = [];
    this.alertSuccess = [];
  }
}
