import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {
  addNotificationForm: FormGroup;

  constructor(private service:MainService,private router:Router) { }

  ngOnInit() {
    this.addNotificationForm = new FormGroup({
      'title': new FormControl('',Validators.required),
      'description': new FormControl('',Validators.required),
      'sharedWith': new FormControl('',Validators.required),
    })
  }
broadcast(){
  this.service.showSpinner()
  let data={
    'title':this.addNotificationForm.value.title,
    'description': this.addNotificationForm.value.description,
    'sharedWith': this.addNotificationForm.value.sharedWith,
  }
  console.log(data)
  this.service.postApi('admin/addNotification',data,1).subscribe((res:any)=>{
   if(res.responseCode==200){
     this.service.hideSpinner()
    this.service.successToast(res.responseMessage)
    this.router.navigate(['/notification-management'])
   }else{
     this.service.hideSpinner()
     this.service.errorToast(res.message)
   }
  }, (error) => {
    this.service.hideSpinner()
  })
}
}
