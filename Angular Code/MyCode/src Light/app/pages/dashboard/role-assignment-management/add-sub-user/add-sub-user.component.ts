import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-sub-user',
  templateUrl: './add-sub-user.component.html',
  styleUrls: ['./add-sub-user.component.css']
})
export class AddSubUserComponent implements OnInit {
  addSubUserForm: FormGroup;
  roleListData: any = [];

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.addSubUserFormValidation();
    this.getRoleList()
  }
  // -------- add sub user/ (sub-admin) form validation ---------- //
  addSubUserFormValidation() {
    this.addSubUserForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      'lastName': new FormControl(''),
      'mobileNumber': new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[1-9][0-9]{8,13}$/)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      'roleId': new FormControl(''),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required),
    })
  }

  // ------------ get role list -------------- //
  getRoleList() {
    let data = {}
    this.mainService.showSpinner();
    this.mainService.postApi('role/roleList', data, 0).subscribe((res: any) => {
      console.log("get role list response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.roleListData = res.result.docs;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }

  // ------------------ add sub user / (sub-admin) ------------------ //
  addSubUser() {
    let data = {
      "firstName": this.addSubUserForm.value.firstName,
      "lastName": this.addSubUserForm.value.lastName,
      "countryCode": "+91",
      "mobileNumber": this.addSubUserForm.value.mobileNumber,
      "email": this.addSubUserForm.value.email,
      "roleId": this.addSubUserForm.value.roleId,
      "password": this.addSubUserForm.value.password
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.postApi('admin/subAdmins', data, 1).subscribe((res: any) => {
      console.log("add role assignment response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.router.navigate(['role-assignment-management'])

      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }
}
