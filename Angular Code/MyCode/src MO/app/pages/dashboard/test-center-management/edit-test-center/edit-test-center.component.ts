import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';
@Component({
  selector: 'app-edit-test-center',
  templateUrl: './edit-test-center.component.html',
  styleUrls: ['./edit-test-center.component.css']
})
export class EditTestCenterComponent implements OnInit {
  @ViewChild("placesRef", { static: true }) placesRef: GooglePlaceDirective;
  editTestCenterForm: FormGroup
  file: any;
  imageType: any;
  imageUrl: any;
  countryCode: string[] = ['+1', '+7', '+61', '+64', '+77', '+90', '+91', '+380', '+381', '+382', '+385', '+386', '+387', '+389', '+994', '+995'];
  defaultCode: string = '+90';
  testCenterId: any;
  testCenterData: any;
  address: any;
  formatted_address: any
  lat: any;
  long: any;

  constructor(private route: ActivatedRoute, private router: Router, public mainService: MainService) {
    this.route.queryParams.subscribe((res: any) => {
      console.log(res)
      if (res.testCenterId) { this.testCenterId = res.testCenterId }
    })
  }

  ngOnInit() {
    this.editTestCenterFormValidation();
    this.getTestCenter()
  }
  editTestCenterFormValidation() {
    this.editTestCenterForm = new FormGroup({
      image: new FormControl(''),
      testCenterName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      countryCode: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[1-9][0-9]{8,13}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      address: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);
    this.editTestCenterForm.controls['countryCode'].setValue(this.defaultCode, { onlySelf: true });
  }

  passwordMatchValidator(g: FormGroup) {
    let pass = g.get('password').value;
    let cpass = g.get('confirmPassword').value
    if (pass != cpass) {
      g.get('confirmPassword').setErrors({ mismatch: true });
    }
    else {
      g.get('confirmPassword').setErrors(null)
      return null
    }
  }

  // get test center detail by id
  getTestCenter() {
    this.mainService.showSpinner()
    this.mainService.getApi(ApiUrls.viewTestCenter + this.testCenterId, 1).subscribe((res: any) => {
      console.log(res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.testCenterData = res.result;
        this.imageUrl = res.result.image ? res.result.image : '';
        this.lat = res.result.location.coordinates[0] ? res.result.location.coordinates[0] : '';
        this.long = res.result.location.coordinates[1] ? res.result.location.coordinates[1] : '';
        this.editTestCenterForm.patchValue({
          "testCenterName": res.result.hospitalName ? res.result.hospitalName : '',
          "email": res.result.email ? res.result.email : '',
          "countryCode": res.result.countryCode ? res.result.countryCode : '',
          "mobileNumber": res.result.mobileNumber ? res.result.mobileNumber : '',
          "address": res.result.location.address ? res.result.location.address : '',
        })
      } else {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      }
    })
  }

  public handleAddressChange(address: Address) {
    this.address = address;
    this.formatted_address = address.formatted_address
    this.lat = address.geometry.location.lat();
    this.long = address.geometry.location.lng()
  }

  // edit test center
  editTestCenter() {
    if (!this.imageUrl) {
      return this.mainService.warningToast('Please select test center image.')
    } else if (!this.address && !this.editTestCenterForm.value.address) {
      return this.mainService.warningToast('Please select test center address.')
    } else {
      let data = {
        "testCenterId": this.testCenterId,
        "testCenterName": this.editTestCenterForm.value.testCenterName,
        "email": this.editTestCenterForm.value.email,
        "countryCode": this.editTestCenterForm.value.countryCode,
        "mobileNumber": this.editTestCenterForm.value.mobileNumber,
        "password": this.editTestCenterForm.value.password,
        "address": this.formatted_address ? this.formatted_address : this.editTestCenterForm.value.address,
        "lat": this.lat,
        "long": this.long,
        "image": this.imageUrl
      }
      console.log(data)
      this.mainService.showSpinner();
      this.mainService.putApi(ApiUrls.editTestCenter, data, 1).subscribe((res: any) => {
        console.log("edit test center response ==>", res)
        if (res.responseCode == 200) {
          this.mainService.successToast(res.responseMessage)
          this.router.navigate(['/test-center-management']);
        } else {
          this.mainService.hideSpinner();
          this.mainService.errorToast(res.responseMessage)
        }
      })
    }
  }

  ValidateFileUpload(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        console.log(this.imageUrl)
      };
      reader.readAsDataURL(this.file[0]);
    }
  }
}
