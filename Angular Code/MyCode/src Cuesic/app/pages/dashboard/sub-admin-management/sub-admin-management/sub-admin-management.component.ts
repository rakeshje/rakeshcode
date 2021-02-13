import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
 declare var $ : any;
@Component({
  selector: 'app-sub-admin-management',
  templateUrl: './sub-admin-management.component.html',
  styleUrls: ['./sub-admin-management.component.css']
})
export class SubAdminManagementComponent implements OnInit {
  searchForm : FormGroup;
  userId: any;
  status: any;
  userDataList: any = [];
  limit: any;
  total: any;
  currentPage :any = 1;

  constructor(private router : Router,public mainService : MainserviceService ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'search' : new FormControl(''),
    });
    this.viewUser(this.currentPage)
  }


   //============= List of view user api integration =========//
   viewUser(page){
     this.currentPage = page
    const data = {
     search : this.searchForm.value.search,
     page : this.currentPage
    }
     this.mainService.postApi('admin/subAdminList',data ,1).subscribe((res)=>{
       console.log('response of user', res);
       if(res.response_code == 200){
         this.userDataList = res.result.docs;
         this.currentPage = res.result.page
         this.limit = res.result.limit;
         this.total = res.result.total
        //  this.mainService.successToast(res.response_message);
       }
       else{
        this.userDataList = res.result?res.result :''
         this.mainService.errorToast(res.response_message)
       }
     })
   }

   //*******************View Particular user data******************//

   viewOneUser(id){
    this.router.navigateByUrl('view-sub-admin/'+id)
   }

    //============= open delete modal integration =========//
    openDeleteModal(id){
      this.userId =  id
      $('#deleteSubadmin').modal('show')
   }
   //============= Delete SubAdmin api integration =========//
   deleteSubAdmin(){
     const data = {
      subAdminId :   this.userId
     }
     this.mainService.postApi('admin/deleteSubAdmin',data,1).subscribe((res)=>{
       $('#deleteSubadmin').modal('hide');
       if(res.response_code == 200){
         this.viewUser(this.currentPage )
         this.mainService.successToast(res.response_message);
       }
       else{
         this.mainService.errorToast(res.response_message);
       }
     })
   }

   //******************************** Block SubAdmin modal open **********************//
   blockUserModal(id,status){
     this.userId = id;
     this.status = status
    $('#blockSubAdmin').modal('show')
   }

   //******************************** Block SubAdmin Api integration **********************//
   blockSubAdmin(){
     const data = {
      subAdminId : this.userId
     }
     $('#blockSubAdmin').modal('hide')
     this.mainService.postApi('admin/blockUnblockSubAdmin',data,1).subscribe((res)=>{
       if(res.response_code == 200){
         this.viewUser(this.currentPage )
         this.mainService.successToast(res.response_message);
       }
       else{
         this.mainService.errorToast(res.response_message);
       }
     })
   }



  editUser(id){
    this.router.navigateByUrl('/edit-sub-admin/'+id)
  }








}
