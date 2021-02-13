import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-hot-cold-wallet-management',
  templateUrl: './view-hot-cold-wallet-management.component.html',
  styleUrls: ['./view-hot-cold-wallet-management.component.css']
})
export class ViewHotColdWalletManagementComponent implements OnInit {
  coinName: any;
  list: any;
  amount:number;
  toAddress:any;

  constructor(public router:Router ,public activatedRoute:ActivatedRoute ,public service :MainService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this.coinName=res.data
      console.log(this.coinName);
      
    })
     this.getCoinData()
     console.log(this.amount);
     console.log(this.toAddress);
     
     
  }
getCoinData(){
  this.service.get(`wallet/admin/hot-cold-storage/get-storage-details-with-latestTime?coinName=${this.coinName}`).subscribe((res:any)=>{
    this.list=res.data.HotWalletData
  })
}
submit(){
  let request={
    "amount": this.amount,
  "coinName": this.coinName,
  "toAddress":this.toAddress ,
  }
  this.service.post(`wallet/admin/hot-cold-storage/manual-transfer-hot-to-cold`,request).subscribe((res:any)=>{
    console.log(res)
    if(res.status==200){
      this.router.navigate(['/hot-wallet-management'])
    }
    else if(res.status=205){
this.service.toasterErr(res.message)
    }
  })
}

}
