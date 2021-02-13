import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

declare var $ :any;
declare var google:any;
@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.scss']
})
export class BiddingComponent implements OnInit {
  
  viewBiddingProduct: any;
  selected: string = "dashboard";
  selectTab2: string = "myBiddingHistory";

  noOfItem: number= 0; // price counter
  getNoOfItem: number = 223; // value get from backend
  firstName: any;
  bankDetailsArr: any;
  uesrId: any;
  categories: any;
  subcategories: any;
  popularCategories: any;
  popularProduct: any;
  page: number=1;
  limit: any = 5; 
  total: any;
  search: any='';
  bannerImages: any;
  productId: any=[];
  productList: any=[];
  newProductList: any= [];
  gettingTime: any;
  x: any;
  orderHistoryData: any;
  cross:any;
  caruoselImages: any;
  position = 0;
  image: any;
  auctionHistoryData: any;
  chatList: any=[];
  chatTabActive = "all";
  tabActive: any;
  myBiddingHistoryData: any;
  customStripeForm:FormGroup;
  address: any;
  paymentProductId: any;
  searchChange = new Subject<string>();

  constructor(public server: ServerService, private router: Router,private spinner : NgxSpinnerService) {
    this.uesrId = localStorage.getItem('user_id');
    window.scrollTo(0, 0);
    this.searchChange.debounceTime(800).distinctUntilChanged().subscribe(response => {
      this.router.navigate(['/bidding-product'], {queryParams: {search: response}});
    })
    this.gettingCurrentLocation();
    this.cross ="assets/images/cross.png";
   }

  ngOnInit() {
    // this.viewBiddingProductImage()hhhhj
    this.noOfItem = this.getNoOfItem;
    // this.categoryList();
    this.gettingProductImages();
    this.geetingPopularCategory();
    this.gettingPopularProduct();
    this.chatHistory();
    this.initFields();
    this.loadStripe();

  }

//getting current location
  gettingCurrentLocation(){
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
       function success(position) {
         // for when getting location is a success
         console.log('latitude', position.coords.latitude, 
                     'longitude', position.coords.longitude);
                     var lat = position.coords.latitude;
                     var lng = position.coords.longitude;
                     let geocoder = new google.maps.Geocoder;
        
                     var latlng = new google.maps.LatLng(lat, lng);
                     let request = {
                       location: latlng
                     };
                     geocoder.geocode(request, function (results, status) {
                      //  console.log("status",status)
                       if (status == google.maps.GeocoderStatus.OK) {
                           if (results[1]) {
                              //  console.log(results[1].formatted_address);
                              console.log(results[8].formatted_address);
                              var current = results[8].formatted_address;
                              console.log(current)
                              // this.go(this.current);
                              document.getElementById('location').innerHTML = current
                   
                           } else {
                              //  console.log('Location not found');
                               this.server.showInfoToast('Location not found')
                           }
                       } else {
                           console.log('Geocoder failed due to: ' + status);
                       }
                      
                   }),
      function error(error_message) {
        // for when getting location results in an error
        console.error('An error has occured while retrieving location', error_message)
      }
    });
    } else {
      // geolocation is not supported
      // get your location some other way
      this.server.showInfoToast('geolocation is not enabled on this browser')
      // console.log('geolocation is not enabled on this browser')
    }
  
  }


  // to check tab
  selectTab(path) {
    // this.router.navigateByUrl('bidding/' + path)
    this.selected = path
    // this.page = 1
    //this.total = 0
    if (path == 'dashboard') {
      // this.categoryList();
      //this.classroomList=[];
      //this.classroom()
      this.geetingPopularCategory();
      this.gettingPopularProduct();
      this.gettingProductImages();
    } else if (path == 'sell_Auction') {
      this.categoryList();
    } else if (path == 'wishlist') {
      // this.contactList=[];
      //this.getCategoryList();
      this.gettingWishList();
    } else if (path == 'chats') {
      this.chatHistory();
    } else if (path == 'auction_History') {
      this.gettingAuctionHistory();
    } else if (path == 'orderHistory') {
      //this.discoverClassroomList=[];
      //this.discoverClassroom()
      this.selectTab2 = 'myBiddingHistory';

    }
  }

  //getting Auction History 
  gettingAuctionHistory(){
    // this.server.showSpinner();
    let apireq = {
      "userId":this.uesrId
    }
    this.server.postApi('user/sellOnAuctionHistory',apireq).subscribe(success=>{
      // this.server.hideSpinner();
      if(success.responseCode == 200){
        this.auctionHistoryData = success.auctionData;
        console.log("Auction_Data ",this.auctionHistoryData);
      }
    },error=>{
      // this.server.hideSpinner();
      console.log(error);
    })
  }


  get(data){
   alert('Get'+data)
  }

  viewBiddingProductImage() {
    let data = {
      // "_id": '5d8d91177928852ea15e0250',
    }
    if (navigator.onLine) {
      this.viewBiddingProduct = this.server.get('user/viewBiddingProductImg', data).subscribe((res) => {
        this.viewBiddingProduct.unsubscribe()
        if (res.responseCode == 200) {
          this.bankDetailsArr=res.result;
          // console.log("Product Images =-=-=>",this.bankDetailsArr);
          //console.log("-------->>>>",this.bankDetailsArr)
          //this.server.showSuccToast('Added Successfully')


        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  // price counter
  increament() {
   this.noOfItem++;
  }  
  decreament() {
    if(this.noOfItem== this.getNoOfItem){
      return console.log("it can not be less then bidding price")
    }
    this.noOfItem--;
  }

   checkValue(){
    this.debounceTime()
    console.log("value of input field",this.noOfItem)
  }
  debounceTime(){
      setTimeout(() => {
        if(this.noOfItem<this.getNoOfItem){
          console.log("value can not be less then bidding value")
          return this.noOfItem = this.getNoOfItem; 
        }
      }, 5000);
    }



  // getting all category list 
  categoryList(){
    this.uesrId = localStorage.getItem('user_id');
    let apireq={
      'userId': this.uesrId
    }
    // console.log("->",apireq)
    this.server.postApi('user/biddingByCategory',apireq).subscribe(success =>{
      if(success.responseCode == 200){
        this.categories = success.result;
        // console.log(success.result);
        // this.subCategories()
      }
    },error=>{
      console.log(error);
    });
  }

  //getting subcategory with the help of category id
  getSubCategory(id){
    // console.log("id",id);
    let apireq= {
      "userId": this.uesrId,
      "categoryId":id
    }
    // console.log("apireq",apireq);
    this.subcategories = null
    this.server.postApi('user/biddingByCategory',apireq).subscribe(success =>{
      if(success.responseCode ==200){
        // console.log("List Of sub category",success);
        this.subcategories = success.result;

        // console.log("subcategory list",this.subCategories);
      }
    },error =>{
      console.log(error);
    })
  }

//opening subcategory
  openSubCategory(data) {
    console.log("Id ",data);
    var ele = document.getElementById(`collapse${data._id}`);
    var ele1 = document.getElementsByClassName("collapse");
    if(ele.classList.contains("show")){
      ele.classList.remove("show");
    }
    else {
      for(var i=0;i<ele1.length;i++) {
        if(ele1[i].id != `collapse${data._id}`) {
          if(ele1[i].classList.contains("show")) {
            ele1[i].classList.remove("show");
          }
        }
      }
      ele.classList.add("show");
    }
    this.getSubCategory(data._id)
  }

  //getting subcategories
  subCategories(){
    let apireq= {
      'userId': this.uesrId
    }
    this.server.postApi('user/biddingBySubCategory',apireq).subscribe(success=>{
      if(success.responseCode == 200){
        // console.log("getting subcategory list -->",success.auctionData);
      }
    },error=>{
      console.log(error);
    })
  }

  //Getting popular category
  geetingPopularCategory(){
    let apireq= {
      // 'search' : this.search
    }
    this.server.postApi('user/popularAuctionCategory',apireq).subscribe(success=>{
      if(success.responseCode == 200){
        this.popularCategories =  success.result;
        // console.log("Most Popular Category",success);
      }
    },error=>{
      console.log(error);
    })
  }

  //Getting popular product
  gettingPopularProduct(){
    let apireq= {
      //
    }
    this.server.postApi('user/popularBiddingProduct',apireq).subscribe(success=>{
      if(success.responseCode == 200){
        this.popularProduct = success.result;
        console.log("Popular Product",this.popularProduct);
      }
    },error=>{
      console.log(error);
    })
    }

    //seraching by category and product name 
    searchByCategoryAndProduct(val){
      this.search = val;
      console.log(this.search);
      // debounce(function(){
      //   console.log("hjgsjk");
      // },2000)
    }


    //getting all products images
    gettingProductImages(){
      
      this.server.getApi('user/getBannerImage').subscribe(success=>{
          this.bannerImages = success.bannerResult.docs;
          this.image = this.bannerImages[0].image;
          // console.log("Carousel Images",this.caruoselImages);
          // console.log("images==--=->",this.image)


      },error=>{
        console.log(error);
      })
    }

    //change bannser images
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

    //getting bidding wishlist
    gettingWishList(){
      this.server.showSpinner();
      let apireq = {
        'userId': this.uesrId
      }
      // console.log('user id',apireq);

      this.server.postApi('user/viewWishlistBidding',apireq).subscribe(success=>{
        this.server.hideSpinner();
        if(success.responseCode == 200){
          console.log(success);
          this.productId = success.listResult.wishList;
          this.newProductList= [];
          console.log("wishlist product list",this.productId);
          if(this.productId){
            this.biddingByProduct();
          }
        }
      },error=>{
        console.log(error);
        this.server.hideSpinner();
      })
    }

    //getting bidding wish list product by the help of product id
    biddingByProduct(){
      this.server.showSpinner();
      let apireq ={
        'userId':this.uesrId
      }
      this.server.postApi('user/biddingByProduct',apireq).subscribe(success=>{
        this.server.hideSpinner();
        if(success.responseCode == 200){
          this.productList = success.result;
          this.newProductList = []
          this.productList.map(c =>{
            this.productId.map(y=>{
              if(y == c._id){
                this.newProductList.push(c);
              }
            })
          })
         if(this.newProductList){
          this.newProductList.forEach((element,index)=> {
            this.gettingTime =  new Date(element.endTime).getTime();
            var id = index;
            // this.conwndownFunction(this.gettingTime,id);
          })
        }
          console.log("Product List====>", this.productList);
          console.log(" New Product List====>", this.newProductList);
        }
      },error=>{
        this.server.hideSpinner();
        console.log(error);
      })
    }

    // Confirm bidding
    // confirmBidding(){
    //   let currentTime = new Date().getTime();
    //   let apireq = {
    //     "bidderId":this.uesrId,
    //     "auctionId":"5dbd1360e6f8083fe6519a1d",
    //     "enterBidding":8000,
    //     "startTime":currentTime,
    //   }
    //   this.server.postApi('user',apireq).subscribe(success =>{
    //     $('Congratulations').modal('show');
    //     console.log(success);
    //   },error=>{
    //     console.log(error);
    //   })
    // }

    //Remove WishList
    removeWishList(product_id){
      this.server.showSpinner();
      let apireq = {
        'userId':this.uesrId,
        'productId':product_id
      }
      console.log("api request from remove wishList ",apireq);
      this.server.postApi('user/removeWishList',apireq).subscribe(success=>{
        console.log(success); 
        this.gettingWishList();
        // window.location.reload();
        this.server.hideSpinner();
      },error=>{
        console.log(error);
        this.server.showErrToast(error);
        this.server.hideSpinner();
      })
    }


    selectedTab2(path){
      this.selectTab2 = path;
      if(path== 'myBiddingHistory'){
        console.log('myBiddingHistory');
        this.myBiddingHistory();
      }else if(path == 'myOrderHistory'){
        console.log('myOrderHistory')
        this.orderHistory();
      }
    }

    //order history
    orderHistory(){
      this.server.showSpinner()
      let apireq = {
        "bidderid": this.uesrId,
      }
      this.server.postApi('user/orderHistory',apireq).subscribe(success=>{
        this.server.hideSpinner();
        if(success.responseCode == 200){
          console.log(success);
          this.orderHistoryData = success.orderData;
        }
      },error=>{
        this.server.hideSpinner();
        console.log(error);
      });
    }

    //bidding history
    myBiddingHistory(){
      this.server.showSpinner();
      let apireq = {
        'bidderId': localStorage.getItem('user_id') ,
      }
      this.server.postApi('user/myBiddingHistory',apireq).subscribe(success=>{
        this.server.hideSpinner();
        if(success.responseCode == 200){
          this.myBiddingHistoryData = success;
        }
        console.log("bidding history data ",this.myBiddingHistoryData)
      },error=>{
        console.log(error);
      })
    }

    // Cancel Auction History
    cancelAuctionHistory(id){
      let apireq = {
          "userId":this.uesrId,
          "auctionId":id,
          "status":"Cancel"
          }
      
      this.server.postApi('user/upadteAuctionStatus',apireq).subscribe(success=>{
        if( success.responseCode == 200 ){
          this.gettingAuctionHistory();
          console.log(success);
        }
      },error=>{
        console.log(error);
      })
    }

//changing tab
    changeChatTab(val) {
      this.chatTabActive = val;
      window.scrollTo(0, 0);
    }

    //getting chatHistory
    chatHistory() {
      let data = {
        "userId": localStorage.getItem("user_id")
      }
      console.log("userid =--=-=-=>",data);
      this.server.sendNewMessage(data, "chatHistory");
      this.server.getNewMessage('chatHistory').subscribe(msg => {
        console.log("get message====>", msg)
        if(msg['responseCode'] == 200) {
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
      })
    }

    //getting Online user
    // getOnlineUsers() {
    //   let data = {
    //     "userId": " "
    //   }
    //   this.server.sendNewMessage(data, "OnlineUser");
    //   this.server.getNewMessage("OnlineUser").subscribe(msg => console.log(msg));
    // }

    changeTab(val) {
      if (val == 'sell')
        // this.getCategories("");
      this.tabActive = val;
      window.scrollTo(0, 0)
        this.chatHistory();
      // }
    }

    // open a particular chat 
    openChat(chat) {
      console.log("particular chat details =-==->",chat);
      this.router.navigate(['/bidding-chat-conversation'], {queryParams: {ids: [chat.receiverId, chat.productId._id]}});
    }

    //On clicking Buy Now
    buyNow(id){
      this.paymentProductId = id
      $('#changeStatus').modal('show');
    }

    initFields() {
      this.customStripeForm = new FormGroup({
        cardNumber: new FormControl('', [Validators.required]),
        expMonth: new FormControl('', [Validators.required]),
        expYear: new FormControl('', [Validators.required]),
        cvv: new FormControl('', [Validators.required, Validators.pattern(/^(?!0+$)[0-9]{3,4}$/)]),
      })
    }

    get cardNumber(): any {
      return this.customStripeForm.get('cardNumber');
    }
    get expMonth(): any {
      return this.customStripeForm.get('expMonth');
    }
    get expYear(): any {
      return this.customStripeForm.get('expYear');
    }
    get cvv(): any {
      return this.customStripeForm.get('cvv');
    }


    //getting address
    getAddress() {
      let data = {
        "userId": localStorage.getItem("user_id")
      }
      this.spinner.show();
      this.server.postApi('user/getAddress', data).subscribe((res) => {
        this.spinner.hide();
        res.data.address.forEach(obj => {
          if (obj.addressType) {
            this.address = obj;
          }
        });
        if (!this.address)
          this.address = res.data.address[0];
      }, (err) => {
        this.spinner.hide();
      });
    }

    //loading stripe..
    loadStripe() {
      if (!window.document.getElementById('stripe-custom-form-script')) {
        var s = window.document.createElement("script");
        s.id = "stripe-custom-form-script";
        s.type = "text/javascript";
        s.src = "https://js.stripe.com/v2/";
        s.onload = () => {
          window['Stripe'].setPublishableKey('pk_test_CjmBCanngv0x5LK0eJ0C2FT7');
        }
  
        window.document.body.appendChild(s);
      }
    }


    //paying (Stripe)
    pay(form) {

      if (!window['Stripe']) {
        this.server.showErrToast('Oops! Stripe did not initialize properly.');
        return;
      }
  
      // this.submitted = true;
  
      if (this.customStripeForm.invalid) {
        return;
      }
  
      // this.formProcess = true;
      if (!window['Stripe']) {
        this.server.showErrToast('Oops! Stripe did not initialize properly.');
        return;
      }
      (<any>window).Stripe.card.createToken({
        number: form.cardNumber,
        exp_month: form.expMonth,
        exp_year: form.expYear,
        cvc: form.cvc
      }, (status: number, response: any) => {
        console.log(status, response);
        if (status != 200) {
          this.server.showErrToast(response.error.message);
          return;
        }
        this.createOrder(response.id, response.card.id);
        // this.submitted = false;
        // this.formProcess = false;
        // if (status === 200) {
        //   this.message = `Success! Card token ${response.card.id}.`;
        // } else {
        //   this.message = response.error.message;
        // }
      });
    }

//Create Order

createOrder(token, cardId) {
  this.spinner.show();
  console.log("token id =----=->",token);
  let data = {
    // "biddingId":localStorage.getItem('biddingId'),
    "biddingId":this.paymentProductId,
    "bidderId":localStorage.getItem("user_id"),
    "id":token
  }
  this.spinner.show();
  this.server.postApi('user/buyBidding',data).subscribe((res) => {
    this.spinner.hide();
    if (res.responseCode == 200) {
      $('#changeStatus').modal('hide');
      this.router.navigate(['/bidding']);
      this.server.showSuccToast(res.responseMessage);
    } else {
      this.server.showErrToast(res.responseMessage);
    }
  }, (err) => {
    this.spinner.hide();
    console.log(err);
  })
}
    // createOrder(token, cardId) {
    //   this.spinner.show();
    //   console.log("token id =----=->",token);
    //   let data = {
    //     // "biddingId":localStorage.getItem('biddingId'),
    //     "biddingId":this.paymentProductId,
    //     "bidderId":localStorage.getItem("user_id"),
    //     "id":token
    //   }
    //   this.spinner.show();
    //   this.server.postApi('user/buyBidding',data).subscribe((res) => {
    //     this.spinner.hide();
    //     if (res.responseCode == 200) {
    //       $('#changeStatus').modal('hide');
    //       this.router.navigate(['/bidding']);
    //       this.server.showSuccToast(res.responseMessage);
    //     } else {
    //       this.server.showErrToast(res.responseMessage);
    //     }
    //   }, (err) => {
    //     this.spinner.hide();
    //     console.log(err);
    //   })
    // }
  
  }

