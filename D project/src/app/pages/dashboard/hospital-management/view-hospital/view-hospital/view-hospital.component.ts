import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-view-hospital',
  templateUrl: './view-hospital.component.html',
  styleUrls: ['./view-hospital.component.css']
})
export class ViewHospitalComponent implements OnInit {
  hospitalId: any;
  hospitalData: any;
  tabView: any = 'patient';

  constructor(private route: ActivatedRoute, private router: Router, public mainService: MainService) {
    this.route.queryParams.subscribe((res: any) => {
      if (res.hospitalId) { this.hospitalId = res.hospitalId }
    })
  }

  ngOnInit() {
    this.getHospital()
  }

  back() {
    this.router.navigate(['hospital-management']);
  }

  // get hospital detail by id
  getHospital() {
    this.mainService.showSpinner()
    this.mainService.getApi(ApiUrls.viewHospital + this.hospitalId, 1).subscribe((res: any) => {
      console.log("get hospital detail by id response==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.hospitalData = res.result
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }

  // view tab (patient or plasma-donated-patient)
  viewTab(tab) {
    this.tabView = tab
  }
}
