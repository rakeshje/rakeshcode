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
  corporateValue:boolean=true;
  corporateUserValue: boolean=true;
  corporateUserEditValue: boolean=true;
  corporateUserAddValue:boolean=true;
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
  viewCorporate: any;
  editCorporateForm: FormGroup;
  corporateDataPatch: any;
  corporateDataa: any;
  addCorporateForm: FormGroup;
  status: any;
  
  

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
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
      this.customerUserAddValue=true;

    }
   else if(this.currTab === 'Corporate'){
      this.getCorporate();
      this.corporateUserValue=true;
      this.corporateUserEditValue=true;
      this.corporateUserAddValue=true;
      this.corporateValue=true;
    }
    else if (this.currTab === 'Practioner'){
      this.getPractioner();
    }
    
  }

  

  searchFormValidation() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
    this.editUserForm= new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl(''),
    });
    this.addUserForm= new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'password':new FormControl('', Validators.required),
    });
    this.editCorporateForm= new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl(''),
      'company':new FormControl('', Validators.required),
    });
    this.addCorporateForm= new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl(''),
      'company':new FormControl('', Validators.required),
      'password':new FormControl('', Validators.required),
    });
    

  }
  searchFormSubmit() {
    if (this.searchForm.value.search || this.searchForm.value.fromDate || this.searchForm.value.endDate) {
      this.getCustomer()
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
        this.customerLength=res.result.docs.total;
        this.status=res.result.docs[0].status;
        console.log("f", this.status);
        
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
        this.imageUrl=res.result.profilePic;
        this.editUserForm.patchValue({
          'firstName':this.customerData.name,
          'email':this.customerData.email,
          'number':this.customerData.mobileNumber,
          'DOB':this.customerData.dateOfBirth,
          
        })
        
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

  

  changeValue(){
    this.getCustomer()
    this.customerValue=true;
    this.customerUserValue=true;
    this.customerUserEditValue=true;
  }


  // =============================== user tab all end =======================================//
  
  //========================== corporate tab start===========================//
  // get corporate
  getCorporate(){
    this.mainService.showSpinner();
    let data ={}
    this.mainService.postApi('admin/corporateList','', 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.corporateData=res.result.docs;
        this.status=res.result.docs.status;

        console.log("f", this.practionerData);
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }

  // view corporate
  viewcorporate(id){
    this.userId=id;
    this.viewCorporateData()
    this.corporateUserValue=false;
    this.corporateUserEditValue=true;
    this.corporateUserAddValue=true;
    this.corporateValue=false;
  }

  // view corporate api 
  viewCorporateData(){
    let data={
      'corporateId':this.userId
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/viewCorporateCustomer',data,1).subscribe((res)=>{
      console.log('hh', res);
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.viewCorporate=res.result[0]
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }

  // edit corporate
  editCorporate(id){
    this.userId=id;
    this.editCorporatepatch();
    this.corporateUserValue=true;
    this.corporateUserEditValue=false;
    this.corporateUserAddValue=true;
    this.corporateValue=false;
  }

  // edit corporate patch
  editCorporatepatch(){
    let data={
      'corporateId':this.userId
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/editCorporateCustomer',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.corporateDataa=res.result;
        this.imageUrl=res.result.profilePic
        this.editCorporateForm.patchValue({
          'firstName':this.corporateDataa.name,
          'email':this.corporateDataa.email,
          'number':this.corporateDataa.mobileNumber,
          'DOB':this.corporateDataa.dateOfBirth,
          'image':this.imageUrl,
          'company':this.corporateDataa.company,
        })
        console.log("f", this.practionerData);
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }


  UpdateCorporate(){
    let data = {
      'corporateId':this.userId,
      'name': this.editCorporateForm.value.firstName,
      'email': this.editCorporateForm.value.email,
      'image': this.imageUrl,
      'mobileNumber':this.editCorporateForm.value.number,
      'dateOfBirth':this.editCorporateForm.value.DOB,
      'company':this.editCorporateForm.value.company,
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/editCorporateCustomer', data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner()
        this.mainService.successToast(res.responseMessage);
        this.selectTab('Corporate');
        this.corporateValue=true;
        this.corporateUserEditValue=true;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // add corporate addCorporateForm
  addCorporate(){
    this.corporateUserValue=true;
    this.corporateUserEditValue=true;
    this.corporateUserAddValue=false;
    this.corporateValue=false;
  }

  // add user api
  addCorporateDetail(){
    let data = {
      'name': this.addCorporateForm.value.firstName,
      'email': this.addCorporateForm.value.email,
      'profilePic': this.imageUrl,
      'mobileNumber':this.addCorporateForm.value.number,
      'dateOfBirth':this.addCorporateForm.value.DOB,
      'password':this.addCorporateForm.value.password,
      'company':this.addCorporateForm.value.company,
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/addCorporateCustomer', data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner()
        this.mainService.successToast(res.responseMessage);
        this.selectTab('Corporate');
        this.corporateUserValue=true;
        this.corporateUserEditValue=true;
        this.corporateUserAddValue=true;
        this.corporateValue=true;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }











  changeCorporateValue(){
    this.getCorporate()
    this.corporateUserValue=true;
    this.corporateUserEditValue=true;
    this.corporateUserAddValue=true;
    this.corporateValue=true;
  }







  // get practioner
  getPractioner(){
    this.mainService.showSpinner();
    let data ={}
    this.mainService.postApi('admin/practitionerList','', 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.practionerData=res.result.docs;
        this.status=res.result.docs.status;

        console.log("f", this.practionerData);
      }
      else if(res.responseCode==404){
        this.mainService.hideSpinner()
        this.mainService.errorToast(res.responseMessage)

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

  //==========================serach========================================//
  // search
  search(){
    console.log('h','hh');
    
    // if (this.searchForm.value.search || this.searchForm.value.fromDate || this.searchForm.value.toDate) {
    //   return true;
    // }
    
    let data ={
      'search':this.searchForm.value.search,
      'fromDate':this.searchForm.value.fromDate,
      'toDate':this.searchForm.value.toDate,
    }
    this.mainService.showSpinner();
    if(this.currTab === 'Customer'){
      var url="admin/listUsers"
    }
    else if(this.currTab === 'Corporate'){
      var url1="admin/corporateList"
    }
    else if (this.currTab === 'Practioner'){
      var url2="admin/practitionerList"
    }

    this.mainService.postApi(url || url1 || url2,data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        if(this.currTab === 'Customer'){
        this.customerData=res.result.docs;
        this.customerLength=res.result.docs.total
        console.log("f", this.practionerData);
    
        }
       else if(this.currTab === 'Corporate'){
        this.corporateData=res.result.docs;
        console.log("f", this.practionerData);
        }
        else if (this.currTab === 'Practioner'){
          this.getPractioner();
        }
        
        else if(res.responseCode==404){
          this.mainService.hideSpinner();
          this.mainService.errorToast(res.responseMessage)
        }
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }

  // reset
  reset(){
    if (this.searchForm.value.search || this.searchForm.value.fromDate || this.searchForm.value.toDate) {
     
        this.mainService.hideSpinner();
        if(this.currTab === 'Customer'){
          this.searchForm.reset()
        this.getCustomer();
    
        }
       else if(this.currTab === 'Corporate'){
        this.searchForm.reset()
          this.getCorporate();
        }
        else if (this.currTab === 'Practioner'){
          this.searchForm.reset()
          this.getPractioner();
        }
      }
  }
  

  


  
  // ------------------------------- delete functinality start----------------------------- //
  deleteUserModal(userId,status) {
    $('#deleteModal').modal('show')
    this.userId = userId
    this.status=status
  }
  deleteUser() {
    // let data = {
    //   customerId: this.userId,
    //   status:this.status
    // }
    if(this.currTab === 'Customer'){
      var data = {
        customerId: this.userId,
        status:this.status
      }
      var url="admin/deleteAndBlockCustomer"
    }
    else if(this.currTab === 'Corporate'){
      var data1 = {
        corporateId: this.userId,
        status:this.status
      }
      var url1="admin/deleteAndBlockCorporateCustomer"
    }
    else if (this.currTab === 'Practioner'){
      var data2 = {
        practitionerId: this.userId,
        status:this.status
      }
      var url2="admin/deletePractitioner"
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.postApi(url ||url1 ||url2, data || data1 || data2, 1).subscribe((res: any) => {
      console.log("delete user response ==>", res)
      if (res.responseCode == 200) {
        $('#deleteModal').modal('hide');
        this.mainService.successToast(res.responseMessage);
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
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // ------------------------------- delete functinality end ----------------------------- //

  // ------------------------------- block/unblock functinality start----------------------------- //
  BlockModal(userId,status){
    $('#blockModal').modal('show')
    this.userId = userId
    this.status=status
    console.log('f',status);
    
  }

  blockUser(){
    if(this.currTab === 'Customer'){
      var data = {
        customerId: this.userId,
        status:this.status
      }
      var url="admin/deleteAndBlockCustomer"
    }
    else if(this.currTab === 'Corporate'){
      var data1 = {
        corporateId: this.userId,
        status:this.status
      }
      var url1="admin/deleteAndBlockCorporateCustomer"
    }
    else if (this.currTab === 'Practioner'){
      var data2 = {
        practitionerId: this.userId,
        status:this.status
      }
      var url2="admin/blockUnblockPractitioner"
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.postApi(url ||url1 ||url2, data || data1 || data2, 1).subscribe((res: any) => {
      console.log("delete user response ==>", res)
      if (res.responseCode == 200) {
        $('#blockModal').modal('hide');
        this.mainService.successToast(res.responseMessage);
        console.log('f',this.status);
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
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }


  // ------------------------------- block/unblock functinality end----------------------------- //


    
}



