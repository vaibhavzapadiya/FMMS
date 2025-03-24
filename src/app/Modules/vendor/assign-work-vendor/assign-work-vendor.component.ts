import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendorService } from '../Service/vendor.service';
import { CommonModule } from '@angular/common';
declare var bootstrap: any; // Required for Bootstrap Modal

@Component({
  selector: 'app-assign-work-vendor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './assign-work-vendor.component.html',
  styleUrl: './assign-work-vendor.component.css'
})
export class AssignWorkVendorComponent implements OnInit {
  form!: FormGroup
  Statuslist: any[] = []
  WorkORderList: any[] = []
  errormsg: any;
  uploadinvoiceform!: FormGroup
  selectedFile: File | null = null;
  currentworkorderid!: number
  PageNumber:number=1
  PageSize:number=10
 modal:any
 UpdateStatusform!:FormGroup
 CurrentVwndoeWorkOrderId!:number
  constructor(private fb: FormBuilder, private vendorservice: VendorService) {
    this.form = this.fb.group({
      statusId: [''],
      vendorWorkOrderId: [''],
      vendorId: [''],
      vendorName:['']


    })

    this.uploadinvoiceform = this.fb.group({
      InvoiceDate: ['', Validators.required],
      invoice: ['', Validators.required],
      Amount: ['', Validators.required]


    })
    this.UpdateStatusform=this.fb.group({
      statusId:['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.loadWorkOrder()
    this.vendorservice.getallworkorderstatus().subscribe((data: any) => {
      this.Statuslist = data
    })

  }

  loadWorkOrder() {
    const newdata = {
      pageNumber: this.PageNumber,
      pageSize: this.PageSize,
      statusId: this.form.get('statusId')?.value ? parseInt(this.form.get('statusId')?.value) :null,
      vendorId: this.form.get('vendorId')?.value ? parseInt(this.form.get('vendorId')?.value) :null,
      vendorWorkOrderId: this.form.get('vendorWorkOrderId')?.value ? parseInt(this.form.get('vendorWorkOrderId')?.value) :null,
      vendorName:this.form.get('vendorName')?.value ? this.form.get('vendorName')?.value :null
    }


    this.vendorservice.getallWorkOrders(newdata).subscribe({
      next: (res: any) => {
        if (!res) {
          this.errormsg = res.message
        }
        else {
        console.log(res);
        

          this.WorkORderList = res
        }

      }, error: (er) => {
        this.errormsg = er.message
      }
    })
  }

 
  reset() {
    this.form.reset()
    this.loadWorkOrder()
  }

  openModalForAssignWork(vendorWorkOrderId: number) {
    this.currentworkorderid = vendorWorkOrderId

    this.modal = new bootstrap.Modal(document.getElementById('UploadInvoiceModal'));

    this.modal.show();
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadInvoice() {
    if (this.uploadinvoiceform.valid) {
      const formData = new FormData();
      console.log(this.uploadinvoiceform.value);


      formData.append('VendorWorkOrderId', String(this.currentworkorderid));
      formData.append('InvoiceDate', this.uploadinvoiceform.get('InvoiceDate')?.value);
      formData.append('Amount', this.uploadinvoiceform.get('Amount')?.value);

      if (this.selectedFile) {
        formData.append('InvoiceImageUrl', this.selectedFile);
      }
      console.log(formData);

      this.vendorservice.uploadInvoice(formData).subscribe({
        next: (data) => {
          this.modal.hide();
          this.uploadinvoiceform.reset()

        },
        error: (error) => {
          if (error.error && error.error.message) {
            this.errormsg = error.error.message;
            console.log(error);

          } else {
            this.errormsg =
              'An unexpected error occurred. Please try again.';
          }
        },
      });

    }
  }

  OpenModalForUpdate(id:number){
    this.currentworkorderid=id

    this.modal = new bootstrap.Modal(document.getElementById('UpdatestatusModal'));

    this.modal.show();
    

  }

  updateWorkOrderStatus(){
    const newdata={
      vendorWorkOrderId:this.currentworkorderid,
      statusId:parseInt(this.UpdateStatusform.get('statusId')?.value),

    }
    this.vendorservice.updateWorkOrderStatus(newdata).subscribe({
      next:()=>{
        this.loadWorkOrder()
        this.modal.hide();
      }
    })
  }

  prev(){
    if(this.PageNumber>1){
      this.PageNumber--
      this.loadWorkOrder()
  

    }
 
  }
  next(){
    if(this.WorkORderList.length>0){

      this.PageNumber++
      this.loadWorkOrder()
    }
}


}
