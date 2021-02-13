import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginPhNumberVerificationForm: FormGroup;
  loginPhNumberVerificationForm2: FormGroup;
  disableButton: any = false;
  loginSuccess: any;
  permissionArr: any = [];
  isValidNumbers: boolean;
  myCode: string;
  type = 'password'
  isValidNumberstv = true;
  otp: any;
  profileData: any;
  constructor(private router : Router , private mainService : MainService  ) {

  }

  ngOnInit() {
    
    this.loginFormValidation();
    
    var remData = JSON.parse(localStorage.getItem('rememberMe')) ? JSON.parse(localStorage.getItem('rememberMe')) : '';
    if (remData != '') {
      this.loginForm.patchValue({
        email: window.atob(remData.email),
        password: window.atob(remData.password)
      })
    }
  }
  // get profile
  getProfile() {
    // this.mainService.showSpinner()
    this.mainService.getApi('admin/getProfile', 1).subscribe((res: any) => {
      console.log("sidebar profile response ==>", res);
      if (res.responseCode == 200) {
        this.profileData = res.result
        localStorage.setItem('email', res.result.email);
         localStorage.setItem('mobile', res.result.mobileNumber);
        // this.mainService.hideSpinner();
        // this.mainService.successToast(res.responseMessage);
      } else {
        // this.mainService.hideSpinner();
        // this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  loginFormValidation() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]),
      rememberMe : new FormControl(false)
    });
  }


  login() {
    let data = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }
    this.mainService.showSpinner();
     this.mainService.postApi('admin/login', data, 0).subscribe((res: any) => {
      console.log("login response ==>", res)
      if (res.responseCode == 200) {
        if(res.auth == false) {
          this.mainService.hideSpinner()
          this.mainService.successToast(res.responseMessage)
          localStorage.setItem('token', res.token);
          this.getProfile()
          this.mainService.loginStatus.next(true)
         console.log('this.loginForm.value.rememberMe',this.loginForm.value.rememberMe);
 
         if (this.loginForm.value.rememberMe == true) {
           let remData = {
             "email": window.btoa(this.loginForm.value.email),
             "password": window.btoa(this.loginForm.value.password)
           }
           localStorage.setItem('rememberMe', JSON.stringify(remData))
 
         }
         else {
           localStorage.removeItem("rememberMe");
         }
         // this.router.navigate(['otp'])
         this.router.navigateByUrl('/user-management')
        }
        else {
          this.mainService.hideSpinner()
          this.mainService.successToast(res.responseMessage)
          localStorage.setItem('token', res.token);
          this.getProfile()
          this.mainService.loginStatus.next(true)
         console.log('this.loginForm.value.rememberMe',this.loginForm.value.rememberMe);
 
         if (this.loginForm.value.rememberMe == true) {
           let remData = {
             "email": window.btoa(this.loginForm.value.email),
             "password": window.btoa(this.loginForm.value.password)
           }
           localStorage.setItem('rememberMe', JSON.stringify(remData))
 
         }
         else {
           localStorage.removeItem("rememberMe");
         }
         // this.router.navigate(['otp'])
         this.router.navigateByUrl('/otp')
        }
       
      } else {
        this.mainService.hideSpinner()
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

}

