import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv';
declare var $:any
@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css']
})
export class TransactionManagementComponent implements OnInit {
  searchForm: FormGroup;
  transactionHistory: any=[];
  currentPage=1;
  did: any;
  
  constructor(public router:Router, public service:MainService) { }

  ngOnInit() {
    this.form()
    this.transactionList()
  }

  // search Validation.
  form() {
    this.searchForm = new FormGroup({
      search   : new FormControl(''),
      fromDate   : new FormControl(''),
      toDate   : new FormControl('')
    });
  }

  // Routing
  goToViewTransaction(data){
    this.router.navigate(['/view-transaction'],{queryParams:{id:data._id}})
  }
  //=======pagination========//
  Pagination(e){
    this.currentPage=e;
    this.transactionList()
  }

  
  //==========serch submit=====//
  searchSubmit(){
    if(this.searchForm.value.fromDate && this.searchForm.value.toDate ){
      this.transactionList()
    }
  }

  //==========search reset======//
  searchReset(){
    if(this.searchForm.value.fromDate && this.searchForm.value.toDate ){
      this.searchForm.reset()
      this.transactionList()
    }
  }

  //==========export csv======//
  exportCsv(){
    this.service.showSpinner()
    this.service.postApi('admin/exportTransactionData',{},0).subscribe((res)=>{
      console.log("ff",res);
      
    if(res.responseCode==200){
      this.service.hideSpinner()
      this.transactionHistory=res.result
    let dataArr=[]
    dataArr.push({
      Sno:"s.no",
      TransactionId:"TransactionId",
      PaymentDate:"PaymentDate",
      Name:"Name",
      PaymentStatus:"PaymentStatus"
    })
    this.transactionHistory.forEach((element,ind) => {
      dataArr.push({
        Sno:ind+1,
        TransactionId:element.transactionId?element.transactionId:"",
        PaymentDate:element.createdAt?element.createdAt:"",
        Name:element.customerName?element.customerName:"",
        PaymentStatus:element.paymentStatus?element.paymentStatus:"",
      })
    });
    new ngxCsv(dataArr,'Transaction-management')
  }
})
  }

  //===========transaction list=======//
  transactionList(){
    let data={
      fromDate:this.searchForm.value.fromDate,
      toDate:this.searchForm.value.toDate

    }
    this.service.showSpinner();
    this.service.postApi('admin/history/payment',data,1).subscribe((res)=>{
      console.log("f",res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.transactionHistory=res.cuponData.docs
      }
      
    },(error)=>{
      this.service.errorToast("something went wrong")
    })
  }

  //==========delete modal=======//
  delete(id){
    this.did=id
  $('#delete').modal('show')
}
//==========delete Transaction=======//
deleteTransaction(){
  this.service.showSpinner()
  let data={
    transactionId:this.did
  }
  this.service.deleteApi('admin/history/delete',data,1).subscribe((res)=>{
    if(res.responseCode==200){
      $('#delete').modal('hide')
      this.service.hideSpinner();
      this.service.successToast('transaction deleted successfully.')
      this.transactionList();
    }
  },(error)=>{
    this.service.errorToast("something went wrong")
  })
}

}
