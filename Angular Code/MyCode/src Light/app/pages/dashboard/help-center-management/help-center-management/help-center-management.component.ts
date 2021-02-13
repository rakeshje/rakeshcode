import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as jsPDF from 'jspdf';
declare var $: any;

@Component({
  selector: 'app-help-center-management',
  templateUrl: './help-center-management.component.html',
  styleUrls: ['./help-center-management.component.css']
})
export class HelpCenterManagementComponent implements OnInit {
  searchForm: FormGroup;
  transactionList: any = []
  helpData: any = [];
  id: any;
  whichmodal: string;
  particularUserData: any;
  constructor(public router: Router, private mainService: MainService, private activatedRoute:ActivatedRoute) { 

  }

  ngOnInit() {
    this.form();
    this.getHelpCenterData();
  }

  getHelpCenterData() {
    this.mainService.showSpinner();
    let data = {
      search: this.searchForm.value.search,
      fromDate: this.searchForm.value.fromDate,
      toDate: this.searchForm.value.toDate
    }
    console.log("dfghydfhydfgyryfd",data)
    this.mainService.postApi('helpCenter/helpCenterList', data, 1).subscribe((success: any) => {
      console.log("successjhgjhg", success)
      if (success.responseCode == 200) {
        this.helpData = success.result.docs;
        this.mainService.hideSpinner();
      }
      else {
        this.helpData = [];
        this.helpData = success.result;
        this.mainService.hideSpinner();
      }

    })
  }

  
  reset() {
    this.searchForm.reset();
    this.getHelpCenterData();
  }
  submit() {
    this.getHelpCenterData();
  }

  // search Validation. 
  form() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }





  enableDisableOrDeleteOpenModal (data, whichModal) {
    console.log("Data >>>>> ",data)
    if (whichModal === 'enable') {
      this.whichmodal = 'enable';
    } else {
      if (whichModal === 'disable') {
        this.whichmodal = 'disable';
      } else {
        this.whichmodal = 'delete';
      }
    }
    this.particularUserData = data;
    $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
  }

  anableDisable(enableorDisable) {
    if (enableorDisable === 'disable') {
      console.log("Inside Disable Block")
      // this.disableCategory(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.getHelpCenterData();
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        // this.enableCategory(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getHelpCenterData();
      } else {
        console.log("Inside Delete Block")
        this.deleteCategory(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getHelpCenterData();
      }
    }
  }


  deleteCategory(data) {
    console.log("hgfhgdfhgf",data);
    this.mainService.deleteApi('helpCenter/helpCenter', {helpId:data}, 1).subscribe((success:any)=>{
      console.log("hgfhgdfhgf",success);
      // {helpId:data}
    })
  }









  // Routing
  goToViewHelp(id) {
    // this.router.navigate(['/edit-static-page'],{queryParams:{value:JSON.stringify(data)}})
    this.router.navigate(['/view-help-center'], {queryParams:{id:id}})
  }

//===========export csv========//

  exportCSV() {
    this.mainService.showSpinner()
    this.mainService.postApi('admin/exportFaqTocsv',{},0).subscribe((res)=>{
    if(res.responseCode==200){
      this.mainService.hideSpinner()
      this.helpData=res.result
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        name: "User Name",
        email: "Email Id",
        phone : "Phone Number",
        date: "Date",
    });
  
    this.helpData.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            name:element.name?element.name:'--',
            email:element.email?element.email:'--',
            phone:element.mobileNumber?element.mobileNumber:'--',
            date:element.createdAt?element.createdAt:'--',
        })
    }) 
    new ngxCsv(dataArr, 'Help_Center_Management');
  }
},(error)=>{
  this.mainService.errorToast("something went wrong")
})
  }
  
  exportPDF() {
    
    console.log("hgjfjhgf");
    const doc = new jsPDF;
    doc.text('Hello', 15, 15);
  
    doc.save('coupon.pdf');
    
  }





}
