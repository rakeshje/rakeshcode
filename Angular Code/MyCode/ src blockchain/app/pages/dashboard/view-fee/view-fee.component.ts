import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-fee',
  templateUrl: './view-fee.component.html',
  styleUrls: ['./view-fee.component.css']
})
export class ViewFeeComponent implements OnInit {
  viewWithdrawForm:FormGroup
  coinName: any;
  withdrawData: any;
  
  constructor(public route:Router, public service:MainService, public active:ActivatedRoute ) 
  {
    this.active.queryParams.subscribe((params)=>{
      console.log('f',params);
      this.coinName=params.coin
      
    })
   }

  ngOnInit(): void {
    this.viewWithdrawForm= new FormGroup({
      'withdraw': new FormControl('', Validators.required)
    })
    this.viewFee()
  }

  // api to patch withdraw fee
  viewFee(){
    this.service.showSpinner();
    var url="wallet/coin/get-coin-details?coinName="+this.coinName;
    this.service.get(url).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        this.withdrawData=res.data;
        console.log('f', this.withdrawData);
        
        this.viewWithdrawForm.patchValue({
          'withdraw':this.withdrawData.withdrawlFee
        })
      }
    },(err)=>{
      if(err.status==401){
        this.service.hideSpinner();
        this.service.toasterErr('Unauthorized access')
      }
      else{
        this.service.toasterErr('something went wrong')
      }
    })
  }
  // api of update
  updateWithdraw(){
    let coinName=this.coinName;
    let withdrawalFee=this.viewWithdrawForm.value.withdraw
    this.service.showSpinner();
    var url="wallet/admin/fee-management/set-withdrawal-fee?coinName="+coinName+"&withdrawalFee="+withdrawalFee;
    this.service.get(url).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        this.withdrawData=res.data;
        this.service.toasterSucc(res.message);
        this.route.navigate(['/withdrawl-fee'])
        console.log('f', this.withdrawData);
        
      }
    },(err)=>{
      if(err.status==401){
        this.service.hideSpinner();
        this.service.toasterErr('Unauthorized access')
      }
      else{
        this.service.toasterErr('something went wrong')
      }
    })
  }

}

