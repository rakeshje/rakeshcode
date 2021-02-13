import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.css']
})
export class EditAnnouncementComponent implements OnInit {
  announcementForm:FormGroup
  id: any;
  editData: any;
  editImage: any;
  constructor(public route:Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.params.subscribe((params)=>{
      this.id=params.id
    })
   }

  ngOnInit(): void {
    this.formValidation()
    this.editAnnouncement()
  }

  // form validation
  formValidation(){
    this.announcementForm= new FormGroup({
      'page': new FormControl('',[Validators.required, Validators.pattern(/^[^0-9!@#$%^*()_+|<>,;'"]*$/)]),
      'description': new FormControl('',[Validators.required, Validators.pattern('')])
    })
  }

  // edit announcement
  editAnnouncement(){
    this.service.showSpinner();
    var url="notification/get-announcement-data?announcementsId="+this.id;
    this.service.get(url).subscribe((res:any)=>{
      console.log('dff', res);
      if(res.status==200){
        this.service.hideSpinner();
        this.editData=res.data[0]
        this.editImage=res.data[0].imageUrl
        this.announcementForm.patchValue({
          'page':this.editData.title,
          'description': this.editData.description,
          'imageUrl':this.editImage
        })
      }
      
    }, err => {
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
      this.service.hideSpinner();
    })
  }

  // update announcement
  updateAnnouncement(){
    this.service.hideSpinner();
    let data={
      'announcementsId':this.id,
      'title':this.announcementForm.value.page,
      'description':this.announcementForm.value.description,
      'imageUrl':this.editImage
    }
    this.service.post('notification/edit-announcement-data', data).subscribe((res:any)=>{
      console.log('hh', res);
      if(res.status==200){
        this.service.hideSpinner();
        this.service.toasterSucc(res.message);
        this.route.navigate(['/announcement-management'])
      }
      
    }, err => {
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
      this.service.hideSpinner();
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

}
