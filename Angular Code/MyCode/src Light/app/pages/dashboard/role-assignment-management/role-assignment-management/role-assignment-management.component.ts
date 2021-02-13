import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare var $: any
@Component({
  selector: 'app-role-assignment-management',
  templateUrl: './role-assignment-management.component.html',
  styleUrls: ['./role-assignment-management.component.css']
})
export class RoleAssignmentManagementComponent implements OnInit {
  searchForm: FormGroup
  roleAssignmentData: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  deleteId: any;
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation();
    this.getRoleAssignmentList()
  }

  // -------- search form validation ------------ //
  searchFormValidation() {
    this.searchForm = new FormGroup({
      'search': new FormControl()
    })
  }

  // -------- search form submit -------------- //
  searchFormSubmit() {
    if (this.searchForm.value.search) {
      this.getRoleAssignmentList()
    }
  }

  // --------- reset search form --------------- //      
  searchFormReset() {
    if (this.searchForm.value.search) {
      this.searchForm.reset();
      this.getRoleAssignmentList()
    }
  }

  // ------- get list of role assignment / sub-admin  -------- //
  pagination(event) {
    console.log(event)
    this.currentPage = event;
    this.getRoleAssignmentList()
  }

  // ------- get list of role assignment / sub-admin  -------- //
  getRoleAssignmentList() {
    let data = {
      "search": this.searchForm.value.search,
      "page": "",
      "limit": ""
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/subAdminList', data, 1).subscribe((res: any) => {
      console.log("get role assignment management list  response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        // this.mainService.successToast(res.responseMessage);
        this.roleAssignmentData = res.result.docs;
      } else {
        this.roleAssignmentData = [];
        this.roleAssignmentData = res.result;
        this.mainService.hideSpinner();
        // this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // ------- add role assignment / sub-admin  -------- //
  addSubUser() {
    this.router.navigate(['/add-sub-user'])
  }
  editSubUser(id) {
    this.router.navigate(['/edit-sub-user', id])
  }
  viewSubUser(id) {
    this.router.navigate(['/view-sub-user', id])
  }


  // ------- block role assignment / sub-admin  -------- //
  blockModal() {
    
    $('#block').modal('show')
  }
  blockSubUser() {
    $('#block').modal('hide')
  }

  // ------- unblock role assignment / sub-admin  -------- //
  unBlockModal() {

  }
  unBlockSubUser() {

  }

  // ------- delete role assignment / sub-admin  -------- //
  deleteModal(id) {
    this.deleteId = id;
    $('#delete').modal('show')
  }
  deleteSubUser() {
    $('#delete').modal('hide')
    let data = {
      subAdminId : this.deleteId
    }
    this.mainService.postApi('admin/deleteSubAdmin', data, 1).subscribe(success=>{
      console.log("hjyfg98hjvj",success);
      this.getRoleAssignmentList();
    })

  }

  // export
  exportCSV() {
    this.mainService.showSpinner()
    this.mainService.postApi('admin/exportSubAdminTocsv',{},0).subscribe((res)=>{
    if(res.responseCode==200){
      this.mainService.hideSpinner()
      this.roleAssignmentData=res.result
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        name: "Name",
        role: "Role",
        email: 'Email',
        contact : "Contact Number"
    });
  
    this.roleAssignmentData.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            name:element.firstName?element.firstName:'--',
            role:element.roleId.roleName?element.roleId.roleName:'--',
            email:element.email?element.email:'--',
            contact:element.mobileNumber?element.mobileNumber:'--',
        })
    }) 
    new ngxCsv(dataArr, 'Role_assignment_management');
  }
})
  }
  exportPDF() {
  }
  exportXLS() {
  }

}
