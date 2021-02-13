import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
@Component({
  selector: 'app-update-withdrawl-amount',
  templateUrl: './update-withdrawl-amount.component.html',
  styleUrls: ['./update-withdrawl-amount.component.css']
})
export class UpdateWithdrawlAmountComponent implements OnInit {
  data: string;
  withdrawlAmount:number;

  constructor(public route:ActivatedRoute ,public service:MainService, public router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{this.data=(params.data)})
    this.tradingAmount();
  }
 tradingAmount(){
   this.service.get(`wallet/coin/get-coin-details?coinName=${this.data}`).subscribe((res:any)=>{
     console.log(res)
     this.withdrawlAmount=res.data.withdrawalAmount;    
   })
 }
 submitAmount(){
  this.service.get(`wallet/admin/fee-management/set-minimum-withdrawal-amount?coinName=${this.data}&withdrawalAmount=${this.withdrawlAmount}`).subscribe((res:any)=>{
if(res.status=200){
  this.service.toasterSucc(res.message);
  this.router.navigate(['/min-withdrawl-amount'])
} 
  })
 }
}
