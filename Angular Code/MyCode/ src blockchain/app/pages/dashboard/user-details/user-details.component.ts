import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  walletForm:FormGroup
  currTab : any ="GI"
  id:any;
  userDetail:any=[];
  tradingDetail: any;
  loginSessionData: any;
  pageNumber: number=1;
  coinData: any=[];
  userKyc: any=[];
  url: string;
  constructor(private route: ActivatedRoute, private router: Router, public service: MainService)
  {
    this.route.params.subscribe((params)=>{
      this.id=params.id
    })
   }

  ngOnInit() {
    this.coinList()
    this.walletvalidation();
    
    this. showUserDetail()
  }

  coinList(){
    var url = "wallet/coin/get-coin-list?page=" +(this.pageNumber-1)+ "&pageSize=10" ;
    this.service.get(url).subscribe((res:any)=>{
      console.log('df', res);
      if(res['status']==200){
        this.coinData=res['data']
        
        
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

  selectTab(tab ){
    this.currTab = tab;
    if(this.currTab === 'WalletTrading'){
      this.router.navigate(['wallet-management'])
    }
   else if(this.currTab === 'Trading'){
    this.userTrading()
    }
    else if (this.currTab === 'Login'){
      this.loginSession()
    }
    else if (this.currTab === 'GI'){
      this. showUserDetail()
    }
  }

  walletvalidation(){
    this.walletForm = new FormGroup({
      'startdate': new FormControl('',Validators.required),
      'enddate' :  new FormControl('',Validators.required),
      'currency' : new FormControl(''),
      'type' : new FormControl(''),
    })
  }

  // api of Trading
   userTrading(){
    var url = "wallet/admin-basic-exchange/get-user-trading-history?page=" +(this.pageNumber-1)+ "&pageSize=10"+"&userId="+this.id  
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.tradingDetail = res['data']['list']
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
    let type=this.walletForm.value.type;
    let currency=this.walletForm.value.currency;
    let startdate=Date.parse(this.walletForm.value.startdate);
    let enddate=Date.parse(this.walletForm.value.enddate)
    if(this.walletForm.value.enddate && this.walletForm.value.currency && this.walletForm.value.type){
      this.url = "wallet/admin-basic-exchange/get-user-trading-history?page="+(this.pageNumber-1)+"&pageSize=20"+"&userId="+this.id+"&orderType="+type+"&coin="+currency+'&fromDate='+startdate+'&toDate='+enddate

    }
    else if(this.walletForm.value.startdate && this.walletForm.value.enddate){
      this.url = 'wallet/admin-basic-exchange/get-user-trading-history?page='+(this.pageNumber-1)+"&pageSize=20"+'&fromDate='+startdate+'&toDate='+enddate+"&userId="+this.id;
    }
    else if(this.walletForm.value.enddate && this.walletForm.value.currency){
      this.url = "wallet/admin-basic-exchange/get-user-trading-history?page="+(this.pageNumber-1)+"&pageSize=20"+"&coin="+currency+'&fromDate='+startdate+'&toDate='+enddate+"&userId="+this.id;
    }
    else if(this.walletForm.value.startdate ){
      this.url = 'wallet/admin-basic-exchange/get-user-trading-history?page='+(this.pageNumber-1)+"&pageSize=20"+'&fromDate='+startdate+"&userId="+this.id;
    }

    
    
    else if(this.walletForm.value.type && this.walletForm.value.currency  ){
      this.url = "wallet/admin-basic-exchange/get-user-trading-history?page="+(this.pageNumber-1)+ "&pageSize=20"+"&userId="+this.id+"&coin="+currency+"&orderType="+type
    }
    else if(this.walletForm.value.type  ){
      this.url = "wallet/admin-basic-exchange/get-user-trading-history?page="+(this.pageNumber-1)+ "&pageSize=20"+"&userId="+this.id+"&orderType="+type
    }
    else if(this.walletForm.value.currency  ){
      this.url= "wallet/admin-basic-exchange/get-user-trading-history?page="+(this.pageNumber-1)+ "&pageSize=20"+"&userId="+this.id+"&coin="+currency
    }
    
    this.service.showSpinner();
    this.service.get(this.url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.tradingDetail = res['data']['list']
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

  reset(){
    if(this.walletForm.value.enddate || this.walletForm.value.currency || this.walletForm.value.type){
    this.userTrading();
    this.walletForm.reset()
    }
  }

  // view user trading navigation
  viewUserTrading(id){
    this.router.navigate(['/view-user-trading-detail'],{queryParams:{id:id}})
  }
  
// api of general information
  showUserDetail(){
    this.service.showSpinner()
    var url="account/admin/user-management/user-details?userId="+this.id
    this.service.get(url).subscribe((res:any)=>{
      if(res.status==200){
        this.userDetail=res.data;
        this.userKyc=res.data.kyc.document[0]
        this.service.hideSpinner();
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

  // Api of login session activity
  loginSession(){
    this.service.showSpinner();
    var url="account/admin/user-management/get-user-last-login-activity?userId="+this.id;
    this.service.get(url).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        this.loginSessionData=res.data
      }
    },(err)=>{
      this.service.hideSpinner();
      if(err.status==401){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something went wrong')
      }
    })
  }

  //export User
exportAsXLSX() {
  let dataArr = [];
  this.tradingDetail.forEach((element, ind) => {

    dataArr.push({
      "S no": ind + 1,
      "Transaction ID": element.basicTradeHistoryId ? element.basicTradeHistoryId : '',
      "Transaction Type": element.orderType  ? element.orderType : '',
      "Base Coin": element.baseCoinName ? element.baseCoinName : 'N/A',
      "Executable Coin": element.execCoinName ? element.execCoinName : 'N/A',
      "Amount": element.baseCoinAmmount ? element.baseCoinAmmount : 'N/A',
      "Date": element.creationTime ? element.creationTime.slice(0, 10) : 'N/A',
    })
  })

  this.service.exportAsExcelFile(dataArr, 'TRADING MANAGEMENT');
}
  



}
