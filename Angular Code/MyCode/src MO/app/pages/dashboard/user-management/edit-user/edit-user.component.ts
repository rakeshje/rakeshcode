import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';
declare var google: any;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @ViewChild("placesRef", { static: true }) placesRef: GooglePlaceDirective;
  userId: any;
  user: any;
  frontSide: any;
  backSide: any;
  form: FormGroup;
  type: any;
  fileData: any;
  imageUrl: any;
  file: any;
  imageType: any;
  options: any = [];
  postCode: string;
  newLat: any;
  shortAddress: any;
  lat: any;
  lng: any;
  myDate: any;
  testDetails: any = [];

  constructor(private activatedroute: ActivatedRoute, private router: Router,
    public mainService: MainService) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((res) => {
      this.userId = res.value;
    });
    this.mainService.BlockFuture()
    this.userForm()
    this.viewUser()
  }

  handleAddressChange(address: Address) {
    this.options = [];
    const stringLat = JSON.stringify(address.geometry.location)
    this.newLat = JSON.parse(stringLat);
    this.lat = this.newLat.lat;
    this.lng = this.newLat.lng
    this.options = address.formatted_address;
  }

  userForm() {
    this.form = new FormGroup({
      firstName: new FormControl('', ([Validators.required, Validators.maxLength(62), Validators.pattern(/^[^\s][a-zA-Z]+$/)])),
      lastName: new FormControl('', ([Validators.required, Validators.maxLength(62), Validators.pattern(/^[^\s][a-zA-Z ]*$/)])),
      email: new FormControl('', ([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i), Validators.maxLength(50)])),
      mobileNumber: new FormControl('', ([Validators.required, Validators.pattern(/^[1-9][0-9]{9,13}$/)])),
      DOB: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      governmentId: new FormControl('', Validators.required),
    })
  }

  viewUser() {
    this.mainService.showSpinner();
    this.mainService.getApi(ApiUrls.viewUser + this.userId, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.user = res.result.userInfo;
        this.testDetails = res.result.testDetails
        this.myDate = this.user.DOB.slice(0, 10)

        this.imageUrl = this.user.profilePic
        this.options = this.user.location.address;
        this.lat = this.user.location.coordinates[0];
        this.lng = this.user.location.coordinates[1];
        this.form.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          DOB: this.myDate,
          gender: this.user.gender,
          email: this.user.email,
          mobileNumber: this.user.mobileNumber,
          governmentId: this.user.govVerification.governmentId
        })
        this.frontSide = this.user.govDocs[0].frontSide;
        this.backSide = this.user.govDocs[0].backSide
        this.mainService.hideSpinner();
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  handleFileInput1(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }
  handleFileInput2(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.frontSide = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }
  handleFileInput3(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.backSide = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }


  editUser() {
    if (this.options == '') {
      this.viewUser();
      this.lat = this.user.location.coordinates[0];
      this.lng = this.user.location.coordinates[1];
      this.options = this.user.location.address;
      this.mainService.errorToast('Address is required.')
      return
    }
    else if (this.frontSide == '') {
      this.mainService.errorToast('Front side image is required.');
      return
    }
    else {
      console.log(this.form.value.DOB);

      this.myDate = new Date(this.form.value.DOB)

      const data = {
        "firstName": this.form.value.firstName,
        "lastName": this.form.value.lastName,
        "email": this.form.value.email,
        "mobileNumber": this.form.value.mobileNumber,
        "governmentId": this.form.value.governmentId,
        "DOB": this.myDate.toISOString(),
        "gender": this.form.value.gender,
        "address": this.options,
        "userId": this.userId,
        "image": this.imageUrl,
        "frontSide": this.frontSide,
        "backSide": this.backSide,
        "lat": this.lat,
        "long": this.lng
      }
      this.mainService.showSpinner();
      this.mainService.putApi(ApiUrls.editUser, data, 1).subscribe((res: any) => {
        if (res.responseCode == 200) {
          this.router.navigateByUrl('/user-management')
          this.mainService.hideSpinner();
          this.mainService.successToast(res.responseMessage);
        }
        else {
          this.mainService.hideSpinner();
          this.mainService.errorToast(res.responseMessage)
        }
      })
    }
  }

}
