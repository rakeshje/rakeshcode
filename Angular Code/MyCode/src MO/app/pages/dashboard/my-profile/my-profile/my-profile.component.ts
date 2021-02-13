import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';

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
    this.mainService.getApi('user/getProfile', 1).subscribe((res: any) => {
      console.log("sidebar profile response ==>", res);
      if (res.responseCode == 200) {
        this.profileData = res.result;
        this.mainService.hideSpinner();
      } else {
        this.mainService.hideSpinner();
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong ')
    })
  }

  changePassword() {
    this.router.navigate(['change-password'])
  }

  editProfile(id) {
    this.router.navigate(['edit-profile'],{queryParams:{id:id}})
  }
}
