import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private readonly apiBaseUrl: string = environment.apiBaseUrl; 

  constructor(private http:HttpClient) { }

  getallequipment(){
   return this.http.get(`${this.apiBaseUrl}/FormDropDown/GetAllEquipmentList`)
  }
  getalltechnician(){
   return this.http.get(`${this.apiBaseUrl}/FormDropDown/technician`)
  }

  getallMaintenancetype(){
   return this.http.get(`${this.apiBaseUrl}/FormDropDown/GetAllMaintenanceTypelist`)
  }

  Schedulemaintenancerequest(data:any){
    return this.http.post(`${this.apiBaseUrl}/ScheduleMaintenance/schedule`,data)
  }

  GetAllScheduleWorkOrder(data:any){
    return this.http.post(`${this.apiBaseUrl}/ScheduleMaintenance/GetAllScheduleWork`,data)
  }

  notifytotechnician(id:number){
    return this.http.post(`${this.apiBaseUrl}/ScheduleMaintenance/notified`,{id})
  }
}
