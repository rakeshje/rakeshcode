import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-create-bidding-details',
  templateUrl: './create-bidding-details.component.html',
  styleUrls: ['./create-bidding-details.component.scss']
})
export class CreateBiddingDetailsComponent implements OnInit {
  createBiddingForm: FormGroup;
  type: any;
  base64Image: any;
  upload: any;
  profileImage: any;
  bidding: any;

  constructor(public server:ServerService, private router:Router) { }

  ngOnInit() {
    this.validateCreateBiddingForm()
  }

  // to validate create classroom form
  validateCreateBiddingForm() {
    this.createBiddingForm = new FormGroup({
        'productName': new FormControl('', [Validators.required]),
        'productDescription': new FormControl('', [Validators.required]),
        'productInitialCost': new FormControl('', Validators.compose([Validators.required])),    
        'location': new FormControl('',[Validators.required]),
        'country': new FormControl('',[Validators.required]),
        'state': new FormControl('',[Validators.required]),
        'city': new FormControl('',[Validators.required]),
       
    })
}

 /** to get the value of field  */
 get productName(): any {
  return this.createBiddingForm.get('productName');
}

/** to get the value of field  */
get productDescription(): any {
  return this.createBiddingForm.get('productDescription');
}
/** to get the value of field  */
get productInitialCost(): any {
  return this.createBiddingForm.get('productInitialCost');
}

/** to get the value of field  */
get location(): any {
  return this.createBiddingForm.get('location');
}
/** to get the value of field  */
get country(): any {
  return this.createBiddingForm.get('country');
}
/** to get the value of field  */
get state(): any {
  return this.createBiddingForm.get('state');
}
/** to get the value of field  */
get city(): any {
  return this.createBiddingForm.get('city');
}


/** To upload cover picture of job */
handleFileInput(event) {
  var self = this;
  if(event.target.files && event.target.files[0]){
      this.type = event.target.files[0].type;
      if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
        
          var reader = new FileReader()
          reader.onload = (e)=> {
              this.base64Image = e.target['result']
              this.uploadFile()
          }
          reader.readAsDataURL(event.target.files[0]);

        } else {
            this.server.showErrToast("Select only jpg,jpeg and png file.");
        }
      }
  }

  /** To upload cover picture of job */
handleFileInput1(event) {
  var self = this;
  if(event.target.files && event.target.files[0]){
      this.type = event.target.files[0].type;
      if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
        
          var reader = new FileReader()
          reader.onload = (e)=> {
              this.base64Image = e.target['result']
              this.uploadFile()
          }
          reader.readAsDataURL(event.target.files[0]);

        } else {
            this.server.showErrToast("Select only jpg,jpeg and png file.");
        }
      }
  }

  // to upload file
  uploadFile() {
    console.log('fadsf'+this.base64Image)
    if (this.type === 'image/png' || this.type === 'image/jpg') {
        this.base64Image = this.base64Image.substring(22);
    } else if (this.type === 'image/jpeg') {
        this.base64Image = this.base64Image.substring(23);
    }                  
    let data ={
        "profilePic": 'data:'+ this.type +'/;base64,'+this.base64Image
    }
    if(navigator.onLine) {
        this.upload = this.server.postApi('user/imageUpload/',data).subscribe((res)=>{
            this.upload.unsubscribe()
            this.profileImage = res.result
        })
      }else {
          this.server.showWarnToast('Check internet connection!')
      }
  }

  createbidding(){
    let data ={
      // "userId": localStorage.getItem('user_id'),
      // "sellerId":,
      // "categoryId":,
      // "subCategoryId":,

       "auctionProductName":this.createBiddingForm.value.productName,
       "auctionProductDescription":this.createBiddingForm.value.productDescription,
       "image":this.base64Image,
       "productInitialCost":this.createBiddingForm.value.productInitialCost,
       "country":this.createBiddingForm.value.country,
       "state":this.createBiddingForm.value.state,
       "city":this.createBiddingForm.value.city,
       //"initialBidding" : this.applyJobForm.value.applyJobEmail,
      // "applicantName": this.applyJobForm.value.applyJobName,
      // "country": this.applyJobForm.value.applyJobCountry.name,
      // "state": this.applyJobForm.value.applyJobState.name,
      // "city": this.applyJobForm.value.applyJobCity.name,
      // "zipCode": this.applyJobForm.value.applyJobZipCode,
      // "resume": this.profileImageDocumentResume,
      // "mobile": this.applyJobForm.value.applyJobContact,
      // "gender": this.applyJobForm.value.applyJobGender,
      // "pay":10
    }
    if(navigator.onLine) {
      this.bidding = this.server.postApi('user/sellOnAuction', data).subscribe((res)=> {
          this.bidding.unsubscribe()
          if(res.responseCode == 200) {
          //   this.server.showSuccToast('Congratulations! you have successfully applied to this job')  
          //   this.myAppliedJobArr=res.result.docs
          //   $('#payModal').modal('hide');
          //   this.applyJobForm.reset()
          //  this.selectTab('job')
          }
      })    
    } else {
        this.server.showWarnToast('Check internet connection!')
    }
  }

}
