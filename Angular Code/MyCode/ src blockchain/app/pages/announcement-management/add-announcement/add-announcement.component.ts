import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {
  announcementForm:FormGroup
  editImage: any;
  constructor(public route:Router, public service:MainService) { }

  ngOnInit(): void {
    this.formValidation()
  }

  // form validation
  formValidation(){
    this.announcementForm= new FormGroup({
      'page': new FormControl('',[Validators.required, Validators.pattern(/^[^0-9!@#$%^*()_+|<>,;'"]*$/)]),
      'description': new FormControl('',[Validators.required, Validators.pattern('')])
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

  addAnnouncement(){
    this.service.showSpinner();
    let data={
      'title':this.announcementForm.value.page,
      'description': this.announcementForm.value.description,
      'imageUrl':this.editImage

    }
    this.service.post('notification/save-announcement-data', data).subscribe((res:any)=>{
      console.log('dj', res);
      if(res.status==200){
        this.service.hideSpinner();
        this.service.toasterSucc(res.message);
        this.route.navigate(['/announcement-management'])
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
