import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-wallet-management',
  templateUrl: './wallet-management.component.html',
  styleUrls: ['./wallet-management.component.css']
})
export class WalletManagementComponent implements OnInit {
  userForm: FormGroup;
  currTab: any = "Withdraw";
  withdrawlData: any=[];
  pageNumber: number=1;
  depositeData: any=[];
  coin: any;
  coinName: any;
  coinData: any=[];
  url: string;

  constructor(private router : Router, public service:MainService) { }

  ngOnInit() : void{
    this.coinList()
    this.withdrawl();
    this.userForm = new FormGroup({
      'startdate': new FormControl('',Validators.required),
      'enddate' :  new FormControl('',Validators.required),
      'select' :  new FormControl('',Validators.required),
      'searchText' : new FormControl(''),
    })
  }

  selectTab(tab){
    this.currTab = tab;
    if(this.currTab === 'Withdraw'){
      this.withdrawl();
    }
    else if(this.currTab === 'Deposite'){
      this.deposite();
    }
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

  // Api integration of withdrawl
  withdrawl(){
    var url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=20" +"&txnType=WITHDRAW" ;
    this.service.get(url).subscribe((res:any)=>{
      console.log('df', res);
      if(res['status']==200){
        this.withdrawlData=res['data']['resultlist'];

        
        
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

  // Api integration of deposite
  deposite(){
    var url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=20" +"&txnType=DEPOSIT" ;
    this.service.get(url).subscribe((res)=>{
      console.log('df', res);
      if(res['status']==200){
        this.depositeData=res['data']['resultlist']
        
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

  // Api of search 
  search(){
    this.coinName=this.userForm.value.select;
    // let fromDate=Date.parse(this.userForm.value.startdate);
    let fromDate=Date.parse(this.userForm.value.startdate);
    let currentTime=new Date().getTime()
    console.log("hdh", fromDate);
    
    let toDate=Date.parse(this.userForm.value.enddate);
    console.log('jhhj',toDate+currentTime, currentTime);
    
     if(this.userForm.value.enddate && this.coinName && this.currTab === 'Withdraw'){
      this.url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=10" +"&coinName=" +this.coinName +"&fromDate=" +fromDate +"&toDate=" + toDate+"&txnType=WITHDRAW"
    }

    else if(this.userForm.value.enddate && this.currTab === 'Withdraw' ){
      this.url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=10"  +"&fromDate=" +fromDate +"&toDate=" + toDate+"&txnType=WITHDRAW" ;
    }

    else if(this.userForm.value.startdate && this.currTab === 'Withdraw' ){
      this.url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=10"  +"&fromDate=" +fromDate +"&txnType=WITHDRAW" ;
    }

    else if(this.coinName && this.currTab === 'Withdraw'){
      this.url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=10" +"&coinName=" +this.coinName+"&txnType=WITHDRAW" ;
    }

    else if(this.userForm.value.enddate  && this.coinName && this.currTab === 'Deposite'){
      this.url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=10" +"&coinName=" +this.coinName +"&fromDate=" +fromDate +"&toDate=" + toDate+"&txnType=DEPOSIT"
    }
    else if(this.userForm.value.enddate  && this.currTab === 'Deposite'){
      this.url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=10"  +"&fromDate=" +fromDate +"&toDate=" + toDate+"&txnType=DEPOSIT" ;
    }

    else if(this.userForm.value.startdate  && this.currTab === 'Deposite'){
      this.url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=10"  +"&fromDate=" +fromDate +"&txnType=DEPOSIT" ;
    }

    else if(this.coinName && this.currTab === 'Deposite'){
      this.url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=10" +"&coinName=" +this.coinName+"&txnType=DEPOSIT" ;
    }

    

    
   
    this.service.get(this.url).subscribe((res:any)=>{
      console.log('search',res );
      
      if(res['status']==200){
        this.service.toasterSucc(res.message);
        // this.withdrawlData=res['data']['resultlist']
        if(this.currTab === 'Withdraw'){
          this.withdrawlData=res['data']['resultlist']
          this.userForm.reset()
        }
        else if(this.currTab === 'Deposite'){
          this.depositeData=res['data']['resultlist']
          this.userForm.reset()
        }
        
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

  // reset data of search
  reset(){
    if(this.currTab === 'Withdraw'){
      this.withdrawl();
      this.userForm.reset()
    }
    else if(this.currTab === 'Deposite'){
      this.deposite();
      this.userForm.reset()
    }
  }

  //export User
exportAsXLSX() {
  let dataArr = [];
  this.withdrawlData.forEach((element, ind) => {

    dataArr.push({
      "S no": ind + 1,
      "Coin": element.coinType ? element.coinType : '',
      "Transaction Type": element.txnType  ? element.txnType : '',
      "Email": element.userEmail ? element.userEmail : 'N/A',
      "Transaction Hash": element.txnHash ? element.txnHash : 'N/A',
      "Amount": element.amount ? element.amount : 'N/A',
      "Date": element.txnTime ? element.txnTime.slice(0, 10) : 'N/A',
    })
  })

  this.service.exportAsExcelFile(dataArr, 'WALLET MANAGEMENT');
}

  

}
