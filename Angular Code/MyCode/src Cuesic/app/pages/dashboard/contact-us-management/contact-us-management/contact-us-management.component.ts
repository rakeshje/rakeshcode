import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
declare var $:any

@Component({
  selector: 'app-contact-us-management',
  templateUrl: './contact-us-management.component.html',
  styleUrls: ['./contact-us-management.component.css']
})
export class ContactUsManagementComponent implements OnInit {
  searchForm:FormGroup
  contactList: any=[];
  currentPage : any = 1;
  limit:any;
  total:any;
  id: any;
  constructor(public router:Router, public mainservice:MainserviceService) { }

  ngOnInit() {
    this.form();
    this.contactUsList();
  }

  //============form validation=======//
  form(){
    this.searchForm= new FormGroup({
      search: new FormControl()
    })
  }
//======contact listing===//
  contactUsList(){
    let data={
      search:this.searchForm.value.search
    }
    this.mainservice.showSpinner();
    this.mainservice.postApi('admin/contactUsList',data, 1).subscribe((res)=>{
      console.log("contact", res);
      if(res.response_code==200){
        this.mainservice.hideSpinner();
        // this.mainservice.successToast(res.response_message);
        this.contactList=res.result.docs
        this.limit=res.result.limit;
        this.total=res.result.total;
        console.log("contact", this.contactList);
      }
      if(res.response_code==404){
        this.mainservice.errorToast(res.response_message);
        this.mainservice.hideSpinner();
      }
      
    },(error)=>{
      this.mainservice.errorToast('something went wrong');
    })
  }

  //=======modal open===//
  deleteUserModal(id){
    this.id=id
    $('#deleteContactUser').modal('show')
  }

  //=======delete contact====//
  deleteContact(){
    this.mainservice.showSpinner()
    let data={
      contactUsId:this.id
    }
    this.mainservice.deleteApi('admin/contactUs', data,1).subscribe((res)=>{
      if(res.response_code==200){
        $('#deleteContactUser').modal('hide')
        this.mainservice.hideSpinner()
        this.mainservice.successToast(res.response_message);
        this.contactUsList();
      }
    })
  }

  //=======routing====//
  viewContact(id){
    this.router.navigateByUrl('/view-contact/'+id)
  }

}
