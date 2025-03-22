import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../../Shared/Services/TokenService/token.service';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
 cuurentemployeeid!:number|null
 private readonly apiBaseUrl: string = environment.apiBaseUrl; 
  constructor(private http:HttpClient,private tokenservice:TokenService) { 
    this.cuurentemployeeid=this.tokenservice.getEmployeeId();
  }

  getallmaintenancerequestcount(){
   return this.http.get(`${this.apiBaseUrl}/Maintenance/TotoalMainenancerequest/${this.cuurentemployeeid}`)
  }

  getallworkorderCount(){
   return this.http.get(`${this.apiBaseUrl}/Maintenance/TotoalWorkOrder/${this.cuurentemployeeid}`)
  }
}
