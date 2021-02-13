import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-user-wishlist',
  templateUrl: './view-user-wishlist.component.html',
  styleUrls: ['./view-user-wishlist.component.css']
})
export class ViewUserWishlistComponent implements OnInit {
  martForm:FormGroup
  selectedTab: any = 'MART';
  id: any;
  userWishListData: any;
  selectedType: string;

  constructor(public router:Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      console.log("dffhj", this.id);
      
    })
   }

  ngOnInit() {
    this.mart()
    this.userWishList('MART')
  }

 
  //========tab click===//
  changeTab(tab){
    this.selectedTab =  tab
    if(this.selectedTab=='MART'){
      this.userWishList('MART')
      this.selectedType = 'MART';
    }
    else if(this.selectedTab=='RETAILER'){
      this.selectedType = 'RETAILER';
      this.userWishList('RETAILER');
      
    }
    else if(this.selectedTab=='CATEGORY'){
      this.selectedType = 'CATEGORY';
      this.userWishList('CATEGORY');
      
    }
    else if(this.selectedTab=='SUBCATEGORY'){
      this.selectedType = 'SUBCATEGORY';
      this.userWishList('SUBCATEGORY');
      
    }
  }

  //========form validation=====//
  mart(){
    this.martForm= new FormGroup({
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    })
  }

  //==========search form submit====//
  martFormSubmit(){
    if(this.martForm.value.fromDate && this.martForm.value.toDate){
      this.userWishList(this.selectedTab)
    }
  }

  //===========wishlist====//
  userWishList(item){
    this.service.showSpinner()
    let data={
      userId:this.id,
      type: this.selectedTab
    }
    console.log("f",data);
    
    this.service.postApi('admin/wishList', data,1).subscribe((res)=>{
      console.log("fmg",res);
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.service.successToast(res.responseMessage)
        this.userWishListData=res.result;
      }
      else if(res.responseCode=404){
        this.service.errorToast('No data in whislist')
        this.service.hideSpinner()
      }
      
    },(error)=>{
      this.service.hideSpinner()
      this.service.errorToast('something went wrong')
    })

    }

  

}
