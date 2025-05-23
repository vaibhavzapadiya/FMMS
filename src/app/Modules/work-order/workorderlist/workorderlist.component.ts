import { Component, OnInit } from '@angular/core';
import { WorkorderService } from '../Services/workorder.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../Shared/Services/TokenService/token.service';
import { LoadingService } from '../../../Shared/Services/LoadingService/loading.service';
import { StatusHighlightDirective } from '../../../Shared/Directive/StatusDirective/status-highlight.directive';
import { VendorService } from '../../vendor/Service/vendor.service';
declare var bootstrap: any; // Required for Bootstrap Modal

@Component({
  selector: 'app-workorderlist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, StatusHighlightDirective],
  templateUrl: './workorderlist.component.html',
  styleUrl: './workorderlist.component.css'
})
export class WorkorderlistComponent implements OnInit {

  PageNumber: number = 1
  PageSize: number = 5

  Statuslist: any[] = []
  form!: FormGroup
  employeeid!: number | null
  WorkorderList: any[] = []
  currentWorkorderId!: number
  updatestatusformForm!: FormGroup
  assignWorkTOVendorormForm!:FormGroup
  modal: any
  currentroleId1!: number | null
  AssigntoVendordetails:any
 vendorList:any[]=[]
 location: any[] = [
  {
    locationname: "Radixweb PVT LTD"
  }
]
  constructor(private workorderservice: WorkorderService, private fb: FormBuilder, private tokenservice: TokenService, 
    private loadingservie: LoadingService,private vendorservice:VendorService) {
    this.employeeid = this.tokenservice.getEmployeeId()
    this.currentroleId1 = this.tokenservice.getEmployeeRoleId();
    this.form = this.fb.group({
      statusID: [''],
      requestID: [''],
      workOrderID: [''],
      technicanName: ['']
    })

    this.updatestatusformForm = this.fb.group({
      statusID: ['', Validators.required]
    })
    this.assignWorkTOVendorormForm=this.fb.group({
      vendorId:['',Validators.required],
      location:['',Validators.required]

    })
  }



  ngOnInit(): void {
    this.loadworkorderlist()
    this.workorderservice.getallworkorderstatus().subscribe((data: any) => {
      this.Statuslist = data
    })
  }

  loadworkorderlist() {


    const statusvalue = this.form.get('statusID')?.value
    const requestvalue = this.form.get('requestID')?.value
    const workOrdervalue = this.form.get('workOrderID')?.value


    const statusID = (statusvalue !== '' && !isNaN(parseInt(statusvalue)))
      ? parseInt(statusvalue)
      : null;

    const requestID = (requestvalue !== '' && !isNaN(parseInt(requestvalue)))
      ? parseInt(requestvalue)
      : null;


    const workOrderID = (workOrdervalue !== '' && !isNaN(parseInt(workOrdervalue)))
      ? parseInt(workOrdervalue)
      : null;


    const newdata = {

      pageSize: this.PageSize,
      pageNumber: this.PageNumber,
      workOrderID: workOrderID,
      requestID: requestID,
      statusID: statusID,
      employeeId: this.employeeid,
      technicanName: this.form.get('technicanName')?.value ?? null

    }
    console.log(newdata);

    this.workorderservice.getallworkorderlist(newdata).subscribe({
      next: (res: any) => {
        this.WorkorderList = res
      },
      complete: () => {

      }
    })

  }

  // filter(){

  //   const statusvalue=this.form.get('statusID')?.value
  //   const requestvalue=this.form.get('requestID')?.value
  //   const workOrdervalue=this.form.get('workOrderID')?.value


  //    const statusID = (statusvalue !== '' && !isNaN(parseInt(statusvalue)))
  //     ? parseInt(statusvalue)
  //     : null;

  //     const requestID = (requestvalue !== '' && !isNaN(parseInt(requestvalue)))
  //     ? parseInt(requestvalue)
  //     : null;


  //     const workOrderID = (workOrdervalue !== '' && !isNaN(parseInt(workOrdervalue)))
  //     ? parseInt(workOrdervalue)
  //     : null;



  //     const newdata={

  //         pageSize: 10,
  //         pageNumber: 1,
  //         workOrderID: workOrderID,
  //         requestID: requestID,
  //         statusID: statusID,
  //         employeeId: this.employeeid

  //     }

  //   this.workorderservice.getallworkorderlist(newdata).subscribe({

  //     next:(res:any)=>{
  //       this.WorkorderList=res
  //     },
  //     error:(er)=>{
  //       console.log(er);


  //     }
  //   }
  //   )


  // }


  openModal(id: number) {
    this.currentWorkorderId = id
    console.log(id);

    this.modal = new bootstrap.Modal(document.getElementById('updatestatusModal'));
    this.modal.show();
  }

  UpdateStatus() {
    if (this.updatestatusformForm.valid) {
      let newdata = {
        workOrderId: this.currentWorkorderId,
        statusId: parseInt(this.updatestatusformForm.get('statusID')?.value)
      }
      console.log(newdata);

      this.workorderservice.updateWorkOrderStatus(newdata).subscribe({
        next: (res) => {
          this.loadworkorderlist()
          console.log(res);

          this.modal.hide();

        }, error: (er) => {
          console.log(er);

        }
      })
    }
  }
  openModalForAssignVendor(work:any){
    this.AssigntoVendordetails=work
    this.vendorservice.GetAllVendors().subscribe((data:any)=>{
      this.vendorList=data
    })
    this.modal = new bootstrap.Modal(document.getElementById('assignWorkTOVendorModal'));
    this.modal.show();
  }

  AssignWorkToVendor(){
    const newdata={
      vendorId:parseInt(this.assignWorkTOVendorormForm.get('vendorId')?.value),
      statusId:1,
      description:this.AssigntoVendordetails.description,
      location:this.assignWorkTOVendorormForm.get('location')?.value,
      workOrderID:this.AssigntoVendordetails.workOrderId
    }

    this.workorderservice.assignWorkTOVendor(newdata).subscribe({
      next:()=>{
        this.modal.hide()
      },
      error:()=>{
        
      }
    })
  }

  prev() {
    if (this.PageNumber > 1) {
      this.PageNumber--
      this.loadworkorderlist()


    }

  }
  next() {
    if (this.WorkorderList.length > 0) {

      this.PageNumber++
      this.loadworkorderlist()
    }



  }
}
