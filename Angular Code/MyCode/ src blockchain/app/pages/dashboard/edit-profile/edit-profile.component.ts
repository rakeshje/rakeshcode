import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm:FormGroup
  editImage: any;
  userDetail: any;
  date: Date;
  constructor(private router: Router,public service: MainService) { }

  ngOnInit() {
    this.date=new Date()
    console.log('hdhfd', this.date);
    
    this.myProfile()
    this.editForm = new FormGroup({
      'name': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'gender': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'DOB': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'email': new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'phone': new FormControl('',[Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
      'address': new FormControl('', Validators.required)
    })
  }

  myProfile(){
    var url = 'account/my-account';
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.userDetail = res['data'];
        this.editImage = this.userDetail.imageUrl;
        this.editForm.patchValue({
          'name': this.userDetail.firstName,
          'email': this.userDetail.email,
          'phone': this.userDetail.phoneNo,
          'address': this.userDetail.address,
          'gender': this.userDetail.gender,
          'dob': this.userDetail.DOB
        })
      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
      this.service.hideSpinner();
    })
  

  }

  // Api of update profile
  updateProfile() {
    var apiReq = {
      "address": this.editForm.value.address,
      "dob": this.editForm.value.DOB,
      "firstName": this.editForm.value.name,
      "phoneNo": this.editForm.value.phone,
      "gender": this.editForm.value.gender,
      "email": this.editForm.value.email,
      "imageUrl": this.editImage ? this.editImage : this.userDetail.imageUrl,
    }
    this.service.showSpinner();
    this.service.post('account/profile-update', apiReq).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.service.toasterSucc('Profile Updated Successfully');
        this.router.navigate(['my-profile'])
        
      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  // Image Functionality Start Here
  uploadImg($event): void {
    var img = $event.target.files[0];
    this.uploadImageFunc(img);
  }
  uploadImageFunc(img) {
    var fb = new FormData();
    fb.append('file', img)
    this.service.showSpinner();
    this.service.postApi('account/upload-file', fb).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == '200') {
        this.editImage = res['data'];
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  

}
