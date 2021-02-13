import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-email-template',
  templateUrl: './edit-email-template.component.html',
  styleUrls: ['./edit-email-template.component.css']
})
export class EditEmailTemplateComponent implements OnInit {
  id: any;
  editEmailTemplateForm:FormGroup
  editData: any;
  file: any;
  imageType: any;
  imageUrl: any;

  constructor(public router:Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      console.log("dfh", this.id);
      
    })
   }

  ngOnInit() {
    this.editEmailTemplateFormValidation()
    this.editEmailTemplate()
  }

// editEmailTemplateForm validation
editEmailTemplateFormValidation(){
  this.editEmailTemplateForm= new FormGroup({
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

//--------edit email template-----//
editEmailTemplate(){
  let data={
    templateId:this.id
  }  
  this.service.showSpinner()
  this.service.putApi('emailTemplate/emailTemplates',data,1).subscribe((res)=>{
    console.log("jdf",res);
    if(res.responseCode==200){
      this.service.hideSpinner()
      this.editData=res.result
      console.log("hh",this.editData);
      
      this.editEmailTemplateForm.patchValue({
        // image:this.editData.image,
        subject:this.editData.subject,
        time:this.editData.createdAt,
        day:this.editData.day,
        radius:this.editData.radius,
        status:this.editData.status,
        header:this.editData.header,
        footer:this.editData.footer,
        // image:this.editData.image,
      })
    }
    
  },(error)=>{
    this.service.errorToast("something went wrong")
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

//--------edit email template-----//
updateEmailTemplate(){
  this.service.showSpinner()
  let data={
    templateId:this.id,
    image:this.imageUrl,
    subject:this.editEmailTemplateForm.value.subject,
    time:this.editEmailTemplateForm.value.time,
    day:this.editEmailTemplateForm.value.day,
    radius:this.editEmailTemplateForm.value.radius,
    status:this.editEmailTemplateForm.value.status,
    header:this.editEmailTemplateForm.value.header,
    footer:this.editEmailTemplateForm.value.footer,
  }
  this.service.putApi('emailTemplate/emailTemplates',data,1).subscribe((res)=>{
    console.log("ddddd", res);
    if(res.responseCode==200){
      this.service.hideSpinner()
      this.router.navigate(['/weekly-email-template'])
    }
    
  },(error)=>{
    this.service.errorToast("something went wrong")
  })

}

}
