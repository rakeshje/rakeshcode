import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

declare var $:any
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup
  isValidNumbers: boolean;
  status: boolean;
  otp: any;
  id: any;
  otpForm: FormGroup;

  constructor(public service: MainService, public router:Router) { }

  ngOnInit(): void {
    this.formValidation()
  }
  formValidation() {
    this.form = new FormGroup({
      number: new FormControl('',( [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.maxLength(18)])),
    });
    this.otpForm = new FormGroup({
      verificationCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  get f() { return this.form.controls; }

  resetPassword(){
    console.log("success1");
    let apireq = {
      mobileNumber : this.form.value.number,
    }
    console.log("apireq",apireq);
    this.service.showSpinner();

    this.service.postApi('admin/forgotPassword', apireq,  0).subscribe(success => {
      console.log("success2",success);
      this.service.hideSpinner()
      localStorage.setItem('number', this.form.value.number)
      localStorage.setItem('id',success.result._id)
      if(success.responseCode ==200) {
        this.service.successToast(success.responseMessage);
        $('#exampleModal').modal('show');
      }
     else if(success.responseCode == 401) {
        this.service.successToast(success.responseMessage)
        $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
      }
      else if (this.status == false) {
          console.log("success3",success);
          this.service.errorToast(success.responseMessage);
          this.status = true;
          return;
        }
       
    },(err)=>{
      this.service.errorToast("Something went wrong.")
    })
  }

  
  onOtpChange(e) {
    this.otp = e;
  }
  verifOtp() {
    if (this.otp.length == 4) {
      let data = {
        mobileNumber: localStorage.getItem('number'),
        otp: this.otp
      }
      this.service.showSpinner()
      this.service.postApi('admin/verifyOtp', data, 0).subscribe(success => {
        console.log("success", success);
        if (success.responseCode == 200) {
          this.service.hideSpinner()
          this.service.successToast(success.responseMessage)
          this.id = success.result._id;
          console.log("sadfgsdgsdgsdfgdsfg",this.id);
          $('#exampleModal').modal('hide');
          this.otpForm.reset()
          this.router.navigate(['reset-password'])
        
        }
        else {
          this.service.errorToast(success.responseMessage);
          this.service.hideSpinner()
        }
      },(err)=>{
        this.service.errorToast("Something went wrong.");
        this.service.hideSpinner()
      })

    }
    else {
      return;
    }

  }

}
