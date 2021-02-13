import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

declare var $:any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword: FormGroup;
  isValidNumbers: boolean;
  myCode: string;
  loginPhNumberVerificationForm: FormGroup;
  otp: any;
  submitted : boolean;
  id: any;


  constructor(private router : Router , private service : MainService) { }

  ngOnInit() {
    this.form();
  }
  form() {
    this.forgotPassword = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required,Validators.email,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})+$/)]))
    });
    this.loginPhNumberVerificationForm = new FormGroup({
      verificationCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }
  get f(){ return this.forgotPassword.controls}

  submit(){
    let data = {
      'email': this.forgotPassword.value.email
    }
    this.service.showSpinner();
     this.service.postApi('api/v1/admin/forgotPassword', data, 0).subscribe((res: any) => {
      console.log("login response ==>", res)
      if (res.responseCode == 200) {
        this.service.hideSpinner()
         this.service.successToast(res.responseMessage)
        this.router.navigate(['reset-password'])
      } else {
        this.service.hideSpinner()
        this.service.errorToast(res.responseMessage)
      }
    })
  }

}
