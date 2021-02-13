import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-withdrawl-fee',
  templateUrl: './withdrawl-fee.component.html',
  styleUrls: ['./withdrawl-fee.component.css']
})
export class WithdrawlFeeComponent implements OnInit {
  withdrawlForm: FormGroup;
  withdrawData: any=[];
  pageNumber:number=1

  constructor(public route:Router, public service:MainService) { }

  ngOnInit(): void {
    this.withdrawFee();
    this.withdrawlForm = new FormGroup({
      'searchByCoin': new FormControl('',Validators.required),
    })
  }
// Api of withdraw fee list
  withdrawFee(){
    this.service.showSpinner();
    var url="wallet/coin/get-coin-list";
    this.service.get(url).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        this.withdrawData=res.data;
        console.log('jhf', this.withdrawData);
        
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
      let coinName=this.withdrawlForm.value.searchByCoin
    
      this.service.showSpinner();
      var url="wallet/coin/get-coin-details?coinName="+coinName;
      this.service.get(url).subscribe((res:any)=>{
        if(res.status==200){
          this.service.hideSpinner();
          this.withdrawData=[]
          this.withdrawData.push(res.data)
          console.log('this.withdrawData', this.withdrawData);
          
          this.withdrawlForm.reset();
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

  reset(){
    this.service.hideSpinner()
    this.withdrawlForm.reset();
    this.withdrawFee()
  }

  

  viewFee(coin){
    
    console.log('ede', coin);
    
    this.route.navigate(['/view-fee'],{queryParams:{coin:coin}})
    
  }

  // 

}
