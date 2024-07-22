import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  allUsers: any[] = [];

  constructor(private _du: DesignUtilityService){
  }

  ngOnInit(): void {
    this._du.fetchData().subscribe(res => {
      this.allUsers = res;
      console.log(this.allUsers);
      
    })
  }

}
