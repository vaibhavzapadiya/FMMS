import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { roleGuard } from '../../Shared/Gaurd/RoleGuard/role.guard';

const routes: Routes = [
  {path:'',component:DashboardComponent,
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
