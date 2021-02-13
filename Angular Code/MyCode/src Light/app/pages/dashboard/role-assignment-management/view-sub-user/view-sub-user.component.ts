import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-sub-user',
  templateUrl: './view-sub-user.component.html',
  styleUrls: ['./view-sub-user.component.css']
})
export class ViewSubUserComponent implements OnInit {
  subUserId: any;
  subUserData: any;

  constructor(private route: ActivatedRoute, public router: Router, public mainService: MainService) {
    this.route.params.subscribe((res: any) => {
      console.log("sub user id ==>",res)
      if (res.id) { this.subUserId = res.id }
    })
  }

  ngOnInit() {
    this.viewSubUser()
  }

  // get role assignment by id / (sub-admin)
  viewSubUser() {
    this.mainService.showSpinner();
    this.mainService.getApi('admin/subAdmins/' + this.subUserId, 1).subscribe((res: any) => {
      console.log("view role assignment by id response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.subUserData = res.result;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }

}
