import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkorderlistComponent } from './workorderlist/workorderlist.component';

const routes: Routes = [
  {path:'',component:WorkorderlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
