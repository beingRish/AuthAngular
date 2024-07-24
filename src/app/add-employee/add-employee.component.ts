import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

  addEmployeeForm!: FormGroup
  data: {} = {}

  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
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

