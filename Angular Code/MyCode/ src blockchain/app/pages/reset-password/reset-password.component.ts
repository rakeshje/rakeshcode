import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;

  constructor(public service: MainService,public route:Router) { }

  ngOnInit() {
this.token = window.location.href.split('=')[1];

    this.resetPasswordForm = new FormGroup({
      password: new FormControl('',Validators.required),
      confirmPassword : new FormControl('',Validators.required)      
    })
  }

  
  // Reset Password Functionality
  resetPasswordFunc(){
    var apireq = {
      'password': this.resetPasswordForm.value.password,
      'token': this.token
    }
    this.service.showSpinner();
    this.service.post('account/reset-password',apireq).subscribe(res=>{
     
      this.service.hideSpinner();
      if(res['status']==200){
        this.service.toasterSucc('Password Set Successfully');
        this.route.navigate(['/login'])
      }
    }, err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })

    
  }
}
  
