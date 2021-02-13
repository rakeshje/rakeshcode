import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-static-content-management',
  templateUrl: './static-content-management.component.html',
  styleUrls: ['./static-content-management.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StaticContentManagementComponent implements OnInit {
  result: any = [];

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.viewStaticData()
  }

  // get static content data
  viewStaticData() {
    this.mainService.showSpinner();
    this.mainService.getApi(`static/staticList`, 1).subscribe((res: any) => {
      console.log("get user management list response ==>", res)
      if (res.responseCode == 200) {
        this.result = res.result ? res.result : ''
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.result = res.result ? res.result : ''
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    }, (error) => {
      this.mainService.hideSpinner()
    })
  }

  // edit static content data
  editStatic(id, type) {
    this.router.navigate(['edit-static-content-management'], { queryParams: { id: id, type: type } })
  }
}
