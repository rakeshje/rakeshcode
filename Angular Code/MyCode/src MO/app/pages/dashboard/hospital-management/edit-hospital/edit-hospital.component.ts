import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.css']
})
export class EditHospitalComponent implements OnInit {
  @ViewChild("placesRef", { static: true }) placesRef: GooglePlaceDirective;
  editHospitalForm: FormGroup
  file: any;
  imageType: any;
  imageUrl: any;
  countryCode: string[] = ['+1', '+7', '+61', '+64', '+77', '+90', '+91', '+380', '+381', '+382', '+385', '+386', '+387', '+389', '+994', '+995'];
  defaultCode: string = '+90';
  hospitalId: any;
  hospitalData: any;
  address: any;
  formatted_address: any
  lat: any;
  long: any;

  constructor(private route: ActivatedRoute, private router: Router, public mainService: MainService) {
    this.route.queryParams.subscribe((res: any) => {
      if (res.hospitalId) { this.hospitalId = res.hospitalId }
    })
  }

  ngOnInit() {
    this.editHospitalFormValidation();
    this.getHospital()
  }
  editHospitalFormValidation() {
    this.editHospitalForm = new FormGroup({
      image: new FormControl(''),
      hospitalName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      countryCode: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[1-9][0-9]{8,13}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      address: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);
    this.editHospitalForm.controls['countryCode'].setValue(this.defaultCode, { onlySelf: true });
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

  // get hospital detail by id
  getHospital() {
    this.mainService.showSpinner()
    this.mainService.getApi(ApiUrls.viewHospital + this.hospitalId, 1).subscribe((res: any) => {
      console.log(res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.hospitalData = res.result;
        this.imageUrl = res.result.image ? res.result.image : '';
        this.lat = res.result.location.coordinates[0] ? res.result.location.coordinates[0] : '';
        this.long = res.result.location.coordinates[1] ? res.result.location.coordinates[1] : '';
        this.editHospitalForm.patchValue({
          "hospitalName": res.result.hospitalName ? res.result.hospitalName : '',
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

  editHospital() {
    if (!this.imageUrl) {
      return this.mainService.warningToast('Please select hospital image.')
    } else if (!this.address && !this.editHospitalForm.value.address) {
      return this.mainService.warningToast('Please select hospital address.')
    } else {
      let data = {
        "hospitalId": this.hospitalId,
        "hospitalName": this.editHospitalForm.value.hospitalName,
        "email": this.editHospitalForm.value.email,
        "countryCode": this.editHospitalForm.value.countryCode,
        "mobileNumber": this.editHospitalForm.value.mobileNumber,
        "password": this.editHospitalForm.value.password,
        "address": this.formatted_address ? this.formatted_address : this.editHospitalForm.value.address,
        "lat": this.lat,
        "long": this.long,
        "image": this.imageUrl
      }
      console.log(data)
      this.mainService.showSpinner();
      this.mainService.putApi(ApiUrls.editHospital, data, 1).subscribe((res: any) => {
        console.log("edit hospital response ==>", res)
        if (res.responseCode == 200) {
          this.mainService.successToast(res.responseMessage)
          this.router.navigate(['/hospital-management']);
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
