import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
declare var $: any;
@Component({
  selector: 'app-gift-card-management',
  templateUrl: './gift-card-management.component.html',
  styleUrls: ['./gift-card-management.component.css']
})
export class GiftCardManagementComponent implements OnInit {
  searchForm: FormGroup;
  total: number;
  currentPage: number = 1;
  itemPerPage:number=10;
  gifiId: any;
  userDataList:any= [];
  result: any;

  constructor(private service: MainService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'search': new FormControl(''),
      'startdate': new FormControl(''),
      'enddate': new FormControl(''),
    })
    this.giftList()
  }
  pagination(page) {
    this.currentPage = page;
    console.log(this.currentPage)
    this.giftList()
  }
  giftList() {
    this.service.showSpinner()
    let formData = {
      "page": this.currentPage ,
      "limit": this.itemPerPage
    }
    this.service.postApi('admin/giftList', formData, 1).subscribe((res: any) => {
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.service.successToast(res.responseMessage)
        this.userDataList =res.result.docs
        this.total=res.result.total
      }else{
        this.service.hideSpinner()
        this.service.errorToast(res.responseMessage)
      } 
     }, (error) => {
        this.service.hideSpinner()
    })
  }
  reset(){
    this.searchForm.reset()
    this.giftList()
  }
  searchGift() {
    this.service.showSpinner()
    let formData = {
      "page":this.currentPage,
      "limit": this.itemPerPage,
      "search": this.searchForm.value.search,
      "fromDate":Math.round(new Date(this.searchForm.value.startdate).getTime()),
      "toDate": Math.round(new Date(this.searchForm.value.enddate).getTime()),
    }
    this.service.postApi('admin/giftList', formData, 1).subscribe((res: any) => {
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.service.successToast(res.responseMessage)
        this.userDataList=res.result?res.result.docs:[]
        this.total=res.result.total
      }else{
        this.userDataList=[]
        this.service.hideSpinner()
        this.service.errorToast(res.responseMessage)
      }
     }, (error) => {
        this.service.hideSpinner()
    })
  }
  //            Delete section
  openModal(id) {
    $('#deleteModal').modal('show')
    this.gifiId = id
  }
  deleteGift() {
    this.service.showSpinner()
    let data = {
      'giftId': this.gifiId
    }
    this.service.deleteApi(`admin/deleteGift`, data, 1).subscribe((res: any) => {
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.service.successToast(res.responseMessage)
        $('#deleteModal').modal('hide')
      }else{
        this.service.hideSpinner()
        this.service.errorToast(res.responseMessage)
        $('#deleteModal').modal('hide')
      } 
    }, (error) => {
        this.service.hideSpinner()
    })
  }
   //            Delete section END
}
