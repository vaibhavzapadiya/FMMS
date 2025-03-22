import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../Services/TokenService/token.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const tokenservice=inject(TokenService)
  const token=tokenservice.getBearerToken()
  const roleid=tokenservice.getEmployeeRoleId()
 
  if(!roleid || !token ){
   router.navigate(['/auth/login'])
   return false
  }
  const allowedroles:number[]=route.data?.['roles'] || []

  if(allowedroles.length>0 && !allowedroles.includes(roleid)){
    router.navigate(['/unauthorized'])
    return false;
  } 

   return true;
};
