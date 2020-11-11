import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
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
  customerValue:boolean=true;
  customerUserValue:boolean=true;
  customerUserEditValue:boolean=true;
  customerUserAddValue:boolean=true;
  corporateValue:boolean=true;
  corporateUserValue: boolean=true;
  corporateUserEditValue: boolean=true;
  corporateUserAddValue:boolean=true;
  practionerValue:boolean=true;
  practionerUserValue:boolean=true;
  practionerUserEditValue:boolean=true;
  practionerUserAddValue:boolean=true;
  viewCompanyValue:boolean=true;
  companyUserValue:boolean=true;
  companyUserEditValue:boolean=true;
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
  viewPractionerDataa: any;
  editPractionerForm: FormGroup;
  practionerDataa: any;
  addPractionerForm: FormGroup;
  companyForm: FormGroup;
  serviceData: any;
  companyData: any;
  viewCompanyDataa: any;
  editCompanyForm: FormGroup;
  companyDataa: any;
  corporateLength: any;
  practionerLength: any;
  companyLength: any;
  
  

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation();
    // this.getUserList();
    this.selectTab('Customer');
    this.getCustomer();
    this.getService();
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
      this.viewCompanyValue=true;
      
    }
    else if (this.currTab === 'Practioner'){
      this.getPractioner();
      this.practionerUserValue=true;
      this.practionerUserEditValue=true;
      this.practionerUserAddValue=true;
      this.practionerValue=true;
      
    }
    
  }

  

  searchFormValidation() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
    this.editUserForm= new FormGroup({
      'firstName': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'email': new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'number': new FormControl('', [Validators.required,Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl(''),
    });
    this.addUserForm= new FormGroup({
      'firstName': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'email': new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'number': new FormControl('', [Validators.required,Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl(''),
      'password':new FormControl('', [Validators.required,Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
    });
    this.editCorporateForm= new FormGroup({
      'firstName': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'email': new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'number': new FormControl('', [Validators.required,Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl(''),
      'company':new FormControl('', [Validators.required,Validators.pattern(/^[^0-9][a-zA-Z ]*$/i)]),
    });
    this.addCorporateForm= new FormGroup({
      'firstName': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'email': new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'number': new FormControl('', [Validators.required,Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl(''),
      'company':new FormControl('', [Validators.required,Validators.pattern(/^[^0-9][a-zA-Z ]*$/i)]),
      'password':new FormControl('', [Validators.required,Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
    });
    this.companyForm= new FormGroup({
      'firstName': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'limit': new FormControl('', Validators.required),
      'service': new FormControl('', Validators.required),
      
    });
    this.editCompanyForm= new FormGroup({
      'firstName': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'limit': new FormControl('', Validators.required),
      'service': new FormControl('', Validators.required),
      
    });
    this.editPractionerForm= new FormGroup({
      'firstName': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'email': new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'number': new FormControl('', [Validators.required,Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl(''),
      
    });
    this.addPractionerForm= new FormGroup({
      'firstName': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/i)]),
      'email': new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'number': new FormControl('', [Validators.required,Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
      'DOB': new FormControl('', Validators.required),
      'image': new FormControl(''),
      'password':new FormControl('', [Validators.required,Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
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
    if(this.currTab=='Customer'){
      this.getCustomer()
    }
    else if(this.currTab=='Corporate'){
      this.getCorporate()
    }
    else if(this.currTab=='Practioner'){
      this.getPractioner()
    }
  }
  // service api 
  getService(){
    this.mainService.showSpinner();
    let data ={

    }
    this.mainService.postApi('admin/serviceList','', 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.serviceData=res.result.docs;
        console.log("f", this.serviceData);
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
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
    let data ={
      'page':this.currentPage,
      'limit':this.itemPerPage,
    }
    this.mainService.postApi('admin/listUsers',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.customerData=res.result.docs;
        this.customerLength=res.result.total;
        this.status=res.result.docs[0].status;
        console.log("f", this.customerLength);
        
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
    this.customerUserAddValue=true;
  }


  // =============================== user tab all end =======================================//
  
  //========================== corporate tab start===========================//
  // get corporate
  getCorporate(){
    this.mainService.showSpinner();
    let data ={
      'page':this.currentPage,
      'limit':this.itemPerPage,
    }
    this.mainService.postApi('admin/corporateList',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.corporateData=res.result.docs;
        this.corporateLength=res.result.total
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

  //============================== view company start============================//
  // view companies
  viewCompany(){
    this.companyList();
    this.corporateUserValue=true;
    this.corporateUserEditValue=true;
    this.corporateUserAddValue=true;
    this.corporateValue=false;
    this.viewCompanyValue=false;
  }
  // add company api
  addCompany(){
    let data = {
      'name': this.companyForm.value.firstName,
      'userLimit': this.companyForm.value.limit,
      'service': this.companyForm.value.service,
      'companyCode':'',
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/addCompany', data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.companyForm.reset();
        this.companyList();
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.selectTab('Corporate');
        this.companyList();
        this.corporateUserValue=true;
        this.corporateUserEditValue=true;
        this.corporateUserAddValue=true;
        this.corporateValue=false;
        this.viewCompanyValue=false;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })

  }

  // company list
  companyList(){
    this.mainService.showSpinner();
    let data ={
      'page':this.currentPage,
      'limit':this.itemPerPage,
    }
    this.mainService.postApi('admin/companyList',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.companyData=res.result.docs;
        this.companyLength=res.result.total
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

  // view company
  viewcorporateCompany(id){
    this.userId=id
    this.viewCorporateCompany();
    this.companyUserValue=false;
    this.corporateUserValue=true;
    this.corporateUserEditValue=true;
    this.corporateUserAddValue=true;
    this.corporateValue=false;
    this.viewCompanyValue=true;
  }
  // view corporate company
  viewCorporateCompany(){
    this.mainService.showSpinner();
    this.mainService.getApi('admin/viewCompany/'+this.userId,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.viewCompanyDataa=res.result
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })

  }

  // edit company
  editCorporateCompany(id){
    this.userId=id;
    this.editCompany();
    this.companyUserEditValue=false;
    this.companyUserValue=true;
    this.viewCompanyValue=true;
  }

  // edit company api
  editCompany(){
    let data={
      'companyId':this.userId
    }
    this.mainService.showSpinner();
    this.mainService.putApi('admin/editCompany',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.companyDataa=res.result;
        this.imageUrl=res.result.profilePic
        this.editCompanyForm.patchValue({
          'firstName':this.companyDataa.name,
          'service':this.companyDataa.service,
          'limit':this.companyDataa.userLimit,
         
        })
        console.log("f", this.practionerData);
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }

  // update company
  UpdateCompany(){
    let data = {
      'companyId':this.userId,
      'firstName':this.editCompanyForm.value.name,
      'service':this.editCompanyForm.value.service,
      'limit':this.editCompanyForm.value.userLimit,
    }
    this.mainService.showSpinner();
    this.mainService.putApi('admin/editCompany', data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner()
        this.mainService.successToast(res.responseMessage);
        this.selectTab('Corporate');
        this.corporateValue=true;
        this.corporateUserEditValue=true;
        this.companyUserEditValue=true;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }


  changeCompanyValue(){
    this.companyUserValue=true;
    this.companyUserEditValue=true;
    this.viewCompanyValue=false;
  }
  //============================== view company end============================//

  //=============================== practioner all start=============================//

  // get practioner
  getPractioner(){
    this.mainService.showSpinner();
    let data ={
      'page':this.currentPage,
      'limit':this.itemPerPage,
    }
    this.mainService.postApi('admin/practitionerList',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.practionerData=res.result.docs;
        this.practionerLength=res.result.total
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
    this.practionerUserValue=false;
    this.practionerUserEditValue=true;
    // this.practionerUserAddValue=true;
    this.practionerValue=false;
  }

  // view practioner api
  viewPractionerData(){
    this.mainService.showSpinner();
    this.mainService.getApi('admin/viewPractitioner?practitionerId='+this.userId,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.viewPractionerDataa=res.result
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })

  }
  // edit practiner
  editPractioner(id){
    this.userId=id;
    this.editPractionerPatch();
    this.practionerUserValue=true;
    this.practionerUserEditValue=false;
    // this.practionerUserAddValue=true;
    this.practionerValue=false;
  }

  // edit practioner api
  editPractionerPatch(){
    let data={
      'practitionerId':this.userId
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/editPractitioner',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.practionerDataa=res.result;
        this.imageUrl=res.result.profilePic
        this.editPractionerForm.patchValue({
          'firstName':this.practionerDataa.name,
          'email':this.practionerDataa.email,
          'number':this.practionerDataa.mobileNumber,
          'DOB':this.practionerDataa.dateOfBirth,
          'image':this.imageUrl,
        })
        console.log("f", this.practionerData);
        
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }
  // update practioner
  UpdatePractioner(){
    let data = {
      'practitionerId':this.userId,
      'name': this.editPractionerForm.value.firstName,
      'email': this.editPractionerForm.value.email,
      'image': this.imageUrl,
      'mobileNumber':this.editPractionerForm.value.number,
      'dateOfBirth':this.editPractionerForm.value.DOB,
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/editPractitioner', data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner()
        this.mainService.successToast(res.responseMessage);
        this.selectTab('Practioner');
        this.practionerValue=true;
        this.practionerUserEditValue=true;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // add practioner 
  addPractioner(){
    this.practionerUserValue=true;
    this.practionerUserEditValue=true;
    this.practionerUserAddValue=false;
    this.practionerValue=false;
  }

  // add practioner api
  addPractionerDetail(){
    let data = {
      'countryCode':'',
      'name': this.addPractionerForm.value.firstName,
      'email': this.addPractionerForm.value.email,
      'profilePic': this.imageUrl,
      'mobileNumber':this.addPractionerForm.value.number,
      'dateOfBirth':this.addPractionerForm.value.DOB,
      'password':this.addPractionerForm.value.password,
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/addPractitioner', data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner()
        this.mainService.successToast(res.responseMessage);
        this.selectTab('Practioner');
        this.practionerUserValue=true;
        this.practionerUserEditValue=true;
        this.practionerUserAddValue=true;
        this.practionerValue=true;
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }


  changePractionerValue(){
    this.getPractioner()
    this.practionerUserValue=true;
    this.practionerUserEditValue=true;
    this.practionerUserAddValue=true;
    this.practionerValue=true;
  }

  //=============================== practioner all end ========================//
  // ================================ export csv start ================================//
  exportCSV() {
    if(this.currTab=='Customer'){
      let dataArr = [];
     dataArr.push({
        sno: "S.No.",
        Name: "Name",
        DOB: "D.O.B",
        Email:"Email",
        Contact:"Contact Number"
    });
  
    this.customerData.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Name:element.name?element.name:'--',
            DOB:element.dateOfBirth?element.dateOfBirth:'--',
            Email:element.email?element.email:'--',
            Contact:element.mobileNumber?element.mobileNumber:'--',
        })
    }) 
    new ngxCsv(dataArr, 'Customer_management');
    }
    else if(this.currTab=='Corporate'){
      let dataArr = [];
     dataArr.push({
        sno: "S.No.",
        Name: "Name",
        DOB: "D.O.B",
        Email:"Email",
        Contact:"Contact Number",
        Company:"Company Name",
    });
  
    this.practionerData.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Name:element.name?element.name:'--',
            DOB:element.dateOfBirth?element.dateOfBirth:'--',
            Email:element.email?element.email:'--',
            Contact:element.mobileNumber?element.mobileNumber:'--',
            Company:element.company?element.company:'--',
        })
    }) 
    new ngxCsv(dataArr, 'Corporate Customer_management');
    }
    else if(this.currTab=='Practioner'){
        let dataArr = [];
       dataArr.push({
          sno: "S.No.",
          Name: "Name",
          DOB: "D.O.B",
          Email:"Email",
          Contact:"Contact Number"
      });
    
      this.customerData.forEach((element,ind) => {
          dataArr.push({
              sno:ind+1,
              Name:element.name?element.name:'--',
              DOB:element.dateOfBirth?element.dateOfBirth:'--',
              Email:element.email?element.email:'--',
              Contact:element.mobileNumber?element.mobileNumber:'--',
          })
      }) 
      new ngxCsv(dataArr, 'Practioner_management');
  }
}

  // export company csv
  exportCompanyCSV(){
    let dataArr = [];
     dataArr.push({
        sno: "S.No.",
        Name: "Name",
        UserLimit: "UserLimit",
        Service: "Service",
        CompanyCode:"CompanyCode",
        AddedOn:"AddedOn",
    });
  
    this.companyData.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Name:element.name?element.name:'--',
            UserLimit:element.userLimit?element.userLimit:'--',
            Service:element.service?element.service:'--',
            CompanyCode:element.companyCode?element.companyCode:'--',
            AddedOn:element.createdAt?element.createdAt.slice(0, 10):'--',
        })
    }) 
    new ngxCsv(dataArr, 'Corporate Company_Management');
  
  }
  // ================================ export csv end ================================//

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
          this.practionerData=res.result.docs;
        }
        
        
        
      }
      else if(res.responseCode==404){
        if(this.currTab === 'Customer'){
          this.customerData=[];
          this.customerLength=''
        }
        if(this.currTab === 'Corporate'){
          this.corporateData=[];
          this.corporateLength=''
        }
        if(this.currTab === 'Practioner'){
          this.practionerData=[];
          this.practionerLength=''
        }

        
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }

  // search company
  searchCompany(){
    this.mainService.showSpinner();
    let data ={
      'search':this.searchForm.value.search,
      'fromDate':this.searchForm.value.fromDate,
      'toDate':this.searchForm.value.toDate,
    }
    this.mainService.postApi('admin/companyList',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.companyData=res.result.docs;
        this.companyLength=res.result.total
        this.status=res.result.docs.status;

        console.log("f", this.practionerData);
      }
      else if(res.responseCode==404){
        this.companyData=[];
        this.companyLength=''
        this.mainService.hideSpinner()
        this.mainService.errorToast(res.responseMessage)

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

  // reset company
  resetCompany(){
    if (this.searchForm.value.search || this.searchForm.value.fromDate || this.searchForm.value.toDate) {
      this.searchForm.reset();
        this.companyList();
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

  DeleteUserModal(userId,status) {
    $('#DeleteModal').modal('show')
    this.userId = userId
    this.status=status
  }

  DeleteUser(){
    let data = {
      companyId: this.userId,
      
    }
    this.mainService.showSpinner();
    this.mainService.deleteApi('admin/deleteCompany',data, 1).subscribe((res: any) => {
      console.log("delete user response ==>", res)
      if (res.responseCode == 200) {
        $('#DeleteModal').modal('hide');
        this.mainService.successToast(res.responseMessage);
        if(this.currTab === 'Corporate'){
          this.corporateUserValue=true;
        this.corporateUserEditValue=true;
        this.corporateUserAddValue=true;
        this.corporateValue=false;
        this.viewCompanyValue=false;
          this.companyList();
          
          this.viewCompanyValue=false;
    
        }
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
      console.log('jj', data1);
      var url1="admin/deleteAndBlockCorporateCustomer"
    }
    else if (this.currTab === 'Practioner'){
      var data2 = {
        practitionerId: this.userId,
        status:this.status
      }
      
      
      var url2="admin/blockUnblockPractitioner"
    }
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

  // block company
  blockModal(userId,status){
    $('#BlockModal').modal('show')
    this.userId = userId
    this.status=status
    console.log('f',status);
    
  }

  BlockUser(){
    let data={

    }
  }






  // ------------------------------- block/unblock functinality end----------------------------- //

  



    
}



