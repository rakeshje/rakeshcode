import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
declare var $: any;
@Component({
  selector: 'app-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.css']
})
export class SubscriptionManagementComponent implements OnInit {
  searchForm: FormGroup;
  SubscriptionList: any=[];
  subscriptionId: any;
  
  currentPage: any=1;
  total: any;
  limit: any;

  constructor(private router: Router, private mainService: MainserviceService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'search': new FormControl('')
    });
    this.viewSubscriptionList(this.currentPage)
  }

  //========routing======//
  editSubscription(id) {
    this.router.navigateByUrl('edit-subscription/' + id)
  }

  viewSubscription(id) {
    this.router.navigateByUrl('view-subscription/' + id)
  }

  //============= List of view user api integration =========//
  viewSubscriptionList(page) {
    this.currentPage = page
    const data = {
      search : this.searchForm.value.search,
      page : this.currentPage
      
    }
    this.mainService.postApi('admin/subscriptionList', data, 1).subscribe((res) => {
      console.log('response of user', res);
      if (res.response_code == 200) {
        this.SubscriptionList = res.result.docs;
        this.currentPage=res.result.page
        this.total = res.result.total
        this.limit = res.result.limit;
        
        
        
        this.mainService.successToast(res.response_message);
      }
      else {
        
        this.SubscriptionList = res.result ? res.result : ''
        this.mainService.errorToast(res.response_message)
      }
    })
  }

  //============= open delete modal integration =========//
  openDeleteModal(id) {
    this.subscriptionId = id
    $('#deleteSubscription').modal('show')
  }
  //============= Delete SubAdmin api integration =========//
  deleteSubscription() {
    const data = {
      subscriptionId: this.subscriptionId
    }
    this.mainService.deleteApi('admin/subscription', data, 1).subscribe((res) => {
      $('#deleteSubscription').modal('hide')
      if (res.response_code == 200) {
        this.viewSubscriptionList(this.currentPage)
        this.mainService.successToast(res.response_message);
      }
      else {
        this.mainService.errorToast(res.response_message);
      }
    })
  }






}
