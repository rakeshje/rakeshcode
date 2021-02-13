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
  changeForm:FormGroup
  constructor(public service:MainService, public router:Router) { }

  ngOnInit() {
    this.checkInputs()
  }
//------form validation and password match----//
  checkInputs() {
    this.changeForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, passwordMatchValidator);
    /** Function for password match and mismatch */
    function passwordMatchValidator(g: FormGroup) {
      let pass = g.get('newPassword').value;
      let confPass = g.get('confirmPassword').value;
      if (pass != confPass) {
        g.get('confirmPassword').setErrors({ mismatch: true });
      } else {
        g.get('confirmPassword').setErrors(null)
        return null
      }
    }
  }

  /** to get the value of field  */
  get password(): any {
    return this.changeForm.get('password');
  }
  get newPassword(): any {
    return this.changeForm.get('newPassword');
  }
  get confirmPassword(): any {
    return this.changeForm.get('confirmPassword');
  }
  
  //----------change password--------//
  changePass(){
    if(this.changeForm.invalid){
      if(this.changeForm.value.password=='' || this.changeForm.value.newPassword=='' || this.changeForm.value.confirmPassword==''){
        this.service.errorToast('please enter all fields.');
      }else if(this.changeForm.value.newPassword!=this.changeForm.value.confirmPassword){
        this.service.errorToast("password mismatch.")
      }
      else if(this.changeForm.value.password==this.changeForm.value.newPassword){
        this.service.errorToast("old password and new password can not be same.")
      }
      return;
    }

    let data={
      password:this.changeForm.value.password,
      newPassword:this.changeForm.value.newPassword
    }
    this.service.showSpinner()
    this.service.postApi('admin/changePassword', data,1).subscribe((res)=>{
      console.log('f',res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.service.successToast(res.responseMessage)
        this.router.navigate(['/login'])
      }
    },(error)=>{
      this.service.errorToast("something went wrong")
    })

  }


}
