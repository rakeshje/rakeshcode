import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  itemPerPage = 5;
  currentPage = 1;
  total: any;
  userId: any;
  userIds: any = [];
  isCheckedAll: any = false;
  currTab: any='Customer';
  practionerData: any=[];
  practionerValue:boolean=true;
  customerValue:boolean=true;
  customerUserValue:boolean=true;
  customerUserEditValue:boolean=true;
  customerUserAddValue:boolean=true;
  viewData: any;
  customerData: any=[];
  viewCustomer: any;
  editUserForm: FormGroup;
  corporateData: any=[];
  customerLength: any;
  file: any;
  imageType: any;
  imageUrl: any;
  addUserForm: FormGroup;

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
      this.getCustomer();
      this.customerValue=true;
      this.customerUserValue=true;
      this.customerUserEditValue=true;

    }
   else if(this.currTab === 'Corporate'){
      this.getCorporate();
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
    this.editUserForm= new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
    });
    this.addUserForm= new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'password':new FormControl('', Validators.required),
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
    this.currentPage = event;
    this.getCustomer()
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

// ========================= user tab all start ====================================//

  // get customer
  getCustomer(){
    this.mainService.showSpinner();
    let data ={}
    this.mainService.postApi('admin/listUsers','', 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.customerData=res.result.docs;
        this.customerLength=res.result.docs.total
        console.log("f", this.practionerData);
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }

  // view customer
  viewUser(id){
    this.userId=id
    this.viewCustomerData()
    this.customerUserValue=false;
    this.customerValue=false;
  }

  // view customer api
  viewCustomerData(){
    let data={
      'customerId':this.userId
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/viewCustomer',data,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.viewCustomer=res.result[0]
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }
  // edit customer
  editUser(id){
    this.userId=id
    this.editCustomer();
    this.customerUserEditValue=false;
    this.customerValue=false;
  }

  // edit customer
  editCustomer(){
    let data={
      'customerId':this.userId
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/editCustomer',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.customerData=res.result;
        this.editUserForm.patchValue({
          'firstName':this.customerData.name,
          'email':this.customerData.email,
          'number':this.customerData.mobileNumber,
          'DOB':this.customerData.dateOfBirth,
          'image':this.customerData.profilePic,
        })
        console.log("f", this.practionerData);
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }

  // update customer
  UpdateUser(){
    let data = {
      'customerId':this.userId,
      'name': this.editUserForm.value.firstName,
      'email': this.editUserForm.value.email,
      'profilePic': this.imageUrl,
      'mobileNumber':this.editUserForm.value.number,
      'dateOfBirth':this.editUserForm.value.DOB,
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/editCustomer', data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner()
        this.mainService.successToast(res.responseMessage);
        this.selectTab('Customer');
        this.customerValue=true;
        this.customerUserEditValue=true;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }
  // add user

  addUser(){
    this.customerUserAddValue=false;
    this.customerUserEditValue=true;
    this.customerUserValue=true;
    this.customerValue=false;
  }

  // add user api
  addUserDetail(){
    let data = {
      'name': this.addUserForm.value.firstName,
      'email': this.addUserForm.value.email,
      'profilePic': this.imageUrl,
      'mobileNumber':this.addUserForm.value.number,
      'dateOfBirth':this.addUserForm.value.DOB,
      'password':this.addUserForm.value.password,
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/user', data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner()
        this.mainService.successToast(res.responseMessage);
        this.selectTab('Customer');
        this.customerValue=true;
        this.customerUserEditValue=true;
        this.customerUserAddValue=true;
        this.customerUserValue=true;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // upload
  ValidateFileUpload(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

  // =============================== user tab all end =======================================//
  

  // get corporate
  getCorporate(){
    this.mainService.showSpinner();
    let data ={}
    this.mainService.postApi('admin/corporateList','', 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.corporateData=res.result.docs;
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
  viewPractioner(id){
    this.userId=id
    this.viewPractionerData()
    this.practionerValue=false;
  }

  // view practioner api
  viewPractionerData(){
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
    this.getCustomer()
    this.customerValue=true;
    this.customerUserValue=true;
    this.customerUserEditValue=true;
  }
  // changeEditValue(){
  //   this.customerValue=true;
    
  //   this.customerUserValue=true;
  //   this.customerUserEditValue=true;
  // }

  


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

  
  // editUser(id) {
  //   if(this.currTab=='Customer'){
  //     console.log('id', id);
  //     this.router.navigate(['/view-user'], { queryParams: { value: id } })
  //     }
  //     else if(this.currTab=='Corporate'){
  //       console.log('id', id);
  //       this.router.navigate(['/view-corporate'], { queryParams: { value: id } })
  //       }
  //     else if(this.currTab=='Practioner'){
  //         console.log('id', id);
  //         this.router.navigate(['/edit-practitioner'], { queryParams: { value: id } })
  //         }

  // }

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



