import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-all-user-trader',
  templateUrl: './all-user-trader.component.html',
  styleUrls: ['./all-user-trader.component.css']
})
export class AllUserTraderComponent implements OnInit {
  traderData: any=[];
  pageNumber:number=1
  length: any;

  constructor(public route:Router,public service:MainService) { }

  ngOnInit(): void {
    this.allTrader()
  }

  // all trader
  allTrader(){
    var url = "wallet/admin-basic-exchange/get-all-users-trading-history?page="+(this.pageNumber-1)+ "&pageSize=500"+"&userId=1"
    this.service.get(url).subscribe((res)=>{
      console.log('df', res);
      if(res['status']==200){
        this.traderData=res['data']['list'];
        this.length=res['data']['size']
        console.log('k', this.length);
        
        
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
  pagination(page){
    this.traderData=''
    this.pageNumber=page;
    this.allTrader()
  }
}
