import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-user-trading-detail',
  templateUrl: './view-user-trading-detail.component.html',
  styleUrls: ['./view-user-trading-detail.component.css']
})
export class ViewUserTradingDetailComponent implements OnInit {
  currTab: any = 'Trading';
  txnId: any;
  viewTradingDetails: any;

  constructor(private router : Router, public service:MainService, public active:ActivatedRoute)
  {
    this.active.queryParams.subscribe((params)=>{
      this.txnId=params.id
    })
  }

  ngOnInit(): void {
    this.viewTrading();
  }


  selectTab(tab){
    this.currTab = tab;
    if(this.currTab === 'WalletTrading'){
      this.router.navigate(['wallet-management'])
    }
   else if(this.currTab === 'Trading'){
      this.router.navigate(['user-detail-trading'])
    }
    else if (this.currTab === 'Login'){
      this.router.navigate(['login-session-activity'])
    }
    else if (this.currTab === 'GI'){
      this.router.navigate(['user-details'])
    }
  }

  // view trading
  viewTrading(){
    var url = 'wallet/admin-basic-exchange/get-user-trading-history-detail?basicTradeHistoryId='+this.txnId
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.viewTradingDetails = res['data']
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

}
