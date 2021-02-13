import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-view-enduser',
  templateUrl: './view-enduser.component.html',
  styleUrls: ['./view-enduser.component.css']
})
export class ViewEnduserComponent implements OnInit {

  pagination: any = { limit: 10, currPage: 1, total: 0 };
  searchForm: FormGroup;
  whichmodal: string = 'enable';
  userDataList: any = [];
  particularUserData: any;
  retailerId: any;
  creditForm: FormGroup;
  newRetailerId: any;
  martName: any = [];
  martID: any=[];
  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      fromDate : new FormControl(),
      toDate : new FormControl()
    })
    this.creditForm = new FormGroup({
      credit: new FormControl(),
      description: new FormControl()
    })
    this.getRetailerList();
  }

  getRetailerList() {
    this.mainService.showSpinner();
    let data = {
      userType : 'USER'
    }
    console.log("loginjhgu765ughjuyg", data)
    
    this.mainService.postApi('admin/endUsers', data, 1).subscribe((res: any) => {
      console.log("login response ==>", res)
      if (res.responseCode == 200) {
        
        //  this.mainService.successToast(res.responseMessage)
        this.userDataList = res.result.docs;
       

        // this.mainService.loginStatus.next(true)
        this.mainService.hideSpinner()
      } else {
        this.mainService.hideSpinner()
        // this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  searchRetailerManagement() {
    let data = {
      userType : 'USER',
      fromDate: this.searchForm.value.fromDate,
      toDate: this.searchForm.value.toDate,
    } 
    this.mainService.postApi('admin/endUsers', data, 1).subscribe((success:any)=>{
      console.log("success",success)
      if(success.responseCode==200) {
        this.userDataList = success.result.docs;
        console.log("success2",this.userDataList)
      }
      else {
        this.userDataList = [];
        this.userDataList = success.result;
      }
    })
  }

  exportCSV() {
    let dataArr = [];
    dataArr.push({
      sno: "S.No.",
      mart_Name: "End User Name",
      retailer_Name: "Signup Date",
      shop_number: "Retailer's Referral Code",
      registration: "Device Used",
      assigned: "Signup Method"
    });

    this.userDataList.forEach((element, ind) => {
      dataArr.push({
        sno: ind + 1,
        mart_Name: element.firstName ? element.firstName : '--',
        retailer_Name: element.createdAt ? element.createdAt : '--',
        shop_number: element.retailerReferralCode ? element.retailerReferralCode : '--',
        registration: element.deviceUsed ? element.deviceUsed : '--',
        assigned: element.signUpMethod ? element.signUpMethod : '--',
      })
    })
    new ngxCsv(dataArr, 'End_user_report');
  }

}
