import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../Services/ToastService/toast.service';
import { TokenService } from '../../Services/TokenService/token.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  service=inject(ToastService)
  toast = computed(() =>this.service.toast());

}
