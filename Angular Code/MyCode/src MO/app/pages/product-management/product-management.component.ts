import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
declare var $: any;




@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  
  search: string;
  productlists: any = [];
  page: number= 1;
  limit:number= 10;
  productId: any;
  itemPerPage: number=10;
  p: any=0;
  status: any;
  

  constructor(private router: Router,public mainService: MainService) {
    
    
   }

  ngOnInit() {
    this.productList();
  }

  searchValue() {
   
    this.mainService.showSpinner();
    let object = {
      "search": this.search,
      "page": this.page,
      "limit": this.limit
      }
    this.mainService.postApi('admin/productList', object, 1).subscribe(res => {
      console.log(" productList==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage)
        this.productlists = res.result.docs
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
  productList()
  {
    this.mainService.showSpinner();
    
    let object = {
      "page": this.page,
      "limit": this.limit
      }
    this.mainService.postApi('admin/productList', object, 1).subscribe(res => {
      console.log(" productList==>", res)
      if (res.responseCode == 200 && res.result && res.result.docs) {
        console.log('shweta',res.result)
        this.productlists = res.result.docs
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
  deleteFunction(id) {
     this.productId  = id
     console.log('delete modal', this.productId)
    $('#deleteModal').modal({ backdrop: 'static', keyboard: false })
  }
  deleteUser()
  {
    this.mainService.showSpinner()
    let object = {
      'productId': this.productId
    }

    this.mainService.deleteApi('admin/deleteProduct',object,1).subscribe(res => {
      console.log('delete id=========>', res)
      if (res.responseCode == 200) {
       this.productList()
        this.mainService.hideSpinner()
        $('#deleteModal').modal('hide');
        this.mainService.successToast(res.responseMessage)
       
      } else {
        this.mainService.hideSpinner()
        this.mainService.errorToast(res.responseMessage)
      }
    }, error => {
      this.mainService.hideSpinner()
      this.mainService.errorToast(error.responseMessage)
    })
  }
  blockFunction(id,status)
  {
    this.productId  = id
    if(status=="ACTIVE"){
this.status="BLOCK"
    }
    else{
      this.status="ACTIVE"
    }
     console.log('Block Modal', this.productId)
    $('#blockModal').modal({ backdrop: 'static', keyboard: false })
 }
 blockUser()
 {
  this.mainService.showSpinner()
  let data = {
    'productId': this.productId
  }

  this.mainService.postApi('admin/blockUnblockProduct',data,1).subscribe(res => {
    console.log('block id=========>', res)
    if (res.responseCode == 200) {
      this.productList()
      this.mainService.hideSpinner()
      $('#blockModal').modal('hide');
      this.mainService.successToast(res.responseMessage)
    } else {
      this.mainService.hideSpinner()
      this.mainService.errorToast(res.responseMessage)
    }
  }, error => {
    this.mainService.hideSpinner()
    this.mainService.errorToast(error.responseMessage)
  })

 }
 pagination(event) {
  console.log(event)
  this.itemPerPage = event;
  this.productList()
}

}
