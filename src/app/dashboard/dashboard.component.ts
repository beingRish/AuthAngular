import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  allUsers: any[] = [];
  constructor(
    private _du: DesignUtilityService,
    private router: Router
    ){
  }

  ngOnInit(): void {
    this._du.fetchData().subscribe(res => {
      this.allUsers = res;
      console.log(this.allUsers);
      
    })
  }

  addEmployee() {
    
  }

  viewEmployee(id: any) {
    this.router.navigate(['employee', id])
  }

  deleteUser(id: any) {
    this._du.deleteEmployee(id)?.subscribe(
      (res) => {
        console.log('User deleted successfully:', res);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    )
  }

}
