import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-management',
  templateUrl: './add-product-management.component.html',
  styleUrls: ['./add-product-management.component.css']
})
export class AddProductManagementComponent implements OnInit {
  addproductForm: FormGroup;
  image: any= 'assets/img/profile-img.jpg';
  fileToupload: File= null;
  profile: any;
  user: any;
  categoryList: any=[];
  total: any;
  page: any=0;
  limit: any=10;
  id: any;
  item: string;

  constructor(private activate:ActivatedRoute,private route:Router,public mainService: MainService) {
    this.addproductForm = new FormGroup({
      productName: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      UsedFor: new FormControl('',[Validators.required]),
      type: new FormControl('',[Validators.required]),
      category: new FormControl('')
     })
 }

  ngOnInit() {
   this.getPdttcategoryList();
  }

  addProduct()
  {
    let data = 
    {
      'productName': this.addproductForm.value.productName,
      'price': this.addproductForm.value.price,
      'usedFor': this.addproductForm.value.UsedFor,
      'type': this.addproductForm.value.type,
      'categoryId': this.item,
      'image': this.profile
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/addProduct', data, 1).subscribe((res: any) => {
      console.log("addProduct response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage)
        this.route.navigateByUrl('product-management')
        
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
  
    addProductcategory()
    {
      let data = 
    {
      'categoryName': this.addproductForm.value.productName,
      'categoryImage': this.profile

    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/addProductCategory', data, 1).subscribe((res: any) => {
      console.log("addProduct response ==>", res)
      if (res.responseCode == 200 && res.result) {
        this.mainService.hideSpinner();
        this.user=res.result._id;
        this.mainService.successToast(res.responseMessage)
         this.route.navigateByUrl('product-management')
        
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
    getPdttcategoryList()
    {
      let object = {
        "page": this.page,
        "limit": this.limit
        }
      this.mainService.postApi('admin/productCategoryList', object, 1).subscribe(res => {
        console.log(" productList==>", res)
        if (res.responseCode == 200 && res.result && res.result.docs) {
          this.categoryList= res.result.docs;
          this.total = res.result.total;
          this.mainService.hideSpinner();
          this.mainService.successToast(res.responseMessage)
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
    selected( id)
  {
    this.item=id.target['value'];
    }
    
}
