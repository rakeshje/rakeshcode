import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-token-management',
  templateUrl: './token-management.component.html',
  styleUrls: ['./token-management.component.css']
})
export class TokenManagementComponent implements OnInit {
  currTab: any='Price';
  pageNumber: number=1;
  itemsPerPage:number=20;
  coinData: any=[];
  coinShortName: any;
  priceForm: FormGroup;
  priceData: any;
  coinName: any=[];
  coin: any=[];
  priceDataa: any;
  transactionData: any=[];
  transactionLength: any;
  transferForm: FormGroup;
  buyTransactionData: any=[];
  tab: any='Buy';
  withdrawTransactionData: any=[];
  transferData: any=[];
  constructor(
    private router : Router, public service:MainService
  ) {

   }

  ngOnInit() {
    this.forValidation();
    this.coinList();
  }

  // form Validation
  forValidation(){
    this.priceForm= new FormGroup({
      'price': new FormControl('',[Validators.required, Validators.pattern('')])
    });
    this.transferForm= new FormGroup({
      'price': new FormControl('',[Validators.required, Validators.pattern('')]),
      'address': new FormControl('',[Validators.required, Validators.pattern('')]),
      'coin': new FormControl('',[Validators.required, Validators.pattern('')]),
      
    });
  }

  selectTab(tab ){
    this.currTab = tab;
    if(this.currTab === 'Price'){
      this.coinList()
    }
   else if(this.currTab === 'User'){
    //  this.tab=='Buy';
    //  this.buyGetTransaction();
    this.select('Buy')

    }
    else if (this.currTab === 'Admin'){
      // this.loginSession()
      this.select('Transfer')
    }
    
  }

  select(tab){
    this.tab=tab;
    if(this.tab==='Buy'){
      this.buyGetTransaction()
    }
    else if(this.tab==='Withdraw'){
      this.withdrawGetTransaction()
    }
    else if(this.tab==='Transfer'){
      
    }
    else if(this.tab==='History'){
      this.adminTransfer()
    }
  }

  // coin list api
  coinList(){
    var url = "wallet/coin/get-coin-list?page=" +(this.pageNumber-1)+ "&pageSize=10" ;
    this.service.get(url).subscribe((res:any)=>{
      console.log('df', res);
      if(res['status']==200){
        this.coinData=res.data;
        this.coinData.forEach(element => {
          this.coinName=element.coinShortName;
          console.log('h',this.coinName);
          this.coin.push(this.coinName)
        });
        console.log('h',this.coin);
        
        
        this.coinShortName=res.data[0].coinType;
        console.log('fg',this.coinShortName);
        this.getPrice();
        this.getAvtPrice();
        
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    });
    

  }

  // price details
  getPrice(){
    var url = "wallet/admin/hot-cold-storage/get-storage-details-coin-hot?coin="+'AVT'+"&storageType=HOT"  
    
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.priceData = res['data']
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

  // get avt price
  getAvtPrice(){
    var url = "wallet/admin/admin/get-AVT-price-inUsd?coin="+'AVT'  
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.priceDataa = res['data']
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



  Change(){
    let priseInUsd=this.priceForm.value.price;
    var url = "wallet/admin/admin/set-AVT-price-inUsd?coin="+'AVT'+"&priseInUsd="+priseInUsd
    
    this.service.showSpinner();
    this.service.post(url,'').subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){    
        this.priceForm.reset()  
       this.priceDataa = res['data']
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

  //  buy Transaction
  buyGetTransaction(){
    var url = "wallet/admin-basic-exchange/get-avt-buy-order?page="+(this.pageNumber-1)+ "&pageSize=10"
    
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){    
        this.priceForm.reset()  
       this.buyTransactionData = res['data']['data']['content']
       this.transactionLength = res['data']['data'].totalPages;
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

//  withdraw Transaction
  withdrawGetTransaction(){
  var url = "wallet/admin/transaction-history/get-all-transaction-history?page="+(this.pageNumber-1)+ "&pageSize=10"+"&coinName=AVT"+"&txnType=WITHDRAW"
  
  this.service.showSpinner();
  this.service.get(url).subscribe(res=>{
  
    this.service.hideSpinner();
    if(res['status']== 200){    
      this.priceForm.reset()  
     this.withdrawTransactionData = res['data']['resultlist']
     this.transactionLength = res['data'].size
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

  //  admin Transaction
  adminTransfer(){
    var url = "wallet/admin/transaction-history/get-all-transaction-history?page="+(this.pageNumber-1)+ "&pageSize=10"+"&coinName=AVT"+"&txnType=AVT_TRANSFER"
    
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){    
        this.priceForm.reset()  
       this.transferData = res['data']['resultlist']
       this.transactionLength = res['data'].size
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

  transfer(){
  let data={
    'amount':this.transferForm.value.price,
    'toAddress':this.transferForm.value.address,
    'coinName':this.transferForm.value.coin,
  }
  var url = "wallet/admin/hot-cold-storage/manual-transfer-hot-to-cold"
  
  this.service.showSpinner();
  this.service.post(url,data).subscribe(res=>{
  
    this.service.hideSpinner();
    if(res['status']== 200){    
      this.service.toasterSucc('Token transfer successfully');
      this.selectTab('Price')
      this.transferForm.reset()  
     this.priceDataa = res['data']
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








  //========modal=======//
  delete(){
    $('#deleteModal').modal('show')
  }
  deleteUser(){
    $('#deleteModal').modal('hide')
  }
  block(){
    $('#block').modal('show')
  }
  blockUser(){
    $('#block').modal('hide')
  }
  view(){
    this.router.navigate(['/view-token'])
  }

  edit(){
    this.router.navigate(['/edit-token'])
  }
  addToken(){
    this.router.navigate(['/add-token'])
  }

}
