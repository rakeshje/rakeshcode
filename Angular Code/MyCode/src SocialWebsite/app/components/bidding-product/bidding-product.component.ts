import { Component, OnInit,OnDestroy } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';
import { ActivatedRoute ,Route} from '@angular/router';
import { Subject } from 'rxjs'


declare var $ : any ;
@Component({
  selector: 'app-bidding-product',
  templateUrl: './bidding-product.component.html',
  styleUrls: ['./bidding-product.component.scss']
})
export class BiddingProductComponent implements OnInit{
  userId: string;
  biddingProducts: any =[];
  page: Number = 1;
  limit: any = 5;
  search: any = '';
  countDownDate: any;
  id: Number;
  biddingPrice:any=0;
  product: any;
  x: any =0;
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  searchChange = new Subject<string>() 
  prodId: any=[];
  pid: any;
  noOfItem: any = [];
  getNoOfItem: any=[];


  constructor(private server: ServerService, private activatedRoute : ActivatedRoute) { 
    this.userId = localStorage.getItem('user_id');
  }

  //ngOnInit
  ngOnInit() {
    
    this.getBiddingProduct();
    this.activatedRoute.queryParams.subscribe(params=>{
      this.search  = params['search']
    })

    console.log("Search", this.search);
    this.searchChange.debounceTime(800).distinctUntilChanged().subscribe( success =>{
       this.search = success;
       this.searchByProduct(this.search);
    })
  }


  //getting Bidding Product
  getBiddingProduct(){
    console.log("search",this.search)
    let apireq={
      'userId': this.userId,
      "search": this.search
    }
   this.server.postApi('user/biddingByProduct',apireq).subscribe(success=>{
      if(success.responseCode == 200){
        console.log(success);
        this.biddingProducts= success.result;
        // console.log("biddingProduct",this.biddingProducts);
        this.biddingProducts.forEach(element => {
          this.prodId.push(element._id)
        });
        for (let i = 0; i < this.biddingProducts.length; i++) {
          this.noOfItem[i] = this.biddingProducts[i].productInitialCost,
          this.getNoOfItem[i] = this.biddingProducts[i].productInitialCost,
            this.pid = this.biddingProducts[i]._id
        }
        this.getWishlistedProducts();
      }
    },error=>{
      console.log(error);
    })

    var data = new Date().getTime();
    console.log("current Time =-=-=-=->",data);
  }

  //getting wish listed product
  getWishlistedProducts() {
    let data = {
      "userId": this.userId
    }
    this.server.postApi('user/viewWishlistBidding', data).subscribe((res)=> {
      this.server.showSpinner()
      this.biddingProducts.forEach(obj => {
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
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    });
  }

// add wishlist and remove wishlist 
  wishlist(id) {
    let data = {
      "userId": localStorage.getItem("user_id"),
	    "productId": id
    }
    this.server.showSpinner();
    var ele = document.getElementById(id);
    if(ele.classList.contains('heartActive')) {
      this.server.postApi('user/removeWishList', data).subscribe((res)=> {
        this.server.hideSpinner();
        ele.classList.remove("heartActive");
        this.server.showSuccToast(res.responseMessage);
      }, (err) => {
        this.server.hideSpinner()
        console.log(err);
      });
    } else {
      this.server.postApi('user/addWishlistBidding', data).subscribe((res)=> {
        this.server.hideSpinner();
        ele.classList.add("heartActive");
        this.server.showSuccToast(res.responseMessage);
      }, (err) => {
        this.server.hideSpinner()
        console.log(err);
      });
    }    
  }

 
  //decrement price
  decrement(i) {
     if(this.noOfItem[i] == this.getNoOfItem[i]){
       return console.log("it can not be less then bidding price")
     }
    this.noOfItem[i]--;
   }
   

  countReturn(val){
    return val
  }

//  incrementing bidding amount
 increment(i){
  this.noOfItem[i]++
 }



 //confirm bidding api integration
 confirmBidding(id,i){
   let currentTime = new Date().getTime();
   let apireq={
    "bidderId":localStorage.getItem('user_id'),
    "auctionId":id,
    "enterBidding":this.noOfItem[i],
    "startTime":currentTime,
   }
  //  console.log("bidding request :---->",apireq);
   this.server.postApi('user/biddingByUser',apireq).subscribe(success=>{
     if(success.responseCode == 200){
       $('#Congratulations').modal('show');
     }
   },error=>{
     console.log(error);
   })
 }

 //Search by product name
 searchByProduct(val){
  this.search = val;
  console.log("search",this.search);
  this.getBiddingProduct();
}

}
