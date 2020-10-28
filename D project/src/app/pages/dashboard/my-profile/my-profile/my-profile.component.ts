import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profileData: any;
  
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.getProfile()
  }

  // get profile
  getProfile() {
    this.mainService.showSpinner()
    this.mainService.getApi(ApiUrls.profile, 1).subscribe((res: any) => {
      console.log("profile response ==>", res);
      if (res.responseCode == 200) {
        this.profileData = res.result;
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  changePassword() {
    this.router.navigate(['change-password'])
  }

  editProfile() {
    this.router.navigate(['edit-profile'])
  }

}
