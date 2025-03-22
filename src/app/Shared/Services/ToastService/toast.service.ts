import { computed, Injectable, signal } from '@angular/core';
export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // in milliseconds
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {



private toastSignal = signal<{ message: string; type: 'success' | 'error' } | null>(null);
 
get toast() {
  return this.toastSignal.asReadonly();
}

showToast(message: string, type: 'success' | 'error') {
  this.toastSignal.set({ message, type });
  setTimeout(() => this.toastSignal.set(null), 3000);
}
}