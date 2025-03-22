import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getBearerToken() {
    const token = sessionStorage.getItem('authToken');
    return token ? token : null;
  }
 
  getDecodedToken(): any {
    const token = sessionStorage.getItem('authToken');
    if (!token) return null;
 
    try {
      const payload = token.split('.')[1]; // Extract the payload part
      const decoded = JSON.parse(atob(payload)); // Decode the base64 payload
     // console.log(decoded);
      
      return decoded;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
 
  getEmployeeId(): number | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken && decodedToken.nameid ? parseInt(decodedToken.nameid) : null;
  }
 
  getEmployeeRoleId(): number | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken && decodedToken.role ? parseInt(decodedToken.role) : null;
  }
}
