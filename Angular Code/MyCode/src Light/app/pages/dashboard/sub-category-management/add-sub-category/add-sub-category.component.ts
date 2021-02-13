import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {
  addSubadminForm: FormGroup;
  subCategoryData: any;
  file: any;
  imageType: any;
  imageUrl: any;
  dataloop: any;
  loopdata: any=[];

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.form();
    this.categorylist();
  }

  categorylist() {
    this.mainService.postApi('category/categoryList', '', 1).subscribe(success=>{
      console.log("hgfhgf",success)
      this.dataloop = success.result.docs;
      this.dataloop.forEach(element => {
        this.loopdata.push(element.categoryName);
      });
      console.log("fdgghdfghdfgh",this.loopdata)
    })
  }


  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      category: new FormControl(''),
    });
  }

  addSubCategoryComponent() {
    let data = {
      image : this.imageUrl,
      subCategoryName : this.addSubadminForm.value.name,
      categoryId : this.addSubadminForm.value.category
    }
    console.log("hngvhmnfgvmj",data);
    
    this.mainService.showSpinner();
    this.mainService.postApi('subCategory/addSubCategory', data, 1).subscribe((res: any) => {
      console.log("get sub category list response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.subCategoryData = res.result.docs;
        console.log("data",this.subCategoryData);
        this.router.navigate(['/sub-category-management'])
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }

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
