import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-administer',
  templateUrl: './add-administer.component.html',
  styleUrls: ['./add-administer.component.css']
})
export class AddAdministerComponent implements OnInit {
  addAdmin: FormGroup;
  editImage: any;
  subAdminData: any;
  newArr: any=[];

  constructor(public route:Router, public service:MainService) { }

  ngOnInit(): void {
    this.addAdmin = new FormGroup({
      'name': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'lastName': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'email' :  new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'password' : new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)])),
      'confirmPassword' : new FormControl('', Validators.compose([Validators.required])),
      'userName' : new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'status': new FormControl('',Validators.required),
      'contact':new FormControl('',[Validators.required,Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)])

    })
  }

  // Image Functionality Start Here
  uploadImg($event): void {
    var img = $event.target.files[0];
    this.uploadImageFunc(img);
  }
  uploadImageFunc(img) {
    var fb = new FormData();
    fb.append('file', img)
    this.service.showSpinner();
    this.service.postApi('account/upload-file', fb).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == '200') {
        this.editImage = res['data'];
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }
    // Function for checkbox click 

  checkboxClick(value, checked) {
    console.log("permission->", value, checked)
    if (checked == true) {
      this.newArr.push(value);
    } else {
      let index = this.newArr.findIndex(x => x == value)
      console.log(index)
      this.newArr.splice(index, 1)
      console.log("new arr->", this.newArr);
    }
  }
  
  
  // api of add subadmin
  addSubAdmin(){
    this.service.showSpinner();
    let subAdminDto ={
      firstName:this.addAdmin.value.name,
      lastName:this.addAdmin.value.lastName,
      email:this.addAdmin.value.email,
      phoneNo:this.addAdmin.value.contact,
      imageUrl:this.editImage,
      password:this.addAdmin.value.password,
      roleStatus:this.addAdmin.value.status,
      previlage:this.newArr,
      address:'',
      country:'',
      gender:'',
      webUrl:this.service.websiteURL+'reset-password'
    }
    this.service.post('account/admin/user-management/create-sub-admin',subAdminDto).subscribe((res:any)=>{
      console.log('f', res);
      if(res.status==200){
        this.subAdminData=res.data
        this.service.hideSpinner();
        this.route.navigate(['/user-management-admin']);
        
      }
      else if(res.status==205){
        this.service.toasterErr(res.message)
      }
      
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }
  

}
