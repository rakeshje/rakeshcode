import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-min-trading-fee',
  templateUrl: './min-trading-fee.component.html',
  styleUrls: ['./min-trading-fee.component.css']
})
export class MinTradingFeeComponent implements OnInit {
  userForm: FormGroup;
  data: string;
  withdrawlFee:number;

  constructor(public route:ActivatedRoute ,public service:MainService, public router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{this.data=(params.data)})
    this.tradingFee();
  }
 tradingFee(){
   this.service.get(`wallet/coin/get-coin-details?coinName=${this.data}`).subscribe((res:any)=>{
     console.log(res)
     this.withdrawlFee=res.data.withdrawlFee;    
   })
 }
 submitFee(){
   this.service.get(`wallet/admin/fee-management/set-withdrawal-fee?coinName=${this.data}&withdrawalFee=${this.withdrawlFee}`).subscribe((res:any)=>{
if(res.status=200){
  this.service.toasterSucc(res.message);
  this.router.navigate(['/standard-trading-fee'])
} 
  })
 }
}
