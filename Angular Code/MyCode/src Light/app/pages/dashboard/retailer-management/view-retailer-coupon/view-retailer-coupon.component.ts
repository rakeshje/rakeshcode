import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
declare var $: any;

@Component({
  selector: 'app-view-retailer-coupon',
  templateUrl: './view-retailer-coupon.component.html',
  styleUrls: ['./view-retailer-coupon.component.css']
})
export class ViewRetailerCouponComponent implements OnInit {

  paramData: any;
  bindingData: any=[];
  couponStatus: any;
  searchForm: FormGroup;
  retailerId: any;
  couponId: any;

  constructor(
    private active : ActivatedRoute,
    private router : Router,
    private mainService : MainService
  ) {
    this.active.queryParams.subscribe((id) => {
      this.paramData = id.id;
      console.log("jghfghft",this.paramData);
      this.getUserData();
    }, (err) => {
      console.log("Error in getting data : ", err);
    });
   }

  ngOnInit() {
    this.searchForm = new FormGroup({
      comment : new FormControl()
    })
  }

  getUserData() {
    this.mainService.showSpinner();
    this.mainService.getApi('admin/viewCoupon/'+this.paramData, 1).subscribe(success=>{
      console.log("success",success)
      this.bindingData = success.result;
      this.couponStatus = success.result.couponStatus;
      this.retailerId = success.result.retailerId;
      this.couponId = success.result._id;
      this.mainService.hideSpinner();
    })
  }

  rejectAccepted() {
    $('#comment').modal('hide');
    
    this.mainService.showSpinner();
    let data = {
      retailerId : this.retailerId,
      couponId : this.couponId,
      comment : this.searchForm.value.comment
    }
    console.log("jghjku786jhgjygti786gjiu",data);
    
    this.mainService.postApi('admin/rejectCoupon', data, 1).subscribe(success=>{
      console.log("success",success)
     if(success.responseCode == 200){
       this.mainService.hideSpinner();
       this.router.navigate(['/view-retailer']);
     }
     else {
       this.mainService.hideSpinner();
     }
    })
  }
  approveCoupon() {
    let data = {
      retailerId : this.retailerId,
      couponId : this.couponId,
      comment : this.searchForm.value.comment
    }
    this.mainService.postApi('admin/acceptCoupon', data, 1).subscribe(success=>{
      console.log("success",success)
      this.bindingData = success.result;
      this.couponStatus = success.result.couponStatus;
      this.router.navigate(['/view-retailer']);
    })
  }

  viewRetailer() {
    this.router.navigate(['/'])
  }

  withdrawCoupon() {
    this.mainService.showSpinner();
    let data = {
      couponId : this.couponId,
      couponStatus : 'WITHDRAWN'
    }
    this.mainService.postApi('retailer/couponStatus', data, 1).subscribe(success=>{
      console.log("success",success)
      if(success.responseCode == 200) {
        this.router.navigate(['/view-retailer']);
        this.mainService.hideSpinner();
      }
      else {
        console.log("hngjhg");
        this.mainService.hideSpinner();
      }
    })
  }

 

}
