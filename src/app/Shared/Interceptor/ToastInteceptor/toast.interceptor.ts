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
        let errorMessage = 'Something went wrong. Please try again.';

        if (er?.error) {
          if (er.error.errors) {
            // Handle validation errors (e.g., from model validation)
            errorMessage = Object.values(er.error.errors).join(', ');
          } else if (er.error.message) {
            // Handle server-side error messages
            errorMessage = er.error.message;
          } else if (typeof er.error === 'string'){
            //handle plain text errors.
            errorMessage = er.error;
          } else if (er.error.ExceptionMessage) {
            // Handle ExceptionResponse from your global exception handler
            errorMessage = er.error.ExceptionMessage;
          }
        }

        toastService.showToast(errorMessage, 'error');
      },
    })
  );
};