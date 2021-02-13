import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-configuration-management',
  templateUrl: './configuration-management.component.html',
  styleUrls: ['./configuration-management.component.css']
})
export class ConfigurationManagementComponent implements OnInit {

  selectedTab: any = 'Marts';
  searchForm: FormGroup;
  userDataList: any;
  itemPerPage = 10;
  currentPage = 1;
  retailerId: any;
  retailerData: any=[];

  constructor(private router : Router , private mainService : MainService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search : new FormControl(),
      fromDate : new FormControl(),
      toDate : new FormControl(),
      radius : new FormControl(),
      notification: new FormControl(),
      inr: new FormControl(),
      gst: new FormControl(),
      credits: new FormControl(),
      radiuss: new FormControl(),
      earned: new FormControl(),
      unit: new FormControl(),
      recharge: new FormControl(),
      gstrate: new FormControl(),
      lowcredit: new FormControl(),
      contactus : new FormControl(),
      brand: new FormControl()
    })
    this.getRetailerList();
    this.getUserList();
    this.getGeneralData();
  }
  changeTab(tab){
    this.selectedTab =  tab
  }
  getRetailerList() {
    this.mainService.showSpinner();
    this.mainService.getApi('configuration/configurations/'+ 'RETAILER', 1).subscribe((res: any) => {
     console.log("login response ==>", res)
     if (res.responseCode == 200) {
       this.mainService.hideSpinner()
        // this.mainService.successToast(res.responseMessage)
        this.retailerData = res.result;
        this.searchForm.patchValue({
          inr : this.retailerData.retailerSignupAmount,
          gst : this.retailerData.gstOnSignup,
          credits: this.retailerData.signupCredits,
          radiuss: res.result.radiusRetailer,
          earned: this.retailerData.earnedCredits,
          unit: this.retailerData.unitCreditCost,
          recharge: 500,
          gstrate: this.retailerData.gstOnSignup,
          lowcredit: 50
        })
     } else {
       this.mainService.hideSpinner()
      //  this.mainService.errorToast(res.responseMessage)
     }
   })
  }

  getUserList() {
    this.mainService.showSpinner();
     this.mainService.getApi('configuration/configurations/'+ 'USER', 1).subscribe((res: any) => {
      console.log("login response ==>", res)
      if (res.responseCode == 200) {
        
        //  this.mainService.successToast(res.responseMessage)
       
         this.searchForm.patchValue({
          radius: res.result.radiusEndUser,
          notification : res.result.isNotification
         })
         this.mainService.hideSpinner()
      } else {
        this.mainService.hideSpinner()
        // this.mainService.errorToast(res.responseMessage)
      }
    })
}

getGeneralData() {
  this.mainService.showSpinner();
  this.mainService.getApi('configuration/configurations/'+ 'GENERAL', 1).subscribe((res: any) => {
   console.log("login response ==>", res)
   if (res.responseCode == 200) {
     
      // this.mainService.successToast(res.responseMessage)
      this.userDataList = res.result.radiusEndUser;
      this.searchForm.patchValue({
        contactus: res.result.email,
           brand : res.result.brandName
      })
      this.mainService.hideSpinner()
   } else {
     this.mainService.hideSpinner()
    //  this.mainService.errorToast(res.responseMessage)
   }
 })
}

searchFormReset() {
  this.searchForm.reset();
  // this.getRetailerList();
}


updateConfiguration() {
  this.mainService.showSpinner();
  let data = {
    configType : 'GENERAL',
    radiusEndUser : '',
    isNotification: '',
    email: this.searchForm.value.contactus,
    brandName: this.searchForm.value.brand,
    retailerSignupAmount: '',
    gstOnSignup : '',
    signupCredits : '',
    radiusRetailer : '',
    earnedCredits: '',
    unitCreditCost: ''
  }
  this.mainService.postApi('configuration/configurations',data,1).subscribe((success:any)=>{
    console.log("success",success)
      this.mainService.successToast("Updated successfully.")
      this.mainService.hideSpinner();
  })
}

updateUserConfiguration() {
  this.mainService.showSpinner();
  let data = {
    configType : 'USER',
    radiusEndUser : this.searchForm.value.radius,
    isNotification: this.searchForm.value.notification,
    email: '',
    brandName: '',
    retailerSignupAmount: '',
    gstOnSignup : '',
    signupCredits : '',
    radiusRetailer : '',
    earnedCredits: '',
    unitCreditCost: ''
  }
  this.mainService.postApi('configuration/configurations',data,1).subscribe((success:any)=>{
    console.log("success",success)
      this.mainService.successToast("Updated successfully.")
      this.mainService.hideSpinner();
    
  })
}


updateRetailerConfiguration() {
  this.mainService.showSpinner();
  let data = {
    configType : 'RETAILER',
    radiusEndUser : '',
    isNotification: '',
    email: '',
    brandName: '',
    retailerSignupAmount: this.searchForm.value.inr,
    gstOnSignup : this.searchForm.value.gstrate,
    signupCredits : this.searchForm.value.credits,
    radiusRetailer : this.searchForm.value.radiuss,
    earnedCredits: this.searchForm.value.earned,
    unitCreditCost: this.searchForm.value.unit
  }
  this.mainService.postApi('configuration/configurations',data,1).subscribe((success:any)=>{
    console.log("success",success)

      this.mainService.successToast("Updated successfully.")
      this.mainService.hideSpinner();

  })
}

}
