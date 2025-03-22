import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../Services/LoadingService/loading.service';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { TokenService } from '../Services/TokenService/token.service';

export const loadingInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService)
   loadingService.show();
 
  return next(req).pipe(finalize(() => loadingService.hide()));
};
