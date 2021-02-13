import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl } from '@angular/forms';

declare var $:any
@Component({
  selector: 'app-fiat',
  templateUrl: './fiat.component.html',
  styleUrls: ['./fiat.component.css']
})
export class FiatComponent implements OnInit {
  fiatData: any=[];
  pageNumber:number=1
  id: any;
  token: any;
  searchForm:FormGroup

  constructor(public router:Router, public service: MainService) { }

  ngOnInit(): void {
    this.fiat();
    this.searchValidation()
  }

  searchValidation(){
    this.searchForm= new FormGroup({
      'select': new FormControl('')
    })
  }

  
  // fiat 
  fiat(){
    var url = 'wallet/admin/get-usdEuro-request-api';
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.fiatData = res['data']
      }else {
        this.service.toasterErr(res['message']);
      }
    },err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  
  }
  // search
  search(){
    let status=this.searchForm.value.select;
    console.log('jd', status);
    
    var url = 'wallet/admin/get-usdEuro-request-api?status='+status;
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
      this.service.toasterSucc(res['message']);
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.fiatData = res['data']
      }
    },err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }

  // reset
  reset(){
    this.service.hideSpinner();
    this.searchForm.reset();
    this.fiat();
  }


  //========modal=======//
  approveModal(id,token){
    $('#payment').modal('show')
    this.id=id;
    this.token=token
  }

  approve(){
    let data={
      'requestID':this.id,
      'tokenName':this.token
    }
    
    var url = 'wallet/admin/send-usdEuro-to-user';
    this.service.showSpinner();
    this.service.postApi(url, data).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 205){      
        $('#payment').modal('hide')
        this.service.toasterSucc(res['message'])
      }
    },err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }

  cancelModal(id){
    $('#paymentCancel').modal('show')
    this.id=id;

  }
  cancelRequest(){
    var url = "wallet/admin/cancel-api?requestID="+this.id
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){    
        this.service.toasterSucc(res['message']);
        $('#paymentCancel').modal('hide')
      }else {
        this.service.toasterErr('something went wrong');
      }
    },err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  

  }

  deleteUser(){

  }
  
  block(){
    $('#block').modal('show')
  }
  blockUser(){
    $('#block').modal('hide')
  }
  view(){
    this.router.navigate(['/view-token'])
  }

  edit(){
    this.router.navigate(['/edit-token'])
  }
  addToken(){
    this.router.navigate(['/add-token'])
  }

}
