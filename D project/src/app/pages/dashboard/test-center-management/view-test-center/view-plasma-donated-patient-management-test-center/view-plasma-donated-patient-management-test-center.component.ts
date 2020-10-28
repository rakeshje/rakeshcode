import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-view-plasma-donated-patient-management-test-center',
  templateUrl: './view-plasma-donated-patient-management-test-center.component.html',
  styleUrls: ['./view-plasma-donated-patient-management-test-center.component.css']
})
export class ViewPlasmaDonatedPatientManagementTestCenterComponent implements OnInit {
  searchForm: FormGroup;
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  plasmaDonatedpatientData: any = [];
  viewScreen = 'viewPlasmaDonatedPatientManagement'
  viewPlasmaDonatedPatientData: any

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation();
    this.getPlasmaDonatedPatient();
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
      this.getPlasmaDonatedPatient()
    }
  }
  searchFormReset() {
    if (this.searchForm.value.search || this.searchForm.value.disease || this.searchForm.value.fromDate || this.searchForm.value.toDate) {
      this.getPlasmaDonatedPatient()
      this.searchForm.reset({
        search: '',
        disease: '',
        fromDate: '',
        toDate: ''
      });
    }
  }

  pagination(event) {
    this.currentPage = event;
    this.getPlasmaDonatedPatient()
  }

  // get plasma donated patients list
  getPlasmaDonatedPatient() {
    let data = {
      "search": this.searchForm.value.search,
      "disease": this.searchForm.value.disease,
      "fromDate": this.searchForm.value.fromDate,
      "toDate": this.searchForm.value.toDate,
      "page": this.currentPage,
      "limit": this.itemPerPage,
    }
    this.mainService.showSpinner()
    this.mainService.postApi(ApiUrls.ViewPlasmaDonatedPatientTestCenterList, data, 1).subscribe((res: any) => {
      console.log("view plasma donated patient list response", res);
      if (res.responseCode == 200) {
        this.total = res.result[0].total
        this.plasmaDonatedpatientData = res.result[0].docs ? res.result[0].docs : ''
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.total = res.result ? res.result : ''
        this.plasmaDonatedpatientData = res.result ? res.result : ''
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }


  // --------------------------- view plasma donated patient ---------------------------------- //
  viewPlasmaDonatedPatient(patientId, hospitalId, viewScreen) {
    this.viewScreen = viewScreen
    let data = {
      "patientId": patientId,
      "hospitalId": hospitalId
    }
    console.log(data)
    this.mainService.showSpinner()
    this.mainService.postApi(ApiUrls.ViewPlasmaDonatedPatientTestCenter, data, 1).subscribe((res: any) => {
      console.log("view plasma donated patient by id response", res);
      if (res.responseCode == 200) {
        this.viewPlasmaDonatedPatientData = res.result ? res.result : ''
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
