import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.css']
})
export class CouponManagementComponent implements OnInit {
  selectedTab: any='Marts';
  searchForm: FormGroup;
  userDataList: any;
  itemPerPage = 10;
  currentPage = 1;
  retailerId: any;
  submittedCouponsData: any;

  constructor(private router : Router , private mainService : MainService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search : new FormControl(),
      fromDate : new FormControl(),
      toDate : new FormControl()
    })
    this.submittedCoupons('SUBMITTED');
  }

  getRetailerList() {
    let data = {
      shopName : this.searchForm.value.search,
    }

    this.mainService.showSpinner();
     this.mainService.postApi('admin/couponHistory', data, 1).subscribe((res: any) => {
      console.log("login response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner()
         this.mainService.successToast(res.responseMessage)
         this.userDataList = res.result.docs;
         this.retailerId = res.result.docs[0].retailerId;
         console.log("retailerId",this.retailerId);
         
         this.mainService.loginStatus.next(true)  
        this.getRetailerListt();
      } else {
        this.mainService.hideSpinner()
        this.mainService.errorToast(res.responseMessage)
      }
    })
}

searchFormReset() {
  this.searchForm.reset();
  this.submittedCoupons(this.selectedTab);
}
searchFormSubmit() {
  let data = {
    fromDate : this.searchForm.value.fromDate,
    toDate : this.searchForm.value.toDate
  }
  console.log("juyfhhgfhjgfhgdfhgdf",data);
  
  this.mainService.showSpinner();
  this.mainService.postApi('admin/couponHistory', data, 1).subscribe((res: any) => {
   console.log("login response ==>", res)
   if (res.responseCode == 200) {
     this.mainService.hideSpinner();
      this.mainService.successToast(res.responseMessage)
      this.userDataList = res.result.docs;
      this.retailerId = res.result.docs[0].retailerId;
      console.log("retailerId",this.retailerId);
      
      this.mainService.loginStatus.next(true)  
     this.getRetailerListt();
   } else {
     this.mainService.hideSpinner()
     this.mainService.errorToast(res.responseMessage)
   }
 })
}

getRetailerListt() {
  this.mainService.showSpinner();
   this.mainService.getApi('admin/website/'+this.retailerId, 1).subscribe((res) => {
    console.log("logiresponsejugjkg", res)
  if(res.responseCode==200){
      this.mainService.hideSpinner()
    }
    
  },(error)=>{
    this.mainService.hideSpinner()
    this.mainService.errorToast('something went wrong')
  })                   
}
//======export csv====//
exportCSV() {
  this.mainService.showSpinner()
  this.mainService.postApi('admin/exportCouponToCSV',{},0).subscribe((res)=>{
    if(res.responseCode==200){
      this.mainService.hideSpinner()
      this.userDataList=res.result
      let dataArr = [];
  dataArr.push({
      sno: "S.No.",
      mart_Name: "Mart Name",
      retailer_Name: "Retailer Name",
      coupon_code : "Coupon Code",
  });

  this.userDataList.forEach((element,ind) => {
      dataArr.push({
          sno:ind+1,
          mart_Name:element.martName?element.martName:'--',
          retailer_Name:element.shopName?element.shopName:'--',
          coupon_code:element.couponCode?element.couponCode:'--',
      })
  }) 
  new ngxCsv(dataArr, 'Coupon_Management');
    }
  })
}

// exportPDF() {
  
//   console.log("hgjfjhgf");
//   const doc = new jsPDF;
//   doc.text('Hello', 15, 15);

//   doc.save('coupon.pdf');
  
// }


changeTab(tab){
  console.log("selectedTab",tab);
  
  this.selectedTab =  tab;
  if (this.selectedTab == 'Retailers') {
    // this.publishedCoupons();
    this.submittedCoupons('PUBLISHED');
  }
  else if (this.selectedTab == 'Marts') {
    this.submittedCoupons('SUBMITTED');
  }
  else if (this.selectedTab == 'Catgeories') {
    // this.rejectedCoupons();
    this.submittedCoupons('REJECTED');
  }
  else if (this.selectedTab == 'SubCat') {
    // this.withdrawnCoupons();
    this.submittedCoupons('WITHDRAWN');
  }
  else if (this.selectedTab == 'SubCatt') {
    // this.expiredCoupons();
    this.submittedCoupons('EXPIRED');
  }
}

submittedCoupons(data) {
  this.mainService.showSpinner();
  console.log("submittedCoupons",data)
  this.mainService.postApi('admin/couponHistory', {couponStatus:data}, 1).subscribe((res : any)=>{
   if(res.responseCode == 200 ) {
    this.submittedCouponsData = res;
    this.userDataList = res.result.docs;
    console.log("submittedCouponsData",this.submittedCouponsData)
    this.mainService.hideSpinner();
   }
   else {
     this.userDataList = [];
     this.userDataList = res.result;
     console.log("jhgjhg786hjnvjhgjhg", res);
     this.mainService.hideSpinner();
   }
  })
}

}
