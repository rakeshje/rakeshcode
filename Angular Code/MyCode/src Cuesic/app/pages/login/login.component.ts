import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainserviceService } from '../provider/mainservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(public mainService: MainserviceService, public router:Router) { }

  ngOnInit() {
    this.loginFormValidation()
    var rememberMe=JSON.parse(localStorage.getItem('rememberMe')) ? JSON.parse(localStorage.getItem('rememberMe')): '';
    if(rememberMe!=''){
      this.loginForm.patchValue({
        'email': window.atob(rememberMe.email),
        'password': window.atob(rememberMe.password),
        'rememberMe': window.atob(rememberMe.rememberMe),
      })
    }
  }

  //-------  login form validation -------- //
  loginFormValidation() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }
//=======login api =====//

login(){
  
  if(this.loginForm.value.email=='' || this.loginForm.value.password==''){
    this.mainService.errorToast("email and password is required")
    return ;
  }

  let data={
    'email':this.loginForm.value.email,
    'password':this.loginForm.value.password,
  }
  this.mainService.showSpinner()
  this.mainService.postApi('admin/logIn', data, 0).subscribe((res)=>{
    console.log("logindata", res);
    this.mainService.hideSpinner()
    if(res.response_code==200){
      this.mainService.successToast(res.response_message)
      localStorage.setItem('token',res.result.token);
      localStorage.setItem('userId',res.result.userId);
      this.mainService.loginStatus.next(true)
      this.router.navigate(['/dashboard'])
      if(this.loginForm.value.rememberMe){
        let remData={
          'email': window.btoa(this.loginForm.value.email),
          'password':window.btoa(this.loginForm.value.password),
          'rememberMe':window.btoa(this.loginForm.value.rememberMe)
        }
        localStorage.setItem('rememberMe', JSON.stringify(remData))
      }
      else{
        localStorage.removeItem('rememberMe')
      }
    }
    else{
      this.mainService.errorToast(res.response_message)
    }
  },(error)=>{
    this.mainService.errorToast('something went wrong')
  })
}


}
