import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-min-withdrawl-amount',
  templateUrl: './min-withdrawl-amount.component.html',
  styleUrls: ['./min-withdrawl-amount.component.css']
})
export class MinWithdrawlAmountComponent implements OnInit {
  coinList: any=[];

  constructor(public service:MainService) { }

  ngOnInit(): void {
    this.withdrawlFeeList()
  }
 
  withdrawlFeeList(){
    this.service.get(`wallet/coin/get-coin-list`).subscribe((res:any)=>{
     this.coinList=res.data
      console.log(this.coinList)
    })
  }

}
