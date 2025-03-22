import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../TokenService/token.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiBaseUrl: string = environment.apiBaseUrl; 

  constructor(private http:HttpClient) {

  
   }

  getEmployeeById(id:any){
    return this.http.get(`${this.apiBaseUrl}/Employee/Employee/${id}`)

  }
  getBearerToken(){
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `${token}` } : {};
  }
}
