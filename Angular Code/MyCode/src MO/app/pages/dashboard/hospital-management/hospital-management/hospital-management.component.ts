import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';
declare var $: any;

@Component({
  selector: 'app-hospital-management',
  templateUrl: './hospital-management.component.html',
  styleUrls: ['./hospital-management.component.css']
})
export class HospitalManagementComponent implements OnInit {

  searchForm: FormGroup;
  hospitalDataList: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  hospitalId: any;
  hospitalIds: any = [];
  // checked: any
  isCheckedAll: any= false;
  // checked: any
  // toDate: string | number | Date;
  // newDate: string | number | Date;
  // oldDate: string | number | Date;
  // fromDate: string | number | Date;
  today: string
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation();
    // this.searchForm.get('fromDate').valueChanges.subscribe((x)=>{
    //   console.log('x',x);
    //   this.fromDate = x
    // })
    this.getHospitalList();
    this.mainService.BlockFuture()
    this.today = new Date().toISOString()
console.log(this.today)
  }

  // Search by Date
//    searchByDate(){

//  }

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
    //   if(this.searchForm.value.fromDate > this.searchForm.value.toDate){
    //     this.mainService.errorToast('To date should be greater than From date')
    //     // return
    //     // this.searchForm.value.fromDate = '';
    //     // this.messege = "please enter right date"
    //   }
    //   else if(this.searchForm.value.fromDate <= this.searchForm.value.toDate){

    //  this.oldDate = new Date(this.searchForm.value.fromDate).toISOString()
    //  this.newDate = new Date(this.searchForm.value.toDate+'T23:59:59.999Z')
    //  console.log('this.oldDate',this.oldDate );
    //  console.log('this.newDate',this.newDate );
    //       }
    // this.fromDate =this.searchForm.value.fromDate
      this.getHospitalList()
    }
  }
  searchFormReset() {
    if (this.searchForm.value.search || this.searchForm.value.disease || this.searchForm.value.fromDate || this.searchForm.value.toDate) {
      this.searchForm.reset({
        search:'',
        disease:'',
        fromDate:'',
        toDate:''
      });
      this.getHospitalList()
    }
  }
  pagination(event) {
    console.log(event)
    this.hospitalIds=[]
    this.isCheckedAll = false
    this.currentPage = event;
    this.getHospitalList()
  }

  // -------------------- get hospital list --------------------- //
  getHospitalList() {
    let data = {
      "search": this.searchForm.value.search,
      "disease": this.searchForm.value.disease,
      "fromDate": this.searchForm.value.fromDate,
      "toDate": this.searchForm.value.toDate,
      "page": this.currentPage,
      "limit": this.itemPerPage,
    }
    this.mainService.showSpinner();
    this.mainService.postApi(ApiUrls.hospitalList, data, 1).subscribe((res: any) => {
      console.log("get hospital management list response ==>", res)
      if (res.responseCode == 200) {
        this.total = res.result.total
        this.hospitalDataList = res.result.docs ? res.result.docs : '';
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.hospitalDataList = res.result
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  addHospital() {
    this.router.navigate(['add-hospital'])
  }
  viewHospital(hospitalId) {
    this.router.navigate(['/view-hospital'], { queryParams: { hospitalId: hospitalId } })
  }
  editHospital(hospitalId) {
    this.router.navigate(['/edit-hospital'], { queryParams: { hospitalId: hospitalId } })
  }

  // ------------------------------- delete hospital ----------------------------- //
  deleteHospitalModal(hospitalId) {
    $('#deleteHospital').modal('show')
    this.hospitalId = hospitalId
  }
  deleteHospital() {
    let data = {
      hospitalId: this.hospitalId
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.deleteApi(ApiUrls.deleteHospital, data, 1).subscribe((res: any) => {
      console.log("delete hospital response ==>", res)
      $('#deleteHospital').modal('hide');
      if (res.responseCode == 200) {
        this.getHospitalList()
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // ----------------------------------  delete multiple hospital ------------------------------- //
  setAllCheckboxes(event) {
    this.hospitalIds = [];
    this.isCheckedAll = event.target.checked;
    if (this.isCheckedAll) {
      this.hospitalDataList.forEach((element, index) => {
        this.hospitalDataList[index].isChecked = true;
        this.hospitalIds.push(this.hospitalDataList[index]._id);
      });
    } else {
      this.hospitalIds = []
      this.hospitalDataList.forEach((element, index) => {
        this.hospitalDataList[index].isChecked = false;
      });
    }
  }
  onCheckboxChange(event) {
    if (event.target.checked) {
      this.hospitalIds.push(event.target.value)
    } else {
      const index: number = this.hospitalIds.indexOf(event.target.value)
      if (index !== -1) { this.hospitalIds.splice(index, 1) }
    }
    this.checkIfAllSelected()
  }
  checkIfAllSelected() {
    if (this.hospitalDataList.length == this.hospitalIds.length)
      return this.isCheckedAll = true;
    return this.isCheckedAll = false
  }

  deleteMultiHospitalModal() {
    if (this.hospitalIds.length < 1)
      return this.mainService.infoToast('Please select item to delete.')
    $('#deleteMultiHospital').modal('show')
  }
  deleteMultiHospital() {
    let data = {
      hospitalIds: this.hospitalIds
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.deleteApi(ApiUrls.deleteMultiHospital, data, 1).subscribe((res: any) => {
      console.log("delete multiple hospital response ==>", res)
      $('#deleteMultiHospital').modal('hide');
      if (res.responseCode == 200) {
        this.getHospitalList()
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

}
