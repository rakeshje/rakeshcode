import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-sub-admin',
  templateUrl: './edit-sub-admin.component.html',
  styleUrls: ['./edit-sub-admin.component.css']
})
export class EditSubAdminComponent implements OnInit {
  form : FormGroup;
  userId: any;
  user: any;
  permission: any;
  myPermission: any;
  permissionId: any;
  constructor(public mainService : MainserviceService, private router : Router , private activatedroute : ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((res)=>{
      this.userId = res.id;
      console.log('userId', this.userId);
    });
    this.editSubadminForm();
    this.viewUser()
   }

   editSubadminForm(){
     this.form = new FormGroup({
       'firstName' : new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z\s]*$/)]),
       "password": new FormControl('', ([Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)])),
       "confirmPassword": new FormControl('', ([Validators.required, Validators.minLength(8)])),
       "email": new FormControl('', ([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)])),
       "dashboard": new FormControl(''),
       "userManagement": new FormControl(''),
       "subAdminManagement": new FormControl(''),
       "contactUsManagement": new FormControl(''),
       "subscriptionManagement": new FormControl(''),
       "transactionManagement": new FormControl(''),
       "staticContentManagement": new FormControl('')
        })
   }

   viewUser(){
    this.mainService.getApi('admin/viewSubAdmin/'+ this.userId ,1).subscribe((res)=>{
      console.log('response of user', res);
      if(res.response_code == 200){
        this.user = res.result;
        this.form.patchValue({
          'firstName' : this.user.name,
          'email' : this.user.email,
          "dashboard": this.user.permissions[0].dashboard,
          "userManagement": this.user.permissions[0].userManagement,
          "subAdminManagement": this.user.permissions[0].subAdminManagement,
          "contactUsManagement": this.user.permissions[0].contactUsManagement,
          "subscriptionManagement": this.user.permissions[0].subscriptionManagement,
          "transactionManagement": this.user.permissions[0].transactionManagement,
          "staticContentManagement": this.user.permissions[0].staticContentManagement
        })
        this.permission = res.result.permissions[0];
        this.permissionId = this.permission._id
        console.log('boolean',this.myPermission);
      }
      else{
        this.mainService.errorToast(res.response_message)
      }
    })
  }

   editSubAdmin(){
     const data = {
       'subAdminId' : this.userId,
       'permissionId' :   this.permissionId,
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
     this.mainService.putApi('admin/editSubAdmin',data ,1).subscribe((res)=>{
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
