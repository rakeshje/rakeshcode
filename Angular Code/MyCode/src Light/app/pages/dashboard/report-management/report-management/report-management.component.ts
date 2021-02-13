import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.css']
})
export class ReportManagementComponent implements OnInit {
  searchForm: FormGroup;
  transactionList: any = []
  countUser: any;
  reportanagementTypeData: any = "USER";
  userDataList: any;

  constructor(public router: Router, private mainService: MainService) { }

  ngOnInit() {
    this.form();
    this.countsData();
  }

  // search Validation.
  form() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      select: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      fromDatee: new FormControl(''),
      toDatee: new FormControl('')
    });
  }

  countsData() {
    this.mainService.showSpinner();
    let data = {
      userType: 'USER',
      status: 'ACTIVE'
    }
    this.mainService.postApi('admin/counts', data, 1).subscribe((res: any) => {
      console.log("hjyfgjh9878jkgjkh", res)
      this.countUser = res.result
      this.mainService.hideSpinner();
    })
  }

  retailerAllData() {
    this.router.navigate(['/view-enduser']);
  }
  viewReportCoupon() {
    this.router.navigate(['/view-couponreport'])
  }

  endUsers() {
    this.mainService.showSpinner();
    let data = {
      userType: this.searchForm.value.select,
      status: this.searchForm.value.status,
      fromDate: this.searchForm.value.fromDatee,
      toDate: this.searchForm.value.toDatee
    }
    this.mainService.postApi('admin/endUsers', data, 1).subscribe((res: any) => {
      console.log("ghjf87jhngvjhfv", res);
      this.countUser = res.result.total;
      this.mainService.hideSpinner();
    })
  }

  reportanagementType(data) {
    this.reportanagementTypeData = data;
    console.log("dfhgsdfghs90sfhjbklovhdfb", this.reportanagementTypeData)
  }

  downloadCSV() {
    // this.mainService.showSpinner();
    this.getAllReportData();
  }
  getAllReportData() {
    let data = {
      userType: this.reportanagementTypeData,
      fromDate: this.searchForm.value.fromDate,
      toDate: this.searchForm.value.toDate
    }
    console.log("jhgj98798gjhg", data)
    this.mainService.postApi('admin/endUsers', data, 1).subscribe((res: any) => {
      console.log("ghdfghdfgh45645yhmmnfn", res)
      this.userDataList = res.result.docs;
      this.exportCSV();
      // this.mainService.hideSpinner();
    })
  }

  exportCSV() {
    if (this.reportanagementTypeData == 'USER') {
      let dataArr = [];
      dataArr.push({
        sno: "S.No.",
        Name: " Name",
        Email: "Email",
        ContactNumber: "Contact Number",
        Status: "Status"
      });

      this.userDataList.forEach((element, ind) => {
        dataArr.push({
          sno: ind + 1,
          Name: element.firstName ? element.firstName : '--',
          Email: element.email ? element.email : '--',
          ContactNumber: element.mobileNumber ? element.mobileNumber : '--',
          Status: element.status ? element.status : '--',
        })
      })
      new ngxCsv(dataArr, 'User_Management');
    }
    else if (this.reportanagementTypeData == 'RETAILER') {
      let dataArr = [];
      dataArr.push({
        sno: "S.No.",
        mart_Name: "Mart Name",
        retailer_Name: "Retailer Name",
        shop_number: "Shop Phone Number",
        website: "Website Status",
        registration: "Registration Status",
        assigned: "Assign Account Manager Name"
      });

      this.userDataList.forEach((element, ind) => {
        dataArr.push({
          sno: ind + 1,
          mart_Name: element.martName ? element.martName : '--',
          retailer_Name: element.shopName ? element.shopName : '--',
          shop_number: element.shopNumber ? element.shopNumber : '--',
          website: element.websiteStatus ? element.websiteStatus : '--',
          registration: element.retailerStatus ? element.retailerStatus : '--',
          assigned: element.managerName ? element.managerName : '--',
        })
      })
      new ngxCsv(dataArr, 'Retailer_Management');
    }
    else if (this.reportanagementTypeData == 'COUPON') {
      let dataArr = [];
      dataArr.push({
        sno: "S.No.",
        mart_Name: "Mart Name",
        retailer_Name: "Retailer Name",
        coupon_code: "Coupon Code",
      });

      this.userDataList.forEach((element, ind) => {
        dataArr.push({
          sno: ind + 1,
          mart_Name: element.shopName ? element.shopName : '--',
          retailer_Name: element.shopName ? element.shopName : '--',
          coupon_code: element.couponCode ? element.couponCode : '--',
        })
      })
      new ngxCsv(dataArr, 'Coupon_Management');
    }
  }

}
