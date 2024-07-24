import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errorsMsgs = {
    UNKNOWN: 'An Unknown Error is Occured',
    EMAIL_EXISTS: 'This Email is Already Exist. Please try with another one',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this',
    TOO_MANY_ATTEMPTS_TRY_LATER: '',
    EMAIL_NOT_FOUND: '',
    INVALID_PASSWORD: '',
    USER_DISABLED: '',
  }

  constructor() { }
}
