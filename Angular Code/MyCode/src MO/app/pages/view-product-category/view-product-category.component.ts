import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-product-category',
  templateUrl: './view-product-category.component.html',
  styleUrls: ['./view-product-category.component.css']
})
export class ViewProductCategoryComponent implements OnInit {
  categoryId: any;
  user: any;

  constructor(public mainService: MainService, private activatedroute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      console.log("priya",this.categoryId);
    });
    this.getproductcategory()
  }
  getproductcategory()
  {
    this.mainService.showSpinner();
    this.mainService.getApi('admin/viewProductCagtegory?categoryId='+this.categoryId,1).subscribe((res: any) => {
      if (res.responseCode == 200 && res.result) {
       this.user = res.result;
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  }


