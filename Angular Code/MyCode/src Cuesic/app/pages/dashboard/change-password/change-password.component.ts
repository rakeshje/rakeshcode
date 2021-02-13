import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainserviceService } from '../../provider/mainservice.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup
  constructor(public router:Router, public mainservice:MainserviceService) { }

  ngOnInit() {
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
  //=======change password=====//
  changePassword(){
    
    if(this.form.value.confirmPassword != this.form.value.newPassword){
      this.mainservice.errorToast('new password and confirm password mismatch')
      return false;
    }
    if(this.form.value.oldPassword==this.form.value.newPassword){
      this.mainservice.errorToast('old password and new password  can not be the same')
      return false;
    }

    let data={
      'oldPassword': this.form.value.oldPassword,
      'newPassword':this.form.value.newPassword,
      'confirmPassword': this.form.value.confirmPassword
    }
    this.mainservice.showSpinner();
    this.mainservice.postApi('admin/changePassword', data,1).subscribe((res)=>{
      console.log("cp", res);
      if(res.response_code==200){
        this.mainservice.hideSpinner();
        this.mainservice.successToast(res.response_message)
        this.router.navigate(['/dashboard'])
      }
      if(res.response_code==404){
        this.mainservice.errorToast(res.response_message)
        this.mainservice.hideSpinner();
      }

      
    },(error)=>{
      this.mainservice.errorToast('something went wrong')
      this.mainservice.hideSpinner()
    })
  }


}
