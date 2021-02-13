import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-user-management-admin',
  templateUrl: './user-management-admin.component.html',
  styleUrls: ['./user-management-admin.component.css']
})
export class UserManagementAdminComponent implements OnInit {
  adminForm: FormGroup;
  userAdminData: any=[];
  pageNumber:number=1
  userStatus: any;
  current:any;
  userid: any;

  constructor(public service:MainService, public route:Router)
   {this.current=new Date()
    console.log('f', this.current);
    
  }

  ngOnInit(): void {
    this.useradmin()
    this.adminForm = new FormGroup({
      'startdate': new FormControl('',Validators.required),
      'enddate' :  new FormControl('',Validators.required),
      'searchText' : new FormControl(''),
    })
  }
// api of listing of user admin
  useradmin(){
    this.service.showSpinner();
    let data={}
    var url="account/admin/user-management/search-and-filter-staff?page="+(this.pageNumber-1) +"&pageSize=20";
    this.service.post(url,data).subscribe((res:any)=>{
      console.log('fd', res);
      if(res.status==200){
        this.service.hideSpinner()
        this.userAdminData=res.data.list;
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })

  }

  // routing for view user admin
  viewAdmin(id){
    this.route.navigate(['/admin-detail'],{queryParams:{id:id}})

  }

  search(){
    let startdate = Date.parse(this.adminForm.value.startdate)
    let enddate = Date.parse(this.adminForm.value.enddate)
    let search = this.adminForm.value.searchText;
    this.service.showSpinner();
     var data={
     }
     if(search){
      var url="account/admin/user-management/search-and-filter-staff?search="+search
      this.service.post(url , data ).subscribe((res:any)=>{
        console.log('fd', res);
        if(res.status==200){
          this.service.hideSpinner()
          this.userAdminData=res.data.list;
        }
      }, err => {
        this.service.hideSpinner();
        if (err['status'] == '401') {
          this.service.onLogout();
          this.service.toasterErr('Unauthorized Access');
        } else {
          this.service.toasterErr('Something Went Wrong');
        }
      })
     }

     else if(enddate){
      var url1="account/admin/user-management/search-and-filter-staff?page=" +(this.pageNumber-1)+ "&pageSize=20" +"&fromDate=" +startdate +"&toDate=" +enddate;
      this.service.post( url1, data ).subscribe((res:any)=>{
        console.log('fd', res);
        if(res.status==200){
          this.service.hideSpinner()
          this.userAdminData=res.data.list;
        }
      }, err => {
        this.service.hideSpinner();
        if (err['status'] == '401') {
          this.service.onLogout();
          this.service.toasterErr('Unauthorized Access');
        } else {
          this.service.toasterErr('Something Went Wrong');
        }
      })
     }

     else if(search && enddate){
      var url2="account/admin/user-management/search-and-filter-staff?page=" +(this.pageNumber-1)+ "&pageSize=20" +"&fromDate=" +startdate +"&toDate=" +enddate +'&search='+search
      this.service.post( url2, data ).subscribe((res:any)=>{
        console.log('fd', res);
        if(res.status==200){
          this.service.hideSpinner()
          this.userAdminData=res.data.list;
        }
      }, err => {
        this.service.hideSpinner();
        if (err['status'] == '401') {
          this.service.onLogout();
          this.service.toasterErr('Unauthorized Access');
        } else {
          this.service.toasterErr('Something Went Wrong');
        }
      })
    }
   

    
    
  }

  reset(){
    this.useradmin()
    this.adminForm.reset()

  }
 //========modal=======//
 delete(id){
   this.userid=id
  $('#deleteModal').modal('show')
}
// api of delete
deleteUser(){
  this.service.showSpinner();
  var url="account/admin/user-management/delete-user-detail?userId="+this.userid;
  this.service.get(url).subscribe((res:any)=>{
    if(res.status==200){
      this.service.toasterSucc(res.message);
      this.service.hideSpinner();
      this.useradmin()
      $('#deleteModal').modal('hide')
    }
  }, err => {
    this.service.hideSpinner();
    if (err['status'] == '401') {
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    } else {
      this.service.toasterErr('Something Went Wrong');
    }
  })
  
}
block(status , id){
  this.userid=id
  this.userStatus=status
  $('#block').modal('show')
}
blockUser(){
  this.service.showSpinner();
  var url="account/admin/user-management/user-status?userStatus="+this.userStatus+'&userId='+this.userid;
  this.service.get(url).subscribe((res:any)=>{
    if(res.status==200){
      this.service.toasterSucc(res.message);
      this.service.hideSpinner();
      this.useradmin()
  $('#block').modal('hide')
    }
}, err => {
  this.service.hideSpinner();
  if (err['status'] == '401') {
    this.service.onLogout();
    this.service.toasterErr('Unauthorized Access');
  } else {
    this.service.toasterErr('Something Went Wrong');
  }
})
}

//export User
exportAsXLSX() {
  let dataArr = [];
  this.userAdminData.forEach((element, ind) => {

    dataArr.push({
      "S no": ind + 1,
      "Role": element.roleStatus ? element.roleStatus : '',
      " Name": element.firstName + '' + element.lastName ? element.lastName : '',
      "Email": element.email ? element.email : 'N/A',
      "Phone": element.phoneNo ? element.phoneNo : 'N/A',
      "Status": element.userStatus == true ? 'Active' : 'Inactive',
      "Last Logged In": element.createTime ? element.createTime.slice(0, 10) : 'N/A',
    })
  })

  this.service.exportAsExcelFile(dataArr, 'USER MANAGEMENT ADMIN');
}

}
