import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaintenanceService } from '../Services/maintenance.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { TokenService } from '../../../Shared/Services/TokenService/token.service';
import { ToastService } from '../../../Shared/Services/ToastService/toast.service';

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './maintenance-form.component.html',
  styleUrl: './maintenance-form.component.css',
})
export class MaintenanceFormComponent implements OnInit {

  form!: FormGroup;
  selectedFile: File | null = null;
  haserror: boolean = false;
  IssueTypelist: any[] = [];
  PriorityList: any[] = [];
  employeeid!: number | null;
  errorMessage: any;
  constructor(
    private service: MaintenanceService,
    private fb: FormBuilder,
    private tokenservice: TokenService,
    private toastservice:ToastService
  ) {
    this.employeeid = this.tokenservice.getEmployeeId();
    this.form = this.fb.group({
      IssueId: ['', Validators.required],
      Description: ['', Validators.required],
      PriorityId: ['', Validators.required],
      image: [''],
    });
  }
  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
   
    forkJoin({
      issuetype: this.service.getIssueTypelist(),
      priorities: this.service.getPrioritylist(),
    }).subscribe({
      next: (res: any) => {
        this.IssueTypelist = res.issuetype;
        this.PriorityList = res.priorities;
      }
    
    });
  }

  submit() {
    if (this.form.valid) {
  
      const formData = new FormData();

      formData.append('EmployeeId', String(this.employeeid));
      formData.append('Description', this.form.get('Description')?.value);
      formData.append('PriorityId', this.form.get('PriorityId')?.value);
      formData.append('IssueId', this.form.get('IssueId')?.value);
      formData.append('StatusId', '1');

      if (this.selectedFile) {
        formData.append('ImageUrl', this.selectedFile);
      }
      this.service.makeMaintenanceRequest(formData).subscribe({
        next: (res:any) => {

        
          
        },
        error: (error) => {
          console.log(error);
          
        }
       
      });

      this.form.reset();
    } else {
      this.haserror = true;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
