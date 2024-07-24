import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private _errService: ErrorService
  ) { }

  signUp(email: string, password:string){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`, {
      email:email, 
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      })
    )
  }

  signIn(email: string, password: string){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`, {
      email:email, 
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      })
    )
  }
}
