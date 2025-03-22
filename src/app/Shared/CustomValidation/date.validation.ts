// src/app/validators/date.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
 
export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; 
    }
 
    const selectedDate = new Date(control.value);
    const today = new Date();
 
    // Reset time to midnight to compare only the date
    today.setHours(0, 0, 0, 0);
 
    if (selectedDate < today) {
      return { dateInPast: true };
    }
 
    return null; 
  };
}