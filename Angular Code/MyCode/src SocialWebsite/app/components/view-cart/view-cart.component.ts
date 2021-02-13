import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {
  cart = [];
  total = 0;
  productsId = [];

  constructor(public server: ServerService, public router: Router, public spinner: NgxSpinnerService, public header: HeaderComponent) { }

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.productsId = [];
    this.total = 0;
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi('user/viewAddToCart', data).subscribe((res) => {
      this.spinner.hide();
      if(res.responseCode == 200) {
        this.cart = res.listResult.addToCart;
        console.log("my cart", this.cart)
        if(this.cart.length) {
          // this.cart.forEach(obj => {
          //   this.productsId.push({
          //     "productId": obj.productId._id,
          //     "productQuantity":1
          //   })
          // })
          // localStorage.setItem("products", JSON.stringify(this.productsId));
        }
        this.getWishlistedProducts();
      } else if(res.responseCode == 404)
        this.cart = []; 
      else
      this.server.showErrToast(res.responseMessage);
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  removeProduct(product) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "cartId": product._id
    }
    this.spinner.show();
    this.server.postApi('user/removeCart', data).subscribe((res) => {
      this.spinner.hide();
      if(res.responseCode == 200) {
        var ind = this.cart.findIndex(x => x.productId._id == product.productId._id);
        if(ind > -1) {
          this.total -= this.cart[ind].productId.totalQuantity * this.cart[ind].productId.productCost;
          this.cart.splice(ind, 1);
          this.header.getCart();
        }
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

  placeOrder() {
    this.header.sendMessage(String(this.total));
    localStorage.setItem("products", JSON.stringify(this.productsId));
    localStorage.setItem("cartTotal", JSON.stringify(this.total));
    this.router.navigate(['/order-review']);
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

  getWishlistedProducts() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.server.postApi('user/getWishlistProduct', data).subscribe((res)=> {
      this.spinner.hide();
      this.cart.forEach(obj => {
        obj.productId.totalQuantity = 1;
        if(obj.productId.productSize.length) {
          this.productsId.push({
            "productId": obj.productId._id,
            "quantity": 1,
            "size": obj.size
          })
        } else {
          this.productsId.push({
            "productId": obj.productId._id,
            "productQuantity": 1
          })
        }        
        obj.productId.createdAt = moment(obj.productId['createdAt']).format("ll");
        this.total += obj.productId.productCost;
        if(res.listResult.wishList.includes(obj.productId._id)) {
          var ele = document.getElementsByClassName("fa-heart");
          for(var i = 0; i<ele.length; i++) {
            if(ele[i].id == obj.productId._id) {
              var ele1 = document.getElementById(obj.productId._id)
              ele1.style['color'] = '#666';
            }
          }
        }
      })
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  displayProduct(product) {
    this.router.navigate(["/product-information", product._id]);
  }

  chooseQuantity(val, id) {
    var ind = this.productsId.findIndex(x => x.productId == id);
    if(ind > -1) {
      if(this.productsId[ind].productQuantity)
      this.productsId[ind].productQuantity = val;
      else if(this.productsId[ind].quantity)
      this.productsId[ind].quantity = val;
    }
    this.total = 0;
    this.cart.forEach(obj => {
      if(obj.productId._id == id) {
        obj.productId.totalQuantity = val;
        this.total += val * obj.productId.productCost;
      } else
      this.total += obj.productId.totalQuantity * obj.productId.productCost;
    })
  }

}
