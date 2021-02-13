import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-standard-trading-fee',
  templateUrl: './standard-trading-fee.component.html',
  styleUrls: ['./standard-trading-fee.component.css']
})
export class StandardTradingFeeComponent implements OnInit {
  coinList: any=[];

  constructor(public service:MainService) { }

  ngOnInit(): void {
    this.tradingFeeList()
  }

  tradingFeeList(){
    this.service.get(`wallet/coin/get-coin-list`).subscribe((res:any)=>{
     this.coinList=res.data
      console.log(this.coinList)
    })
  }
 
}
