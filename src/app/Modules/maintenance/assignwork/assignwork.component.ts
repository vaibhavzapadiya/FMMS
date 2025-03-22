import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaintenanceService } from '../Services/maintenance.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../Shared/Services/TokenService/token.service';
import { futureDateValidator } from '../../../Shared/CustomValidation/date.validation';

@Component({
  selector: 'app-assignwork',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './assignwork.component.html',
  styleUrl: './assignwork.component.css'
})
export class AssignworkComponent implements OnInit {
  assignForm: FormGroup;
  errmsg:string=''
  @Input() requestData: any; // Get data from parent component
  @Output() onAssign = new EventEmitter<any>(); // Emit event when assigned
  Technicianlist: any[] = []
  constructor(private fb: FormBuilder, private maintenanceservice: MaintenanceService,private tokenservice:TokenService) {
    this.assignForm = this.fb.group({
      technicianId: ['', Validators.required],
      DueDate: ['',futureDateValidator()]
    });
  }
  ngOnInit(): void {
    this.maintenanceservice.getTechnicianList().subscribe((data: any) => {
      this.Technicianlist = data
    })
  }







  assignTechnician() {
    if(this.assignForm.valid){
      this.errmsg=''
    let assignedData = {
      RequestId: this.requestData?.requestID,
      TechnicianId: parseInt(this.assignForm.get('technicianId')?.value),
      DueDate: this.assignForm.get('DueDate')?.value,
      StatusId:1,
      AssigendBy:this.tokenservice.getEmployeeId()
    };

    // Emit assigned data to parent component
    this.onAssign.emit(assignedData);
   
    this.assignForm.reset();
  }
  else{
    this.errmsg="All Fields are required"

  }
}
  

}
