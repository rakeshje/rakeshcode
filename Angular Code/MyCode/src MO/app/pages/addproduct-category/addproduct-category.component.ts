import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addproduct-category',
  templateUrl: './addproduct-category.component.html',
  styleUrls: ['./addproduct-category.component.css']
})
export class AddproductCategoryComponent implements OnInit {
  addproductcategoryForm: FormGroup;
  user: any;
  profile: any;

  constructor(private activate:ActivatedRoute,private route:Router,public mainService: MainService) {
    this.addproductcategoryForm = new FormGroup({
      productName: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      UsedFor: new FormControl('',[Validators.required]),
      type: new FormControl('',[Validators.required])
     })
   }

  ngOnInit() {
  }
  

  
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.profile = reader.result;
    console.log("profile123", this.profile)
  }
  
  addProductCategory()
    {
      let data = 
    {
      'categoryName': this.addproductcategoryForm.value.productName,
      'categoryImage': this.profile

    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/addProductCategory', data, 1).subscribe((res: any) => {
      console.log("addProduct response ==>", res)
      if (res.responseCode == 200 && res.result) {
        this.mainService.hideSpinner();
        this.user=res.result._id;
        console.log("categoryId",this.user)
        this.mainService.successToast(res.responseMessage)
        this.route.navigateByUrl('product-category')
        
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
      error => {
        this.mainService.hideSpinner();
        this.mainService.errorToast(error.responseMessage)
      }
    })

    }

}
