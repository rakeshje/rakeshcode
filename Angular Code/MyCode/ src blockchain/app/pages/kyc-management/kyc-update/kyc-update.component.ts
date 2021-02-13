import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-kyc-update',
  templateUrl: './kyc-update.component.html',
  styleUrls: ['./kyc-update.component.css']
})
export class KycUpdateComponent implements OnInit {
  kycForm: FormGroup;
  pageNumber: number=1;
  kycList: any=[];
  userId: any;
  url: string;
  constructor(public route:Router, public service:MainService) { }

  ngOnInit(): void {
    this.kyc();
    this.kycForm = new FormGroup({
      'status': new FormControl('',Validators.required),
      'userName' :  new FormControl('',Validators.required),
    })
  }
  
  // api of kyc listing
  kyc(){
    var url = "account/admin/kyc-management/filter-kyc-users-list?page=" +(this.pageNumber-1)+ "&pageSize=20"  ;
    this.service.get(url).subscribe((res:any)=>{
      console.log("kyc", res);
      if(res.status==200){
        this.kycList=res.data.list;
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }

  // Api of search
  search(){
    
    let kycStatus=this.kycForm.value.status;
    let search=this.kycForm.value.userName
    if(this.kycForm.value.userName && this.kycForm.value.status){
    this.url = "account/admin/kyc-management/filter-kyc-users-list?page=" +(this.pageNumber-1)+ "&pageSize=10" +"&kycStatus=" +kycStatus +"&search=" +search;
    }
    else if(this.kycForm.value.userName){
      this.url = "account/admin/kyc-management/filter-kyc-users-list?page=" +(this.pageNumber-1)+ "&pageSize=10"  +"&search=" +search;
  }
  else if(this.kycForm.value.status){
    this.url = "account/admin/kyc-management/filter-kyc-users-list?page=" +(this.pageNumber-1)+ "&pageSize=10" +"&kycStatus=" +kycStatus ;
  }
    this.service.get(this.url).subscribe((res:any)=>{
      console.log('search',res );
      
      if(res['status']==200){
        this.kycList=res.data.list;
        this.service.toasterSucc('success')
        
        
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })

  }

  // reset
  reset(){
    if(this.kycForm.value.userName || this.kycForm.value.status){
    this.kycForm.reset();
    this.kyc();
    }
  }
  view(id){
    console.log('gg', id);
    this.route.navigate(['/kyc-detail'],{queryParams:{id:id}})
    
    
  }


}
