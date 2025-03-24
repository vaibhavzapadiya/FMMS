import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkorderService {
  private readonly apiBaseUrl: string = environment.apiBaseUrl; 

  constructor(private http:HttpClient) { }

  getallworkorderstatus(){
    return this.http.get(`${this.apiBaseUrl}/FormDropDown/GetAllWorkOrderStatus`)
  }
  getallworkorderlist(data:any){
    return this.http.post(`${this.apiBaseUrl}/WorkOrder/GetAllWorkOrder`,data)
  }

  updateWorkOrderStatus(data:any){
    return this.http.put(`${this.apiBaseUrl}/WorkOrder/UpdateWorkOrderStatus`,data)
  }

  assignWorkTOVendor(data:any){
    return this.http.post(`${this.apiBaseUrl}/Vendor_Workorder/assignWorkToVendor`,data)
  }
}
