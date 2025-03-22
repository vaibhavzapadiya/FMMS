import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { LoadingService } from '../../Services/LoadingService/loading.service';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  service=inject(LoadingService)
  isLoading = computed(() => this.service.isLoading());

}
