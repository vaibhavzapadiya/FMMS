import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private readonly apiBaseUrl: string = environment.apiBaseUrl; 

  constructor(private http:HttpClient) { }

  GetAllVendors(){
   return this.http.get(`${this.apiBaseUrl}/Vendor_Workorder/AllVendors`)

  }
  getAllServiceType(){
    return this.http.get(`${this.apiBaseUrl}/FormDropDown/Servicelist`)
  }
  AddVendor(data:any){
    return this.http.post(`${this.apiBaseUrl}/Vendor_Workorder/addvendor`,data)
  }
  assignworktoVendor(data:any){
    return this.http.post(`${this.apiBaseUrl}/Vendor_Workorder/assignWorkToVendor`,data)
  }
  getallworkorderstatus(){
    return this.http.get(`${this.apiBaseUrl}/FormDropDown/GetAllWorkOrderStatus`)
  }
  getallWorkOrders(data:any){
    return this.http.post(`${this.apiBaseUrl}/Vendor_Workorder/GetAllWorkOrder`,data)

  }

  uploadInvoice(data:any){
    return this.http.post(`${this.apiBaseUrl}/Invoice/UploadInvoice`,data)
  }
}
