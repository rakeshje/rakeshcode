import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainserviceService } from '../provider/mainservice.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form:FormGroup
  id: any;
  constructor(public router:Router, public mainService:MainserviceService) { }

  ngOnInit() {
    this.formValidation()
  }
//=======form validation=======//
  formValidation(){
    this.form= new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)])
    })
  }

  //=========forget passworde=====//
  forgetPassword(){
    this.mainService.showSpinner();
    let data={
      'email':this.form.value.email
    }

    this.mainService.postApi('admin/forgotPassword',data, 0).subscribe((res)=>{
      console.log("forget password", res);
      if(res.response_code==200){
        this.mainService.hideSpinner()
        this.mainService.successToast(res.response_message)
        this.id=res.result
        this.router.navigate(['/reset-password'],{queryParams:{id:this.id}})
      }
      if(res.response_code==404){
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.response_message)

      }

    },(error)=>{
      this.mainService.errorToast('something went wrong')
    })

  }



}
