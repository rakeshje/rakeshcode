import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare var $: any;
@Component({
  selector: 'app-retailer-management',
  templateUrl: './retailer-management.component.html',
  styleUrls: ['./retailer-management.component.css']
})
export class RetailerManagementComponent implements OnInit {
  // itemPerPage = 10;
  // currentPage = 1;
  pagination: any = { limit: 10, currPage: 1, total: 0 };
  searchForm: FormGroup;
  whichmodal: string = 'enable';
  userDataList: any = [];
  particularUserData: any;
  retailerId: any;
  creditForm: FormGroup;
  newRetailerId: any;
  martName: any = [];
  martID: any=[];
  currentCredit: any;
  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      searchh: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      websiteStatus: new FormControl('', [Validators.required])
    })
    this.creditForm = new FormGroup({
      credit: new FormControl(),
      description: new FormControl()
    })
    this.getRetailerList();
  }

  getRetailer() {
    this.searchForm.reset();
    this.getRetailerList();
  }

  getRetailerList() {
    this.mainService.showSpinner();
    let data = {
      websiteStatus: this.searchForm.value.websiteStatus,
      status: this.searchForm.value.status,
      search: this.searchForm.value.search
    }
    console.log("loginjhgu765ughjuyg", data)
    
    this.mainService.postApi('admin/retailerListWithPagination', data, 1).subscribe((res: any) => {
      console.log("login response ==>", res)
      if (res.responseCode == 200) {
        
        //  this.mainService.successToast(res.responseMessage)
        this.userDataList = res.cuponData.docs;
        this.userDataList.forEach(element => {
          this.martID.push(element.martId);
        });
        this.getMartName();
        console.log("martId", this.martID);
        //  this.retailerId = res.result._id;

        // this.mainService.loginStatus.next(true)
        // this.mainService.hideSpinner()
      } else {
        // this.mainService.hideSpinner()
        // this.mainService.errorToast(res.responseMessage)
      }
    })
  }
  getMartName() {
    this.mainService.showSpinner();
   this.martID.forEach(element => {
    this.mainService.getApi('mart/marts/' +element, 1).subscribe((success: any) => {
      console.log("response", success);
      this.martName.push(success.result.martName);
      console.log("responseMartName", this.martName);

    })
    console.log("responseMartName1", this.martName);
    this.mainService.hideSpinner();
   });
  }

  submitSearch() {
    let data = {
      websiteStatus: this.searchForm.value.status,
      status: this.searchForm.value.websiteStatus
    }
    console.log("hjfhjmfgjmhfgjhfhjgfjhgf", data);
    this.mainService.postApi('admin/retailerListWithPagination', data, 1).subscribe(success => {
      console.log("success", success)
      this.userDataList = success.cuponData.docs;
    })
  }

  goToView(id) {
    console.log("hjfghjfjhfjh", id);
    this.router.navigate(['/view-retailer'], { queryParams: { id: id } })
  }

  clicksCredit(id, credit) {
    this.newRetailerId = id;
    this.currentCredit = credit;
    console.log("fghdfhds567yhnfginbf",this.newRetailerId, this.currentCredit)
    $('#creditModal').modal({ backdrop: 'static', keyboard: false });
  }

  enableDisableOrDeleteOpenModal(data, whichModal) {
    console.log("Data >>>>> ", data)
    if (whichModal === 'enable') {
      this.whichmodal = 'enable';
    } else {
      if (whichModal === 'disable') {
        this.whichmodal = 'disable';
      } else {
        this.whichmodal = 'delete';
      }
    }
    this.particularUserData = data;
    $('#enableDisableDeleteModal').modal({ backdrop: 'static', keyboard: false });
  }

  anableDisable(enableorDisable) {
    if (enableorDisable === 'disable') {
      console.log("Inside Disable Block")
      this.disableCategory(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.getRetailerList();
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        this.enableCategory(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getRetailerList();
      } else {
        console.log("Inside Delete Block")
        // this.deleteCategory(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getRetailerList();
      }
    }
  }

  userListPagination(event) {
    this.pagination.currPage = event;
  }

  disableCategory(data) {
    let dataa = {
      retailerId: data,
      status: 'UNBLOCK'
    }
    console.log("jhgjhfg", dataa);

    this.mainService.showSpinner();
    this.mainService.postApi('admin/blockUnblockRetailer', dataa, 1).subscribe(success => {
      if (success.response_code == 200) {
        console.log("hgfhgf786hjgjyg", success);

        this.mainService.hideSpinner();
      }
      else {
        this.mainService.hideSpinner();
      }
    })
  }
  enableCategory(data) {
    let dataa = {
      retailerId: data,
      status: 'BLOCK'
    }
    console.log("jhgjhfg", dataa);
    this.mainService.showSpinner();
    this.mainService.postApi('admin/blockUnblockRetailer', dataa, 1).subscribe(success => {
      
      if(success.response_code==200){
        this.mainService.hideSpinner()
      }
      else {
        this.mainService.hideSpinner();
      }
    })
  }


  exportCSV() {
    this.mainService.showSpinner()
   
    let data={
      userType:"USER"
    }
    this.mainService.postApi('admin/exportToCSV',data,0).subscribe((res)=>{
      console.log("dh",res);
      if(res.responseCode==200){
     this.mainService.hideSpinner();
     this.userDataList=res.result;
    let dataArr = [];
    dataArr.push({
      sno: "S.No.",
      mart_Name: "Mart Name",
      retailer_Name: "Retailer Name",
      shop_number: "Shop Phone Number",
      website : "Website Status",
      registration: "Registration Status",
      assigned: "Assign Account Manager Name"
    });

    this.userDataList.forEach((element, ind) => {
      dataArr.push({
        sno: ind + 1,
        mart_Name: element.shopName ? element.shopName : '--',
        retailer_Name: element.shopName ? element.shopName : '--',
        shop_number: element.shopNumber ? element.shopNumber : '--',
        website: element.websiteStatus ? element.websiteStatus : '--',
        registration: element.retailerStatus ? element.retailerStatus : '--',
        assigned: element.managerName ? element.managerName : '--',
      })
    })
    new ngxCsv(dataArr, 'Retailer_Management');
  }
})
  }

  addOrsubtractRetailerCredit(id) {
    $('#creditModal').modal('hide');
    this.mainService.showSpinner();

    if (id == 'sub') {
      let dataa = {
        retailerId: this.newRetailerId,
        description: this.creditForm.value.description,
        credit: -this.creditForm.value.credit
      }
      this.mainService.postApi('admin/addOrsubtractRetailerCredit', dataa, 1).subscribe(success => {
        console.log("success", success)
        if (success.responseCode == 200) {
          this.mainService.hideSpinner();
          console.log("success", success)
        }
        else {
          console.log("else", success);
          this.mainService.hideSpinner();
        }
      })
    }
    else {
      let dataa = {
        retailerId: this.newRetailerId,
        description: this.creditForm.value.description,
        credit: this.creditForm.value.credit
      }
      this.mainService.postApi('admin/addOrsubtractRetailerCredit', dataa, 1).subscribe(success => {
        console.log("success", success)
        if (success.responseCode == 200) {
          console.log("success", success);
          this.mainService.hideSpinner();
        }
        else {
          console.log("else", success);
          this.mainService.hideSpinner();
        }
      })
    }

  }

  searchRetailerManagement() {
    let data = {
      websiteStatus: this.searchForm.value.websiteStatus,
      status: this.searchForm.value.status,
      shopName: this.searchForm.value.search,
      martName: this.searchForm.value.searchh
    } 
    this.mainService.postApi('admin/retailerListWithPagination', data, 1).subscribe((success:any)=>{
      console.log("success",success)
      if(success.responseCode==200) {
        this.userDataList = success.cuponData.docs;
        console.log("success2",this.userDataList)
      }
      else {
        this.userDataList = [];
        this.userDataList = success.cuponData;
      }
    })
  }

}
