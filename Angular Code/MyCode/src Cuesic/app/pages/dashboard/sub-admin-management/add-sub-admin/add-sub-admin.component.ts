import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sub-admin',
  templateUrl: './add-sub-admin.component.html',
  styleUrls: ['./add-sub-admin.component.css']
})
export class AddSubAdminComponent implements OnInit {
  form : FormGroup;
  constructor(public mainService : MainserviceService , private router : Router) { }

  ngOnInit() {
   this.editForm()
  }

  editForm(){
    this.form = new FormGroup({
      'firstName' : new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z\s]*$/)]),
      "password": new FormControl('', ([Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)])),
      "confirmPassword": new FormControl('', ([Validators.required, Validators.minLength(8)])),
      "email": new FormControl('', ([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)])),
      "dashboard": new FormControl(false),
      "userManagement": new FormControl(false),
      "subAdminManagement": new FormControl(false),
      "contactUsManagement": new FormControl(false),
      "subscriptionManagement": new FormControl(false),
      "transactionManagement": new FormControl(false),
      "staticContentManagement": new FormControl(false)
       })
  }

  addSubAdmin(){
    const data = {
      'name' : this.form.value.firstName,
      'email' : this.form.value.email,
      'password' : this.form.value.password,
      'dashboard' : this.form.value.dashboard,
      'userManagement' : this.form.value.userManagement,
      'subAdminManagement' : this.form.value.subAdminManagement,
      'contactUsManagement' : this.form.value.contactUsManagement,
      'subscriptionManagement' : this.form.value.subscriptionManagement,
      'transactionManagement' : this.form.value.transactionManagement,
      'staticContentManagement' : this.form.value.staticContentManagement
    }
    this.mainService.postApi('admin/addSubAdmin',data ,1).subscribe((res)=>{
      if(res.response_code == 200){
      this.mainService.successToast(res.response_message);
      this.router.navigate(['/sub-admin-management'])
      }
      else{
        this.mainService.errorToast(res.response_message)
      }
    })
  }

}
