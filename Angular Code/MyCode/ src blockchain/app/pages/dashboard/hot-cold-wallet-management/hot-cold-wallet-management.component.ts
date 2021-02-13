import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hot-cold-wallet-management',
  templateUrl: './hot-cold-wallet-management.component.html',
  styleUrls: ['./hot-cold-wallet-management.component.css']
})
export class HotColdWalletManagementComponent implements OnInit {
  currTab: any='COLD';
  coinName: any;
  page: number =0
  limit:number=2;
  transactionList: any;
  totalRecords: any;
  pageNumber:number=1
  constructor(
    private route : Router, public service:MainService,public activatedroute:ActivatedRoute
  ) {

   }

  ngOnInit() {
    this.activatedroute.params.subscribe((res:any)=>{
      this.coinName=res.data
    })
    this.getTransactionHistory(this.page)
  }

getTransactionHistory(page){
  this.page=page
  this.service.get(`wallet/admin/transaction-history/get-all-transaction-history?coinName=${this.coinName}&page=${this.page}&pageSize=${this.limit}&txnType=HOT_TO_COLD_TRANSFER`).subscribe((res:any)=>{
    console.log(res)
    this.transactionList=res.data.resultlist
    this.totalRecords = res.data.totalCount
  })
}


  selectTab(tab){
    this.currTab = tab;
    if(this.currTab === 'HOT'){
      this.route.navigate(['hot-wallet-management'])
    }
   else if(this.currTab === 'COLD'){
    this.getTransactionHistory(this.page)
    }
    
  }

  

}

