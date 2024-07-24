import { Component, Input, OnInit } from '@angular/core';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  allUsers: any[] = [];
  constructor(
    private _du: DesignUtilityService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this._du.fetchData().subscribe(
      (res: any[]) => {
        this.allUsers = res.map(user => ({ ...user, isDeleted: false }));
      },
    );
  }

  addEmployee(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '315px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        
        this._du.saveData(result).subscribe(
          (res: any) => {
            this.fetchUsers();
            console.log('Employee added successfully', res);
          },
        );
      }
    });
  }

  viewEmployee(id: any) {
    this.router.navigate(['employee', id])
  }

  deleteEmployee(userId: string, enterAnimationDuration: string, exitAnimationDuration: string){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { userId, enterAnimationDuration, exitAnimationDuration }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this._du.deleteEmployee(userId).subscribe(
          () => {
            const userToDelete = this.allUsers.find(user => user.id === userId);
            if (userToDelete) {
              userToDelete.isDeleted = true;
            }
            this.fetchUsers()
          },
        );
      }
      
    });
  }

}
