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

  constructor(public service: MainService, public router:Router) { }

  ngOnInit(): void {
    this.formValidation()
  }
  formValidation() {
    this.form = new FormGroup({
      number: new FormControl('',( [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.maxLength(18)])),
    });
    // this.loginPhNumberVerificationForm = new FormGroup({
    //   verificationCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    // });
  }

  get f() { return this.form.controls; }

  // resetPassword(){
  //   console.log("success1");
  //   let apireq = {
  //     mobileNumber : this.form.value.number,
  //   }
  //   console.log("apireq",apireq);
  //   this.service.showSpinner();

  //   this.service.postApiReq('admin/form', apireq,  0).subscribe(success => {
  //     console.log("success2",success);
  //     this.service.hideSpinner()
  //     localStorage.setItem('number', this.form.value.number)
  //     localStorage.setItem('id',success.result._id)
  //     if(success.response_code ==400) {
  //       this.service.errorToastr(success.response_message)
  //     }
  //    else if(success.response_code == 201) {
  //       this.service.successToastr(success.response_message)
  //       $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
  //     }
  //     else if (this.status == false) {
  //         console.log("success3",success);
  //         this.service.errorToastr(success.response_message);
  //         this.status = true;
  //         return;
  //       }
       
  //   },(err)=>{
  //     this.service.errorToastr("Something went wrong.")
  //   })
  // }

  
  onOtpChange(e) {
    this.otp = e;
  }
  // verifOtp() {
  //   if (this.otp.length == 4) {
  //     let data = {
  //       mobileNumber: localStorage.getItem('number'),
  //       otp: this.otp
  //     }
  //     this.service.postApiReq('admin/verifyOtp', data, 0).subscribe(success => {
  //       console.log("success", success);
  //       if (success.response_code == 200) {
  //         this.service.showSpinner()
  //         this.service.successToastr(success.response_message)
  //         this.id = success.result._id;
  //         console.log("sadfgsdgsdgsdfgdsfg",this.id);
  //         $('#exampleModal').modal('hide');
  //         this.router.navigate(['reset-password/'+this.id]);
        
  //       }
  //       else {
  //         this.service.errorToastr(success.response_message);
  //         this.service.hideSpinner()
  //       }
  //     },(err)=>{
  //       this.service.errorToastr("Something went wrong.");
  //       this.service.hideSpinner()
  //     })

  //   }
  //   else {
  //     return;
  //   }

  // }

}
