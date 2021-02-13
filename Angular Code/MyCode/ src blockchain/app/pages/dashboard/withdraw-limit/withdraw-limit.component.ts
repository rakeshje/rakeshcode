import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-withdraw-limit',
  templateUrl: './withdraw-limit.component.html',
  styleUrls: ['./withdraw-limit.component.css']
})
export class WithdrawLimitComponent implements OnInit {
  viewWithdrawForm: FormGroup;
  withdrawData: any;

  constructor(public route:Router,public service:MainService) { }

  ngOnInit(): void {
    this.viewWithdrawForm= new FormGroup({
      'withdraw': new FormControl('', Validators.required)
    })
  }

  // api to patch withdraw fee
  viewLimit(){
    this.service.showSpinner();
    var url="wallet/coin/get-coin-details";
    this.service.get(url).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        this.withdrawData=res.data;
        console.log('f', this.withdrawData);
        
        this.viewWithdrawForm.patchValue({
          'withdraw':this.withdrawData.withdrawalAmount
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
    let withdrawalFee=this.viewWithdrawForm.value.withdraw
    this.service.showSpinner();
    var url="wallet/admin/fee-management/set-withdrawal-fee?&withdrawalFee="+withdrawalFee;
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
