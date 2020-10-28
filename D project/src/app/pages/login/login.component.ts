import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

declare var $:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showEyeOrCrossEye:boolean;
  showPassOrText: boolean;

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.loginFormValidation();
    var rememberMe = JSON.parse(localStorage.getItem('rememberMe')) ? JSON.parse(localStorage.getItem('rememberMe')) : '';
    if (rememberMe != '') {
      this.loginForm.patchValue({
        number : window.atob(rememberMe.number),
        password: window.atob(rememberMe.password),
        rememberMe: window.atob(rememberMe.rememberMe)
      })
    }
  }

  //-------  login form validation -------- //
  loginFormValidation() {
    this.loginForm = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }
 

  // ---------  login form submit ------------- //
  login() {
    
    let data = {
      'mobileNumber': this.loginForm.value.number,
      'password': this.loginForm.value.password
    }
    this.mainService.showSpinner()
    this.mainService.postApi(ApiUrls.login, data, 0).subscribe((res: any) => {
      console.log("login response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage)
        localStorage.setItem('token', res.result.token);
        this.mainService.loginStatus.next(true)
        this.router.navigate(['dashboard'])
        this.getProfile()
        console.log(this.loginForm.value.rememberMe)
        if (this.loginForm.value.rememberMe) {
          let remData = {
            "email": window.btoa(this.loginForm.value.email),
            "password": window.btoa(this.loginForm.value.password),
            "rememberMe": window.btoa(this.loginForm.value.rememberMe)
          }
          localStorage.setItem('rememberMe', JSON.stringify(remData))
        }
        else {
          localStorage.removeItem("rememberMe");
        }
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // show and hide password and change eye
  showPassword(){
    this.showPassOrText = !this.showPassOrText;
    this.showEyeOrCrossEye = !this.showEyeOrCrossEye
  }

  //  get profile
  getProfile() {
    this.mainService.showSpinner()
    this.mainService.getApi(ApiUrls.profile, 1).subscribe((res: any) => {
      console.log("login profile response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.loginData.next(res.result)
        this.mainService.hideSpinner();
      } else {
        this.mainService.hideSpinner();
      }
    })
  }

}
