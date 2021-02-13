import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  id: any;
  viewData: any;

  constructor(public router: Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      console.log("nsnd", this.id);
      
    })
   }

  ngOnInit() {
    this.viewTransaction()
  }
//=======view role======//
  viewTransaction(){
    let transactionId=this.id
    this.service.showSpinner();
    this.service.getApi('admin/view/payment/'+transactionId,1).subscribe((res)=>{
      console.log("h",res);
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.viewData=res.result;
        // this.permissions=res.result.permissions
      }
      
    },(error)=>{
      this.service.errorToast('something went wrong')
    })

  }
  
}
