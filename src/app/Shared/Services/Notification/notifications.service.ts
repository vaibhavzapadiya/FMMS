import { ApplicationRef, ComponentFactoryResolver, ComponentRef, computed, EmbeddedViewRef, Injectable, Injector, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { NotificationDialogComponent } from '../../Components/notification-dialog/notification-dialog.component';
export interface Notification {
  id: number;
  employeeId: number;
  message: string;
  createdAt: Date;
}
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {




     hubConnection: signalR.HubConnection;
  

    notifications = signal<Notification[]>([]);
    newNotification = signal<Notification | null>(null);
    connectionStatus = signal<'connected' | 'disconnected' | 'connecting'>('disconnected');

    constructor() {
      this.hubConnection = new signalR.HubConnectionBuilder().
      withUrl('https://localhost:7223/notificationHub', { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
        .withAutomaticReconnect()
        .build();
  
    }
  
   
}
