import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-edit-mart',
  templateUrl: './edit-mart.component.html',
  styleUrls: ['./edit-mart.component.css']
})
export class EditMartComponent implements OnInit {
  addCategoryForm: FormGroup;
  file: any;
  imageType: any;
  imageUrl: any;
  id: any;
  martData: any=[];

  constructor(private router: Router, public mainService: MainService, private active: ActivatedRoute) { 
    this.active.queryParams.subscribe((success)=>{
      this.id = success.id;
      console.log("successeditmart",success)
    })
  }

  ngOnInit() {
    this.addCategoryFormValidation();
    this.getViewData();
  }

  addCategoryFormValidation() {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      parking: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      radius: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  getViewData() {
    this.mainService.showSpinner();
    this.mainService.getApi('mart/marts/'+this.id, 1).subscribe((res: any) => {
      console.log("get mart list response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.martData = res.result;
        this.imageUrl = res.result.images[0];
        this.addCategoryForm.patchValue({
          name : this.martData.martName,
          parking : this.martData.parkingAvailability,
          pin: this.martData.pinCode,
          state: this.martData.state,
          city: this.martData.city,
          address: this.martData.address,
          latitude: this.martData.location.coordinates[0],
          longitude: this.martData.location.coordinates[1],
          radius: this.martData.radius
        })
        // this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        // this.mainService.errorToast(res.responseMessage);
      }
    })
  }

  
  // add category 
  addCategory() {
    let data = {
      martId : this.id,
      martName : this.addCategoryForm.value.name,
      parkingAvailability : this.addCategoryForm.value.parking,
      pinCode : this.addCategoryForm.value.pin,
      state : this.addCategoryForm.value.state,
      city : this.addCategoryForm.value.city,
      address : this.addCategoryForm.value.address,
      radius : this.addCategoryForm.value.radius,
      lat : this.addCategoryForm.value.latitude,
      long : this.addCategoryForm.value.longitude,
      images : [this.imageUrl]
    }
    console.log("dfgdfsgrtg45yghghtjty",data);
    
    this.mainService.showSpinner();
    this.mainService.putApi('mart/marts', data, 1).subscribe((res: any) => {
      console.log("add category response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage)
        this.router.navigate(['mart-management']);
      }
      else {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage)
      }
    })
  }
  

  // file upload
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
