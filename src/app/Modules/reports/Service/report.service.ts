import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }
  private readonly apiBaseUrl: string = environment.apiBaseUrl; 

  getFilteredReport(data:any){
   return this.http.post(`${this.apiBaseUrl}/Reports/Genrate-maintenance-report`,data)
  }
}
