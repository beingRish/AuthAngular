import { Component } from '@angular/core';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  constructor(
    private _du: DesignUtilityService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) { }

  close() {
    this.dialogRef.close()
  }
}

