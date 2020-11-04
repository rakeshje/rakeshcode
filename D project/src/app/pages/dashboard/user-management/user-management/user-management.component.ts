import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';
declare var $: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  searchForm: FormGroup;
  userDataList: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  userId: any;
  userIds: any = [];
  isCheckedAll: any = false;
  currTab: any='Customer';
  practionerData: any=[];
  practionerValue:boolean=true;
  viewData: any;
  customerData: any=[];

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.defaults();
    this.searchFormValidation();
    // this.getUserList();
    this.selectTab('Customer');
    this.getCustomer();
  }

  // =========tab link====//
  selectTab(tab){
    this.currTab = tab;
    console.log('hh',this.currTab);
    
    if(this.currTab === 'Customer'){
      this.router.navigate(['wallet-management'])
    }
   else if(this.currTab === 'Corporate'){
      this.router.navigate(['user-detail-trading'])
    }
    else if (this.currTab === 'Practioner'){
      this.getPractioner();
    }
    
  }

  

  searchFormValidation() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      status: new FormControl(''),
      disease: new FormControl('')
    });
  }
  searchFormSubmit() {
    if (this.searchForm.value.search || this.searchForm.value.status || this.searchForm.value.disease) {
      // this.getUserList()
    }
  }
  searchFormReset() {
    if (this.searchForm.value.search || this.searchForm.value.status || this.searchForm.value.disease) {
      this.searchForm.reset({
        search: '',
        disease: '',
        status: ''
      });
      // this.getUserList()
    }
  }

  pagination(event) {
    this.userIds = []
    this.isCheckedAll = false
    this.currentPage = event;
    // this.getUserList()
  }

  // ------- get user list -------- //
  // getUserList() {
  //   let data = {
  //     'search': this.searchForm.value.search,
  //     'disease': this.searchForm.value.disease,
  //     'status': this.searchForm.value.status,
  //     'page': this.currentPage,
  //     'limit': this.itemPerPage
  //   }
  //   this.mainService.showSpinner();
  //   this.mainService.postApi(ApiUrls.userList, data, 1).subscribe((res: any) => {
  //     console.log("get user management list response ==>", res)
  //     if (res.responseCode == 200) {
  //       this.total = res.result.total;
  //       this.userDataList = res.result[0].docs ? res.result[0].docs : '';
  //       this.mainService.hideSpinner();
  //       this.mainService.successToast(res.responseMessage);
  //     } else {
  //       this.userDataList = res.result ? res.result : ''
  //       this.mainService.hideSpinner();
  //       this.mainService.errorToast(res.responseMessage)
  //     }
  //   })
  // }

  // get customer
  getCustomer(){
    this.mainService.showSpinner();
    let data ={}
    this.mainService.postApi('admin/listUsers','', 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.customerData=res.result.docs
        console.log("f", this.practionerData);
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }

  // get practioner
  getPractioner(){
    this.mainService.showSpinner();
    let data ={}
    this.mainService.postApi('admin/practitionerList','', 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.practionerData=res.result.docs
        console.log("f", this.practionerData);
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }
  // view practioner
  viewUser(id){
    this.userId=id
    this.viewPractioner()
    this.practionerValue=false;
  }

  // view practioner
  viewPractioner(){
    
    this.mainService.showSpinner();
    this.mainService.getApi('admin/viewPractitioner?userId='+this.userId,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.viewData=res.result
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })

  }

  changeValue(){
    this.practionerValue=true;
  }

  


  // ----------------------------------- view user ------------------------------- //
  // viewUser(id) {
  //   if(this.currTab=='Customer'){
  //   console.log('id', id);
  //   this.router.navigate(['/view-user'], { queryParams: { value: id } })
  //   }
  //   else if(this.currTab=='Corporate'){
  //     console.log('id', id);
  //     this.router.navigate(['/view-corporate'], { queryParams: { value: id } })
  //     }
  //   else if(this.currTab=='Practioner'){
  //       console.log('id', id);
  //       this.router.navigate(['/view-practitioner'], { queryParams: { value: id } })
  //       }

  // }

  
  editUser(id) {
    if(this.currTab=='Customer'){
      console.log('id', id);
      this.router.navigate(['/view-user'], { queryParams: { value: id } })
      }
      else if(this.currTab=='Corporate'){
        console.log('id', id);
        this.router.navigate(['/view-corporate'], { queryParams: { value: id } })
        }
      else if(this.currTab=='Practioner'){
          console.log('id', id);
          this.router.navigate(['/edit-practitioner'], { queryParams: { value: id } })
          }

  }

  // ------------------------------- delete user ----------------------------- //
  deleteUserModal(userId) {
    $('#deleteUser').modal('show')
    this.userId = userId
  }
  deleteUser() {
    let data = {
      userId: this.userId
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.deleteApi(ApiUrls.deleteUser, data, 1).subscribe((res: any) => {
      console.log("delete user response ==>", res)
      $('#deleteUser').modal('hide');
      if (res.responseCode == 200) {
        // this.getUserList()
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }


  // ----------------------------------  delete multiple hospital ------------------------------- //
  setAllCheckboxes(event) {
    this.userIds = [];
    this.isCheckedAll = event.target.checked;
    if (this.isCheckedAll) {
      this.userDataList.forEach((element, index) => {
        this.userDataList[index].isChecked = true;
        this.userIds.push(this.userDataList[index]._id);
      });
    } else {
      this.userIds = []
      this.userDataList.forEach((element, index) => {
        this.userDataList[index].isChecked = false;
      });
    }
  }
  onCheckboxChange(event) {
    if (event.target.checked) {
      this.userIds.push(event.target.value)
    } else {
      const index: number = this.userIds.indexOf(event.target.value)
      if (index !== -1) { this.userIds.splice(index, 1) }
    }
    this.checkIfAllSelected()
  }
  checkIfAllSelected() {
    if (this.userDataList.length == this.userIds.length)
      return this.isCheckedAll = true;
    return this.isCheckedAll = false
  }

  deleteMultiUserModal() {
    if (this.userIds.length < 1)
      return this.mainService.infoToast('Please select item to delete.')
    $('#deleteMultiUser').modal('show')
  }
  deleteMultiUser() {
    let data = {
      userIds: this.userIds
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.deleteApi(ApiUrls.deleteMultiUser, data, 1).subscribe((res: any) => {
      console.log("delete multiple user response ==>", res)
      $('#deleteMultiUser').modal('hide');
      if (res.responseCode == 200) {
        // this.getUserList()
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }
  defaults() {
    this.currTab = 'PRACTITIONER_MANAGEMENT';
  }

    
}



