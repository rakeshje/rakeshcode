import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css']
})
export class EditMyProfileComponent implements OnInit {
  editProfileForm: FormGroup
  file: any;
  imageType: any;
  imageUrl: any;
  id: any;
  
  constructor(private router: Router, public mainService: MainService,public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
    })
   }

  ngOnInit() {
    this.editProfileFormValidation();
    this.getProfile();
  }
  editProfileFormValidation() {
    this.editProfileForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(60)]),
      'number': new FormControl('', [Validators.required, Validators.pattern(/^[^0][0-9]*$/),  Validators.maxLength(15)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      'image': new FormControl('')
    })
  }

  // get profile
  getProfile() {
    this.mainService.showSpinner()
    this.mainService.getApi('user/getProfile', 1).subscribe((res: any) => {
      console.log("profile response ==>", res);
      if (res.responseCode == 200) {
        this.imageUrl = res.result.profilePic ? res.result.profilePic : ''
        this.editProfileForm.patchValue({
          'firstName': res.result.firstName ? res.result.firstName : '',
          'email': res.result.email ? res.result.email : '',
          'profilePic': this.imageUrl,
          'mobileNumber':res.result.mobileNumber ? res.result.mobileNumber:''
        })
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }


  editProfile() {
    let data = {
      'userId':this.id,
      'firstName': this.editProfileForm.value.firstName,
      'email': this.editProfileForm.value.email,
      'profilePic': this.imageUrl,
      'mobileNumber':this.editProfileForm.value.number
    }
    this.mainService.showSpinner();
    this.mainService.postApi('practioner/editProfile', data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.successToast(res.responseMessage);
        this.mainService.loginData.next(res.result[0]);
        this.router.navigate(['my-profile'])
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  ValidateFileUpload(event) {
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

  back() {
    this.router.navigate(['my-profile'])
  }
}
