import { Component, OnInit } from '@angular/core';
import { VendorService } from '../Service/vendor.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
declare var bootstrap: any; // Required for Bootstrap Modal

@Component({
  selector: 'app-vendorlist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vendorlist.component.html',
  styleUrl: './vendorlist.component.css',
})
export class VendorlistComponent implements OnInit {
  VendorList: any[] = [];
  PageNumber: number = 1
  PageSize: number = 10
  errormsg: string = '';
  formerrormsg: string = '';
  currentVendorId!: number | null
  addvendorForm!: FormGroup;
  assignworkform!: FormGroup;
  ServiceTypelIst: any[] = [];
  location: any[] = [
    {
      locationname: "Radixweb PVT LTD"
    }
  ]
  modal: any

  constructor(private vendorservice: VendorService, private fb: FormBuilder) {
    this.addvendorForm = this.fb.group({
      vendorName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      serviceTypeId: ['', Validators.required],
    });
    this.assignworkform = this.fb.group({
      description: ['', Validators.required],
      location: ['', Validators.required]


    })
  }
  ngOnInit(): void {
    this.loadvendors();
  }

  loadvendors() {
    this.vendorservice.GetAllVendors().subscribe({
      next: (res: any) => {
        this.VendorList = res;
      },
      error: (er) => {
        if (er.message) {
          this.errormsg = er.message;
        }
      },
    });
  }

  openModallForAdd() {
    this.modal = new bootstrap.Modal(document.getElementById('addvendorModal'));
    this.vendorservice.getAllServiceType().subscribe((data: any) => {
      this.ServiceTypelIst = data;
    });
    this.modal.show();
  }
  addvenodr() {
    if (this.addvendorForm.valid) {
      console.log(this.addvendorForm.value);
      this.formerrormsg = '';
      let newdata = { ...this.addvendorForm.value };
      newdata.serviceTypeId = parseInt(newdata.serviceTypeId);

      this.vendorservice.AddVendor(newdata).subscribe({
        next: () => {
          this.modal.hide()
          this.addvendorForm.reset();
          this.loadvendors();
        },
        error: (er) => {
          this.errormsg = er.message;
        },
      });
    } else {
      this.formerrormsg = 'All fields are required';
    }
  }

  openModalForAssignWork(id: number) {
    this.currentVendorId = id
    this.modal = new bootstrap.Modal(document.getElementById('assignworkModal'));

    this.modal.show();
  }

  assignwork() {
    if (this.assignworkform.valid) {
      this.formerrormsg = '';

      let newdata = {
        vendorId: this.currentVendorId,
        statusId: 1,
        description: this.assignworkform.get('description')?.value,
        location: this.assignworkform.get('location')?.value

      }
      console.log(newdata);

      this.vendorservice.assignworktoVendor(newdata).subscribe({

        next: () => {
          this.modal.hide()
          this.assignworkform.reset();
        },
        error: (er) => {
          this.errormsg = er.message
        }
      })

    }

    else {
      this.formerrormsg = 'All fields are required';
    }

  }

  prev() {
    if (this.PageNumber > 1) {
      this.PageNumber--
      this.loadvendors()


    }

  }
  next() {
    if (this.VendorList.length > 0) {

      this.PageNumber++
      this.loadvendors()
    }
  }
}
