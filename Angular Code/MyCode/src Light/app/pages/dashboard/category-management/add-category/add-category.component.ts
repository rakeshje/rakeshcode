import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  file: any;
  imageType: any;
  imageUrl: any;

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.addCategoryFormValidation();
  }

  addCategoryFormValidation() {
    this.addCategoryForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      productServiceType: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  
  // add category 
  addCategory() {
    let data = {
      categoryName: this.addCategoryForm.value.categoryName,
      productServiceType: this.addCategoryForm.value.productServiceType,
      image: this.imageUrl
    }
    this.mainService.showSpinner();
    this.mainService.postApi('category/addCategory', data, 1).subscribe((res: any) => {
      console.log("add category response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage)
        this.router.navigate(['category-management']);
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
