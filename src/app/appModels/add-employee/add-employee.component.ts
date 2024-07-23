import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

  addEmployeeForm!: FormGroup
  data: {} = {}

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      dept: ['', Validators.required],
      status: ['', Validators.required]
  })
  }

  onClose() {
    this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.addEmployeeForm.valid) {
      const newEmployee = {
        ...this.addEmployeeForm.value,
        id: new Date().getTime().toString()  // Generate a unique ID based on timestamp
      };
      this.dialogRef.close(newEmployee);
    } else {
      console.error('Form is invalid');
    }
  }
}

