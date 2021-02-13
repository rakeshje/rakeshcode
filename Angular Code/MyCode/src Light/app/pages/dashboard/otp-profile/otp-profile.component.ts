import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-otp-profile',
  templateUrl: './otp-profile.component.html',
  styleUrls: ['./otp-profile.component.css']
})
export class OtpProfileComponent implements OnInit {
  emailOtp: any;
  mobileOtp: any;

  constructor(public mainService: MainService, private router:Router) { }

  ngOnInit() {
  }

  //-------otp for email-----//
  onEmailOtp(event){
    this.emailOtp=event
  }
  //-------otp for mobile-----//
  onMobileOtp(event){
    this.mobileOtp=event
  }

  //---------otp resend------//
  otpResend(){
    this.mainService.postApi('admin/resendOtpEmail', '', '').subscribe(success=>{
      console.log("dfgdfru478ujhjdhj",success);
      
    })
  }

  otpResendd() {
    this.mainService.postApi('admin/resendOtpMob2Fa', '', '').subscribe(success=>{
      console.log("dfgdfru478ujhjdhj",success);
    })
  }
//--------resend otp------//
  resendOtp(){
    // if(this.myProfileForm.value.email!=localStorage.getItem('email') || this.myProfileForm.value.number!=localStorage.getItem('mobile')){
    //  return this.service.errorToast('please enter the registered email ID Or mobile number.')
    // }
    // this.mainService.showSpinner()
    this.mainService.postApi('admin/2fa',{},1).subscribe((res)=>{
      console.log("11",res);
      if(res.responseCode==200){
        $('#resend').modal('hide')
        // this.mainService.hideSpinner()
        // this.service.successToast(res.responseMessage)
        // this.router.navigate(['/otp-profile']);
      }
      
    },(error)=>{
      this.mainService.errorToast("something went wrong")
    })
  }

  //---------otp verify on submit-----
  otpSubmit(){
    // if(this.emailOtp !=4 || this.mobileOtp!=4){
    //  return this.mainService.errorToast("Please enter 4 digit otp")
    // }
    let data={
      twoFAEnable:localStorage.getItem('twoFAEnable'),
      emailOtp:this.emailOtp,
      mobileOtp:this.mobileOtp
    }
    console.log("gh",data);
    this.mainService.postApi('admin/verify2Fa',data,1).subscribe((res)=>{
      console.log("fg", res);
      if(res.responseCode==200){
        this.mainService.successToast(res.responseMessage);
        this.router.navigate(['/user-management']);
      }
      
    },(error)=>{
      this.mainService.errorToast("something went wrong")
    })
  }

}
