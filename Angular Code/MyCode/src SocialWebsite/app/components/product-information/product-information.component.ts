import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { HeaderComponent } from '../header/header.component';

declare let $: any;

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {
  productDetail = [];
  description = "";
  reason = "";
  imagePopup: any = [];
  sizeChoosen: any = "";
  addCart: boolean = true;
  addedToCart: boolean = false;

  constructor(public server: ServerService, public activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, public router: Router, public header: HeaderComponent) {

  }

  ngOnInit() {
    this.getProductInfo();
  }

  getProductInfo() {
    this.imagePopup = [];
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi("user/shopByProduct", data).subscribe((res) => {
      this.spinner.hide();
      res.result.forEach(obj => {
        if (obj._id == this.activatedRoute.snapshot.params.id) {
          if(localStorage.getItem("cart")) {
            var ind = JSON.parse(localStorage.getItem("cart")).findIndex(x => x == obj._id);
            if (ind > -1)
            this.addedToCart = true;
          }          
          this.productDetail = obj;
          this.productDetail['createdAt'] = moment(this.productDetail['createdAt']).format("ll");
          this.productDetail['productImages'].forEach(obj => {
            this.imagePopup.push(obj.image);
          });
        }
      });
      if (this.productDetail['userId'] == localStorage.getItem("user_id"))
        this.addCart = false;
      this.getWishlistedProducts();
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    })
  }

  wishlist(id) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "productId": id
    }
    this.spinner.show();
    var ele = document.getElementById(id);
    if (ele.classList.contains('heartActive')) {
      this.server.postApi('user/removeWishListProduct', data).subscribe((res) => {
        this.spinner.hide();
        ele.classList.remove("heartActive");
        this.server.showSuccToast(res.responseMessage);
      }, (err) => {
        this.spinner.hide()
        console.log(err);
      });
    } else {
      this.server.postApi('user/addWishList', data).subscribe((res) => {
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
    if (this.productDetail['productSize'].length && this.sizeChoosen == "") {
      this.server.showErrToast("Select a size");
      return;
    }
    let data = {
      "userId": localStorage.getItem("user_id"),
      "productId": product._id
    }
    if (this.productDetail['productSize'].length)
      data['size'] = this.sizeChoosen;
    this.spinner.show();
    this.server.postApi('user/addCart', data).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        this.addedToCart = true;
        this.server.showSuccToast(res.responseMessage);
        this.header.getCart();
      }
      else
        this.server.showErrToast(res.responseMessage);
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  reportProduct() {
    $('#itemreport').modal('show');
  }

  submitReport() {
    var type = { fraud: "FROUD", notGoodQuality: "NOT GOOD QUALITY", other: "OTHER" };
    if (!this.reason)
      return;
    let data = {
      "userId": localStorage.getItem("user_id"),
      "productId": this.activatedRoute.snapshot.params.id,
      "reportType": type[this.reason],
      "reportDescription": this.description
    }
    this.spinner.show();
    this.server.postApi('user/itemReport', data).subscribe((res) => {
      if (res.responseCode == 200) {
        $('#itemreport').modal('hide');
        this.spinner.hide();
        this.server.showSuccToast(res.responseMessage);
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  getWishlistedProducts() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.server.postApi('user/getWishlistProduct', data).subscribe((res) => {
      this.spinner.hide();
      if(res.responseCode == 200) {
        if (res.listResult.wishList.includes(this.productDetail['_id'])) {
          var ele = document.getElementById(this.productDetail['_id']);
          ele.classList.add("heartActive");
        }
      }      
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  openCart() {
    this.router.navigate(['/view-cart']);
  }

  openImage() {
    $('#openImage').modal('show');
  }

  openChat() {
    this.router.navigate(['/chat-conversation'], { queryParams: { ids: [this.productDetail['userId'], this.productDetail['_id']] } })
  }

  chooseSize(val) {
    this.sizeChoosen = val;
  }

}
