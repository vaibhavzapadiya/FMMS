import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorlistComponent } from './vendorlist/vendorlist.component';
import { AssignWorkVendorComponent } from './assign-work-vendor/assign-work-vendor.component';

const routes: Routes = [
  {path:'list',component:VendorlistComponent},
  {path:'assign',component:AssignWorkVendorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
