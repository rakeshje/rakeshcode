import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  roleForm:FormGroup
  eventdata: any;
  id: any;
  permissionid: any=[];
  editData: any;
  viewData: any=[];
  permissions: any;
  constructor(public router: Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      this.permissionid=params.permissionid
      console.log("nsnd", this.permissionid);
      
    })
   }

  ngOnInit() {
    this.form();
    this.viewRole();
    this.editRole();
  }

  form() {
    this.roleForm = new FormGroup({
      name : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(30)]),
      dashboard : new FormControl(),
      Retailer : new FormControl(),
      FAQ : new FormControl(),
      Contact : new FormControl(),
      User : new FormControl(),
      Coupon : new FormControl(),
      Transaction : new FormControl(),
      Static : new FormControl(),
      SubCatgeory : new FormControl(),
      Mart : new FormControl(),
      Catgeory : new FormControl()
    
    });
  }

  //--------permissions check----//

  checkboxPermission(e) {
    this.eventdata = e.target.checked;
    console.log("sdfgsdfgsdf",this.eventdata)
  }

  viewRole(){
    let id=this.id
    this.service.showSpinner();
    this.service.getApi('role/viewRole/'+id,1).subscribe((res)=>{
      console.log("h",res);
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.viewData=res.result.permissions[0];
        console.log("f",this.viewData);
        
        this.permissions=res.result;
        console.log("fghdfgh98dfgohndfijkngh",this.permissions);
        this.roleForm.patchValue({
          name: res.result.roleName
        })
        console.log("gdfxghdfs456uhdfgrn",this.permissions)
      }
      
    },(error)=>{
      this.service.errorToast('something went wrong')
    })

  }
  // permissions(arg0: string, permissions: any) {
  //   throw new Error("Method not implemented.");
  // }

  // =========edit role======//
  editRole(){
    this.service.showSpinner()
    let data={
      roleId:this.id,
      permissionId:this.permissionid
    }
    this.service.putApi('role/editRole',data,1).subscribe((res)=>{
      console.log("f", res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.editData=res.result
        this.roleForm.patchValue({
          name:this.editData.roleName
        })
      }
    },(error)=>{
      this.service.errorToast('something went wrong')
    })

  }

  //=========update role=====//
  updateRole(){
    this.service.showSpinner()
    let data={
      roleId : this.id,
      permissionId : this.permissionid,
      roleName : this.roleForm.value.name,
      dashboard : this.roleForm.value.dashboard || this.viewData.dashboard,
      retailerManagement : this.roleForm.value.Retailer || this.viewData.retailerManagement,
      categoryManagement : this.roleForm.value.Category || this.viewData.categoryManagement,
      contactUsManagement : this.roleForm.value.Contact || this.viewData.contactUsManagement,
      couponManagement : this.roleForm.value.Coupon || this.viewData.couponManagement,
      faqManagement : this.roleForm.value.FAQ || this.viewData.faqManagement,
      martManagement : this.roleForm.value.Mart || this.viewData.martManagement,
      staticContentManagement : this.roleForm.value.Static || this.viewData.staticContentManagement,
      subCategoryManagement : this.roleForm.value.SubCategory || this.viewData.subCategoryManagement,
      transactionManagement : this.roleForm.value.Transaction || this.viewData.transactionManagement,
      userManagement : this.roleForm.value.User || this.viewData.userManagement,
    }
    console.log("fghdfgh98dfg57ohndfijkngh",data);
    
    this.service.putApi('role/editRole',data,1).subscribe((res)=>{
      console.log("f", res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.router.navigate(['/role-management'])
  }
},(error)=>{
  this.service.errorToast('something went wrong')
})

}

}
