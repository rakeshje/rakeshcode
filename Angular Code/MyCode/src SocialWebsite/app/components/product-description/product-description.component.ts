import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location }from '@angular/common'

declare var $ : any
@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit{
  productId: any;
  userId: string;
  productInformation: any;
  countDownDate: number;
  wishList:boolean= false;
  noOfItem: any;
  getNoOfItem: any;
  x: any;
  endTime: any;
  countDownTime: any;
  startTime: any;
  image: any=[];
  position: number;
  bannerImages: any;

  constructor(private server : ServerService,  private activatedRoute: ActivatedRoute, private router : Router,private location : Location) { 
    this.userId = localStorage.getItem('user_id');
     this.activatedRoute.params.subscribe(params=>{
       this.productId = params['id'];
     });
    //  console.log("product id ", this.productId);
    console.log("userid", this.userId);
  }

  ngOnInit() {
    this.getProductDescript();
    this.gettingWishList();
  }

// getting Product description by product id 
  getProductDescript(){
    let apireq = {
      "userId":this.userId,
      "productId": this.productId
    }
    console.log("request data", apireq);
    this.server.postApi('user/biddingByProduct',apireq).subscribe(success=>{
      if( success.responseCode == 200){
        this.productInformation = success.result;
        this.noOfItem = this.productInformation.productInitialCost;
        this.getNoOfItem = this.productInformation.productInitialCost;
        this.countDownTime = this.productInformation.endTime;
        this.bannerImages = this.productInformation.productImages
        this.image = this.bannerImages[0].image;
        // this.countDownDate = new Date(this.productInformation.endTime).getTime();
        console.log("product information / Description",this.image);
        // this.coundownFunction(this.countDownDate);
      }
     
    },error=>{
      console.log(error);
    })
  }

  //On clicking confirm button
    confirmBidding(){
      var currentTime = new Date().getTime();
      let apireq = {
        "bidderId":localStorage.getItem('user_id'),
        "auctionId":this.productInformation._id,
        "enterBidding":this.noOfItem,
        "startTime":currentTime,
      }
      console.log("api request=----->",apireq);
      this.server.postApi('user/biddingByUser',apireq).subscribe(success=>{
        if( success.responseCode == 200){
          $('#Congratulations2').modal('show');
          localStorage.setItem('biddingId',JSON.stringify(success.biddingData._id))
          // console.log(success.biddingData._id);
        }
      },error=>{
        console.log(error);
      })
    }

    // wishListing product
    wishListProduct(){
      let apireq = {
          "userId":this.userId,
          "productId":this.productId
      }
      this.server.postApi('user/addWishlistBidding',apireq).subscribe(success =>{
        if(success.responseCode == 200){
          console.log(success);
          this.wishList = true;
          console.log("hjghghkghkg",this.wishList)
        }
      },error=>{
        console.log(error);
      });
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

    //getting wishList of products

    gettingWishList(){
      this.server.getApi('user/addWishlistBidding').subscribe(success=>{
        console.log(success);
      },error=>{   
        console.log(error);  
      })
    }

    // open chat screen
    openChat() {
      console.log("user Id", this.productInformation['userId']);
      console.log("id", this.productInformation['_id']);
      this.router.navigate(['/bidding-chat-conversation'], { queryParams: { ids: [this.productInformation['userId'], this.productInformation['_id'] ] } })
    }

    //change bannser images
    changeImage(val) {
      // switch (val) {
      //   case 1:
      //     this.position = this.position != 0 ? this.position - 1 : 0;
      //     this.image = this.bannerImages[this.position].image;
      //     break;
      //   case 2:
      //     this.position = this.position != this.bannerImages.length - 1 ? this.position + 1 : this.bannerImages.length - 1;
      //     this.image = this.bannerImages[this.position].image;
      //     break;
      // }
    }


    //on clicking cross button 
    back(){
      this.location.back();
    }
}

