import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginrequest } from '../../Models/login.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


   private readonly apiBaseUrl: string = environment.apiBaseUrl; 

  login(data:loginrequest){
   return this.http.post<any>(`${this.apiBaseUrl}/Auth/login`, data,)
  }





}
