import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editMode: boolean = false
  Form!: FormGroup
  token: any;

  constructor(
    private fb: FormBuilder,
    private rounter: Router,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    const tokenString = localStorage.getItem('UserData');
    if (tokenString !== null) {
      this.token = JSON.parse(tokenString)._token;
    }
  }

  ngOnInit(): void {
    this.Form = this.fb.group({
      name: ['Edit Name'],
      picture: ['Edit Photo']

    })

    this.activatedRoute.queryParamMap.subscribe(res => {
      let qParams = res.get('EditMode');

      if (qParams != null) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    })

  }

  onSubmit() {
    if (this.Form.valid) {
      const updatedData = { token: this.token, ...this.Form.value };
      this._authService.updateProfile(updatedData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
    } else {
      let key = Object.keys(this.Form.controls);

      key.filter(data => {
        let control = this.Form.controls[data];
        if (control.errors != null) {
          control.markAllAsTouched();
        }
      })
    }
  }

  onDiscard() {
    this.Form.reset();
    this.rounter.navigate([], { queryParams: { EditMode: null } })
  }
}
