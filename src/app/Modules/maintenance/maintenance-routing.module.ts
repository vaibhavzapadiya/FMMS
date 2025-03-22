import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';
import { MaintenanceRequestListComponent } from './maintenance-request-list/maintenance-request-list.component';

const routes: Routes = [
  {path:'form',component:MaintenanceFormComponent},
  {path:'list',component:MaintenanceRequestListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
