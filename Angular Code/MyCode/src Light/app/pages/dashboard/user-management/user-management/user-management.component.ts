import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv';
import * as jsPDF from 'jspdf';

declare var $: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  searchForm: FormGroup
  whichmodal: string = 'enable';
  userDataList: any = [];
  paginationData: any = { limit: 10, page: 1, total: 0 };
  //total: any;
  particularUserData: any;
  
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation();
    this.getUserList()
  }
//========search validation===//
  searchFormValidation() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      statusType: new FormControl('', [Validators.required])
    });
  }
//=========search and reset form===//
  searchFormSubmit() {
    // if (this.searchForm.value.search || this.searchForm.value.statusType) {
      this.getUserList()
    // }
  }
  searchFormReset() {
    if (this.searchForm.value.search || this.searchForm.value.statusType) {
      this.searchForm.reset();
      this.getUserList()
    }
  }
//======pagination====//
  // pagination(event) {
  //   console.log(event)
  //   this.currentPage = event;
  //   this.getUserList()
  // }
  
   //=======export csv===//
   exportCSV() {
     this.mainService.showSpinner()
   
    let data={
      userType:"USER"
    }
    this.mainService.postApi('admin/exportToCSV',data,0).subscribe((res)=>{
      console.log("dh",res);
      if(res.responseCode==200){
     this.mainService.hideSpinner();
     this.userDataList=res.result;
     let dataArr = [];
     dataArr.push({
         sno: "S.No.",
         Name: " Name",
         Email: "Email",
         ContactNumber : "Contact Number",
         Status:"Status"
     });
   
     this.userDataList.forEach((element,ind) => {
         dataArr.push({
             sno:ind+1,
             Name:element.firstName?element.firstName:'--',
             Email:element.email?element.email:'--',
             ContactNumber:element.mobileNumber?element.mobileNumber:'--',
             Status:element.status?element.status:'--',
         })
     }) 
     new ngxCsv(dataArr, 'User_Management');
      }
      
    },(error)=>{
      this.mainService.errorToast('something went wrong')
    })
  }



  //===== export pdf======//
  exportPDF() {
  
    console.log("hgjfjhgf");
    const doc = new jsPDF;
    doc.text('Hello', 15, 15);
  
    doc.save('user.pdf');
    
  }
  // ------- get user list -------- //
  getUserList() {
    let data = {
      "search": this.searchForm.value.search,
      "loginStatus" : this.searchForm.value.statusType,
      "limit":this.paginationData.limit,
      "page":this.paginationData.page
    }
    console.log("total",data);
    
    this.mainService.showSpinner();
    this.mainService.postApi('admin/userList', data, 1).subscribe((res: any) => {
      console.log("get user management list response ==>", res)
      if (res.responseCode == 200) {
        this.paginationData.total = res.result.total
        console.log("total",this.paginationData.total);
        
        this.userDataList = res.result.docs ? res.result.docs : '';
        this.mainService.hideSpinner();
      } else {
        //this.userDataList = [];
        this.paginationData.total = res.result.total? res.result.total:''
        this.userDataList = res.result? res.result:'';
        this.mainService.hideSpinner();
      }
    })
  }


  //=========Routing========//
  goToViewUser(item){
    this.router.navigate(['/view-user'],{queryParams:{id:item._id}})
  }

  goToViewLog(item){
    this.router.navigate(['/view-log'],{queryParams:{id:item._id}}) 
  }
  goToUserWishList(item){
    this.router.navigate(['/view-user-wishlist'],{queryParams:{id:item._id}})
  }

  enableDisableOrDeleteOpenModal(data, whichModal) {
    console.log("Data >>>>> ", data)
    if (whichModal === 'enable') {
      this.whichmodal = 'enable';
    } else {
      if (whichModal === 'disable') {
        this.whichmodal = 'disable';
      }
      // else {
      
      //   this.whichmodal = 'delete';
      // }
    }
    this.particularUserData = data;
    $('#enableDisableDeleteModal').modal({ backdrop: 'static', keyboard: false });
  }

  anableDisable(enableorDisable) {
    if (enableorDisable === 'disable') {
      console.log("Inside Disable Block")
      this.disableUser(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      // this.getUserList();
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        this.enableUser(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        // this.getUserList();
      }
      //  else {
      //   console.log("Inside Delete Block")
      //   // this.deleteSubadmin(this.particularUserData);
      //   $('#enableDisableDeleteModal').modal('hide');
      //   // this.getUserList();
      // }
    }
  }
//===========deactivate======//
  disableUser(data){
    this.mainService.showSpinner()
    console.log("d", data);
    
    let dataa ={
      userId:data,
      status:'UNBLOCK'
    }
    console.log("jf",dataa);
    
    this.mainService.postApi('admin/activeBlockUser',dataa,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.getUserList()
      }
    },(error)=>{
      this.mainService.errorToast('something went wrong')
    })

  }
//============activate=====//
  enableUser(data){
    this.mainService.showSpinner()
    console.log("d", data);
    
    let dataa ={
      userId:data,
      status:'BLOCK'
    }
    console.log("jf",dataa);
    
    this.mainService.postApi('admin/activeBlockUser',dataa,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.mainService.hideSpinner()
        this.getUserList()
      }
    },(error)=>{
      this.mainService.errorToast('something went wrong')
    })
  }

  storageTypePagination(event){
    this.paginationData.page = event;
    this.getUserList()
  }

}
