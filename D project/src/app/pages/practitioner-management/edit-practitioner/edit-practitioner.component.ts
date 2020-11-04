import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-practitioner',
  templateUrl: './edit-practitioner.component.html',
  styleUrls: ['./edit-practitioner.component.css']
})
export class EditPractitionerComponent implements OnInit {
  file: any;
  imageType: any;
  imageUrl: any;
  editProfileForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  // formValidation
  // formValidation(){
  //   this.editProfileForm= new FormGroup({
  //     'name':
  //   })
  // }

  // upload
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

}
