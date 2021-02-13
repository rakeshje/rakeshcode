import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv';

declare var $:any

@Component({
  selector: 'app-faq-management',
  templateUrl: './faq-management.component.html',
  styleUrls: ['./faq-management.component.css']
})
export class FaqManagementComponent implements OnInit {
  searchForm: FormGroup;
  transactionList:any=[]
  faqList: any=[];
  currentPage=1;
  faqId: any;
  whichmodal: string;
  particularUserData: any;
  dId: any;
  search: any;
  constructor(public router:Router, public service:MainService) { }

  ngOnInit() {
    this.form()
    this.getFaqList()
  }

  // search Validation. 
  form() {
    this.searchForm = new FormGroup({
      search   : new FormControl('')
    });
  }

  // ------  search from submit search icon-----//
  searchFormSubmit(){
    if(this.searchForm.value.search){
      this.getFaqList()
    }
  }

  //-------reset search form---//
  searchFormReset(){
    if(this.searchForm.value.search){
      this.searchForm.reset()
      this.getFaqList()
    }
  }


  

  // Getfaq list
  getFaqList(){
    let search={
      "topic":this.searchForm.value.search
    }
    this.service.showSpinner()
    this.service.postApi('faq/faqsList', search, 1).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.faqList=res.result.docs
      }
      else {
        this.faqList = [];
        this.faqList = res.result;
        this.service.hideSpinner();
      }
    },(error)=>{
      this.service.hideSpinner()
      this.service.errorToast("something went wrong")
    })
  }

  // get list of faq
  Pagination(event){
    this.currentPage= event
    this.getFaqList()
  }

  // delete faq Modal 
  delete(data){
    this.dId=data._id
    $('#delete').modal('show')
    
  }
 
  // delete api
  deleteFaq(){
    this.service.showSpinner()
    this.service.deleteApi('faq/faqs', {faqId:this.dId},1).subscribe((res)=>{
      console.log("fgg", res);
      if(res.responseCode==200){
        this.service.hideSpinner()
      this.getFaqList()
    $('#delete').modal('hide')

  }
    },(error)=>{
      this.service.errorToast("something went wrong")
    })

  }

  // Export Csv
  exportCsv(){
    this.service.showSpinner()
    this.service.postApi('admin/exportFaqTocsv',{},0).subscribe((res)=>{
    if(res.responseCode==200){
      this.service.hideSpinner()
      this.faqList=res.result
    let dataArr=[]
    dataArr.push({
      Sno:"s.no",
      Date:"createdAt",
      Topic:"topic",
      Question:"question"
    })
    this.faqList.forEach((element,ind) => {
      dataArr.push({
        Sno:ind+1,
        Date:element.createdAt?element.createdAt:"",
        Topic:element.topic?element.topic:"",
        Question:element.question?element.question:""
      })
    });
    new ngxCsv(dataArr,'Faq-management')
  }
})
  }

  // Routing
  goToViewFaq(data){
    this.router.navigate(['/view-faq'],{queryParams:{id:data._id}})
  }

  addFaq(){
    this.router.navigate(['/add-faq'])
  }

}
