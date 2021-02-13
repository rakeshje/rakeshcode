import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  addSubadminForm: FormGroup;
  dataloop: any;
  loopdata: any=[];
  id: any;
  imageUrl: any;
  file: any;
  imageType: any;
  categoryId: any;

  constructor(private router: Router, public mainService: MainService, public active: ActivatedRoute) { 

    this.active.queryParams.subscribe((params)=>{
      this.id = params.value;
      console.log("hgfhjfjhgf",params);
    })
  }

  ngOnInit() {
    this.form();
    // this.categorylist();
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

  addCategoryComponent() {
    this.mainService.showSpinner();
    let data = {
      categoryId : this.id,
      image : this.imageUrl,
      productServiceType : this.addSubadminForm.value.category,
      categoryName : this.addSubadminForm.value.name
    }
    console.log("f",data);
    this.mainService.putApi('category/editCategory',data,1).subscribe((res)=>{
      console.log("fd", res);
      if(res.responseCode==200){
        this.mainService.hideSpinner()
        this.router.navigate(['/category-management'])
      }
      
    },(error)=>{
      this.mainService.errorToast('something went wrong')
    })
  }


    // getSubcategoryList() {
    //   this.mainService.showSpinner();
    //   this.mainService.getApi('subCategory/viewSubCategory/'+ this.id, 1).subscribe((res: any) => {
    //     console.log("get sub category list response ==>", res);
    //     if (res.responseCode == 200) {
    //       this.mainService.hideSpinner();
    //       this.mainService.successToast(res.responseMessage);
    //       this.imageUrl = res.result.image;
    //       this.categoryId = res.result.categoryId
    //       // console.log("data",this.subCategoryData);
    //       this.addSubadminForm.patchValue({
    //        name : res.result.subCategoryName,
    //        category : res.result.categoryId,
    //       })
          
    //     } else {
    //       this.mainService.hideSpinner();
    //       // this.mainService.errorToast(res.responseMessage);
    //     }
    //   })
    // }


}
