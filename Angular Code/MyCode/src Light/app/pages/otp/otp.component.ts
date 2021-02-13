import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otp: any;
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
  }

  otpResend() {
    this.mainService.postApi('admin/resendOtp', '', 1).subscribe(success=>{
      console.log("jhdgsfjhsgd8y67thkkjs",success);
      this.mainService.successToast(success.responseMessage)
    })
  }


  onOtpChange(e) {
    this.otp = e;
    console.log("otp", this.otp);
  }
  otpSubmit() {
    if (this.otp.length != 4) {
      return this.mainService.errorToast('Please enter 4 digit OTP.') }
      let data = {
        otp: this.otp
      }
      console.log("otp", data);
      this.mainService.showSpinner()
      this.mainService.postApi('admin/verifyOTP', data, 0).subscribe((res: any) => {
        console.log("verify OTP response ==>", res);
        if (res.responseCode == 200) {
          this.mainService.hideSpinner();
          this.mainService.successToast(res.responseMessage);
          localStorage.setItem('token', res.token);
          this.mainService.loginStatus.next(true)
          this.router.navigate(['/user-management']);
        }
        else {
          this.mainService.errorToast(res.responseMessage);
          this.mainService.hideSpinner();
        }
      })
    }

  // resendOtp(){
  //   let data = {
  //     mobileNumber: this.otp
  //   }
  //   console.log("otp",data);
  //   this.mainService.showSpinner()
  //   this.mainService.postApi('api/v1/user/resendOTP', data, 0).subscribe((res: any) => {
  //     console.log("verify OTP response ==>", res);
  //     if (res.responseCode == 200) {
  //       this.mainService.hideSpinner();
  //       this.mainService.successToast(res.responseMessage);
  //     }
  //     else {
  //       this.mainService.errorToast(res.responseMessage);
  //       this.mainService.hideSpinner();
  //     }
  //   })
  // }

}
