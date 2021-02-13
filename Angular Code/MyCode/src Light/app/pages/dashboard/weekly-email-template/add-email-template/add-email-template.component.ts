import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-email-template',
  templateUrl: './add-email-template.component.html',
  styleUrls: ['./add-email-template.component.css']
})
export class AddEmailTemplateComponent implements OnInit {
  addEmailTemplateForm:FormGroup
  file: any;
  imageType: any;
  imageUrl: any;
  statusData: string;
  constructor(public router:Router, public service:MainService) { }

  ngOnInit() {
    this.addEmailTemplateFormValidation()
  }

  // addEmailTemplateForm validation
  addEmailTemplateFormValidation(){
  this.addEmailTemplateForm= new FormGroup({
    subject: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
    radius: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(3)]),
    title: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
    footer: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
    image: new FormControl('',Validators.required),
    timeHour: new FormControl('',Validators.required),
    timeMinute: new FormControl('',Validators.required),
    timeMaridian: new FormControl('AM',Validators.required),
    day: new FormControl('',Validators.required),
    switch: new FormControl('',Validators.required),
  })
}

// File Upload
ValidateFileUpload(event) {
  this.file = event.target.files;
  if (this.file[0]) {
    this.imageType = this.file[0].type;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.file[0]);
  }
}

// add email template
addEmailTemplate(){
  if(this.addEmailTemplateForm.value.switch == true) {
    this.statusData = 'ACTIVE'
    this.service.showSpinner()
  let data={
    subject:this.addEmailTemplateForm.value.subject,
    image:this.imageUrl,
    time:this.addEmailTemplateForm.value.time,
    radius:this.addEmailTemplateForm.value.radius,
    title:this.addEmailTemplateForm.value.title,
    footer:this.addEmailTemplateForm.value.footer,
    day:this.addEmailTemplateForm.value.day,
    status: this.statusData
    // time:this.addEmailTemplateForm.value.time
  }
  console.log('GGGG',data);
  
  this.service.postApi('emailTemplate/emailTemplates',data,1).subscribe((res)=>{
    console.log("fj", res);
    if(res.responseCode==200){
      this.service.hideSpinner()
      this.router.navigate(['/weekly-email-template'])
    }
  },(error)=>{
    this.service.errorToast("something went wrong")
  })
  }
  else {
    this.statusData = 'INACTIVE'
    this.service.showSpinner()
  let data={
    subject:this.addEmailTemplateForm.value.subject,
    image:this.imageUrl,
    time:this.addEmailTemplateForm.value.time,
    radius:this.addEmailTemplateForm.value.radius,
    title:this.addEmailTemplateForm.value.title,
    footer:this.addEmailTemplateForm.value.footer,
    day:this.addEmailTemplateForm.value.day,
    status: this.statusData
    // time:this.addEmailTemplateForm.value.time
  }
  console.log('GGGG',data);
  
  this.service.postApi('emailTemplate/emailTemplates',data,1).subscribe((res)=>{
    console.log("fj", res);
    if(res.responseCode==200){
      this.service.hideSpinner()
      this.router.navigate(['/weekly-email-template'])
    }
  },(error)=>{
    this.service.errorToast("something went wrong")
  })
  }
  

}


}
