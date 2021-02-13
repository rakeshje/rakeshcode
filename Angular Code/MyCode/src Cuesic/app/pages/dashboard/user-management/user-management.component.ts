import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainserviceService } from '../../provider/mainservice.service';
declare var $ : any ;
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  searchForm:FormGroup;
  userDataList : any = [];
  userId: any;
  status: any;
  paginationData: any={ limit: 5, page: 1, total: 0  };
  constructor(public router:Router, public mainService : MainserviceService) { }

  ngOnInit() {
    this.formValidation();
    this.viewUser();
    console.log('h',this.paginationData.limit);
    
  }
//=============form validation========//
  formValidation(){
    this.searchForm= new FormGroup({
      search: new FormControl('')
    })
  }

  //=======pagination========//
  pagination(event){
    this.paginationData.page=event
    this.viewUser();
    
  }
  //============= List of view user api integration =========//
  viewUser(){
   const data = {
    search : this.searchForm.value.search,
    page:this.paginationData.page,
    limit:this.paginationData.limit
   }
    this.mainService.postApi('admin/userList',data ,1).subscribe((res)=>{
      console.log('response of user', res);
      if(res.response_code == 200){
        
        this.paginationData.limit=res.result.limit
        this.paginationData.total = res.result.total;
        this.userDataList = res.result.docs?res.result.docs :'';
        // this.mainService.successToast(res.response_message);
      }
      else{
        this.userDataList = res.result?res.result :''
        this.mainService.errorToast(res.response_message)
      }
    })
  }

  //*******************View Particular user data******************//

  viewOneUser(id){
   this.router.navigateByUrl('view-user/'+id)
  }

   //============= open delete modal integration =========//
   openDeleteModal(id){
     this.userId =  id
     $('#deleteUser').modal('show')
  }

  //============= Delete user api integration =========//
  deleteUser(){
    const data = {
      userId :   this.userId
    }
    this.mainService.postApi('admin/deleteUser',data,1).subscribe((res)=>{
      $('#deleteUser').modal('hide');
      if(res.response_code == 200){
        this.viewUser()
        this.mainService.successToast(res.response_message);
      }
      else{
        this.mainService.errorToast(res.response_message);
      }
    })
  }

  //******************************** Block User modal open **********************//
  blockUserModal(id,status){
    this.userId = id;
    this.status = status
   $('#blockuser').modal('show')
  }

  //******************************** Block User Api integration **********************//
  blockUser(){
    $('#blockuser').modal('hide')
    const data = {
      userId : this.userId
    }
    $('#blockuser').modal('hide')
    this.mainService.postApi('admin/blockUnblockUser',data,1).subscribe((res)=>{
      $('#deleteUser').modal('hide');
      if(res.response_code == 200){
        this.viewUser()
        this.mainService.successToast(res.response_message);
      }
      else{
        this.mainService.errorToast(res.response_message);
      }
    })
  }

}
