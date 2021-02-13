import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { SubCategoryManagementComponent } from '../../sub-category-management/sub-category-management/sub-category-management.component';

@Component({
  selector: 'app-view-mart',
  templateUrl: './view-mart.component.html',
  styleUrls: ['./view-mart.component.css']
})
export class ViewMartComponent implements OnInit {
  addCategoryForm: FormGroup;
  file: any;
  imageType: any;
  imageUrl: any;
  id: any;
  martData: any=[];

  constructor(private router: Router, public mainService: MainService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.id = params.id;
      console.log("hgfhjfjhgf",params);
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


}
