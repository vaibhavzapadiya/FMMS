import { Routes } from '@angular/router';
import { NavbarComponent } from './Shared/Components/navbar/navbar.component';
import { authGuard } from './Shared/Gaurd/AuthGuard/auth.guard';
import { roleGuard } from './Shared/Gaurd/RoleGuard/role.guard';
import { UnauthorizedComponent } from './Shared/Components/unauthorized/unauthorized.component';
import { NotfoundComponent } from './Shared/Components/notfound/notfound.component';



export const routes: Routes = [

    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./Shared/Modules/auth/auth.module').then(m => m.AuthModule) },
    { path: 'unauthorized', component: UnauthorizedComponent },



    {
        path: 'fmms', component: NavbarComponent,
        canActivate: [authGuard],

        children:
            [

                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard',   loadChildren: () => import('./Modules/dash-board/dash-board.module').then(m => m.DashBoardModule) },
                { path: 'maintenance', loadChildren: () => import('./Modules/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
                { path: 'workorder',   loadChildren: () => import('./Modules/work-order/work-order.module').then(m => m.WorkOrderModule), canActivate: [roleGuard], data: { roles: [2, 3] } },
                { path: 'vendors',     loadChildren: () => import('./Modules/vendor/vendor.module').then(m => m.VendorModule), canActivate: [roleGuard], data: { roles: [2] } },
                { path: 'inventory',   loadChildren: () => import('./Modules/inventory/inventory.module').then(m => m.InventoryModule), canActivate: [roleGuard], data: { roles: [2] } },
                { path: 'reports',     loadChildren: () => import('./Modules/reports/reports.module').then(m => m.ReportsModule), canActivate: [roleGuard], data: { roles: [2] } },
                { path: 'projects',    loadChildren: () => import('./Modules/projects/projects.module').then(m => m.ProjectsModule) },
                { path: 'Schedule',    loadChildren: () => import('./Modules/maintenance-scheduling/maintenance-scheduling.module').then(m => m.MaintenanceSchedulingModule), canActivate: [roleGuard], data: { roles: [2, 3] } },
                { path: 'technician',  loadChildren: () => import('./Modules/technician/technician.module').then(m => m.TechnicianModule), canActivate: [roleGuard], data: { roles: [2] } }

            ]


    },
    {path:'**',component:NotfoundComponent}
    
];
