import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userId: any;
  user: any;
  frontSide: any;
  backSide: any;
  imageUrl: any;
  testDetails: any = [];

  constructor(private activatedroute: ActivatedRoute, public mainService: MainService) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((res) => {
      this.userId = res.value;
    })
    this.viewUser()
  }

  // get user detail by id
  viewUser() {
    this.mainService.showSpinner();
    this.mainService.getApi(ApiUrls.viewUser + this.userId, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.user = res.result.userInfo;
        this.testDetails = res.result.testDetails
        this.imageUrl = this.user.profilePic ? this.user.profilePic : ''
        this.frontSide = this.user.govDocs[0].frontSide;
        this.backSide = this.user.govDocs[0].backSide
        setTimeout(() => {
          this.mainService.hideSpinner();
        }, 1000);
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

}
