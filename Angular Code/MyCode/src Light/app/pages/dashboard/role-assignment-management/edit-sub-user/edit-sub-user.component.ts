import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-edit-sub-user',
  templateUrl: './edit-sub-user.component.html',
  styleUrls: ['./edit-sub-user.component.css']
})
export class EditSubUserComponent implements OnInit {
  editSubUserForm: FormGroup;
  roleListData: any=[]
  subUserId: any;
  subUserData: any;

  constructor(private route: ActivatedRoute, private router: Router, public mainService: MainService) {
    this.route.params.subscribe((res: any) => {
      console.log("sub user id ==>", res)
      if (res.id) { this.subUserId = res.id }
    })
  }

  ngOnInit() {
    this.addSubUserFormValidation();
    this.getRoleList();
    this.viewSubUser()
  }
//=======form validation=======//
  addSubUserFormValidation() {
    this.editSubUserForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      'lastName': new FormControl(''),
      'mobileNumber': new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[1-9][0-9]{8,13}$/)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      'roleId': new FormControl(''),
      
    })
  }

  // get role 
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

  // get role assignment by id / (sub-admin)
  viewSubUser() {
    this.mainService.showSpinner();
    this.mainService.getApi('admin/subAdmins/' + this.subUserId, 1).subscribe((res: any) => {
      console.log("view role assignment by id response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.subUserData = res.result;
        this.editSubUserForm.patchValue({
          'firstName': res.result.firstName ? res.result.firstName : '',
          'lastName': res.result.lastName ? res.result.lastName : '',
          'mobileNumber': res.result.mobileNumber ? res.result.mobileNumber : '',
          'email': res.result.email ? res.result.email : '',
          'roleId': res.result.roleId ? res.result.roleId : ''
        })
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }

  //============edit  role assisment======//
  editSubUser() {
    let data = {
      "subadminId": this.subUserId,
      "firstName": this.editSubUserForm.value.firstName,
      "lastName": this.editSubUserForm.value.lastName,
      "mobileNumber": this.editSubUserForm.value.mobileNumber,
      "email": this.editSubUserForm.value.email,
      "roleId": this.editSubUserForm.value.roleId
     }
    this.mainService.showSpinner();
    this.mainService.putApi('admin/editSubAdminRole', data, 1).subscribe((res: any) => {
      console.log("edit role assignment response ==>", res);
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
