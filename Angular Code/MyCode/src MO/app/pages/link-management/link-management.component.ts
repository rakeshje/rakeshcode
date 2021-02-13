import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-link-management',
  templateUrl: './link-management.component.html',
  styleUrls: ['./link-management.component.css']
})
export class LinkManagementComponent implements OnInit {
  link: any;
  listform: FormGroup;
  id: any;

  constructor(private activate:ActivatedRoute,private route:Router,public mainService: MainService) {
    this.listform = new FormGroup({
      "CustomerAndroindUrl": new FormControl(''),
      "Customer_IOS_Url": new FormControl(''),
      "pratitionerAndroindUrl": new FormControl(''),
      "pratitioner_IOS_Url": new FormControl(''),
      "instagram": new FormControl(''),
      "facebook": new FormControl(''),
      "twitter": new FormControl(''),
      "linkedin": new FormControl('')
    });
   }

  ngOnInit() {
    this.getLink();
  }
  getLink() {
    this.mainService.showSpinner();
    this.mainService.getApi('appSharing/appSharingData',1).subscribe((res: any) => {
      if (res.responseCode == 200 && res.result) {
        this.link = res.result;
        this.id= res.result._id;
        console.log('link id',this.id);
        this.listform.patchValue({
          "CustomerAndroindUrl": this.link.CustomerAndroindUrl,
          "Customer_IOS_Url": this.link.Customer_IOS_Url,
          "pratitionerAndroindUrl": this.link.pratitionerAndroindUrl,
          "pratitioner_IOS_Url": this.link.pratitioner_IOS_Url,
          "instagram": this.link.instagram,
          "facebook": this.link.facebook,
          "twitter": this.link.twitter,
          "linkedin": this.link.linkedin
        })
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }
  saveList() {
    const data = {
      "_id": this.id,
      "facebook": this.listform.value.facebook,
      "instagram":this.listform.value.instagram,
      "linkedin":this.listform.value.linkedin,
      "twitter":this.listform.value.twitter,
      "pratitionerAndroindUrl":this.listform.value.pratitionerAndroindUrl,
      "pratitioner_IOS_Url":this.listform.value.pratitioner_IOS_Url,
      "CustomerAndroindUrl":this.listform.value.CustomerAndroindUrl,
      "Customer_IOS_Url":this.listform.value.Customer_IOS_Url
    }
    this.mainService.showSpinner();
    this.mainService.postApi('appSharing/appSharingDataUpdate',data,1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        // this.router.navigate(['faq'])
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

}
