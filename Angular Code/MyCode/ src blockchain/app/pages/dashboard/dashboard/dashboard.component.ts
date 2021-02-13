import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activeUserLength: any;
  blockedUserLength: any;
  userListLength: any;
  pendingUserLength: any;
  kycpendingListlength: any;
  TotalUserCount: any;
  totalDepositeCount: any;
  totalCoinCount: any;
  

  constructor(private router: Router, public service: MainService) { }

  ngOnInit() {
    this.getUserList();
    this.getListOfKyc();
    this.getListOfTotalUserCount();
    this.getDepositCoinCount()
  }

   // Get List of User
   getUserList() {
    var url = "account/admin/dashboard/getUserCountByStatus";
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        var userList = res['data'];
        console.log('ffdhdj',userList);
        this.activeUserLength = userList.activeUsersCount;
        this.blockedUserLength = userList.blockedUsersCount;
        this.pendingUserLength = userList.pendingUserCount;
        this.userListLength = this.activeUserLength + this.blockedUserLength + this.pendingUserLength;
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  // getListOFKYC Function
  getListOfKyc() {
    var url = 'account/admin/dashboard/pendingKycCount';
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.kycpendingListlength = res['data'];
      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  // getListOfTotalUserCount Function
  getListOfTotalUserCount() {
    var url = 'account/admin/dashboard/totalUserCount';
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.TotalUserCount = res['data'];
      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }
  
  // get-deposit-and-coin-count Function
  getDepositCoinCount() {
    var url = 'wallet/get-deposit-and-coin-count';
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.totalDepositeCount = res['data'].depositCount;
        this.totalCoinCount = res['data'].coinCount;
      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

   // total token register Function
   tokenRegister() {
    var url = 'wallet/get-deposit-and-coin-count';
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.totalDepositeCount = res['data'].depositCount;
        this.totalCoinCount = res['data'].coinCount;
      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

}
