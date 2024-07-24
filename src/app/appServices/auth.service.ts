import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { ErrorService } from './error.service';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { User } from '../appModels/user.model';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User|null>(null)

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
      }),
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
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
      }),
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
      })
    )
  }

  private authenticatedUser(email: string, userId: string, token: string, expiresIn: any){

    const expirationDate = new Date(new Date().getTime() + expiresIn*1000)

    const user = new User(email, userId, token, expirationDate)
    console.log('authenticatedUser: user', user);
    this.user.next(user)

  }
}
