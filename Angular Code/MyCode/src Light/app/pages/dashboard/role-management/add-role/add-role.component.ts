import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  roleForm:FormGroup
  eventdata: any=[];
  boolData: boolean=false;
  constructor(public router:Router, public service:MainService) { }

  ngOnInit() {
    this.form()
  }

  form() {
    this.roleForm = new FormGroup({
      name             : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(30)]),
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

  //=======add role======//
  addRole(){
    this.service.showSpinner()
    let data={
      roleName:this.roleForm.value.name,
      dashboard:this.roleForm.value.dashboard || this.boolData,
      retailerManagement:this.roleForm.value.Retailer || this.boolData,
      staticContentManagement:this.roleForm.value.Static || this.boolData,
      faqManagement:this.roleForm.value.FAQ || this.boolData,
      transactionManagement:this.roleForm.value.Transaction || this.boolData,
      contactUsManagement:this.roleForm.value.Contact || this.boolData,
      userManagement:this.roleForm.value.User || this.boolData,
      categoryManagement:this.roleForm.value.Category || this.boolData,
      couponManagement:this.roleForm.value.Coupon || this.boolData,
      subCategoryManagement:this.roleForm.value.SubCategory || this.boolData,
      martManagement:this.roleForm.value.Mart || this.boolData,
    }
    console.log("jk",data);
    
    this.service.postApi('role/addRole', data, 1).subscribe((res)=>{
      console.log("d", res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.router.navigate(['/role-management'])

      }
    },(error)=>{
      this.service.errorToast('something went wromg')
    })
  }

}
