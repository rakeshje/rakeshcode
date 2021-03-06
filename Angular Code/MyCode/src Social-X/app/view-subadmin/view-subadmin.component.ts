import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-subadmin',
  templateUrl: './view-subadmin.component.html',
  styleUrls: ['./view-subadmin.component.css']
})
export class ViewSubadminComponent implements OnInit {
  paramData: any;
  userData: any=[];
  kycImage: any;

  constructor(
    private active: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.active.params.subscribe((id) => {
      this.paramData = id.id;
      console.log("jghfghft",this.paramData);
      this.getUserData();
    }, (err) => {
      console.log("Error in getting data : ", err);
    });
  }

  getUserData() {
    this.spinner.show();
    console.log("jhgfjgjhgfhjk",this.paramData);
    this.service.postApii('admin/listOfSubAdmin', {subAdminId:this.paramData},  1).subscribe(success => {
      if(success.response_code == 200) {
        console.log("userdata",success)
        // this.service.success(success.response_message)
        this.userData = success.result[0];
        this.kycImage = this.userData.profilePic;
        console.log("userdata",this.userData)
        this.spinner.hide();
        // this.router.navigate['/subadmin-management']
      }
      else {
        this.spinner.hide();
      }
    })
  }
}
