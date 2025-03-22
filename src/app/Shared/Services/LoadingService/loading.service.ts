import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private isLoadingSignal = signal<boolean>(false);
 
  get isLoading() {
    return this.isLoadingSignal.asReadonly();
  }
 
  show(): void {

    
    this.isLoadingSignal.set(true);
  }
 
  hide(): void {
    this.isLoadingSignal.set(false);
  }
}
