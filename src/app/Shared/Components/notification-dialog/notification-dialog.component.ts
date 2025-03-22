import { CommonModule } from '@angular/common';
import { Component, effect, inject, Inject, Input } from '@angular/core';
import { NotificationsService } from '../../Services/Notification/notifications.service';

@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.css'
})
export class NotificationDialogComponent {


  
}
