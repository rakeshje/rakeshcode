import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form:FormGroup
  constructor(public route:Router,public service:MainService) { }

  ngOnInit(){
    this.formValidation()
  }

  //============form validation====//
  formValidation(){
    this.form = new FormGroup({
      oldPassword: new FormControl('', Validators.compose([Validators.required])),
      newPassword: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required])),
    })
  }
  changePassword(){
    if(this.form.value.oldPassword==this.form.value.newPassword){
      this.service.toasterErr('old password and new password can not be same')
      return;
    }
    
    let changePasswordDto= {
      'oldPassword':this.form.value.oldPassword,
      'newPassword':this.form.value.newPassword
    }
    
    var url="account/change-password";
    this.service.post(url,changePasswordDto ).subscribe((res:any)=>{
      console.log("change", res);
      if(res['status']==205){
        this.service.toasterErr(res.message)
      }
      if(res.status==200){
        this.service.toasterSucc(res.message);
        this.route.navigate(['/my-profile'])

      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })

    
  }

}
