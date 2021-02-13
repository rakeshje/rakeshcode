import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

declare let $: any;

@Component({
  selector: 'app-marketing-dashboard',
  templateUrl: './marketing-dashboard.component.html',
  styleUrls: ['./marketing-dashboard.component.scss']
})
export class MarketingDashboardComponent implements OnInit {
  categoryList = [];
  tabActive = "dashboard";
  newCategoryList = [];
  orderHistory = [];
  orderId: any;
  wishlist = [];
  wishlistedProducts = [];
  bannerImages = [];
  image: any;
  position = 0;
  sellingHistory = [];
  changeStatusForm: FormGroup;
  popularCategory = [];
  popularProduct = [];
  chatTabActive = "all";
  chatList: any = [];
  searchChange = new Subject<string>();
  orderStatus: any;
  response: any;
  reasonToCancel: any = "";
  productId: any=[];

  constructor(public server: ServerService, private spinner: NgxSpinnerService, public router: Router) {
    window.scrollTo(0, 0);
    this.searchChange.debounceTime(800).distinctUntilChanged().subscribe(response => {
      this.router.navigate(['/marketing-product'], {queryParams: {search: response}});
    })
  }

  ngOnInit() {
    this.getCategories("");
    this.getOrderHistory();
    this.getWishlist();
    this.getBannerImage();
    this.getSellingHistory();
    this.getPopularCategory();
    this.getPopularProduct();
    this.chatHistory();
    this.changeStatusForm = new FormGroup({
      status: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required])
    })
  }

  get status(): any {
    return this.changeStatusForm.get('status');
  }
  get id(): any {
    return this.changeStatusForm.get('id');
  }

  getPopularCategory() {
    this.spinner.show();
    this.server.postApi('user/popularCategory', {}).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200)
        this.popularCategory = res.result.docs;
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

  getPopularProduct() {
    this.spinner.show();
    this.server.postApi('user/popularProduct', {}).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200)
        this.popularProduct = res.result.docs;
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

  getCategories(val) {
    let data = {
      "categoryId": val
    }
    this.spinner.show()
    this.server.postApi('user/shopByCategory', data).subscribe((res) => {
      this.spinner.hide()
      if (res.responseCode == 200) {
        if (val == "")
          this.categoryList = res.result;
        else
          this.newCategoryList = res.result;
      } else if(res.responseCode == 404) {
        if(val != "")
        this.newCategoryList = [];
      }
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  changeTab(val) {
    if (val == 'sell')
      this.getCategories("");
    this.tabActive = val;
    window.scrollTo(0, 0)
  }

  changeChatTab(val) {
    this.chatTabActive = val;
    window.scrollTo(0, 0);
  }

  openSubCategory(data) {
    var ele = document.getElementById(`collapse${data._id}`);
    var ele1 = document.getElementsByClassName("collapse");
    if (ele.classList.contains("show"))
      ele.classList.remove("show");
    else {
      for (var i = 0; i < ele1.length; i++) {
        if (ele1[i].id != `collapse${data._id}`) {
          if (ele1[i].classList.contains("show")) {
            ele1[i].classList.remove("show");
          }
        }
      }
      ele.classList.add("show");
    }
    this.getCategories(data._id)
  }

  getSubCategory() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.server.postApi('user/shopBySubCategory', data).subscribe((res) => {
      console.log(res);
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  getOrderHistory() {
    this.orderHistory = [];
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi('user/productOrderHistory', data).subscribe((res) => {
      console.log("my order",res )
      this.spinner.hide();
      if (res.responseCode == 200) {
        this.orderHistory = res.paymentData.docs;
        
        console.log("my order data", this.orderHistory)
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    });
  }

  cancel(order,data) {
    let onlyPending = order.productDescription.filter(itm=>itm.status=="Pending").length;
    console.log("fff",onlyPending);
    
    if(onlyPending==1){
      this.orderId = order._id;
      this.orderStatus = order.orderStatus;
    }else{
      console.log("464445", order, 'hhfdhf', data)
    
      console.log("ndjkcf", order)
      this.orderId = order._id;
      this.orderStatus = order.orderStatus;
      this.productId=data.productId
      console.log("jfrkjfg",this.productId)
      this.reasonToCancel = "";
    }
    console.log("dj",this.orderId,this.orderStatus,this.productId );
    
    // this.productId=
    $('#cancelProduct').modal('show');
  }

  hideModal(val) {
    $(`#${val}`).modal('hide');
  }

  // cancelOrder() {
  //   if(this.productId ==[]){
  //     var data = {
  //       "userId": localStorage.getItem("user_id"),
  //       "orderId": this.orderId,
  //       "orderStatus": this.orderStatus == "Pending" ? "Cancel" : "Return"
  //     }
  //   }
  //     else{
  //       var data1 = {
  //         "userId": localStorage.getItem("user_id"),
  //         "orderId": this.orderId,
  //         "orderStatus": this.orderStatus == "Pending" ? "Cancel" : "Return",
  //         "productId" :this.productId
  //       }
  //     }
    
  //  console.log('data',data||'data1',data1)
    
  //   this.spinner.show();
  //   this.server.postApi('user/changeProductStatusByBuyer', data||data1).subscribe((res) => {
  //     this.spinner.hide();
  //     if (res.responseCode == 200) {
  //       $('#cancelProduct').modal('hide');
  //       this.server.showSuccToast(res.responseMessage);
  //       this.getOrderHistory();
  //     } else {
  //       this.server.showErrToast(res.responseMessage);
  //     }
  //   }, (err) => {
  //     this.spinner.hide();
  //     console.log(err);
  //   });
  // }


  cancelOrder() {
    if(this.productId ==[]){
      var data = {
        "userId": localStorage.getItem("user_id"),
        "orderId": this.orderId,
        "orderStatus": this.orderStatus == "Pending" ? "Cancel" : "Return"
      }
    }
      else{
        var data1 = {
          "userId": localStorage.getItem("user_id"),
          "orderId": this.orderId,
          "orderStatus": this.orderStatus == "Pending" ? "Cancel" : "Return",
          "productId" :this.productId
        }
      }
    
   console.log('data',data||'data1',data1)
    
    this.spinner.show();
    this.server.postApi('user/changeProductStatusByBuyer', data||data1).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        $('#cancelProduct').modal('hide');
        this.server.showSuccToast(res.responseMessage);
        this.getOrderHistory();
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    });
  }

  
  getWishlist() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi('user/getWishlistProduct', data).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        this.wishlist = res.listResult.wishList;
        this.getProducts();
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    });
  }

  getProducts() {
    this.wishlistedProducts = [];
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi('user/shopByProduct', data).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        res.result.forEach(obj => {
          for (var i = 0; i < this.wishlist.length; i++) {
            if (obj._id == this.wishlist[i]) {
              obj.createdAt = this.getActualTime(obj.createdAt);
              this.wishlistedProducts.push(obj);
            }
          }
        });
      }
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  getActualTime(val) {
    return moment(val).format("ll")
  }

  removeFromWishlist(id) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "productId": id
    }
    this.spinner.show();
    this.server.postApi('user/removeWishListProduct', data).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        this.server.showSuccToast(res.responseMessage);
        this.getWishlist();
      }
      else
        this.server.showErrToast(res.responseMessage);
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  addToCart(id) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "productId": id
    }
    this.spinner.show();
    this.server.postApi('user/addCart', data).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200)
        this.server.showSuccToast(res.responseMessage);
      else
        this.server.showErrToast(res.responseMessage);
    }, (err) => {
      this.spinner.hide()
      console.log(err);
    });
  }

  addProduct(sub, category) {
    this.router.navigate(['/add-product'], { queryParams: { ids: [sub._id, category._id] } });
  }

  getBannerImage() {
    this.server.getApi('user/getBannerImage').subscribe((res) => {
      if(res.responseCode == 200) {
        this.bannerImages = res.bannerResult.docs;
        this.image = this.bannerImages[0].image;
      } else
      this.bannerImages = [];
    }, (err) => {
      console.log(err);
    });
  }

  changeImage(val) {
    switch (val) {
      case 1:
        this.position = this.position != 0 ? this.position - 1 : 0;
        this.image = this.bannerImages[this.position].image;
        break;
      case 2:
        this.position = this.position != this.bannerImages.length - 1 ? this.position + 1 : this.bannerImages.length - 1;
        this.image = this.bannerImages[this.position].image;
        break;
    }
  }

  getSellingHistory() {
    let data = {
      "sellerId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi('user/sellingHistory', data).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        this.sellingHistory = res.paginateData.docs;
        this.sellingHistory.forEach(obj => {
          obj.sellStatus = obj.sellStatus.toUpperCase();
          obj.createdAt = this.getActualTime(obj.createdAt);
        })
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

  editStatus(data) {
    this.changeStatusForm.controls['id'].setValue(data._id);
    $('#changeStatus').modal('show');
  }

  changeProductStatus() {
    let data = {
      "sellerId": localStorage.getItem("user_id"),
      "productId": this.changeStatusForm.value.id,
      "sellStatus": this.changeStatusForm.value.status
    }
    this.spinner.show();
    this.server.postApi('user/sellingHistoryEdit', data).subscribe((res) => {
      if (res.responseCode == 200) {
        this.server.showSuccToast(res.responseMessage);
        $('#changeStatus').modal('hide');
        this.getSellingHistory();
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

  chatHistory() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    console.log("my history", data)
    this.server.sendNewMessage(data, "markettingChatHistory");
    this.response = this.server.getNewMessage('markettingChatHistory').subscribe(msg => {
      console.log("my history", msg)
      if(msg['responseCode'] == 200) {
        if(msg['result'].length) {
          msg['result'].forEach(obj => {
            this.chatList.push({
              senderId: obj.userId._id,
              receiverId: obj.sellerId._id,
              productId: obj.productId,
              receiverName: obj.sellerId.firstName,
              receiverProfile: obj.sellerId.profilePic,
              message: obj.message,
              createdAt: moment(obj.updatedAt).format('LT'),
              type: obj.productId.userId == obj.userId._id ? "selling" : "buying"
            })
          });
        }        
        this.getOnlineUsers();
      }
    })
  }

  openChat(chat) {
    this.router.navigate(['/chat-conversation'], {queryParams: {ids: [chat.receiverId, chat.productId._id]}});
  }

  getOnlineUsers() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.server.sendNewMessage(data, "OnlineUser");
    this.server.getNewMessage("OnlineUser").subscribe(msg => {
      console.log(msg)
    });
  }

  ngOnDestroy() {
    this.response.unsubscribe();
  }

}
