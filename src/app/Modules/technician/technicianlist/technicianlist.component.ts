import { Component, OnInit } from '@angular/core';
import { TechnicianService } from '../Service/technician.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-technicianlist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './technicianlist.component.html',
  styleUrl: './technicianlist.component.css'
})
export class TechnicianlistComponent implements OnInit {
  form!: FormGroup;
  pagenumber: number = 1
  pageSize: number = 10

  technicianList: any[] = []
  constructor(private technicianservice: TechnicianService, private fb: FormBuilder) {

    this.form = this.fb.group({
      employeeName: [''],
      employeeId: ['']


    })

  }
  ngOnInit(): void {
    this.loadAllTechnician()
  }

  loadAllTechnician() {

    const employeeId = this.form.get('employeeId')?.value

    const empid = (employeeId !== '' && !isNaN(parseInt(employeeId)))? parseInt(employeeId): null;
    let newdata = {
      pageNumber: this.pagenumber,
      pageSize: this.pageSize,
      employeeId: empid,
      employeeName: this.form.get('employeeName')?.value ?? null

    }

    this.technicianservice.getalltechnician(newdata).subscribe({
      next:(res:any)=>{
        this.technicianList=res
      },
      error:(er)=>{
        console.log(er);
        

      }
    })

  }
  prev(){
    if(this.pagenumber>1){
      this.pagenumber--
      this.loadAllTechnician()
  

    }
 
  }
  next(){
    if(this.technicianList.length>0){

      this.pagenumber++
      this.loadAllTechnician()
    }
}
}
