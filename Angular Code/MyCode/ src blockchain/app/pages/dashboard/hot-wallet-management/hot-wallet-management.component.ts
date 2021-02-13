import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any
@Component({
  selector: 'app-hot-wallet-management',
  templateUrl: './hot-wallet-management.component.html',
  styleUrls: ['./hot-wallet-management.component.css']
})
export class HotWalletManagementComponent implements OnInit {
  coins: any = []
  coinData: any = [];
  list: any = [];
  time: any;
  pageNumber:number=1
  hotWalletForm:FormGroup
  str2: any;
  constructor(
    private router: Router, public service: MainService
  ) {

  }

  ngOnInit() {
    this.hotWalletForm = new FormGroup({
      'coin': new FormControl('',Validators.required),
     
    })

    // this.getCoinList()
    this.walletList()
  }
  walletList() {
    this.service.get(`wallet/coin/get-coin-list`).subscribe((res: any) => {
      this.list = res.data
      console.log(this.list)
      for (let item of this.list) {
        if (item.coinType == "crypto") {
          this.service.get(`wallet/admin/hot-cold-storage/get-storage-details-with-latestTime?coinName=${item.coinShortName}`).subscribe((res: any) => {
            let str1 = JSON.stringify(res.data)
            this.str2 = JSON.parse(str1)
            this.coinData.push(this.str2)
            console.log(this.coinData);
          })
        }
      }
    })
  }
  // api of search
  search(){
    this.service.showSpinner();
    let search=this.hotWalletForm.value.coin
    var url="wallet/admin/hot-cold-storage/get-storage-details-with-latestTime?coinName="+search;
    this.service.get(url).subscribe((res: any) => {
      console.log('j', res);
      
      if(res.status==200){
        this.coinData=[]
      this.coinData.push(res.data)
      // this.coinData.push(str2)
      console.log('g', this.coinData);
      
      this.service.hideSpinner();
      }
    })
  }

  reset(){
    if(this.hotWalletForm.value.coin){
    this.hotWalletForm.reset();
    this.coinData=[];
    this.walletList()
    }
  
  }

  //========modal=======//
  delete() {
    $('#deleteModal').modal('show')
  }
  deleteUser() {
    $('#deleteModal').modal('hide')
  }
  block() {
    $('#block').modal('show')
  }
  blockUser() {
    $('#block').modal('hide')
  }
}
