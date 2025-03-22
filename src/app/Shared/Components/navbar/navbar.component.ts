import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TokenService } from '../../Services/TokenService/token.service';
import { EmployeeService } from '../../Services/EmployeeService/employee.service';
import { ToastComponent } from "../toast/toast.component";
import { NotificationsService } from '../../Services/Notification/notifications.service';
import { NotificationDialogComponent } from "../notification-dialog/notification-dialog.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, ToastComponent, NotificationDialogComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
showVendorMenu: boolean=false;

toggleVendorMenu() {
this.showVendorMenu=!this.showVendorMenu
}

  roleid!:number|null
  EmployeeId:number|null
  Employeename:string=''
  imageUrl!:string
  constructor(private router:Router,private tokenservice:TokenService,private employeeservice:EmployeeService,private notificationsService: NotificationsService){
    this.roleid=tokenservice.getEmployeeRoleId()
    this.EmployeeId=tokenservice.getEmployeeId()

  }
  ngOnInit(): void {
    this.employeeservice.getEmployeeById(this.EmployeeId).subscribe((data:any)=>{
      console.log(data);
      
      this.Employeename=data.employeeName
      this.imageUrl=data.imageUrl
    })

    
  }

  ngAfterViewInit() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
 
    sidebarToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('collapsed');
    });
  }
  
  logout(){
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/auth'])
  }







}
