import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../Services/TokenService/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
 const tokenservice=inject(TokenService)
 const token=tokenservice.getBearerToken()
 const id=tokenservice.getEmployeeId()

 if(!token || !id ){
  router.navigate(['/auth/login'])
  return false
 }
  return true;
};
