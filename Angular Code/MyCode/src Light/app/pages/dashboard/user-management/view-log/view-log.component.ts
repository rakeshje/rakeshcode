import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.component.html',
  styleUrls: ['./view-log.component.css']
})
export class ViewLogComponent implements OnInit {
  searchForm:FormGroup
  id: any;
  currentPage:1;
  viewLogList: any=[];
  paginationData: any = { limit: 10, page: 1, total: 0 };

  constructor(public router:Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      console.log("dffhj", this.id);
      
    })
   }
  ngOnInit() {
    this.form()
    this.viewLog()
  }
  // search Validation. 
  form() {
    this.searchForm = new FormGroup({
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }

  //=====search by fromdate and to date====//
  searchFormSubmit(){
    console.log("dj");
    
    if(this.searchForm.value.fromDate && this.searchForm.value.toDate){
      this.viewLog();
    }
  }

  //===========search reset======//
  searchFormReset(){
    console.log("dj");
    if(this.searchForm.value.fromDate && this.searchForm.value.toDate){
      this.searchForm.reset();
      this.viewLog();
    }
  }

  //=========pagination====//
  viewLogPagination(event){
    this.currentPage=event;
    this.viewLog()

  }
   //=======export csv===//
   exportCSV() {
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        Date: " Name",
        Time: "Email",
        Status:"Status"
    });
  
    this.viewLogList.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Date:element.createdAt  ?element.createdAt :'--',
            Time:element.mobileNumber?element.mobileNumber:'--',
            Status:element.activity?element.activity:'--',
        })
    }) 
    new ngxCsv(dataArr, 'User_Management');
  }
  //=======view log=======//
  viewLog(){
    this.service.showSpinner()
    let data={
      userId:this.id
      // userId:"5ed5fc3ad38b0215a7f2910b"
    }
    this.service.postApi('admin/logs',data,1).subscribe((res)=>{
      console.log("fhj",res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.viewLogList=res.queried.docs
      }
      
    },(error)=>{
      this.service.errorToast("something went wrong")
    })

  }

  storageTypePagination(event){
    this.paginationData.page = event;
  }


}
