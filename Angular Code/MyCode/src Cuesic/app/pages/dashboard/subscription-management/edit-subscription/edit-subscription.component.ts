import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.css']
})
export class EditSubscriptionComponent implements OnInit {
  form: FormGroup;
  file: any;
  imageType: any;
  imageUrl: any;
  subscriptionId: any;
  subscriptionData: any;
  constructor(public router:Router,private activatedroute : ActivatedRoute , public mainService : MainserviceService) { }

  ngOnInit() {
    this.formData()
   this.activatedroute.params.subscribe((res)=>{
     this.subscriptionId = res.id;
     console.log('userId', this.subscriptionId);
   });
   this.viewSubscription()
  }

  viewSubscription(){
     this.mainService.getApi('admin/subscription/'+this.subscriptionId ,1).subscribe((res)=>{
       console.log('response of user', res);
       if(res.response_code == 200){
         this.subscriptionData = res.result;
         this.form.patchValue({
          'subscriptionName': this.subscriptionData.subscriptionName,
          'ValidityPeriod': this.subscriptionData.validityPeriod,
          'cost': this.subscriptionData.cost,
          'currency':this.subscriptionData.currency
         })
         console.log('user data', this.subscriptionData);

       }
       else{
         this.mainService.errorToast(res.response_message)
       }
     })
   }

  formData(){
    this.form =  new FormGroup({
      'subscriptionName' : new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z\s]*$/)]),
      'ValidityPeriod' : new FormControl('',[Validators.required,Validators.pattern(/[^0A-Za-z!@#$%^&*()_+<>?,;'".][0-9]*$/), Validators.minLength(1)]),
      'currency' : new FormControl('$', Validators.pattern(/^[^0-9A-Za-z]*$/)),
      'cost' : new FormControl('',[Validators.required,Validators.pattern(/[^0A-Za-z!@#$%^&*()_+<>?,;'".][0-9]*$/), Validators.minLength(1)])
    })
  }

  preventSpace(event) {
    if ((event.charCode == 32 || event.charCode == 64 || (event.charCode==65 && event.charCode==90) || (event.charCode==97 &&event.charCode==122)  )  && !event.target.value) {
      event.preventDefault();
    }
  }

  ValidateFileUpload(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        console.log(this.imageUrl)
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

  editSubscription(){
    const data={
      'subscriptionName' : this.form.value.subscriptionName,
      'validityPeriod' : this.form.value.ValidityPeriod,
      'currency' : this.form.value.currency,
      'cost' :this.form.value.cost,
      'subscriptionId' :this.subscriptionId ,
      'image' :this.imageUrl
    }
    this.mainService.showSpinner()
    this.mainService.putApi('admin/subscription',data,1).subscribe((res)=>{
      console.log('response of user', res);
      this.mainService.hideSpinner()
      if(res.response_code == 200){
        console.log('user data', this.subscriptionData);
        this.mainService.successToast(res.response_message)
        this.router.navigate(['/subscription-management'])
      }
      else{
        this.mainService.errorToast(res.response_message)
      }
    })
  }

}
