import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
;
  loginMode: boolean = true
  Form!: FormGroup

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onModeSwitch(){
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    if(this.Form.valid){
      console.log(this.Form.value);
      
    }
    
  }
  

}
