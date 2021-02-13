import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-market-shop-by-product',
  templateUrl: './market-shop-by-product.component.html',
  styleUrls: ['./market-shop-by-product.component.scss']
})
export class MarketShopByProductComponent implements OnInit {
  productList = [];
  searchChange = new Subject<string>();
  searchValue: any = "";

  constructor(public server: ServerService, private spinner: NgxSpinnerService, public router: Router, public activatedRoute: ActivatedRoute) {
    this.searchChange.debounceTime(800).distinctUntilChanged().subscribe(response => {
      this.getProducts(response);
    })
   }

  ngOnInit() {
    var search = "";
    if(this.activatedRoute.snapshot.queryParams.search) {
      search = this.activatedRoute.snapshot.queryParams.search;
      this.searchValue = search;
    } else
    search = "";
    this.getProducts(search);
  }

  getProducts(val) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "search": val
    }
    this.spinner.show();
    this.server.postApi('user/shopByProduct', data).subscribe((res)=> {
      this.spinner.hide();
      if(res.responseCode == 200) {
        if(val == "")
        this.productList = res.result;
        else
        this.productList = res.result.docs;
      }
      // this.productList.forEach(obj => {
      //   obj.createdAt = this.getActualTime(obj.createdAt)
      // })
      this.getWishlistedProducts();
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  getActualTime(val) {
    return moment(val).format("ll")
  }

  wishlist(id) {
    let data = {
      "userId": localStorage.getItem("user_id"),
	    "productId": id
    }
    this.spinner.show();
    var ele = document.getElementById(id);
    if(ele.classList.contains('heartActive')) {
      this.server.postApi('user/removeWishListProduct', data).subscribe((res)=> {
        this.spinner.hide();
        ele.classList.remove("heartActive");
        this.server.showSuccToast(res.responseMessage);
      }, (err) => {
        this.spinner.hide()
        console.log(err);
      });
    } else {
      this.server.postApi('user/addWishList', data).subscribe((res)=> {
        this.spinner.hide();
        ele.classList.add("heartActive");
        this.server.showSuccToast(res.responseMessage);
      }, (err) => {
        this.spinner.hide()
        console.log(err);
      });
    }    
  }

  addToCart(product) {
    let data = {
      "userId": localStorage.getItem("user_id"),
	    "productId": product._id
    }
    this.spinner.show();
    this.server.postApi('user/addCart', data).subscribe((res)=> {
      this.spinner.hide();
      this.server.showSuccToast(res.responseMessage);
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  getWishlistedProducts() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.server.postApi('user/getWishlistProduct', data).subscribe((res)=> {
      this.spinner.hide();
      if(res.responseCode == 200) {
        this.productList.forEach(obj => {
          obj.createdAt = this.getActualTime(obj.createdAt);
          if(res.listResult.wishList.includes(obj._id)) {
            var ele = document.getElementsByClassName("fa-heart");
            for(var i = 0; i<ele.length; i++) {
              if(ele[i].id == obj._id) {
                var ele1 = document.getElementById(obj._id)
                ele1.style['color'] = '#666';
              }
            }
          }
        })
      }      
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  displayProduct(product) {
    this.router.navigate(["/product-information", product._id]);
  }
}
