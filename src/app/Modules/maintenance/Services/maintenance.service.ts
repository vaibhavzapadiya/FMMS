import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../../Shared/Services/TokenService/token.service';
import { environment } from '../../../../environments/environment';

export interface GetAllRequest{
  PageNumber:number,
  PageSize:number,
  EmployeeId:number | null,
  StatusId:number|null
  IssueId:number|null
  PriorityId:number|null
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  employeeid!:number|null
  private readonly apiBaseUrl: string = environment.apiBaseUrl; // Use environment variable


  constructor(private http:HttpClient,private tokenservice:TokenService) {
  this.employeeid=tokenservice.getEmployeeId();
  console.log(this.employeeid);
  

   }

   getIssueTypelist(){
   return this.http.get('https://localhost:7223/api/FormDropDown/IssueType')
   }
   getPrioritylist(){
   return this.http.get(`${this.apiBaseUrl}/FormDropDown/Priority`)
   }
   getRequestStatus(){
    return this.http.get(`${this.apiBaseUrl}/FormDropDown/status`)
   }
   getTechnicianList(){
    return this.http.get(`${this.apiBaseUrl}/FormDropDown/technician`)
   }
   makeMaintenanceRequest(data:any){
    return this.http.post(`${this.apiBaseUrl}/Maintenance/Makerequest`,data)
   }

   GetAllMaintenainceRequest(data:GetAllRequest){

    return this.http.post(`${this.apiBaseUrl}/Maintenance/GetAllMaintenanceRequest`,data)
   }

   assignWorkToTechnician(data:any){
   return this.http.post(`${this.apiBaseUrl}/WorkOrder/assignwork`,data)

   }

   updateStatus(requestid:number,statusid:number){
   return this.http.put(`${this.apiBaseUrl}/Maintenance/updatemaintenancetatus?id=${requestid}&statusid=${statusid}`,{})
   }

   deleteItem(id:number){
    return this.http.delete(`${this.apiBaseUrl}/Maintenance/deleteRequest/${id}`)
   }


}
