import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-user-detail-trading',
  templateUrl: './user-detail-trading.component.html',
  styleUrls: ['./user-detail-trading.component.css']
})
export class UserDetailTradingComponent implements OnInit {
  userForm: FormGroup;
  currTab: any = "Trading";
  tradingDetail: any;
  id: any;
  constructor(private router : Router,public service:MainService, public active:ActivatedRoute)
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
    })
   }

  ngOnInit() : void{
    this.userTrading()
    this.userForm = new FormGroup({
      'startdate': new FormControl('',Validators.required),
      'enddate' :  new FormControl('',Validators.required),
      'currency' : new FormControl(''),
      'type' : new FormControl(''),
    })
  }

  selectTab(tab){
    this.currTab = tab;
    if(this.currTab === 'WalletTrading'){
      this.router.navigate(['wallet-management'])
    }
   else if(this.currTab === 'Trading'){
      this.router.navigate(['user-detail-trading'],{queryParams:{id:this.id}})
    }
    else if (this.currTab === 'Login'){
      this.router.navigate(['login-session-activity'])
    }
    else if (this.currTab === 'GI'){
      this.router.navigate(['user-details'],{queryParams:{id:this.id}})
    }
  }

  // api of Trading
   userTrading(){
    var url = 'wallet/admin/transaction-history/get-user-transaction-history?userId='+this.id
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.tradingDetail = res['data']
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
    let type=this.userForm.value.type;
    let currency=this.userForm.value.currency;
    let startdate=this.userForm.value.startdate;
    let enddate=this.userForm.value.enddate

    var url = 'wallet/admin/transaction-history/get-user-transaction-history?type='+type+'&currency='+currency+'&startdate='+startdate+'&enddate='+enddate;
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.tradingDetail = res['data']
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

  // view user trading navigation
  viewUserTrading(id){
    this.router.navigate(['/view-user-trading-detail'],{queryParams:{id:id}})
  }

  


}
