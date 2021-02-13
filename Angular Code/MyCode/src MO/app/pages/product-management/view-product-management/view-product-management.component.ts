import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';


@Component({
  selector: 'app-view-product-management',
  templateUrl: './view-product-management.component.html',
  styleUrls: ['./view-product-management.component.css']
})
export class ViewProductManagementComponent implements OnInit {
  productId: string;
  user: any;
  profile: void;
  

  constructor(private activate:ActivatedRoute,private route:Router,public mainService: MainService) { }

  ngOnInit() {
    this.activate.paramMap.subscribe(params => {
      this.productId = params.get('id');
      console.log("productId for view",this.productId);
    });

    this.viewProduct();
  }

  viewProduct()
  {
    this.mainService.showSpinner();

    this.mainService.getApi('admin/viewProduct?productId='+this.productId,1).subscribe((res: any) => {
      console.log("viewProduct response ==>", res)
      if (res.responseCode == 200 && res.result) {
        this.user = res.result;
        this.profile= this.user.image;
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

}
