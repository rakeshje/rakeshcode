import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
declare var $:any
@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css']
})
export class TransactionManagementComponent implements OnInit {
  searchForm:FormGroup
  transactionHistory: any=[];
  
  id:any
  
  paginationData: any={ limit: 5, page: 1, total: 0  };
  constructor(public router:Router,public mainservice:MainserviceService) { }

  ngOnInit() {
    this.formValidation();
    this.transactionList();
  }
//=============form validation========//
  formValidation(){
    this.searchForm= new FormGroup({
      search: new FormControl('')
    })
  }
  //=======pagination========//
  pagination(event){
    this.paginationData.page=event
    this.transactionList();
    
  }
  //========transaction list====//
  transactionList(){
     let data={
       search: this.searchForm.value.search,
       page:this.paginationData.page,
       limit:this.paginationData.limit
     }
     this.mainservice.showSpinner()
     this.mainservice.postApi('admin/transactionList', data,1).subscribe((res)=>{
      if(res.response_code==200){
        this.mainservice.hideSpinner();
        // this.mainservice.successToast(res.response_message);
        this.paginationData.limit=res.result.limit
        this.paginationData.total = res.result.total;
        this.transactionHistory = res.result.docs?res.result.docs :'';
      }
      else if(res.response_code==404){
        this.mainservice.errorToast(res.response_message)
        this.mainservice.hideSpinner()
      }

      else{
        this.transactionHistory = res.result?res.result :''
        this.mainservice.errorToast(res.response_message)
      }
     },(error)=>{
       this.mainservice.errorToast('something went wrong');
     })
  }

  //============modal open========//
  deleteUserModal(id){
    this.id=id
    $('#deleteTransactionUser').modal('show')
  }

  //===============delete transaction=====//
  deleteTransaction(){
    let data={
      'transactionId':this.id
    }
    this.mainservice.showSpinner();
    this.mainservice.deleteApi('admin/transaction',data,1).subscribe((res)=>{
      if(res.response_code==200){
        this.mainservice.hideSpinner();
        $('#deleteTransactionUser').modal('hide')
        this.mainservice.successToast(res.response_message);
        this.transactionList();
      }
    })
   
  }
  //=============routing=========//
  viewTrans(id){
    this.router.navigateByUrl('view-transaction/'+id)
  }
}
