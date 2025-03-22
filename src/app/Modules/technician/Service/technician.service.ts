import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private readonly apiBaseUrl: string = environment.apiBaseUrl; 

  constructor(private http:HttpClient) { }

  getalltechnician(data:any){
    return this.http.post(`${this.apiBaseUrl}/Employee/getallTechnician`,data)

  }
}
