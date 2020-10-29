import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup;
  resetId: any;
  showPassOrText: boolean;
  showEyeOrCrossEye: boolean;

  constructor(private activatedroute: ActivatedRoute, public mainService: MainService, public router: Router) { }

  ngOnInit() {
    this.resetPassword = new FormGroup({
      "number": new FormControl('',( [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.maxLength(18)])),
      "password": new FormControl('', ([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)])),
      "confirmPassword": new FormControl('', [Validators.required])
    });
    this.activatedroute.queryParams.subscribe((res) => {
      this.resetId = res.id
      console.log('res', this.resetId);
    })
  }

  resetApi() {
    if (this.resetPassword.valid) {
      const data = {
        mobileNumber:this.resetPassword.value.number,
        newPassword: this.resetPassword.value.password,
        confirmPassword: this.resetPassword.value.confirmPassword,
      }
      this.mainService.showSpinner()
      this.mainService.postApi(ApiUrls.resetPassword , data, 0).subscribe((res: any) => {
        console.log('reset password response ==>', res);
        if (res.responseCode == 200) {
          this.mainService.hideSpinner();
          this.mainService.successToast(res.responseMessage)
          this.router.navigateByUrl('/login')
        } else {
          this.mainService.hideSpinner();
          this.mainService.errorToast(res.responseMessage)
        }
      })
    }
    else {
      console.log('Email is required.');
      this.mainService.errorToast('Email is required.')
    }
  }

  // show and hide password and change eye
  showPassword(){
    this.showPassOrText = !this.showPassOrText;
    this.showEyeOrCrossEye = !this.showEyeOrCrossEye
  }

}
