import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
declare var $: any

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  userForm: FormGroup;
  listing: any = [];
  id: number;
  deleted: any;
  totalRecords: any
  pageNumber:number=1
  itemsPerPage:number=20
  userid: any;
  userStatus: any;
  constructor(
    private router: Router, public service: MainService
  ) {

  }

  ngOnInit() {
    this.userForm = new FormGroup({
      'startdate': new FormControl('', Validators.required),
      'enddate': new FormControl('', Validators.required),
      'searchText': new FormControl(''),
    })
    this.getlist();
  }

  
  getlist(){
    this.service.showSpinner()
    var url="account/admin/user-management/filter-user-details?page="+(this.pageNumber-1) +"&pageSize=20"
    this.service.get(url).subscribe((res:any)=>{
      this.listing = res.data.list
      console.log('kfg',this.listing);
      
      this.totalRecords = res.data.totalCount
      console.log('kn', this.totalRecords);
      this.service.hideSpinner()
      
    })
  }
  pagination(page){
    this.totalRecords=[]
    console.log('jh', page);
    this.pageNumber=page;
    console.log('jh', this.pageNumber);
    
    this.getlist()
  }
  search() {
    
    let startdate = Date.parse(this.userForm.value.startdate)
    let enddate = Date.parse(this.userForm.value.enddate)
    var search = this.userForm.value.searchText;
    if( this.userForm.value.searchText){
      var url="account/admin/user-management/filter-user-details?search="+search+'&page=0'
    }
    else if(this.userForm.value.startdate && this.userForm.value.enddate ){
      var url1="account/admin/user-management/filter-user-details?fromDate="+startdate+'&toDate='+enddate
    }

    else if(this.userForm.value.startdate && this.userForm.value.enddate && this.userForm.value.searchText ){
      var url2="account/admin/user-management/filter-user-details?fromDate="+startdate+'&toDate='+enddate+'&search'+search

    }
    this.service.get( url || url1 || url2).subscribe((res: any) => {
      this.listing = res.data.list;
      console.log('kfg',this.listing);
      this.totalRecords = res.data.totalCount
    })
  }

  // reset
  reset(){
    if((this.userForm.value.startdate && this.userForm.value.enddate) || this.userForm.value.searchText){
      this.userForm.reset()
     this.getlist();
   
    }
    
    
  }

  //========modal=======//
  delete(id: number) {
    this.id = id;
    $('#deleteModal').modal('show')
  }
  deleteUser() {
    this.service.get(`account/admin/user-management/delete-user-detail?userId=${this.id}`).subscribe((res: any) => {
      this.deleted = res
      if (this.deleted.ststus = 200) {
        $('#deleteModal').modal('hide')
        this.service.toasterSucc(this.deleted.message);
        this.getlist();
      }
     }, err => {   
       this.service.hideSpinner();  
        if (err['status'] == '401') {  
            this.service.onLogout();   
           this.service.toasterErr('Unauthorized Access'); 
         } 
      else {    
          this.service.toasterErr('Something Went Wrong');  
        } 
     })

  }

  
  block(status , id){   
     this.userid=id 
       this.userStatus=status 
    $('#block').modal('show')
  } 
   blockUser(){
     this.service.showSpinner();
      var url="account/admin/user-management/user-status?userStatus="+this.userStatus+'&userId='+this.userid; 
       this.service.get(url).subscribe((res:any)=>{    
        if(res.status==200){       
         this.service.toasterSucc(res.message);    
            this.service.hideSpinner();      
          this.getlist()   
         $('#block').modal('hide')  
          } 
     }, err => {   
       this.service.hideSpinner();  
        if (err['status'] == '401') {  
            this.service.onLogout();   
           this.service.toasterErr('Unauthorized Access'); 
         } 
      else {    
          this.service.toasterErr('Something Went Wrong');  
        } 
     })
  } 

  // user details navigation
  userDetails(id){
    this.router.navigate(['/user-details'],{queryParams:{id:id}})
  }


  //export User
  exportAsXLSX() {
    let dataArr = [];
    this.listing.forEach((element, ind) => {

      dataArr.push({
        "S no": ind + 1,
        "User ID": element.userId ? element.userId : '',
        "User Name": element.firstName + '' + element.lastName ? element.lastName : '',
        "Email": element.email ? element.email : 'N/A',
        "Phone": element.phoneNo ? element.phoneNo : 'N/A',
        "Status": element.userStatus == true ? 'Active' : 'Inactive',
        "Date": element.createTime ? element.createTime.slice(0, 10) : 'N/A',
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Admin User list');
  }


}
