import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ngxCsv } from 'ngx-csv';
declare var $: any;
@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  searchForm: FormGroup;
  roleListData: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  roleId: any;
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation()
    this.getRoleList();
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
      this.getRoleList()
    }
  }

  // --------- reset search form --------------- //      
  searchFormReset() {
    if (this.searchForm.value.search) {
      this.searchForm.reset();
      this.getRoleList()
    }
  }

  // ------- get list of role -------- //
  pagination(event) {
    console.log(event)
    this.currentPage = event;
    this.getRoleList()
  }
  //==========export csv======//
  exportCsv(){
    this.mainService.showSpinner()
    this.mainService.postApi('admin/exportRoleTocsv',{},0).subscribe((res)=>{
    if(res.responseCode==200){
      this.mainService.hideSpinner()
      this.roleListData=res.result
    let dataArr=[]
    dataArr.push({
      Sno:"s.no",
      RoleName:"RoleName",
      
    })
    this.roleListData.forEach((element,ind) => {
      dataArr.push({
        Sno:ind+1,
        RoleName:element.roleName?element.roleName:"",
        
      })
    });
  
    new ngxCsv(dataArr,'Role-management')
  }
  })
  }

  // ------------ get role list -------------- // 
  getRoleList() {
    let data = {
      roleName: this.searchForm.value.search
    }
    this.mainService.showSpinner();
    this.mainService.postApi('role/roleList', data, 0).subscribe((res: any) => {
      console.log("get role list response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        // this.mainService.successToast(res.responseMessage);
        this.roleListData = res.result.docs;
        
      } else {
        this.roleListData = [];
        this.roleListData = res.result;
        this.mainService.hideSpinner();
        // this.mainService.errorToast(res.responseMessage);
      }
    })
  }
   // ------- add role -------- //
   addRole() {
    this.router.navigate(['/add-role'])
  }
  editRole(item) {
    this.router.navigate(['/edit-role'],{queryParams:{id:item._id, permissionid:item.permissions[0]._id}})
  }
  viewRole(id) {
    this.router.navigate(['/view-role'],{queryParams:{id:id}})
  }


  // ------- delete role -------- //
  deleteRoleModal(roleId) {
    this.roleId = roleId
    $('#delete').modal('show')
  }
  deleteRole() {
    this.mainService.showSpinner()
    this.mainService.postApi('role/deleteRole',{roleId:this.roleId},1).subscribe((res)=>{
      console.log("fh",res);
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.mainService.successToast('role deleted successfully.')
        $('#delete').modal('hide')
        this.getRoleList()
      }
      
    },(error)=>{
      this.mainService.errorToast('something went wrong')
    })
    

  }

  // export
  exportCSV(){
  }
  exportPDF(){
  }
  exportXLS(){
  }
  
}
