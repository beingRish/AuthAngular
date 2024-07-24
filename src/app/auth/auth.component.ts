import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../appServices/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../appInterface/auth-response.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  ;
  loginMode: boolean = true
  Form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onModeSwitch() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    if (this.Form.valid) {
      console.log(this.Form.value);

      const email = this.Form.value.email;
      const password = this.Form.value.password;

      let authObservable: Observable<AuthResponse>

      if (this.loginMode) {
        authObservable = this._authService.signIn(email, password)
      } else {
        authObservable = this._authService.signUp(email, password)
      }

      authObservable.subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        })

    }
  }
}
