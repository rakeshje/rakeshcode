import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  id: any;
  addSubadminForm: FormGroup;
  imageUrl: any;

  constructor(private router: Router, public mainService: MainService, public active: ActivatedRoute) { 

    this.active.queryParams.subscribe((params)=>{
      this.id = params.value;
      console.log("hgfhjfjhgf",params);
    })
  }

  ngOnInit() {
    this.form();
    this.getSubcategoryList();
  }

  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      category: new FormControl(''),
    });
  }

  getSubcategoryList() {
    this.mainService.showSpinner();
    this.mainService.getApi('category/viewCategory/'+ this.id, 1).subscribe((res: any) => {
      console.log("get sub category list response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        // console.log("data",this.subCategoryData);
        this.imageUrl = res.result.image
        this.addSubadminForm.patchValue({
         name : res.result.categoryName,
         category : res.result.productServiceType,
        })
        
      } else {
        this.mainService.hideSpinner();
        // this.mainService.errorToast(res.responseMessage);
      }
    })
  }

}
