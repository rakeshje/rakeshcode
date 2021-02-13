import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

declare var $:any
@Component({
  selector: 'app-weekly-email-template',
  templateUrl: './weekly-email-template.component.html',
  styleUrls: ['./weekly-email-template.component.css']
})
export class WeeklyEmailTemplateComponent implements OnInit {
  searchForm: FormGroup;
  transactionList:any=[]
  templateData:any=[];
  did: any;
  constructor(public router:Router, public service:MainService) { }

  ngOnInit() {
    this.form()
    this.emailTemplateList()
  }

  // ======search Validation=======// 
  form() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  //-------search form submit search icon---//

  searchFormSubmit(){
    if(this.searchForm.value.search){
      this.emailTemplateList()
    }
  }

  //---------search form  reset-----//
  searchFormReset(){
    if(this.searchForm.value.search){
      this.searchForm.reset()
      this.emailTemplateList()
    }
  }

  // =========emailTemplateList========//

  emailTemplateList(){
    let data={
      "search":this.searchForm.value.search
    }
    this.service.showSpinner()
    this.service.postApi('emailTemplate/emailTemplatesList',data,1).subscribe((res)=>{
      console.log("a", res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.templateData=res.result.docs;
      }
      
    },(error)=>{
      this.service.errorToast("something went wrong")
    })
  }

  //--------delete modal -----//
  delete(data){
    this.did=data._id
    $('#delete').modal('show')
  }
  //----------- delete weekly template----//
  deletetemplate(){
    let data={
      templateId:this.did
    }
    this.service.showSpinner()
    this.service.postApi('emailTemplate/deleteEmailTemplates',data,1).subscribe((res)=>{
      console.log("f",res);
      if(res.responseCode=200){
        this.service.hideSpinner();
        $('#delete').modal('hide')
        this.emailTemplateList()
      }
      
    },(error)=>{
      this.service.errorToast("something went wrong")
    })
    // this.service.showSpinner()
  }

  // Routing
  goToViewWeekly(data){
    this.router.navigate(['/view-email-template'],{queryParams:{id:data._id}})
  }
  goToEditWeekly(data){
    this.router.navigate(['/edit-email-template'],{queryParams:{id:data._id}})
  }

  addWeekly(){
    this.router.navigate(['/add-email-template'])
  }

  exportCSV() {
    this.service.showSpinner()
    this.service.postApi('admin/exportEmailTemplateTocsv',{},0).subscribe((res)=>{
    if(res.responseCode==200){
      this.service.hideSpinner()
      this.templateData=res.result
    let dataArr = [];
    dataArr.push({
      sno: "S.No.",
      mart_Name: "Subject",
      retailer_Name: "Status"
    });

    this.templateData.forEach((element, ind) => {
      dataArr.push({
        sno: ind + 1,
        mart_Name: element.subject ? element.subject : '--',
        retailer_Name: element.status ? element.status : '--'
      })
    })
    new ngxCsv(dataArr, 'weekly_template');
  }
})

  }
}
