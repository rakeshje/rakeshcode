import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-active-inactive-management',
  templateUrl: './active-inactive-management.component.html',
  styleUrls: ['./active-inactive-management.component.css']
})
export class ActiveInactiveManagementComponent implements OnInit {
  selectedTab: any = 'Marts';
  searchForm: FormGroup;
  userDataList: any;
  itemPerPage = 10;
  currentPage = 1;
  retailerId: any;

  constructor(private router : Router , private mainService : MainService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search : new FormControl(),
      fromDate : new FormControl(),
      toDate : new FormControl(),
      inactiveUser: new FormControl(),
      inactiveRetailer : new FormControl()
    })
    this.getUserData();
  }
  changeTab(tab){
    this.selectedTab =  tab
  }

  updateActiveInactive() {
    this.mainService.showSpinner();
    let data = {
      inactiveUser : this.searchForm.value.inactiveUser,
      inactiveRetailer : this.searchForm.value.inactiveRetailer
    }
    this.mainService.postApi('activeInactive/activeInactiveManagement', data, 1).subscribe((success:any)=>{
      console.log("successactiveinactive",success)
      if(success.responseCode == 200) {
        console.log("dfgdfsgd",success);
        this.mainService.hideSpinner();
      }
      else {
        this.mainService.hideSpinner();
      }
    })
  }

  getUserData() {
    this.mainService.showSpinner();
    this.mainService.getApi('activeInactive/activeInactiveManagement', 1).subscribe((success:any)=>{
      console.log("successactiveinactivfb65ge",success)
      this.mainService.hideSpinner();
      this.searchForm.patchValue({
        inactiveRetailer: success.result[0].inactiveRetailer,
        inactiveUser: success.result[0].inactiveUser
      })

    })
  }

//   getRetailerList() {
//     let data = {
//       shopName : this.searchForm.value.search,
//     }

//     this.mainService.showSpinner();
//      this.mainService.postApi('admin/couponHistory', data, 1).subscribe((res: any) => {
//       console.log("login response ==>", res)
//       if (res.responseCode == 200) {
//         this.mainService.hideSpinner()
//          this.mainService.successToast(res.responseMessage)
//          this.userDataList = res.result.docs;
//          this.retailerId = res.result.docs[0].retailerId;
//          console.log("retailerId",this.retailerId);
         
//          this.mainService.loginStatus.next(true)  
//         // this.router.navigateByUrl('/user-management')
//         // this.getRetailerListt();
//       } else {
//         this.mainService.hideSpinner()
//         this.mainService.errorToast(res.responseMessage)
//       }
//     })
// }

searchFormReset() {
  this.searchForm.reset();
  // this.getRetailerList();
}

}
