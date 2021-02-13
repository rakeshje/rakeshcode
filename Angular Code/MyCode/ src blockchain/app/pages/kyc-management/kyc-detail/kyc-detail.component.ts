import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any

@Component({
  selector: 'app-kyc-detail',
  templateUrl: './kyc-detail.component.html',
  styleUrls: ['./kyc-detail.component.css']
})
export class KycDetailComponent implements OnInit {
  modalForm:FormGroup
  userId: any;
  viewData: any;
  documentId: any;
  kycId: any;
  kycStatus: any;

  constructor(public router:Router, public service:MainService, public active:ActivatedRoute) {
    this.active.params.subscribe((params)=>{
      console.log('f', params);
      this.userId=params.id
      console.log('f', params);
      
    })
  }

  ngOnInit(): void {
    this.viewKyc();
    this.modalForm= new FormGroup({
      'reason': new FormControl('', Validators.required)
    })
  }

  // Api of view kyc
  viewKyc(){
    var url = "account/admin/kyc-management/get-kyc-details?userId="+this.userId;
    this.service.get(url).subscribe((res:any)=>{
      console.log('view',res);
      if(res.status==200){
        this.viewData=res.data.document[0];
        this.kycStatus=res.data.kycStatus
        this.documentId=res.data.document[0].documentId;
        this.kycId=res.data.kycId;
        
        

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
  approved(){
    if(this.kycStatus=='ACCEPTED'){
      this.service.toasterInfo('Already kyc approved');
      
    }
    else{
    $('#approveModal').modal('show')
    }
  }
  rejected(){
    if(this.kycStatus=='REJECTED'){
      this.service.toasterInfo('Already kyc rejected');
      
    }
    else{
    $('#rejectModal').modal('show')
  }
  }

  approveKyc(){
    this.service.showSpinner();
    let data = {
      "documentId": this.documentId,
      "kycId": this.kycId,
      "status": "ACCEPTED"
    }
    this.service.post('account/admin/kyc-management/doc-status',data).subscribe((res:any)=>{
      console.log("hjuygidsu67tdsuk",res)
      if(res.status == 200) {
        console.log("jkdhsgdfgvs87dfdksjfhg",res);
        this.service.hideSpinner();
        this.service.toasterSucc(res.message)
        $('#approveModal').modal('hide');
        this.router.navigate(['/kyc-update'])
      }
      else {
        this.service.hideSpinner();
      }
    },(error)=>{
      this.service.hideSpinner();
    })
  }

  rejectKyc() {
    this.service.showSpinner();
    let data = {
      "documentId": this.documentId,
      "kycId": this.kycId,
      "reason": this.modalForm.value.reason,
      "status": "REJECTED"
    }
    this.service.post('account/admin/kyc-management/doc-status',data).subscribe((res:any)=>{
      console.log("hjuygidsu67tdsuk",res)
      if(res.status == 200) {
        console.log("jkdhsgdfgvs87dfdksjfhg",res);
        this.service.hideSpinner();
        this.service.toasterSucc(res.message)
        $('#rejectModal').modal('hide')
        this.router.navigate(['/kyc-update'])
      }
      else {
        this.service.hideSpinner();
      }
    },(error)=>{
      this.service.hideSpinner();
    })
  }
}
