import { Component, Input, OnInit } from '@angular/core';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../appModels/delete-dialog/delete-dialog.component';
import { AddEmployeeComponent } from '../appModels/add-employee/add-employee.component';

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
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  addEmployee(enterAnimationDuration:string, exitAnimationDuration: string) {
      this.dialog.open(AddEmployeeComponent, {
        width: '550px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  
  viewEmployee(id: any) {
    this.router.navigate(['employee', id])
  }  

  openDialog(userId: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { userId, enterAnimationDuration, exitAnimationDuration }
    });

  console.log('j',this.allUsers);
  

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        const userToDelete = this.allUsers.find(user => user.id === userId);
        if (userToDelete) {
          userToDelete.isDeleted = true;
        }

      }
    });
  }

}
