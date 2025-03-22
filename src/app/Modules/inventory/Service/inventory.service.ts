import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly apiBaseUrl: string = environment.apiBaseUrl; 
  constructor(private http:HttpClient) { }

  getallSparePartDetails(){
   return this.http.get(`${this.apiBaseUrl}/Inventory/GetAllItems`)
  }

  addsparepart(data:any){
    return this.http.post(`${this.apiBaseUrl}/Inventory/addsparepart`,data)
  }

  alertlowstock(){
    return this.http.get(`${this.apiBaseUrl}/Inventory/LowStockEmail`)
  }

  deleteitem(id:number){
    return this.http.delete(`${this.apiBaseUrl}/Inventory/deleteItem/${id}`)
  }

  updateSpareitemstock(data:any){
    return this.http.put(`${this.apiBaseUrl}/Inventory/UpdateItem`,data)
  }

  UpdateThresold(data:any){
    return this.http.put(`${this.apiBaseUrl}/Inventory/UpdateThresold`,data)
  }
}
