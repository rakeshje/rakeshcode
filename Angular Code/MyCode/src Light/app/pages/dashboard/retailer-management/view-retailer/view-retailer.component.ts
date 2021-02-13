import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-view-retailer',
  templateUrl: './view-retailer.component.html',
  styleUrls: ['./view-retailer.component.css']
})
export class ViewRetailerComponent implements OnInit {
  pagination: any = { limit: 10, currPage: 1, total: 0 };
  paramData: any;
  selectedTab: any = 'viewinformation';
  selectedTabb: any = 'Marts';
  searchByForm: FormGroup;
  searchForm: FormGroup;
  retailerData: any=[];
  couponHistoryData: any=[];
  couponData: any;
  submittedCouponsData: any;
  searchFormm: FormGroup;
  loopData: any=[];
  qrCode: any;
  creditHistoryData: any=[];
  getWebsiteDataa: any=[];
  rechargeDetailsData: any;
  searchByStatus: FormGroup;
  retailerStatusData: any;
  activeSwitchData: boolean = true;
  userDataList: any=[];

  constructor(public active:ActivatedRoute, private router : Router , private mainService : MainService) { 
    this.active.queryParams.subscribe((params)=>{
      this.paramData=params.id
      console.log("hgfhgfhgdhdfghd",this.paramData);
    })
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search : new FormControl(),
    })
    this.searchFormm = new FormGroup({
      comment : new FormControl(),
      manager : new FormControl('', [Validators.required])
    })
    this.searchByForm = new FormGroup({
      fromDate : new FormControl(),
      toDate : new FormControl()
    })
    this.searchByStatus = new FormGroup({
      activeSwitch : new FormControl()
    })
    this.getData();
    this.submittedCoupons('');
    this.getGeneralData()
    // this.getCouponHistory();
    // this.getCreditHistory();
  }

  //========for brand name====//
  getGeneralData() {
    this.mainService.showSpinner();
    this.mainService.getApi('configuration/configurations/'+ 'GENERAL', 1).subscribe((res: any) => {
     console.log("login response ==>", res)
     if (res.responseCode == 200) {
       
        // this.mainService.successToast(res.responseMessage)
        this.userDataList = res.result
        console.log("ke",this.userDataList);
        
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

  getData() {
    this.mainService.showSpinner();
    this.mainService.getApi('admin/viewRetailer/'+ this.paramData, 1).subscribe((res: any) => {
     console.log("login response ==>", res)
     this.retailerData = res.result;
     this.retailerStatusData = res.result.retailerStatus
     if(this.retailerStatusData == 'ACTIVE') {
       this.searchByStatus.value.activeSwitch = true;
     }
     this.mainService.hideSpinner();
   })
  }
  userListPagination(event) {
    this.pagination.currPage = event;
  }

  rechargedetails() {
    this.mainService.showSpinner();
    let data = {
      retailerId : this.paramData
    }
    console.log("admin/rechargeHsitory")
    this.mainService.postApi('admin/rechrgeHistory', data, 1).subscribe(success => {
      console.log("successfgdg",success)
      this.rechargeDetailsData = success.cuponData.docs
      console.log("hjsfhgsfhjyfrshgfgsfrhgb",this.rechargeDetailsData)
      this.mainService.hideSpinner();
    })
  }

  getWebsiteData() {    
    this.mainService.showSpinner();
     this.mainService.getApi('admin/website/'+ this.paramData, 1).subscribe((res: any) => {
      console.log("hjkyfkhjfyjkmhvjkmhgvjkhf", res.result)
      if (res.responseCode == 200) {
        this.getWebsiteDataa = res.result;
        this.mainService.hideSpinner()
         this.mainService.loginStatus.next(true)  
      } else {
        this.mainService.hideSpinner()
      }
    })
}

getCouponHistory() {
  this.mainService.postApi('admin/couponHistory', '', 1).subscribe((success : any)=>{
    console.log("success",success)
    this.couponHistoryData = success.result.docs;
    this.couponData = success.result.docs[0].createdAt;
  })
}

getCreditHistory() {
  this.mainService.showSpinner();
  this.mainService.postApi('admin/creditHistory', {retailerId:this.paramData}, 1).subscribe((success : any)=>{
    console.log("successdfghdfhdfg",success.cuponData.docs);
    this.creditHistoryData = success.cuponData.docs;
    this.mainService.hideSpinner();
  })
}


  changeTab(tab){
    console.log("selectedTab",tab);
    
    this.selectedTab =  tab;
    if (this.selectedTab == 'rechargedetails') {
      this.rechargedetails();
    }
    else if (this.selectedTab == 'website') {
      this.getWebsiteData();
    }
    else if (this.selectedTab == 'couponhistory') {
      this.submittedCoupons('SUBMITTED');
    }
    else if (this.selectedTab == 'credithistory') {
      this.getCreditHistory();
    }
    else if (this.selectedTab == 'viewqrcode') {
      this.getviewqrcode();
    }
  }

  changeTabb(tab){
    console.log("selectedTab",tab);
    
    this.selectedTabb =  tab;
    if (this.selectedTabb == 'Retailers') {
      // this.publishedCoupons();
      this.submittedCoupons('PUBLISHED');
    }
    else if (this.selectedTabb == 'Marts') {
      this.submittedCoupons('SUBMITTED');
    }
    else if (this.selectedTabb == 'Catgeories') {
      // this.rejectedCoupons();
      this.submittedCoupons('REJECTED');
    }
    else if (this.selectedTabb == 'SubCat') {
      // this.withdrawnCoupons();
      this.submittedCoupons('WITHDRAWN');
    }
    else if (this.selectedTabb == 'SubCa') {
      // this.expiredCoupons();
      this.submittedCoupons('EXPIRED');
    }
  }

  submittedCoupons(data) {
    this.mainService.showSpinner();
    console.log("submittedCoupons",data)
    this.mainService.postApi('admin/couponHistory', {couponStatus:data}, 1).subscribe((res : any)=>{
      this.submittedCouponsData = res.result.docs;
      console.log("submittedCouponsData",this.submittedCouponsData)
      this.mainService.hideSpinner();
    })
  }
  getManagers() {
    this.mainService.postApi('admin/subAdminList', '', 1).subscribe(success=>{
      console.log("success",success);
      if(success.responseCode == 200) {
        this.loopData = success.result.docs;
        console.log("success1",this.loopData)
      }
    })
  }

  approveInformation() {
    this.getManagers();
    $('#assignManager').modal({backdrop: 'static', keyboard: false})
  }
  submitAccepted() {
    this.mainService.showSpinner();
    $('#assignManager').modal('hide');
    let data = {
      retailerId : this.paramData,
      managerId : this.searchFormm.value.manager
    }
    console.log("managerId",data)
    this.mainService.postApi('admin/assignManagerToReatailer',data,1).subscribe((res:any)=>{
      console.log("addCommentWhenApprovingRetailerApplication",res)
      this.router.navigate(['/retailer-management'])
      this.mainService.hideSpinner();
      // if(res.responseCode == 200) {
      //   console.log("acceptedManager",res)
      // }
    })
  }

  rejectInformation() {
    $('#comment').modal({backdrop: 'static', keyboard: false});
  }

  rejectAccepted() {
    $('#comment').modal('hide');
    let data = {
      retailerId : this.paramData,
      comment : this.searchFormm.value.comment
    }
    console.log("data",data);
    this.mainService.postApi('admin/addCommentWhenRejectingRetailerApplication', data, 1).subscribe((res:any)=>{
      console.log("success",res);
      if(res.responseCode == 200) {
        this.router.navigate(['/retailer-management']);
        console.log("success1",res)
      }
      else {
        console.log("success2",res)
      }
    })
  }

  getviewqrcode() {
    this.mainService.showSpinner();
    this.mainService.postApi('retailer/qrCode', {retailerId:this.paramData}, 1).subscribe((res:any)=>{
      console.log("getviewqrcode",res)
      this.qrCode = res.result.QRCode;
      console.log("viewQrCode",this.qrCode)
      this.mainService.hideSpinner();
    })
  }

  viewCouponData(id) {
    this.router.navigate(['/view-retailerCoupon'], {queryParams:{id: id}});
  }

  searchFormSubmit() {
    let data = {
      fromDate : this.searchByForm.value.fromDate,
      toDate : this.searchByForm.value.toDate
    }
    console.log("juyfhhgfhjgfhgdfhgdf",data);
    
    this.mainService.showSpinner();
    this.mainService.postApi('admin/couponHistory', data, 1).subscribe((res: any) => {
     console.log("login response ==>", res)
     if (res.responseCode == 200) {
       this.mainService.hideSpinner()
        this.mainService.successToast(res.responseMessage)
        this.submittedCouponsData = res.result.docs;
        // this.retailerId = res.result.docs[0].retailerId;
        // console.log("retailerId",this.retailerId);
        
        this.mainService.loginStatus.next(true)  
      //  this.getRetailerListt();
     } else {
       this.mainService.hideSpinner()
       this.mainService.errorToast(res.responseMessage)
     }
   })
  }

  changeStatus(status) {
    this.mainService.showSpinner();
    let data = {
      retailerId : this.paramData,
      status : status
    }
   
    this.mainService.postApi('admin/changeRetailer', data, 1).subscribe((res:any)=>{
      console.log("ghfjhf786hjmvgjhg",res);
      this.mainService.hideSpinner();
      this.getData();
    })
  }

  approveWebsite() {
    let data = {
      retailerId : this.paramData,
      comment : ''
    }
    this.mainService.postApi('admin/approveWebsites', data, 1).subscribe((res:any)=>{
      console.log("bcdfbg89nksjc98yh",res)
      this.router.navigate(['/retailer-management']);
    })
  }

  rejectWebsite() {
    let data = {
      retailerId : this.paramData,
      comment : ''
    }
    this.mainService.postApi('admin/rejectWebsites', data, 1).subscribe((res:any)=>{
      console.log("bcdfbg89nksjc98yh",res)
      this.router.navigate(['/retailer-management']);
    })
  }
  

}
