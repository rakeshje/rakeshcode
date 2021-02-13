import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-view-patient-management-test-center',
  templateUrl: './view-patient-management-test-center.component.html',
  styleUrls: ['./view-patient-management-test-center.component.css']
})
export class ViewPatientManagementTestCenterComponent implements OnInit {
  patientData: any = [];
  searchForm: FormGroup;
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  viewScreen = 'viewPatientManagement'
  viewPatientData: any;

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation();
    this.getPatient();
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
      this.getPatient()
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
      this.getPatient()
    }
  }

  pagination(event) {
    console.log(event)
    this.currentPage = event;
  }

  // get patients list
  getPatient() {
    let data = {
      "search": this.searchForm.value.search,
      "disease": this.searchForm.value.disease,
      "fromDate": this.searchForm.value.fromDate,
      "toDate": this.searchForm.value.toDate,
      "page": this.currentPage,
      "limit": this.itemPerPage,
    }
    this.mainService.showSpinner()
    this.mainService.postApi(ApiUrls.viewPatientListTestCenter, data, 1).subscribe((res: any) => {
      console.log("view patient response", res);
      if (res.responseCode == 200) {
        this.total = res.result[0].total
        this.patientData = res.result[0].docs ? res.result[0].docs : ''
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.total = res.result ? res.result : ''
        this.patientData = res.result ? res.result : ''
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }

  // ----------------------------- view patient by id ----------------------------------- //
  viewPatient(patientId, testCenterId, viewScreen) {
    this.viewScreen = viewScreen
    let data = {
      "patientId": patientId,
      "hospitalId": testCenterId
    }
    console.log(data)
    this.mainService.showSpinner()
    this.mainService.postApi(ApiUrls.viewPatientTestCenter, data, 1).subscribe((res: any) => {
      console.log("view patient by id response", res);
      if (res.responseCode == 200) {
        this.viewPatientData = res.result ? res.result : ''
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }

  back(viewScreen) {
    this.viewScreen = viewScreen
  }
}
