import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  matcher: ErrorStateMatcher | undefined;
  email: FormControl<any> | undefined;
  password: FormControl<any> | undefined;

}
