import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { config } from '../config';
import { map } from 'rxjs';
import { Employee } from '../appInterface/emp.interface';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  api = config.API_URL;

  constructor(private http: HttpClient){}

  saveData(data: any){
    return this.http.post(`${this.api}/empData2.json`, data)
  }

  fetchData(){
    return this.http.get<Employee>(`${this.api}/empData2.json`).pipe(map((resData: any) => {
      const userArray = [];
      for(const key in resData){
        if(resData.hasOwnProperty(key)){
          userArray.push({userId:key, ...resData[key]})
        }
      }
      return userArray
    }))
  }

  fetchSingleEmployee(id: any){
    return this.http.get<any>(`${this.api}/empData2/${id}.json`)
  }

  deleteEmployee(userId: any){
    if(confirm('Do you want to delete this user?')){
      console.log(userId);
      return this.http.delete(`${this.api}/empData2/${userId}.json`)
    }
    return
  }

}
