import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-withdrawl-limit',
  templateUrl: './withdrawl-limit.component.html',
  styleUrls: ['./withdrawl-limit.component.css']
})
export class WithdrawlLimitComponent implements OnInit {
  withdrawlForm: FormGroup;
  coinShortName: any;
  withdrawData: any=[];
  pageNumber:number=1

  constructor(public route:Router, public service:MainService, public active:ActivatedRoute ) 
  {
    
   }

  ngOnInit() {
    
    this.withdrawlForm = new FormGroup({
      'withdraw': new FormControl('',Validators.required),
    })
    this.withdrawLimit()
  }

  // Api of withdraw limit list
  withdrawLimit(){
    this.service.showSpinner();
    var url="wallet/coin/get-coin-list";
    this.service.get(url).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        this.withdrawData=res.data;
      }
    },(err)=>{
      if(err.status==401){
        this.service.hideSpinner();
        this.service.toasterErr('Unauthorized access')
      }
      else{
        this.service.toasterErr('something went wrong')
      }
    })
  }

  // api of search
  search(){
    let coinName=this.withdrawlForm.value.withdraw
  
    this.service.showSpinner();
    var url="wallet/coin/get-coin-details?coinName="+coinName;
    this.service.get(url).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        this.withdrawData=[]
        this.withdrawData.push(res.data);
        this.withdrawlForm.reset()
      }
    },(err)=>{
      if(err.status==401){
        this.service.hideSpinner();
        this.service.toasterErr('Unauthorized access')
      }
      else{
        this.service.toasterErr('something went wrong')
      }
    })
  
}
viewLimit(coin){
  this.route.navigate(['/view-limit'],{queryParams:{coin:coin}})
}



  

}
