import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-deposite-wallet',
  templateUrl: './deposite-wallet.component.html',
  styleUrls: ['./deposite-wallet.component.css']
})
export class DepositeWalletComponent implements OnInit {
  userForm: FormGroup;
  currTab: any = "Deposite";
  depositeData: any=[];
  pageNumber: number=1;

  constructor(private router : Router,public service:MainService) { }

  ngOnInit() {
    this.deposite();
    this.userForm = new FormGroup({
      'startdate': new FormControl('',Validators.required),
      'enddate' :  new FormControl('',Validators.required),
      'searchText' : new FormControl(''),
    })
  }
  
  selectTab(tab){
    this.currTab = tab;
    if(this.currTab === 'Withdraw'){
      this.router.navigate(['wallet-management'])
    }
   else if(this.currTab === 'Deposite'){
      this.router.navigate(['deposite-wallet'])
    }
  }

  // Api integration of deposite
  deposite(){
    var url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber-1)+ "&pageSize=10" +"&txnType=DEPOSIT" ;
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
    let coinName=this.userForm.value.select;
    let fromDate=Date.parse(this.userForm.value.startdate);
    let toDate=Date.parse(this.userForm.value.enddate);
    var url = "wallet/admin/transaction-history/get-all-transaction-history?page=" +(this.pageNumber)+ "&pageSize=10" +"&coinName=" +coinName +"&fromDate=" +fromDate +"&toDate=" + toDate +"&txnType=WITHDRAW";
    this.service.get(url).subscribe((res)=>{
      console.log('search',res );
      
      if(res['status']==200){
        this.service.toasterSucc('res.message')
        
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
}
