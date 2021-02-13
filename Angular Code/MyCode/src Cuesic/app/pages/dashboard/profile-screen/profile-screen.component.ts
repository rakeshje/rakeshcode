import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainserviceService } from '../../provider/mainservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css']
})
export class ProfileScreenComponent implements OnInit {
  editProfileForm:FormGroup
  profileData: any;
  file: any;
  imageType: any;
  imageUrl: any;
  profilePic: any;
  constructor(public mainService : MainserviceService, public router:Router) { }

  ngOnInit() {
    this.formValidation();
    this.getProgile()
  }

//============form validation=========//
  formValidation(){
    this.editProfileForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(60)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      'image': new FormControl('')
    })
  }

  //==========get profile=======//
  getProgile(){
    this.mainService.showSpinner();
    this.mainService.getApi('admin/profile',1).subscribe((res)=>{
      console.log("profile", res);
      if(res.response_code==200){
        this.mainService.hideSpinner();
        this.profileData=res.result;
        this.profilePic=res.result.profilePic
        this.editProfileForm.patchValue({
          'profilePic':this.profileData.profilePic,
          'name':this.profileData.name,
          'email':this.profileData.email
        })
      }
      
    },(error)=>{
      this.mainService.errorToast('something went wrong');
    })
  }
  //=======file upload======//
  ValidateFileUpload(event) {
    this.file=event.target.files;
    if(this.file[0]){
      this.imageType=this.file[0].type;
      const reader= new FileReader();
      reader.onload=(e:any)=>{
        this.profilePic=e.target.result;
      };
      reader.readAsDataURL(this.file[0])
    }
  }
  
  
  //========edit profile=======//
  editProfile(){
    let data={
      'name':this.editProfileForm.value.name,
      'email':this.editProfileForm.value.email,
      'profilePic':this.profilePic
    }
    this.mainService.showSpinner();
    this.mainService.putApi('admin/profile', data , 1).subscribe((res)=>{
      console.log('edit data', res);
      if(res.response_code==200){
        this.mainService.hideSpinner();
        this.mainService.successToast(res.response_message);
        this.router.navigate(['/dashboard'])
      }
    },(error)=>{
      this.mainService.errorToast('something went wrong')
    })
    
  }

}
