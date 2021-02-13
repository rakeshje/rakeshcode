import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bidding-category',
  templateUrl: './bidding-category.component.html',
  styleUrls: ['./bidding-category.component.scss']
})
export class BiddingCategoryComponent implements OnInit {
  userId: string;
  categories: any;
  subcategories: any;
  search: any= '';
  constructor(private server: ServerService,private router : Router) { 
    this.userId = localStorage.getItem('user_id');
  }

  ngOnInit() {
    this.gettingBiddingCategory();
  }

//getting bidding category
  gettingBiddingCategory(){
   
    console.log("user id ",this.userId);
    let apireq={
      'userId' : this.userId,
      'serachByCategory' : this.search
    }
    this.server.postApi('user/biddingByCategory',apireq).subscribe(success=>{
      // console.log(success);hh
      this.categories = success.result;
    },error=>{
      console.log(error);
    })
  }

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

  //getting sub category
  getSubCategory(id){
    console.log("id",id);
    let apireq= {
      "userId": this.userId,
      "categoryId":id
    }
    console.log("apireq",apireq);
    this.subcategories = null
    this.server.postApi('user/biddingByCategory',apireq).subscribe(success =>{
      if(success.responseCode ==200){
        // console.log("List Of sub category",success);
        this.subcategories = success.result;
      }
    },error =>{
      console.log(error);
    })
  }

  //serch bidding by category name
  serchBiddingByCategoryName(val){
    // console.log("serched value",val);
    this.search = val;
    this.gettingBiddingCategory();
  }

  addProduct(sub, category) {
    this.router.navigate(['/add-product-bidding'], { queryParams: { ids: [sub._id, category._id] } });
  }
}
