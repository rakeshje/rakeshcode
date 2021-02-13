import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-sub-category',
  templateUrl: './view-sub-category.component.html',
  styleUrls: ['./view-sub-category.component.css']
})
export class ViewSubCategoryComponent implements OnInit {

  addSubadminForm: FormGroup;
  dataloop: any;
  loopdata: any=[];
  id: any;
  imageUrl: any;
  file: any;
  imageType: any;

  constructor(private router: Router, public mainService: MainService, public active: ActivatedRoute) { 

    this.active.queryParams.subscribe((params)=>{
      this.id = params.value;
      console.log("hgfhjfjhgf",params);
    })
  }

  ngOnInit() {
    this.form();
    this.categorylist();
    this.getSubcategoryList();
  }

  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      category: new FormControl(''),
    });
  }


    // ------------ get sub category list -------------- // 

    getSubcategoryList() {
      this.mainService.showSpinner();
      this.mainService.getApi('subCategory/viewSubCategory/'+ this.id, 1).subscribe((res: any) => {
        console.log("get sub category list response ==>", res);
        if (res.responseCode == 200) {
          this.mainService.hideSpinner();
          this.mainService.successToast(res.responseMessage);
          this.imageUrl = res.result.image;
          // console.log("data",this.subCategoryData);
          this.addSubadminForm.patchValue({
           name : res.result.subCategoryName,
           category : res.result.categoryId,
          })
          
        } else {
          this.mainService.hideSpinner();
          // this.mainService.errorToast(res.responseMessage);
        }
      })
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


}
