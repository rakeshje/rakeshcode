import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-editproduct-category',
  templateUrl: './editproduct-category.component.html',
  styleUrls: ['./editproduct-category.component.css']
})
export class EditproductCategoryComponent implements OnInit {
  
  profile: any;
  editpdtcategoryForm: FormGroup;
  user: any;
  categoryId: any;
  

  constructor(private actRoute:ActivatedRoute,private route:Router,public mainService: MainService) {
    this.editpdtcategoryForm = new FormGroup({
      productName: new FormControl('',[Validators.required])
     })
   }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      console.log("categoryId",this.categoryId);
    });
    this.getproductcategory();
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
    console.log("profile", this.profile)
  }
  getproductcategory()
  {
    this.mainService.showSpinner();
    this.mainService.getApi('admin/viewProductCagtegory?categoryId='+this.categoryId,1).subscribe((res: any) => {
      if (res.responseCode == 200 && res.result) {
       this.user = res.result;
       this.profile = this.user.categoryImage
       this.editpdtcategoryForm.patchValue({
         'productName': this.user.categoryName
       })
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }
  
    editProduct()
    {
      this.mainService.showSpinner();
      let data = 
      {
        'categoryId': this.categoryId,
        'categoryName': this.editpdtcategoryForm.value.productName,
        'categoryImage': this.profile
      }
      console.log('editcat',data)
      this.mainService.putApi('admin/editProductCategory', data, 1).subscribe((res: any) => {
       if (res.responseCode == 200) {
          this.mainService.hideSpinner();
          this.route.navigateByUrl('product-category')
          this.mainService.successToast(res.responseMessage)
          this.route.navigateByUrl('product-category')
          console.log('editcat123')
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
