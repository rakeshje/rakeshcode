import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {
  viewData: any;
  id: any;

  constructor(public service:MainService, public active:ActivatedRoute) 
  {
    this.active.params.subscribe((params)=>{
      this.id=params.id
    })
   }

  ngOnInit(): void {
    this.viewFiat()
  }

  viewFiat(){
    this.service.showSpinner();
    var url="wallet/admin/get-request-by-requestId?requestID="+this.id
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.viewData = res['data']
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


  

}
