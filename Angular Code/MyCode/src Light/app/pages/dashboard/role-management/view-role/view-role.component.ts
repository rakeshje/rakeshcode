import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {
  id: any;
  viewData: any;
  permissions: any;
  roleForm: FormGroup;

  constructor(public router: Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      console.log("nsnd", this.id);
      
    })
   }

  ngOnInit() {
    this.viewRole();
    this.form();
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
  
//=======view role======//
  viewRole(){
    let id=this.id
    this.service.showSpinner();
    this.service.getApi('role/viewRole/'+id,1).subscribe((res)=>{
      console.log("h",res);
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.viewData=res.result;
        this.permissions=res.result
        console.log("gdfxghdfs456uhdfgrn",this.permissions)
      }
      
    },(error)=>{
      this.service.errorToast('something went wrong')
    })

  }

}
