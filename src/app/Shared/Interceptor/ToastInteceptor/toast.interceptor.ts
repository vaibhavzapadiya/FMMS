import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ToastService } from '../../Services/ToastService/toast.service';
 
export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
 
  return next(req).pipe(
    tap({
      next: (res: any) => {
        // Show success message for POST, PUT, DELETE
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
          const successMessage = res?.body?.message || res?.message;
          if (successMessage) {
            toastService.showToast(successMessage, 'success');
          }
        }
      },
      error: (er: any) => {
        
        const errorObj = er?.error?.errors;
        const errorMessage = errorObj
          ? Object.values(errorObj).join(', ') // Join all error messages
          : er?.error?.message || 'Something went wrong. Please try again.';
        
        toastService.showToast(errorMessage, 'error');
      },
    })
  );
};