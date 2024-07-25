import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editMode: boolean = false
  Form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private rounter: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      name: ['Edit Name'],
      picture: ['Edit Photo']
    })

    this.activatedRoute.queryParamMap.subscribe(res =>{
      let qParams = res.get('EditMode');

      if(qParams != null){
        this.editMode = true;
      }else{
        this.editMode = false;
      }
    })
  }

  onEmpSubmit() {
    if(this.Form.valid){
      console.log(this.Form.value);
    }else{
      let key = Object.keys(this.Form.controls);
      console.log(key);

      key.filter(data => {
        console.log(data);
        let control = this.Form.controls[data];
        console.log(control);
        if(control.errors != null){
          control.markAllAsTouched();
        }
      })
    }
  }


  onDiscard() {
    this.Form.reset();
    this.rounter.navigate([], {queryParams: {EditMode: null}})
  }


}
