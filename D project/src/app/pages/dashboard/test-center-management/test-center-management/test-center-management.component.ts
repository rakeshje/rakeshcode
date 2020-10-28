import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';
declare var $: any;

@Component({
  selector: 'app-test-center-management',
  templateUrl: './test-center-management.component.html',
  styleUrls: ['./test-center-management.component.css']
})
export class TestCenterManagementComponent implements OnInit {
  searchForm: FormGroup;
  testCenterDataList: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  testCenterId: any;
  testCenterIds: any = [];
  isCheckedAll: any = false;

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation();
    this.getTestCenterList();
    this.mainService.BlockFuture()
  }

  searchFormValidation() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      disease: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }
  searchFormSubmit() {
    if (this.searchForm.value.search || this.searchForm.value.disease || this.searchForm.value.fromDate || this.searchForm.value.toDate) {
      this.getTestCenterList()
    }
  }
  searchFormReset() {
    if (this.searchForm.value.search || this.searchForm.value.disease || this.searchForm.value.fromDate || this.searchForm.value.toDate) {
      this.searchForm.reset({
        search: '',
        disease: '',
        fromDate: '',
        toDate: ''
      });
      this.getTestCenterList()
    }
  }
  pagination(event) {
    console.log(event)
    this.testCenterIds = []
    this.isCheckedAll = false
    this.currentPage = event;
    this.getTestCenterList()
  }

  // -------------------- get test center list --------------------- //
  getTestCenterList() {
    let data = {
      "search": this.searchForm.value.search,
      "disease": this.searchForm.value.disease,
      "fromDate": this.searchForm.value.fromDate,
      "toDate": this.searchForm.value.toDate,
      "page": this.currentPage,
      "limit": this.itemPerPage,
    }
    this.mainService.showSpinner();
    this.mainService.postApi(ApiUrls.testCenterList, data, 1).subscribe((res: any) => {
      console.log("get test center management list response ==>", res)
      if (res.responseCode == 200) {
        this.total = res.result.total
        this.testCenterDataList = res.result.docs ? res.result.docs : '';
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.total = res.result ? res.result : ''
        this.testCenterDataList = res.result ? res.result : '';
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  addTestCenter() {
    this.router.navigate(['add-test-center'])
  }
  viewTestCenter(id) {
    this.router.navigate(['view-test-center'], { queryParams: { testCenterId: id } })
  }
  editTestCenter(id) {
    this.router.navigate(['edit-test-center'], { queryParams: { testCenterId: id } })
  }

  // ------------------------------- delete test center ----------------------------- //
  deleteTestCenterModal(testCenterId) {
    $('#deleteTestCenter').modal('show')
    this.testCenterId = testCenterId
  }
  deleteTestCenter() {
    let data = {
      testCenterId: this.testCenterId
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.deleteApi(ApiUrls.deleteTestCenter, data, 1).subscribe((res: any) => {
      console.log("delete test center response ==>", res)
      $('#deleteTestCenter').modal('hide');
      if (res.responseCode == 200) {
        this.getTestCenterList()
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // ----------------------------------  delete multiple test center ------------------------------- //
  setAllCheckboxes(event) {
    this.testCenterIds = [];
    this.isCheckedAll = event.target.checked;
    if (this.isCheckedAll) {
      this.testCenterDataList.forEach((element, index) => {
        this.testCenterDataList[index].isChecked = true;
        this.testCenterIds.push(this.testCenterDataList[index]._id);
      });
    } else {
      this.testCenterIds = []
      this.testCenterDataList.forEach((element, index) => {
        this.testCenterDataList[index].isChecked = false;
      });
    }
  }
  onCheckboxChange(event) {
    if (event.target.checked) {
      this.testCenterIds.push(event.target.value)
    } else {
      const index: number = this.testCenterIds.indexOf(event.target.value)
      if (index !== -1) { this.testCenterIds.splice(index, 1) }
    }
    this.checkIfAllSelected()
  }
  checkIfAllSelected() {
    if (this.testCenterDataList.length == this.testCenterIds.length)
      return this.isCheckedAll = true;
    return this.isCheckedAll = false
  }
  deleteMultiTestCenterModal() {
    if (this.testCenterIds.length < 1)
      return this.mainService.infoToast('Please select item to delete.')
    $('#deleteMultiTestCenter').modal('show')
  }
  deleteMultiTestCenter() {
    let data = {
      testCenterIds: this.testCenterIds
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.deleteApi(ApiUrls.deleteMultiTestCenter, data, 1).subscribe((res: any) => {
      console.log("delete multiple test center response ==>", res)
      $('#deleteMultiTestCenter').modal('hide');
      if (res.responseCode == 200) {
        this.getTestCenterList()
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

}
