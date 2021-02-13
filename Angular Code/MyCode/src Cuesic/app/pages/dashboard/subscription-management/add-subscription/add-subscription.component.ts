import { Component, OnInit } from '@angular/core';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})
export class AddSubscriptionComponent implements OnInit {
  form: FormGroup;
  file: any;
  imageType: any;
  imageUrl: any;
  constructor(public mainService : MainserviceService , private router : Router) { }

  ngOnInit() {
    this.formData()
  }

  formData(){
  this.form =  new FormGroup({
    'subscriptionName' : new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z\s]*$/)]),
    'ValidityPeriod' : new FormControl('',[Validators.required, Validators.pattern(/[^0A-Za-z!@#$%^&*()_+<>?,;'".][0-9]*$/)]),
    'currency' : new FormControl('$'),
    'cost' : new FormControl('',[Validators.required, Validators.pattern(/[^0A-Za-z!@#$%^&*()_+<>?,;'".][0-9]*$/)])
  })
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

  addSubscription(){
    let data = {
    'subscriptionName' : this.form.value.subscriptionName,
    'ValidityPeriod' :  this.form.value.ValidityPeriod,
    'currency' :this.form.value.currency,
    'cost' : this.form.value.cost,
    'image' : this.imageUrl
    }
    this.mainService.showSpinner()
    this.mainService.postApi('admin/subscription',data,1).subscribe((res)=>{
      console.log(res);
      this.mainService.hideSpinner()
      if(res.response_code == 200){
        this.mainService.successToast(res.response_message)
        this.router.navigate(['subscription-management'])
      }
      else{
        this.mainService.errorToast(res.response_message)
      }

    })
  }

}
