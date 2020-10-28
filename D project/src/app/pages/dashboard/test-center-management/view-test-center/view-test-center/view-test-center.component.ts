import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-view-test-center',
  templateUrl: './view-test-center.component.html',
  styleUrls: ['./view-test-center.component.css']
})
export class ViewTestCenterComponent implements OnInit {
  testCenterId: any;
  testCenterData: any;
  tabView: any = 'patient';

  constructor(private route: ActivatedRoute, private router: Router, public mainService: MainService) {
    this.route.queryParams.subscribe((res: any) => {
      if (res.testCenterId) { this.testCenterId = res.testCenterId }
    })
  }

  ngOnInit() {
    this.getTestCenter()
  }

  back() {
    this.router.navigate(['test-center-management']);
  }

  // get test center detail by id
  getTestCenter() {
    this.mainService.showSpinner()
    this.mainService.getApi(ApiUrls.viewTestCenter + this.testCenterId, 1).subscribe((res: any) => {
      console.log("get test center detail by id response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.testCenterData = res.result
      } else {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      }
    })
  }

  // view tab (patient or plasma-donated-patient)
  viewTab(tab) {
    this.tabView = tab
  }
}
