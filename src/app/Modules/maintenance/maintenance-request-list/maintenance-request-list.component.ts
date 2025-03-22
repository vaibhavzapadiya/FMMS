import { Component, OnInit } from '@angular/core';
import {
  GetAllRequest,
  MaintenanceService,
} from '../Services/maintenance.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AssignworkComponent } from '../assignwork/assignwork.component';
import { TokenService } from '../../../Shared/Services/TokenService/token.service';
declare var bootstrap: any; // Required for Bootstrap Modal

@Component({
  selector: 'app-maintenance-request-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AssignworkComponent],
  templateUrl: './maintenance-request-list.component.html',
  styleUrl: './maintenance-request-list.component.css',
})
export class MaintenanceRequestListComponent implements OnInit {
  Maintenancerequestlist: any[] = [];
  
  errormsg: string = '';
  noDataMsg: string = '';
  IssueTypelist: any[] = [];
  PriorityList: any[] = [];
  StatusList: any[] = [];

  form!: FormGroup;
  employeeid: number | null;
  roleid!:number|null;
  selectedRequest: any = null;
  PageNumber:number=1
  PageSize:number=5
  currentrequestId!:number
  modalofReject:any
  modal:any

  constructor(
    private maintenanceservice: MaintenanceService,private tokenservice:TokenService,
    private fb: FormBuilder
  ) {
    this.employeeid = maintenanceservice.employeeid;
    this.roleid=   this.tokenservice.getEmployeeRoleId()
    this.form = this.fb.group({
      PriorityId: [''],
      IssueId: [''],
      statusId: [''],
    
    });
  }

  ngOnInit(): void {
    this.loadMaintenanceRequestList();

    this.loaddataFIlterDropDown();
  }
  loadMaintenanceRequestList() {
    const newdata: GetAllRequest = {
      PageNumber: this.PageNumber,
      PageSize: this.PageSize,
      EmployeeId: this.employeeid,
      StatusId: parseInt(this.form.get('statusId')?.value) ?? null,
      IssueId: parseInt(this.form.get('IssueId')?.value) ?? null,
      PriorityId: parseInt(this.form.get('PriorityId')?.value) ?? null,
      
    };
    this.maintenanceservice.GetAllMaintenainceRequest(newdata).subscribe({
      next: (res: any) => {
       
          
    
          this.Maintenancerequestlist = res;

          console.log(res);
          
        
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.errormsg = err.error.message;
        } else {
          this.errormsg = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }

  loaddataFIlterDropDown() {

    forkJoin({
      issuetype: this.maintenanceservice.getIssueTypelist(),
      priorities: this.maintenanceservice.getPrioritylist(),
      Status: this.maintenanceservice.getRequestStatus(),
    }).subscribe({
      next: (res: any) => {
        this.IssueTypelist = res.issuetype;
        this.PriorityList = res.priorities;
        this.StatusList = res.Status;
      }
    });
  }

  // search() {
  //   const newdata: GetAllRequest = {
  //     PageNumber: this.PageNumber,
  //     PageSize: this.PageSize,
  //     EmployeeId: this.employeeid,
  //     StatusId: parseInt(this.form.get('statusId')?.value) ?? null,
  //     IssueId: parseInt(this.form.get('IssueId')?.value) ?? null,
  //     PriorityId: parseInt(this.form.get('PriorityId')?.value) ?? null,
  //   };

  //   this.maintenanceservice.GetAllMaintenainceRequest(newdata).subscribe({
  //     next: (res: any) => {
  //       if (!res) {
  //         this.noDataMsg = res.message;
  //         console.log(res);

  //         this.Maintenancerequestlist = [];
  //       } else {
  //         this.Maintenancerequestlist = res;
  //         this.noDataMsg = '';
  //       }
  //     },
  //     error: (err) => {
  //       if (err.error && err.error.message) {
  //         this.errormsg = err.error.message;
  //       } else {
  //         this.errormsg = 'An unexpected error occurred. Please try again.';
  //       }
  //     },
  //   });
  // }
  Reset() {
    this.form.reset();
    this.loadMaintenanceRequestList()
  }

  openModal(request: any) {
    this.selectedRequest = request;
     this.modal = new bootstrap.Modal(document.getElementById('assignModal'));
    this.modal.show();
  }
  handleAssignment(assignedData: any) {
    this.maintenanceservice.assignWorkToTechnician(assignedData).subscribe({
      next: () => {
        this.modal.hide()
        this.loadMaintenanceRequestList();
 
      },
    });
  }

  rejectitem() {

    this.maintenanceservice.updateStatus(this.currentrequestId,3).subscribe({
   
      next:()=>{
        this.modalofReject.hide();
        this.loadMaintenanceRequestList()
      
        

      },
      error:()=>{

      }
    })
      
    
   

  }
  opendeletemodel(id: number) {
    this.currentrequestId=id

   this.modalofReject = new bootstrap.Modal(document.getElementById('deleteModal'));
      this.modalofReject.show();
  }

  prev(){
    if(this.PageNumber>1){
      this.PageNumber--
      this.loadMaintenanceRequestList()
  

    }
 
  }
  next(){
    if(this.Maintenancerequestlist.length>0){

      this.PageNumber++
      this.loadMaintenanceRequestList()
    }

  
  }


}
