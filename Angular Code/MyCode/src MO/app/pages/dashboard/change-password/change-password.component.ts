import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  constructor(public mainService: MainService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: new FormControl('', Validators.compose([Validators.required])),
      newPassword: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required])),
    })
  }

  changePassword() {
    if (this.form.value.confirmPassword != this.form.value.newPassword) {
      return false;
    }
    else if(this.form.value.oldPassword == this.form.value.newPassword){
      this.mainService.errorToast('old password and new password can not be the same')
      return false;
    }
    else {
      const item = {
        'oldPassword': this.form.value.oldPassword,
        'newPassword': this.form.value.newPassword,
        'confirmPassword': this.form.value.confirmPassword
      }
      this.mainService.showSpinner()
      this.mainService.postApi('practioner/changePassword', item, 1).subscribe((res: any) => {
        console.log("change password response ==>", res)
        this.mainService.hideSpinner()
        if (res.responseCode == 200) {
          this.mainService.successToast(res.responseMessage)
          this.mainService.loginStatus.next(false)
          localStorage.removeItem('token');
          this.router.navigate(['login'])
        }
        else {
          this.mainService.errorToast(res.responseMessage)
        }
      })
    }
  }

  back() {
    this.router.navigate(['my-profile'])
  }

}
