import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Shared/Components/navbar/navbar.component";
import { LoginComponent } from "./Shared/Modules/auth/login/login.component";
import { DashboardComponent } from "./Modules/dash-board/dashboard/dashboard.component";
import { LoadingComponent } from "./Shared/Components/loading/loading.component";
import { ToastComponent } from "./Shared/Components/toast/toast.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'Facility_aintenance_Management_System';
}
