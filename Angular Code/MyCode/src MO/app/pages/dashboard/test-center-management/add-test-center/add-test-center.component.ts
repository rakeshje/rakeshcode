import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-add-test-center',
  templateUrl: './add-test-center.component.html',
  styleUrls: ['./add-test-center.component.css']
})
export class AddTestCenterComponent implements OnInit {
  @ViewChild("placesRef", { static: true }) placesRef: GooglePlaceDirective;
  addTestCenterForm: FormGroup
  file: any;
  imageType: any;
  imageUrl: any;
  countryCode: string[] = ['+1', '+7', '+61', '+64', '+77', '+90', '+91', '+380', '+381', '+382', '+385', '+386', '+387', '+389', '+994', '+995'];
  defaultCode: string = '+90';
  address: any;

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.addTestCenterFormValidation()
  }
  addTestCenterFormValidation() {
    this.addTestCenterForm = new FormGroup({
      image: new FormControl(''),
      testCenterName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      countryCode: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[1-9][0-9]{8,13}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      address: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);
    this.addTestCenterForm.controls['countryCode'].setValue(this.defaultCode, { onlySelf: true });

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

  public handleAddressChange(address: Address) {
    this.address = address
  }

  // add test center
  addTestCenter() {
    if (!this.imageUrl) {
      return this.mainService.warningToast('Please select test center image.')
    } else if (!this.address) {
      return this.mainService.warningToast('Please select test center address.')
    }
    else {
      let data = {
        "testCenterName": this.addTestCenterForm.value.testCenterName,
        "email": this.addTestCenterForm.value.email,
        "countryCode": this.addTestCenterForm.value.countryCode,
        "mobileNumber": this.addTestCenterForm.value.mobileNumber,
        "password": this.addTestCenterForm.value.password,
        "address": this.address.formatted_address,
        "lat": this.address.geometry.location.lat(),
        "long": this.address.geometry.location.lng(),
        "image": this.imageUrl
      }
      console.log(data)
      this.mainService.showSpinner();
      this.mainService.postApi(ApiUrls.addTestCenter, data, 1).subscribe((res: any) => {
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
