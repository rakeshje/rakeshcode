import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {
  profileForm: FormGroup;
  fileData: any;
  type: any;
  base64Image: any;
  upload: any;
  profileImage: any;
  profiledata: any=[];
  profileImageCover: any;
  constructor(public route: Router, public service: ServerService) { }

  ngOnInit() {
    this.validationForm()
  }

  // validating form
  validationForm() {
    this.profileForm = new FormGroup({
      "designation": new FormControl('', [Validators.required,Validators.pattern('')]),
      "college": new FormControl('', [Validators.required]),
      "inter": new FormControl('', [Validators.required]),
      "metric": new FormControl('', [Validators.required]),
      "liveIn": new FormControl('', [Validators.required]),
      "From": new FormControl('', [Validators.required]),
      "marrital": new FormControl('', [Validators.required]),
      "gender": new FormControl('', [Validators.required]),
      "biodata": new FormControl('', [Validators.required])
    })
  }
  // cover photo
  handleCoverInput(event) {
    console.log("jfg", event)
    var self = this;
    if (event.target.files && event.target.files[0]) {
      this.type = event.target.files[0].type;
      console.log(this.type)
      this.fileData = []
      let files = event.target.files;
      this.type = event.target.files[0].type;
      console.log("type-->>", this.type)
      if (files) {
        for (let file of files) {
          if (this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
            var reader = new FileReader()
            reader.onload = (e) => {
              // this.fileData.push(e.target['result']);
              this.base64Image = e.target['result'];
              this.uploadCoverFile();
              console.log("gdffdgd", this.fileData)
            }
            // event.target.files[0]
            reader.readAsDataURL(file);
          }
          else {
            this.service.showErrToast("Select only png, jpeg or jpg file.");
          }

        }
      }
    }
  }

  // profilePic
  handleFileInput(event){
    var self = this;
    if (event.target.files && event.target.files[0]) {
      this.type = event.target.files[0].type;
      console.log(this.type)
      this.fileData = []
      let files = event.target.files;
      this.type = event.target.files[0].type;
      console.log("type-->>", this.type)
      if (files) {
        for (let file of files) {
          if (this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
            var reader = new FileReader()
            reader.onload = (e) => {
              // this.fileData.push(e.target['result']);
              this.base64Image = e.target['result'];
              this.uploadFile();
              console.log("gdffdgd", this.fileData)
            }
            // event.target.files[0]
            reader.readAsDataURL(file);
          }
          else {
            this.service.showErrToast("Select only png, jpeg or jpg file.");
          }

        }
      }
    }
  }


  // to upload file
   uploadCoverFile() {
  
    console.log('fadsf' + this.base64Image)
    if (this.type === 'image/png' || this.type === 'image/jpg') {
      this.base64Image = this.base64Image.substring(22);
    } else if (this.type === 'image/jpeg') {
      this.base64Image = this.base64Image.substring(23);
    }
    let data = {
      "profilePic": 'data:' + this.type + '/;base64,' + this.base64Image
    }
    if (navigator.onLine) {
      this.upload = this.service.postApi('user/imageUpload/', data).subscribe((res) => {
        this.upload.unsubscribe()
        
        this.profileImageCover = res.result
      })
    } else {
      this.service.showWarnToast('Check internet connection!')
    }
  }

  uploadFile() {
  
    console.log('fadsf' + this.base64Image)
    if (this.type === 'image/png' || this.type === 'image/jpg') {
      this.base64Image = this.base64Image.substring(22);
    } else if (this.type === 'image/jpeg') {
      this.base64Image = this.base64Image.substring(23);
    }
    let data = {
      "profilePic": 'data:' + this.type + '/;base64,' + this.base64Image
    }
    if (navigator.onLine) {
      this.upload = this.service.postApi('user/imageUpload/', data).subscribe((res) => {
        this.upload.unsubscribe()
        this.profileImage = res.result
        
      })
    } else {
      this.service.showWarnToast('Check internet connection!')
    }
  }

  /** to check if number */
  // toCheckIfNumber(evt) {
  //   var charCode = (evt.which) ? evt.which : evt.keyCode;
  //   if (charCode == 32 || charCode == 101 || charCode>33 && charCode<64|| charCode>91 && charCode<96) {
  //     evt.preventDefault()
  //   } else {
  //     return true;
  //   }
  // }

  toCheckSpaceChar(e){
    var k
    if (e.charCode == 32 && !e.target.value) {
    event.preventDefault()
    }
    else{
    document.all ? k = e.keyCode : k = e.which;
    return ((k >64 && k < 91) || (k >96 && k < 123) || k == 8 || k==32);
    }
    }

  // api of addUserDetails
  addUserProfile(){
    // if(this.profileImageCover && this.profileImage){
    //   this.service.showErrToast('please upload image')
    
    this.service.showSpinner();
    let data={
      "userId": localStorage.getItem('user_id'),
      "coverPhoto":this.profileImageCover,
      "image":this.profileImage,
      "bioData":this.profileForm.value.biodata,
      "designation":this.profileForm.value.designation,
      "metric":this.profileForm.value.metric,
      "inter":this.profileForm.value.inter,
      "graduate":this.profileForm.value.college,
      "liveIn":this.profileForm.value.liveIn,
      "from":this.profileForm.value.From,
      "mariedStatus":this.profileForm.value.marrital,
      "gender":this.profileForm.value.gender
    }

    console.log("my profile data", data)
    this.service.postApi('user/addUserDetails', data).subscribe((res)=>{
      console.log("my profile", res)
      if(res.responseCode==200){
        this.profileImage="";
        this.profileImageCover="";
        this.profileForm.reset();
        this.service.hideSpinner();
        this.service.showSuccToast("Profile added sucessfully")
        // this.profiledata=res.profileDat.Data
        this.route.navigate(['/my-profile'])
      }
    },(error)=>{
      this.service.showErrToast("something went wrong")
    })

  }
//   else {
//     this.service.showErrToast("please upload image")
//     return;
//   }
// }

}
