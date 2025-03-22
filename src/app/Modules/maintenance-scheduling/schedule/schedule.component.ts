import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../Shared/Services/TokenService/token.service';
import { futureDateValidator } from '../../../Shared/CustomValidation/date.validation';
declare var bootstrap: any; // Required for Bootstrap Modal

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  scheduleform!:FormGroup
  Equipmentlist:any[]=[]
  Technicianlist:any[]=[]
  Maintenancetypelist:any[]=[]
formerrormsg: any;
filterform!:FormGroup;
currentemployeeid!:number|null
ScheduleWorkList:any[]=[]
PageNumber:number=1
PageSize:number=10
currentroleid!:number | null

currentScheduleId!:number
  constructor(private fb:FormBuilder,private shceduleservice:ScheduleService,private tokenservice:TokenService){
     
    this.currentemployeeid=this.tokenservice.getEmployeeId()
    this.currentroleid=this.tokenservice.getEmployeeRoleId();

    this.scheduleform=this.fb.group({
      equipmentId:['',Validators.required],
      technicianId:['',Validators.required],
      maintenanceTypeId:['',Validators.required],
      scheduledDate:['',[Validators.required,futureDateValidator()]],
      description:['',Validators.required]

    })
    this.filterform=this.fb.group({
      equipmentId:['',],
      technicianId:['',],
      maintenanceTypeId:['',],
      status:[''],
      Notified:[''],
      scheduleid:['']

    })

  }
  ngOnInit(): void {
    this.loadFormdropdown()
    this.GetAllScheduleWorkOrder()
  }



  
  openModal() {


    let modal = new bootstrap.Modal(document.getElementById('schedulrModal'));

    modal.show();
  }

  loadFormdropdown(){

    forkJoin({
      EquipmentList: this.shceduleservice.getallequipment(),
      technician: this.shceduleservice.getalltechnician(),
      maintenancetype:this.shceduleservice.getallMaintenancetype()
    }).subscribe({
      next: (res: any) => {
        this.Equipmentlist = res.EquipmentList;
        this.Technicianlist = res.technician;
        this.Maintenancetypelist=res.maintenancetype
      },
      complete: () => {
       
      },
    });

  }

  schedulemaintenance(){
    if(this.scheduleform.valid){
      let newdata={
        equipmentId:parseInt(this.scheduleform.get('equipmentId')?.value),
        technicianId:parseInt(this.scheduleform.get('technicianId')?.value),
        maintenanceTypeId:parseInt(this.scheduleform.get('maintenanceTypeId')?.value),
        scheduledDate:this.scheduleform.get('scheduledDate')?.value,
        description:this.scheduleform.get('description')?.value
      
        
      }
      console.log((newdata));
      
      this.shceduleservice.Schedulemaintenancerequest(newdata).subscribe({
        next:(res)=>{
          console.log(res);
          this.scheduleform.reset();

        },
        error:(er)=>{
          console.log(er);
          

        }
      })

    }

    else{
      this.formerrormsg='All Fields are required'
    }

  }

  GetAllScheduleWorkOrder(){
    let cuurentdata=this.DataConverterHelperFunc()
    this.shceduleservice.GetAllScheduleWorkOrder(cuurentdata).subscribe({
      next:(res:any)=>{
        this.ScheduleWorkList=res
            console.log(res);
            
      },
      error:(er)=>{
        console.log(er);
        
      }
    }
      
    )
    
    
  }

  DataConverterHelperFunc(){
    const equipment=this.filterform.get('equipmentId')?.value
    const technician=this.filterform.get('technicianId')?.value
    const maintenanceType=this.filterform.get('maintenanceTypeId')?.value
    const status=this.filterform.get('status')?.value
    const Notified=this.filterform.get('Notified')?.value
    const schedule=this.filterform.get('scheduleid')?.value

    const equipmentid = (equipment !== '' && !isNaN(parseInt(equipment)))
    ? parseInt(equipment)
    : null;

    const technicianid = (technician !== '' && !isNaN(parseInt(technician)))
    ? parseInt(technician)
    : null;

    const maintenanceTypeid = (maintenanceType !== '' && !isNaN(parseInt(maintenanceType)))
    ? parseInt(maintenanceType)
    : null;

    const scheduleid = (schedule !== '' && !isNaN(parseInt(schedule)))
    ? parseInt(schedule)
    : null;



    const statusid = (status !== '' && status !== null) ? (status === true || status.toString().toLowerCase() === 'true') : null;
    const Notifiedid = (Notified !== '' && Notified !== null) ? (Notified === true || Notified.toString().toLowerCase() === 'true') : null;

    const newdata={
      pageNumber:this.PageNumber,
      pageSize:this.PageSize,
      scheduleID:scheduleid,
      equipmentID:equipmentid,
      technicianID:technicianid,
      maintenanceTypeID:maintenanceTypeid,
      isNotified:Notifiedid,
      completed:statusid,
      employeeId:this.currentemployeeid

    }

    return newdata;

  }

  openNotifyModal(shceduleid:number) {
    this.currentScheduleId=shceduleid

 console.log(this.currentScheduleId);
 
    let modal = new bootstrap.Modal(document.getElementById('notifyModal'));

    modal.show();
  }

  notitfiytotechnician(){
   this.shceduleservice.notifytotechnician(this.currentScheduleId).subscribe({
    next:(res)=>{
      this.GetAllScheduleWorkOrder()
      console.log(res);
      
    },
    error:(er)=>{
      console.log(er);
      

    }
   })

  }

  prev(){
    if(this.PageNumber>1){
      this.PageNumber--
      this.GetAllScheduleWorkOrder()
  

    }
 
  }
  next(){
    if(this.ScheduleWorkList.length>0){

      this.PageNumber++
      this.GetAllScheduleWorkOrder()
    }
}
}
