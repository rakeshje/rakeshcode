import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: any;

  constructor(public mainService: MainService) { }

  ngOnInit() {
    this.getDashboard();
  }

  // get dashboard data
  getDashboard() {
    // this.mainService.showSpinner();
    // this.mainService.getApi(ApiUrls.dashboard, 1).subscribe((res: any) => {
    //   console.log("dashboard response ==>", res)
    //   if (res.responseCode == 200) {
    //     this.dashboardData = res.result ? res.result : ''
    //     this.mainService.hideSpinner();
    //     this.mainService.successToast(res.responseMessage);
    //   } else if (res.responseCode == 401) {
    //     this.mainService.hideSpinner();
    //     this.mainService.errorToast(res.responseMessage);
    //     this.mainService.logout();
    //   }
    //   else {
    //     this.mainService.hideSpinner();
    //     this.mainService.errorToast(res.responseMessage)
    //   }
    // })
  }

}
