import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent{

  userId = '';
  isDeleted = false;
  
  constructor(
    private _du: DesignUtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {
    this.userId = data.userId
    
  }

  deleteUser(id: any) {
    this._du.deleteEmployee(id)?.subscribe(
      (res) => {
        this.isDeleted = true;
        this.dialogRef.close('delete');
        console.log('User deleted successfully:', this.userId);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    )
  }

  close(){
    this.dialogRef.close()
  }

  

}
