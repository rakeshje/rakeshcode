import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  searchForm:FormGroup
  transactionId: any;
  viewData: any;
  constructor(public router:Router, public mainservice:MainserviceService, public active:ActivatedRoute) 
  {
    this.active.params.subscribe((params)=>{
      this.transactionId=params.id
    })
   }

  ngOnInit() {
    this.formValidation()
    this.viewTransaction()
  }
//=============fiorm validation========//
  formValidation(){
    this.searchForm= new FormGroup({
      search: new FormControl('')
    })
  }
  //==========view transaction=====//
  
  viewTransaction(){
    this.mainservice.showSpinner();
    this.mainservice.getApi('admin/transaction/'+this.transactionId,1).subscribe((res)=>{
      if(res.response_code==200){
        this.mainservice.hideSpinner();
        this.mainservice.successToast(res.response_message);
        this.viewData=res.result;
      }
    },(error)=>{
      this.mainservice.errorToast('something went wrong')
    })
  }
  //=============routing=========//
  viewUser(){
    this.router.navigate(['/view-user'])
  }

}
