import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainserviceService } from '../provider/mainservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form:FormGroup
  id: any;

  constructor(public router:Router, public mainservice:MainserviceService, public active:ActivatedRoute) {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      console.log("id", this.id);
      
    })
   }

  ngOnInit() {
    this.formValidation()
  }
  //=====form validation===//

  formValidation(){
    this.form= new FormGroup({
      password: new FormControl('', [Validators.required,Validators.pattern('/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/')]),
      confirmPassword: new FormControl('', [Validators.required,Validators.pattern('/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/')])
    })
  }

  //========reset password======//
  resetPassword(){
    if(this.form.value.password!= this.form.value.confirmPassword){
      this.mainservice.warningToast('password mismatched')
      return;
    }
    let _id=this.id
    let data={
      'password':this.form.value.password,
      'confirmPassword':this.form.value.confirmPassword
    }
    this.mainservice.postApi('admin/resetPassword/'+_id,data, 0).subscribe((res)=>{
      console.log("reset", res);

      
    })
  }

}
