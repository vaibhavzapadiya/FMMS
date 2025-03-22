import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../Service/inventory.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
declare var bootstrap: any; // Required for Bootstrap Modal

@Component({
  selector: 'app-inventoryfrom-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './inventoryfrom-list.component.html',
  styleUrl: './inventoryfrom-list.component.css'
})
export class InventoryfromListComponent  implements OnInit{

  sparepartList:any[]=[]
  currentitemid!:number
  additemForm!:FormGroup
lowstockitem:any[]=[]
modal:any
updateform!:FormGroup;
currentupdateItemid!:number
updateThresoldform!:FormGroup;
errrormsg:string=''
currentthresoldtemid!:number

constructor(private inventoryservice:InventoryService,private fb:FormBuilder){

  this.additemForm=this.fb.group({
    itemName:['',Validators.required],
    currentStock:['',Validators.required],
    stockAlert:['']

  })
  this.updateform=this.fb.group({
    CurrentStock:['',Validators.required]

  })
  this.updateThresoldform=this.fb.group({
    threold:['',Validators.required]

  })
}


    ngOnInit(): void {
      this.loaditems()
    
  }

  loaditems(){
    this.inventoryservice.getallSparePartDetails().subscribe({
      next:(res:any)=>{
       
    
          this.sparepartList=res
        

      },
      error:(er)=>{
        console.log(er);
        
      }
    })

  }
  openModal(id:number){
    this.currentitemid=id

     this.modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.modal.show();

  }

  deleteitem(){

    this.inventoryservice.deleteitem(this.currentitemid).subscribe({
      next:()=>{
        this.modal.hide()
        this.loaditems();
        
        
      },
      error:(er)=>{
             console.log(er);
             
      }
    })
    
  }

  Addsparepart(){
   if(this.additemForm.valid){
    const newdata={
      itemName:this.additemForm.get('itemName')?.value,
      currentStock:parseInt(this.additemForm.get('currentStock')?.value),
      stockAlert:this.additemForm.get('stockAlert')?.value ?? false

    }
    console.log(newdata);
    this.inventoryservice.addsparepart(newdata).subscribe({
    
      
 
       next:()=>{
        this.modal.hide()
        this.additemForm.reset()
        this.loaditems();
       }
    })
   }

  }

  openModallForAdd(){

     this.modal = new bootstrap.Modal(document.getElementById('addsparepartModal'));
    this.modal.show();

  

  }

  alertlowstock(){
   
    this.inventoryservice.alertlowstock().subscribe({
      next:(res:any)=>{
        this.lowstockitem=res

      },error:(er)=>{
        console.log(er);
        
      },
      complete:()=>{

        this.openmodalforlowstock()

      }
    })
  }

  openmodalforlowstock(){
    let modal = new bootstrap.Modal(document.getElementById('lowstcokModal'));
    modal.show();


  }

  openmodalforupdate(id:number){

   this.currentupdateItemid=id
   
    
  

     this.modal = new bootstrap.Modal(document.getElementById('updateModal'));
    this.modal.show();
  }

  updatesparepart(){
    if(this.updateform.valid){
    const newdata={
      itemid:this.currentupdateItemid,
      currentStock:this.updateform.get('CurrentStock')?.value
    }
    this.inventoryservice.updateSpareitemstock(newdata).subscribe({
      next:()=>{
              this.modal.hide()
              this.loaditems()
              this.updateform.reset();
              this.currentupdateItemid==null;
               this.errrormsg=''
      },
      error:(er)=>{
        console.log(er);
        
      }
    })

  }
  else{
    this.errrormsg="Provide valid input"
  }
}


openmodalforthrsold(id:number){
  this.currentthresoldtemid=id
  this.modal = new bootstrap.Modal(document.getElementById('updatethresoldmodal'));
  this.modal.show();

}

updateThresold(){
  if(this.updateThresoldform.valid){
  const newdata={
    itemId:this.currentthresoldtemid,
    alertThreshold:this.updateThresoldform.get('threold')?.value

  }
  console.log(newdata);
  

  this.inventoryservice.UpdateThresold(newdata).subscribe({
    next:()=>{
      this.modal.hide();
      this.loaditems();
       this.errrormsg=''
       this.currentthresoldtemid==null;
       this.updateThresoldform.reset()
    },
    error:(er)=>{
      console.log(er);
      
    }
  })
}
else{
  this.errrormsg="Provide valid input"
}
}


}
