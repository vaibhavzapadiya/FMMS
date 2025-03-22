import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryfromListComponent } from './inventoryfrom-list/inventoryfrom-list.component';

const routes: Routes = [
  {path:'',component:InventoryfromListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
